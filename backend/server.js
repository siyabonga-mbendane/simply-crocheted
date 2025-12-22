import express from "express";
import dotenv  from "dotenv";
import path from "path"
import { connectDB } from "./config/db.js";
import itemRoutes from "./routes/items.route.js"
import userRoutes from "./routes/users.route.js"

// to access the .env variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

// middleware: allows us to accept json data for requests
app.use(express.json());

// items routing
app.use("/api/items", itemRoutes);
// users routing
app.use("/api/users", userRoutes);

// to serve our react app on frontend folder
if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "/frontend/dist")));

    app.get("*", (req,res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
    })
}

app.listen(PORT, ()=>{
    connectDB();
    console.log(`Server started at: http://localhost:${PORT}`)
});

