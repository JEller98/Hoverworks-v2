import express from "express";
import {getOrders, getOrderByID, addOrder, updateOrder, deleteOrder} from "../controllers/orderController.js";

const router = express.Router();

//Create, Read, Read (again), Update,  Delete, in that order.
router.post("/", addOrder);

router.get("/", getOrders);

router.get("/:id", getOrderByID)

router.put("/:id", updateOrder);

router.delete("/:id", deleteOrder);

export default router;