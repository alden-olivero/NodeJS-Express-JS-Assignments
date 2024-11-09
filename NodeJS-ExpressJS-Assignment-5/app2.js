const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')

const app = express()
dotenv.config({ path: "./config.env" })

const port = process.env.PORT || 3000

mongoose.connect(
    process.env.DB_LOCAL_URL,

).then((con) => {
    console.log("Connection done successfully")
    console.log(con.connection)
}).catch((err) => {
    console.log("Connection failed")
})

const empSchema = new mongoose.Schema({
    eid: {
        type: Number,
        required: [true,"Employee Id is needed and it should be unique"],
        unique:true
    },
    first_name: {
        type: String,
        required: [true,"Employee must have first_name"],
        default:"John"
    },
    last_name: {
        type: String,
        required: [true,"Employee must have last_name"],
        default:"Doe"
    },
    email: {
        type: String,
        required: [true,"Employee must have unique email"],
        unique:true
    },
    car_model: {
        type: String,
        required: [true,"Car Model details are missing"],
        default:"Doe"
    },

})

//creating collection
const EmpModel=mongoose.model("EmpModel",empSchema )
const emp1=new EmpModel({
    eid:1,
    first_name:"Alden",
    last_name:"olivero",
    email:"alden@gmail.com",
    car_model:"Tesla Model 3"
})

emp1.save()
.then(()=>{
    console.log("Employee added successfully")
}).catch((err)=>{
    console.log("Employee Details failed..Please try again",err)
})


app.listen(port, () => {
    console.log("Mongoose application is running ")
})