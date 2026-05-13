// new file to consolidate controller functions that are used for Hoverworks 2.0
// all removed functions (read by ID, create, update, delete...) can be found in their respective file
// under the archive directory
// May 6, 2026

import PG from "pg";
import dotenv from "dotenv";
import {getItems as getItemsDB, 
    getOrders as getOrdersDB, getOrderByID as getOrderByIDDB, addOrder as addOrderDB,
    getOrderItems as getOrderItemsDB, addOrderItem as addOrderItemDB,
    getRecentPurchases as getRecentPurchasesDB} from "../db/db.js";

export const getItems = async (req, res) => {
    const prods = await getItemsDB();

    //if no error, get how many items are in the DB
    res.status(200).json({
        message: `Returning ${prods.length} items`,
        prods
    });
}

export const getOrders = async (req, res) => {
    const ords = await getOrdersDB();

    //if no error, get how many orders are in the DB
    res.status(200).json({
        message: `Returning ${ords.length} items`,
        ords
    });
}

export const getOrderByID = async (req, res) => {
    //junk data check
    if (isNaN(req.params.id)) {
        res.status(400).json({
            message: `Please enter a numeric ID.`
        });
    }
    else {
        //get the ID, send it to the DB
        const id = parseInt(req.params.id);
        const result = await getOrderByIDDB(id);

        //if the provided ID exists in the database, return it.
        if (result.length !== 0) {
            const order = result[0];
            res.status(200).json({
                message: `Found order with ID #${id}`,
                order
            });
        }   
        else { //id doesn't exist
            res.status(404).json({
                message: `No order was found with ID #${id}`
            });
        }
    }
}

export const addOrder = async (req, res) => {
    //get the fields out of the body and send them off
    const {orderName, orderTotal, orderStatus} = req.body;

    //making sure non-NULLables are indeed not NULL
    if (!orderName || !orderTotal || !orderStatus) {
        res.status(400).json({
            message: `Name, Total and Status cannot be NULL.`
        });
    }
    else {
        //ensuring the user enters a number for the price
        if(isNaN (orderTotal)) {
            res.status(400).json({
                message: `Total must be a numeric value.`
            });
        }
        else {
            const result = await addOrderDB(orderName, orderTotal, orderStatus);

            if (!result) {
                res.status(500).json({
                    messgage: `Failed to save order.`
                });
            }
            else {
                res.status(201).json({
                    message: `Order has been saved with ID #${result.orderID}`,
                    order: result
                });
            }
        }
    }
}

export const getOrderItems = async (req, res) => {
    //again, junk data check
    if (isNaN(req.params.id)) {
        res.status(400).json({
            message: `Please enter a numeric ID.`
        });
    }
    else {
        const id = parseInt(req.params.id);
        const result = await getOrderItemsDB(id);
    
        res.status(200).json({
            message: `Returning items for order ${id}`,
            items: result
        });
    }
}

export const addOrderItem = async (req, res) => {
    const {orderID, prodID, quantity, priceAtPurchase} = req.body;

    if (!orderID || !prodID || !quantity || !priceAtPurchase) {
        res.status(400).json({
            message: `orderID, prodID, quantity and priceAtPurchase cannot be NULL.`
        });
    }
    else {
        const result = await addOrderItemDB(orderID, prodID, quantity, priceAtPurchase);

        if (!result) {
            res.status(500).json({
                message: `Failed to save order item.`
            });
        }
        else {
            res.status(201).json({
                message: `Order item saved.`,
                item: result
            });
        }
    }
}

export const getRecentPurchases = async (req, res) => {
    const items = await getRecentPurchasesDB();

    res.status(200).json({
        message: `Retrieving recent purchases.`,
        purchases: items
    });
}