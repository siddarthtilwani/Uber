const mongoose=require('mongoose')
function connnectToDb(){
mongoose.connect(process.env.DB_CONNECT).then(()=>{
    console.log('connected to db')
})
}

module.exports=connnectToDb