const mongoose = require('mongoose');


const formSchema =  mongoose.Schema({
    name:{
        type:String,
        required:[true,'Enter your name'],
        trim:true,
    },

    rollno:{
        type:String,
        required:[true,'Enter your Roll Number'],
    },

    gender:{
        type:String,
        possibleValues:['male','female'],
        
    },

    dob:{
        type:String,
        required:[true,'Selct your Date Of Birth']
    },
})

const formModel  = mongoose.model(`Formss`, formSchema);
module.exports = formModel;