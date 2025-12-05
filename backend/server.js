import express from "express";
import dotenv  from "dotenv";
import { connectDB } from "./config/db.js";
import itemRoutes from "./routes/items.route.js"

// to access the .env variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
// middleware: allows us to accept json data for requests
app.use(express.json());

// items routing
app.use("/api/items", itemRoutes);

app.listen(PORT, ()=>{
    connectDB();
    console.log(`Server started at: http://localhost:${PORT}`)
});

