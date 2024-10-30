import express from "express";

//if destructuring functions imported from a file, don't use "export default" in that file; just "export".
import {getItems, getItemByID, addItem, updateItem, deleteItem} from "../controllers/itemController.js";

const router = express.Router();

//products routes
router.post("/", addItem); //C

router.get("/", getItems); //R

router.get("/:id", getItemByID); //also R

router.put("/:id", updateItem); //U

router.delete("/:id", deleteItem); //D

export default router;