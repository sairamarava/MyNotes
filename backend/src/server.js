//immport express
import express from "express";
import cors from "cors"; // Import CORS middlewar
import dotenv from "dotenv"; 
import path from "path"; // Import path module 

import {connectDB} from "./config/db.js";
import router from "./routes/notesRoutes.js";
import rateLimiter from "./middleware/rateLimiter.js";

dotenv.config(); // Load environment variables from .env file
const PORT=process.env.PORT || 50001; // Set the port to 50001 or the value from .env
//create an express app and listen on any port

const __dirname = path.resolve();
const app = express();

///middleware
if(process.env.NODE_ENV!=='production'){
  app.use(cors({
    origin: "http://localhost:5173",
  }))
}
app.use(express.json()); // Parse JSON request bodies
// // simple custom middleware 
// app.use((req,res,next)=>{
//   console.log("we got a new req");
//   next();
// })
app.use(rateLimiter)
app.use("/api/notes", router);

if(process.env.NODE_ENV==="production"){
  app.use(express.static(path.join(__dirname,"../frontend/dist")))

  app.get("*",(req,res)=>{
  res.sendFile(path.join(__dirname,"../frontend","dist","index.html"));
})
}

connectDB().then(()=>{
app.listen(PORT, () => {
  console.log("Server started as port",PORT);
});
});
