import express, { Router } from "express";
import { createUser, getUsers, updateUser} from "../controllers/users.controller.js";

const router = express.Router();
// create a user
router.post("/", createUser);
// get all users
router.get("/", getUsers);
// update a user
router.put("/:id", updateUser);

export default router;