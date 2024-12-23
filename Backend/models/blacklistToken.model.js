const mongoose=require('mongoose')

const blocklistTokenSchema=new mongoose.Schema({
    token:{
        type:String,
        unique:true,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        expires:86400

    }
})


const blocklistTokenModel=mongoose.model('blocklistToken',blocklistTokenSchema)
module.exports=blocklistTokenModel;