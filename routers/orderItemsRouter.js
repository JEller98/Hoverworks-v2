import express from "express";
import {getOrderItems, addOrderItem} from "../controllers/controller.js";

const router = express.Router();

router.get("/:id", getOrderItems);
router.post("/", addOrderItem);

export default router;