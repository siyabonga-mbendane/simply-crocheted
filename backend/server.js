import express from "express";
import dotenv  from "dotenv";
import { connectDB } from "./config/db.js";
import Item from "./models/items.model.js";
import mongoose from "mongoose";

// to access the .env variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
// middleware: allows us to accept json data for requests
app.use(express.json());

// get all items from database
app.get("/api/items", async (req, res) =>{
    try {
        const items = await Item.find({});
        res.status(200).json({success: true, data: items});
    } catch (error) {
        console.log("Error in fetching products: ", error.message);
        res.status(500).json({success: false, message: "Server Error"});
    }
})

// create an item
app.post("/api/items", async (req, res) =>{
    // data from the user request
    const item = req.body;
    if(!item.name || !item.price || !item.image){
        // bad request
        return res.status(400).json({success: false, message:"provide all fields!"});
    }

    // create the new item
    const newItem = new Item(item)

    try {
        // save to database
        await newItem.save();
        res.status(201).json({success: true, data: newItem}); // status: something created
    } catch (error) {
        console.error("Error creating item: ", error.message);
        return res.status(500).json({success: false, message:"Server Error"}); // status: internal server error
    }

});

// update an item
app.put("/api/items/:id", async (req, res) =>{
    const {id} = req.params;
    const item = req.body;

    // invalid id
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success: false, message: "invalid item id"})
    }

    try {
        // find item by id and pass update information
        const updatedItem = await Item.findByIdAndUpdate(id, item, {new: true});
        res.status(200).json({success: true, data: updatedItem});
    } catch (error) {
        res.status(500).json({success: false, message: "Server Error"})
        console.log("Error updating Item: ", error.message);
    }
})

// delete an item
app.delete("/api/items/:id", async (req, res) =>{
    // grab the id from the request
    const {id} = req.params;

    try {
        await Item.findByIdAndDelete(id);
        res.status(200).json({success: true, message: "item deleted."})
    } catch (error) {
        console.log("Error in deleting item: ", error.message);
        res.status(404).json({success: false, message: "item not found"})
    }
})

app.listen(PORT, ()=>{
    connectDB();
    console.log(`Server started at: http://localhost:${PORT}`)
});

