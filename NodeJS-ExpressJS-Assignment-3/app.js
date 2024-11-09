// app.js
const express=require("express");
const path=require("path");
const dotenv=require("dotenv");


const urlRouter=require("./routes/urlRoutes");
const app=express();
dotenv.config({path:"./config.env" });


app.use(express.json());


app.use("/api/v1/urls", urlRouter);
module.exports=app;
