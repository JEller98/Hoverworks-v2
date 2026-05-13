import express from "express";
import {getOrders, getOrderByID, addOrder, getRecentPurchases} from "../controllers/controller.js";

const router = express.Router();

//Create, Read, Read (again), Update,  Delete, in that order.

router.post("/", addOrder);

router.get("/recent", getRecentPurchases);

router.get("/", getOrders);

router.get("/:id", getOrderByID);

// commented out for v2
// router.put("/:id", updateOrder);

// router.delete("/:id", deleteOrder);

export default router;