import express from "express";
import http from "http";
import fs from "fs";

//i hope i'm doing this right...
fs.readFile("./public/home.html", (err, page) => {
    if (err) {
        console.log("An error occurred.");
    }
    else {
        const server = http.createServer((req, res) => {
            res.writeHeader(200, {"Content-Type": "text/html"});
            res.write(page);
            response.end();
        }).listen(3030);
    }
});