import express from "express";


import {getItems, getItemByID, addItem, updateItem, deleteItem} from "../controllers/itemController.js";

const router = express.Router();

//products routes
router.post("/", addItem); //C

router.get("/", getItems); //R

router.get("/:id", getItemByID); //also R

router.put("/:id", updateItem); //U

router.delete("/:id", deleteItem); //D

export default router;