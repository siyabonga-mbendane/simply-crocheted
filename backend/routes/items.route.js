import express from "express";
import { createItem, updateItem, getItems, deleteItems } from "../controllers/items.controller.js";
import { auth, adminAuth } from "../middleware/auth.js";

const router = express.Router();

// get all items from database
router.get("/", getItems);

// only admin
router.post("/", auth, adminAuth, createItem);
router.put("/:id", auth, adminAuth, updateItem);
router.delete("/:id", auth, adminAuth, deleteItems);

export default router;