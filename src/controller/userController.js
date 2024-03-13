const Usersmodel = require("../model/userModel");
const jwt = require("jsonwebtoken")

//user Registration
exports.registration=async(req,res)=>{

    try {
        
        let  reqBody = req.body;

        await Usersmodel.create(reqBody);
        res.json({status:"success", message:"Registration Completed"})


    } catch (error) {
        res.json({status:"fail", message:err})
    }

}

//login
exports.login=async(req,res)=>{

    try {
        let reqBody = req.body;
        let user = await Usersmodel.find(reqBody);
        if(user.length>0){
            //JWT Token

            let Payload = {exp:Math.floor(Date.now()/1000)+(24*60*60),data:reqBody['email']};
            let token = jwt.sign(Payload, "123-xyz")
            res.json({status:"success", message:"user found", token:token})
        }else{
            res.json({status:"fail", message:"No user found"})
        }
         res.json({status:"success", message:user})
        
    } catch (error) {
        res.json({status:"fail", message:err})
    }

    
}



//User profile Read
exports.profileDetails=async(req,res)=>{
    
    
    try {
        
        let  email = req.headers['email'];
        
        let result = Usersmodel.find({email:email})
        res.json({status:"success", data:result})
        
        
    } catch (error) {
        res.json({status:"fail", message:err})
    }
    
}




exports.profileUpdate=async(req,res)=>{

    try {
        let email = req.headers['email']
        let reqBody = req.body;
        await UsersModel.updateOne({email:email})
        res.json({status:"fail", message:"update completed"})
        
    } catch (error) {
        res.json({status:"fail", message:err})
    }
    
}


// User To-do list create
exports.createTodo = (req, res) => {
    const { title, description } = req.body;
    const { username } = req.user;
    if (!todoLists[username]) {
        todoLists[username] = [];
    }
    todoLists[username].push({ title, description, completed: false });
    res.status(201).send('To-do item created successfully');
};

// User To-do list read
exports.readTodo = (req, res) => {
    const { username } = req.user;
    const userTodoList = todoLists[username] || [];
    res.status(200).send(userTodoList);
};

// User To-do list update
exports.updateTodo = (req, res) => {
    const { index } = req.params;
    const { title, description, completed } = req.body;
    const { username } = req.user;
    if (!todoLists[username] || !todoLists[username][index]) {
        return res.status(404).send('To-do item not found');
    }
    todoLists[username][index] = { title, description, completed };
    res.status(200).send('To-do item updated successfully');
};

// User To-do list delete
exports.deleteTodo = (req, res) => {
    const { index } = req.params;
    const { username } = req.user;
    if (!todoLists[username] || !todoLists[username][index]) {
        return res.status(404).send('To-do item not found');
    }
    todoLists[username].splice(index, 1);
    res.status(200).send('To-do item deleted successfully');
};

// User To-do list complete/cancel mark
exports.markTodo = (req, res) => {
    const { index } = req.params;
    const { completed } = req.body;
    const { username } = req.user;
    if (!todoLists[username] || !todoLists[username][index]) {
        return res.status(404).send('To-do item not found');
    }
    todoLists[username][index].completed = completed;
    res.status(200).send('To-do item status updated successfully');
};

// User Profile Details
exports.profileDetails = async (req, res) => {
    try {
        let email = req.headers['email'];
        let result = await Usersmodel.find({ email: email });
        res.json({ status: "success", data: result });
    } catch (error) {
        res.json({ status: "fail", message: error.message });
    }
};
