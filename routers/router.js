import express from "express";
import fs from "fs";

const router = express.Router();

//default route
router.get("/", (req, res) => {
    //return something with the response, or else it'll freeze
    res.status(200).send("Hello, world!");
});

export default router;