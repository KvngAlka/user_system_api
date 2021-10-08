import express from 'express';
import { deletUser, emailExists, fetchUser, loginWithEmailAndPassword, updateEmail, updatePassword, updateUsername, userExists, validForChange } from './validation.js';


let router = express.Router();

//user database
let users = []


//user register
router.post("/user/register",(req,res)=>{
    const body = req.body;

    if(!body){

        res.json({msg : "Sorry you need to enter credentials"})

    }else{
        const {username, email, password, phone} = body;


        if(!email || !username || !password ){
            res.json({
                msg : "username , email or password can't be empty"
            })
        }else if(emailExists(users,email)){
            res.json({
                msg : "email already exist"
            })
        }
        else{
            const user_id = users.length + 1;
            users.push({
                ...body,
                id : user_id
            })
            res.status(201).json({
                msg : "User added successfully!",
                user : {
                    ...body,
                    id : user_id
                }
            });

        }
    }

    
})


//user login
router.post("/user/login", (req,res)=>{
    const body = req.body;

    const {email, password} = body;

    if(!email || !password){
        res.json({
            msg : "Please email or password can't be empty"
        })
    }else if(!userExists(users,email,password)){
        res.json({
            msg : "user credential does not exist in the database"
        })
    }else{
        res.status(201).json({
            msg : "Login Successfull",
            user : loginWithEmailAndPassword(users,email,password)
        })
    }


})


//update user email
router.put("/user/update/email",(req,res)=>{
    const body = req.body;
    const {password,id,data} = body;
    const {email,old_email} = body.data;

    if(!id || !password || !data){

        res.json({
            msg : "fields can't be empty"
        })

    }else if(!validForChange(users,id,password)){

        res.json({
            msg : "User can't be found or invalid password"
        })

    }else if(emailExists(users,email)){
        res.json({
            msg : "email already exists"
        })
    }
    else{
        
        users = updateEmail(users,id,email);
        const user = fetchUser(users,email);

        res.json({
            msg : "email update successfully",
            user : user
        })
    }
})



//update user password
router.put("/user/update/password",(req,res)=>{
    const body = req.body;
    const {password,id,data} = body;
    const {new_password} = body.data;

    if(!id || !password || !data){

        res.json({
            msg : "fields can't be empty"
        })

    }else if(!validForChange(users,id,password)){

        res.json({
            msg : "User can't be found or invalid password"
        })

    }else{
        
        users = updatePassword(users,id,new_password);
        const user = fetchUser(users,id);

        res.json({
            msg : "password update successfully",
            user : user
        })
    }
})



//update user 
router.put("/user/update/username",(req,res)=>{
    const body = req.body;
    const {password,id,data} = body;
    const {username} = body.data;

    if(!id || !password || !data){

        res.json({
            msg : "fields can't be empty"
        })

    }else if(!validForChange(users,id,password)){

        res.json({
            msg : "User can't be found or invalid password"
        })

    }else{
        
        users = updateUsername(users,id,username);
        const user = fetchUser(users,id);

        res.json({
            msg : "username update successfully",
            user : user
        })
    }
})


//user account delete
router.delete("/user/delete",(req,res)=>{
    const body = req.body;
    const {id,password} = body;
    if(!id || !password){
        res.json({
            msg : "fields can't be empty"
        })
    }else if(!validForChange(users,id,password)){
        res.json({
            msg : "User can't be found or invalid password"
        })
    }
    else{
        users = deletUser(users,id);
        res.json({
            msg : "user deleted successfully"
        })
    }
})


//fetch all user 

router.get("/users",(req,res)=>{
    res.json({
        msg : "Access successfull",
        users : users
    })
})




export default router;