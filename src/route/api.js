const express =require('express');
const UsersController=require("../controller/userController");
const TasksController=require("../controller/taskController"); 
const AuthMiddleware=require("../middleware/AuthMiddleware");


const router =express.Router();


router.post("/registration",UsersController.registration);
router.post("/login",UsersController.login);

//after login
router.post("/readProfile",AuthMiddleware, UsersController.profileDetails)
router.post("/updateProfile",AuthMiddleware, UsersController.profileUpdate);

router.get("/todoCreate",UsersController.createTodo);
router.get("/todoUpdate",UsersController.updateTodo);
router.get("/deleteTodo",UsersController.deleteTodo);
router.get("/complete_cancel",UsersController.markTodo);



module.exports = router;