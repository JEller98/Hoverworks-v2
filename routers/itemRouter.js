import express from "express";

//{getItems, getItemByID, addItem, updateItem, deleteItem}
import controller from "../controllers/itemController.js";

const router = express.Router();

//products routes
router.post("/", controller.addItem); //C

router.get("/", controller.getItems); //R

router.get("/:id", controller.getItemByID); //also R

router.put("/:id", controller.updateItem); //U

router.delete("/:id",controller. deleteItem); //D

export default router;