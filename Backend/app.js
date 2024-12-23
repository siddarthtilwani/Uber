const dotenv=require("dotenv")
dotenv.config()
const express=require('express')
const cors=require("cors")
const app=express()
const connnectToDb=require('./db/db')
const userRoutes=require('./routes/user.routes')
const capainRoutes=require('./routes/captain.routes')
const cookieParser=require('cookie-parser')
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
connnectToDb()
app.use(cors())
app.get('/',(req,res)=>{
    res.send('Hello World')
})

app.use('/users',userRoutes)

app.use('/captains',capainRoutes)


module.exports=app