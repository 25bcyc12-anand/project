const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();   // create app

app.use(cors());
app.use(express.json());

/* frontend ka file*/

app.use(express.static(path.join(__dirname,"public")));

app.get("/", (req,res)=>{
res.sendFile(path.join(__dirname,"public","index.html"));
});

/* mongodb connect */

mongoose.connect("mongodb+srv://portfoliouser:dhurandhartherevenge194@portfolio.zhqkl0z.mongodb.net/?appName=portfolio")
.then(()=>console.log("MongoDB Connected"))
.catch(err=>console.log(err));

/* Structure*/

const Contact = mongoose.model("Contact",{
name:String,
email:String,
message:String
});

/* contact api */

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

/* server check connection */

const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>{
console.log("Server running");
});
