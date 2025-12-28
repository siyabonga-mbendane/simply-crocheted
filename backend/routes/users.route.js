import express, { Router } from "express";
import { createUser, getUsers, updateUser, deleteUser, loginUser, getProfile} from "../controllers/users.controller.js";
import { auth, adminAuth } from "../middleware/auth.js";

const router = express.Router();

// public 
router.post("/signup", createUser);
router.post("/login", loginUser);

// private
router.get("/",auth, adminAuth, getUsers);
router.put("/:id",auth, adminAuth, updateUser);
router.delete("/:id",auth, adminAuth, deleteUser);
router.get("/profile", auth, adminAuth, getProfile);

export default router;