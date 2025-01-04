const http=require("http")
const app=require("./app")
const {initializeSocket}=require('./socket')
const server=http.createServer(app)
initializeSocket(server);
server.listen(process.env.PORT,()=>{
    console.log(`server is running on port ${process.env.PORT}`)
})