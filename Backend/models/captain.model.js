const mongoose=require('mongoose')
const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken');
const captainSchema=new mongoose.Schema({
    fullname:{
        firstname:{
            type:String,
            required:true,
            minlength:[3,'First name must be at least 3 characters long']
        },
        lastname:{
            type:String,

            minlength:[3,'last name must be at least 3 characters long']
        }
    },
    email:{
        type:String,
        required:true,
        match: [/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, 'Invalid email format'],
    },
    password:{
        type:String,
        required:true,
        select:false
    },
    socketId:{
        type:String,
    }
    ,status:{
        type:String,
        enum:['active','inactive'],
        default:'inactive'
    },
    veichle:{
        color:{
            type:String,
            required:true,
            minlength:[3,'veichle color must be at least 3 characters long']
        }
       
        ,number:{
            type:String,
            required:true,
            minlength:[3,'veichle number must be at least 3 characters long']
        },
        capacity:{
            type:Number,
            required:true
,min:[1,'capacity must be at least 1']
        },
        veichleType:{
            type:String,
            enum:['car','motorcycle','auto'],
            required:true
        }
    },
    location:{
        lat:{
            type:Number,

        },
        lng:{
            type:Number,
        }
    }
})

captainSchema.methods.generateToken=function(){
    const token=jwt.sign({_id:this._id},process.env.JWT_SECRET,{expiresIn:'24h'})
    return token
}
captainSchema.methods.comparePassword=function(password){
    return bcrypt.compare(password,this.password)
}
captainSchema.statics.hashPassword=async function(password){
    return await bcrypt.hash(password,10)
}
const captainModel=mongoose.model('captain',captainSchema)
module.exports=captainModel;