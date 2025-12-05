
import mongoose from "mongoose";
import { User } from "../models/users.model.js";
import Item from "../models/items.model.js";

// create a user
export const createUser = async (req, res) =>{
    const user = req.body;

    if(!user.username || !user.email || !user.password){
        return res.status(400).json({success: false, message: "provide all fields"});
    }
    // create the user
    const newUser = new User(user);
    try {
        // save user to db
        await newUser.save();
        res.status(201).json({success: true, data: newUser});
    } catch (error) {
        console.log("Error creating user: ", error.message);
        res.status(500).json({success: false, message: "Server Error"})
    }
};

// get all users
export const getUsers = async (req, res) =>{
    try {
        const users = await User.findById({});
        res.status(200).json({success: true, data: users});
    } catch (error) {
        console.log("Error getting users", error.message);
        res.status(500).json({success: false, message: "Server Error"});
    }
};

// update user
export const updateUser = async (req, res) =>{
    const {id} = req.params;
    const user = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success: false, message: "user id invalid"})
    }
    try {
        const updatedUser = await User.findByIdAndUpdate(id, user, {new: true});
        res.status(200).json({success: true, data: updatedUser});
    } catch (error) {
        console.log("Error updating user", error.message);
        res.status(500).json({success: false, message: "Server Error"});
    }
};

