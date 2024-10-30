import express from "express";
// import {getItems, getItemByID, addItem, updateItem, deleteItem} from "../controllers/orderController.js";

const router = express.Router();

//orders routes
router.post("/", (req, res) => {
    res.status(200).send("POST orders");
});

router.get("/", (req, res) => {
    res.status(200).send("GET orders");
});

router.get("/:id", (req, res) => {
    res.status(200).send("GET orders by ID");
})

router.put("/:id", (req, res) => {
    res.status(200).send("PUT orders");
});

router.delete("/:id", (req, res) => {
    res.status(200).send("DELETE orders");
});

export default router;