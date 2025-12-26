import express from "express";
import dotenv from "dotenv";
import mongoose, { mongo } from "mongoose";
import bookRoute from "./route/book.route.js"
import userRoute from "./route/user.route.js"
import cors from "cors";


 
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 4000;
const URI = process.env.MongoDBURI;   
try{
mongoose.connect(URI);
console.log("Connected to MonogoDB")
} 
catch(error){
console.log("Error",error)
}

// route
app.use('/book',bookRoute);
app.use("/user",userRoute);

app.listen(PORT, () => {
    console.log(`server running on ${PORT}`);
})