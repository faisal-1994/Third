const mongoose = require('mongoose');

const DatabaseSchema = mongoose.Schema({
    email:{type:String, unique:true, require:true},
    firstName:{type:String, require:true},
    lastName:{type:String, require:true},
    mobile:{type:String, require:true},
    password:{type:String, require:true},
}, {timestamps:true,versionKey:false})


const Usersmodel = mongoose.model('users', DatabaseSchema);
module.exports = Usersmodel;