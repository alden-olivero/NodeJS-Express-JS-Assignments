
const mongoose = require('mongoose')

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
        required: [false,"Car Model details are missing"],
        default:"Doe"
    },

})


const EmpModel=mongoose.model("EmpModel",empSchema )

module.exports=EmpModel