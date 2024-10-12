import express from "express";
import http from "http";
import fs from "fs";

//i hope i'm doing this right...
const app = express();

//static webpage
app.use(express.static("./public"));

//routing
app.get("/home", (req, res) => {
    fs.readFile("./public/home.html", (err, page) => {
        if (err) {
            console.log("An error occurred.");
        }
        
        res.status(200).send("Hello world!");
        res.end();
    });
});