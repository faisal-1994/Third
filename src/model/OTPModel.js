const mongoose = require('mongoose');

const otpSchema = mongoose.Schema({
    eamil:{type:String, unique:true, require:true},
    otp:{type:String, require:true},
    status:{type:String, require:true},
}, {timestamps:true,versionKey:false})


const otpModel = mongoose.model('otps', otpSchema);
module.exports = otpModel;