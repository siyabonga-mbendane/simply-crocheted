import express from "express";
import { createItem, updateItem, getItems, deleteItems } from "../controllers/items.controller.js";

const router = express.Router();

// get all items from database
router.get("/", getItems);

// create an item
router.post("/", createItem);

// update an item
router.put("/:id", updateItem);

// delete an item
router.delete("/:id", deleteItems);

export default router;