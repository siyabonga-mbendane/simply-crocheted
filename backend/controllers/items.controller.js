import mongoose from "mongoose";
import Item from "../models/items.model.js";


// create an item
export const createItem = async (req, res) =>{
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

};

// update an item
export const updateItem = async (req, res) =>{
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
};

//  get all items
export const getItems =  async (req, res) =>{
    try {
        const items = await Item.find({});
        res.status(200).json({success: true, data: items});
    } catch (error) {
        console.log("Error in fetching products: ", error.message);
        res.status(500).json({success: false, message: "Server Error"});
    }
};

// delete an item
export const deleteItems = async (req, res) =>{
    // grab the id from the request
    const {id} = req.params;

    try {
        await Item.findByIdAndDelete(id);
        res.status(200).json({success: true, message: "item deleted."})
    } catch (error) {
        console.log("Error in deleting item: ", error.message);
        res.status(404).json({success: false, message: "item not found"})
    }
};
