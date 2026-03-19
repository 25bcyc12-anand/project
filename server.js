const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();   // CREATE APP FIRST

app.use(cors());
app.use(express.json());

/* Serve frontend files */

app.use(express.static(path.join(__dirname,"public")));

app.get("/", (req,res)=>{
res.sendFile(path.join(__dirname,"public","index.html"));
});

/* MongoDB connection */

mongoose.connect("mongodb+srv://portfoliouser:dhurandhartherevenge194@portfolio.zhqkl0z.mongodb.net/?appName=portfolio")
.then(()=>console.log("MongoDB Connected"))
.catch(err=>console.log(err));

/* Schema */

const Contact = mongoose.model("Contact",{
name:String,
email:String,
message:String
});

/* Contact API */

app.post("/contact", async (req,res)=>{

const {name,email,message} = req.body;

const newMessage = new Contact({
name,
email,
message
});

await newMessage.save();

res.send("Message stored in database");

});

/* Server */

const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>{
console.log("Server running");
});