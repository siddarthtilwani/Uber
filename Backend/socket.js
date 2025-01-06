const socketio = require('socket.io');
const userModel = require('./models/user.model');
const captainModel = require('./models/captain.model');

let io;

function initializeSocket(server){
    io=socketio(server,{
        cors:{
            origin:"*",
            methods:['GET','POST']
        }
    })
    io.on('connection',(socket)=>{
        console.log(`Client connected: ${socket.id}`)
        socket.on('join',async(data)=>{
            const {userId,userType}=data
            if(userType==='user'){
                await userModel.findByIdAndUpdate(userId,{socketId:socket.id})
            }
            else{
                await captainModel.findByIdAndUpdate(userId,{socketId:socket.id})
            }
        })
        socket.on('disconnect',()=>{
            console.log(`Client disconnected: ${socket.id}`)
        })
        socket.on('update-location-captain',async(data)=>{
            console.log('inside backend of captain socket')
            const {captainId,location}=data
            if(!location || !location.lat || !location.lng){
                return socket.emit('error', { message: 'Invalid location data' });
            }

            await captainModel.findByIdAndUpdate(captainId,{location:{
                lat:location.lat,
                lng:location.lng
            }})
        })
    })
}

function sendMessageToSocketId(socketId,messageObject){
    // console.log(`Sending ${messageObject} to socketId:`,socketId)
    if(io){
        io.to(socketId).emit(messageObject.event,messageObject.data)

    }
    else{
        // console.log('Socket not initialized')
    }

}


module.exports={initializeSocket,sendMessageToSocketId}

