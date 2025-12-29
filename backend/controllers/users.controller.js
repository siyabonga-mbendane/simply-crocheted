
import mongoose from "mongoose";
import { User } from "../models/users.model.js";
import jwt from "jsonwebtoken";

// create a user
export const createUser = async (req, res) =>{
    const user = req.body;

    if(!user.username || !user.email || !user.password){
        return res.status(400).json({success: false, message: "provide all fields"});
    }
    
    try {
        // existing user check
        const existUser = await User.findOne({$or:[{email: user.email}, {username: user.username}]});
        if(existUser){
            return res.status(400).json({success:false, message: "user with this username or email exists"});
        }

        // create the user
        const newUser = new User(user);
        // save user to db
        await newUser.save();

        // create jwt token
        const tkn = jwt.sign({id: newUser._id, role: newUser.role}, process.env.JWT_SECRET || 'own-secret-key', {expiresIn: '24h'});

        // user data returned
        const userData = {_id: newUser._id, 
                          username: newUser.username, 
                          email: newUser.email, 
                          role: newUser.role, 
                          createdAt: newUser.createdAt
                         };
        
        return res.status(201).json({success: true, data: userData, token: tkn});
    } catch (error) {
        console.log("Error creating user: ", error.message);
        return res.status(500).json({success: false, message: "Server Error"})
    }
};

// login a user
export const loginUser = async (req, res) =>{
    const {email, password} = req.body;

    if(!email || !password){
        return res.status(400).json({success: false, message: "provide email and password"});
    }

    try {
        // use email to find user
        const user = await User.findOne({email});

        if(!user){
            return res.status(401).json({success: false, message: "invalid credentials"});
        }

        // password check
        const match = await user.comparePassword(password);

        if(!match){
            return res.status(401).json({success: false, message: "invalid credentials"});
        }

        // create jwt token
        const tkn = jwt.sign({id: user._id, role: user.role}, process.env.JWT_SECRET || 'own-secret-key', {expiresIn: '24h'});

        // user data returned
        const userData = {_id: user._id, 
                          username: user.username, 
                          email: user.email, 
                          role: user.role, 
                          createdAt: user.createdAt
                         };
        
        return res.status(201).json({success: true, data: userData, token: tkn});

    } catch (error) {
        console.log("Error on login: ", error.message);
        return res.status(500).json({success: false, message: "Server Error"})
    }
}

// get all users
export const getUsers = async (req, res) =>{
    try {
        const users = await User.find({}).select('-password');
        return res.status(200).json({success: true, data: users});
    } catch (error) {
        console.log("Error getting users", error.message);
        return res.status(500).json({success: false, message: "Server Error"});
    }
};

// update user
export const updateUser = async (req, res) =>{
    const {id} = req.params;
    const user = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success: false, message: "user id invalid"});
    }
    try {
        const updatedUser = await User.findByIdAndUpdate(id, user, {new: true}).select('-password');
        return res.status(200).json({success: true, data: updatedUser});
    } catch (error) {
        console.log("Error updating user", error.message);
        return res.status(500).json({success: false, message: "Server Error"});
    }
};

// delete user
export const deleteUser = async (req, res) =>{
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success: false, message: "invalid user id"});
    }

    try {
        await User.findByIdAndDelete(id);
        return res.status(200).json({success: true, message: "user deleted successsfully"})
    } catch (error) {
        console.log("Error deleting user ", error.message);
        return res.status(500).json({success: false, message: "Server Error"});
    }
};

// current user profile
export const getProfile =  async (req, res) =>{
    try {
        const user = await User.findById(req.userId).select('-password');
        if(!user){
            return res.status(404).json({success: false, message: "user not found"});
        }

        return res.status(200).json({success: true, data: user})
    } catch (error) {
        console.log("Error getting user profile ", error.message)
        return res.status(500).json({success: false, message: "Server Error"});
        
    }
}

