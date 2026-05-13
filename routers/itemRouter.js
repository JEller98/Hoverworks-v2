import express from "express";

//if destructuring functions imported from a file, don't use "export default" in that file; just "export".
import {getItems} from "../controllers/controller.js";

const router = express.Router();

//products routes

// disabled for v2
// router.post("/", addItem); //C

router.get("/", getItems); //R

// router.get("/:id", getItemByID);

//update/delete disabled for Hoverworks v2

// router.put("/:id", updateItem); //U

// router.delete("/:id", deleteItem); //D

export default router;