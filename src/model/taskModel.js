const mongoose = require('mongoose');

const TasksSchema = mongoose.Schema({
    title:{type:String, require:true},
    description:{type:String, require:true},
    status:{type:String, require:true},
}, {timestamps:true,versionKey:false})


const Tasksmodel = mongoose.model('tasks', TasksSchema);
module.exports = Tasksmodel;