// new file to consolidate DB functions that are used for Hoverworks 2.0
// all removed functions (read by ID, create, update, delete...) can be found in their respective file
// under the archive directory
// May 6, 2026

import PG from "pg";
import dotenv from "dotenv";

dotenv.config({
    path: "./config.env"
});

//postgres uses connection pools
const {DB_HOST, DB_DATABASE, DB_PORT, DB_USER, DB_PASSWORD} = process.env;

const pool = new PG.Pool({
    host: DB_HOST || "localhost",
    port: DB_PORT,
    database: DB_DATABASE,
    user: DB_USER,
    password: DB_PASSWORD
});

//rewritten for postgres
export async function getItems() {
    //have to alias all the columns because postgres defaults to lowercase
    const results = await pool.query
    (`SELECT prodid AS "prodID", prodtype AS "prodType", prodprice AS "prodPrice", prodname AS "prodName",
        proddesc AS "prodDesc", prodimg AS "prodImg", stock, decklength AS "deckLength", skatesize AS "skateSize" FROM products`);
    return results.rows;
}

export async function getOrders() {
    //grab everything
    const results = await pool.query(`SELECT orderid AS "orderID", ordername AS "orderName", ordertotal AS "orderTotal",
        orderdate AS "orderDate", orderstatus AS "orderStatus" FROM orders`);
    return results.rows;
}

export async function getOrderByID(id) {
    //plug in the ID
    const results = await pool.query(`SELECT orderid AS "orderID", ordername AS "orderName", ordertotal AS "orderTotal",
        orderdate AS "orderDate", orderstatus AS "orderStatus" FROM orders WHERE orderid = $1`, [id]);
    return results.rows;
}

export async function addOrder(orderName, orderTotal, orderStatus) {
    const results = await pool.query(
        `INSERT INTO orders (ordername, ordertotal, orderdate, orderstatus) VALUES ($1, $2, CURRENT_DATE, $3) 
        RETURNING orderid AS "orderID", ordername AS "orderName", ordertotal AS "orderTotal", orderdate AS "orderDate", 
        orderstatus AS "orderStatus"`, [orderName, orderTotal, orderStatus]); //RETURNING * ensures we get the row back

        //no rows affected
        if (!results.rows[0]) {
            return null;
        }
        
        return results.rows[0];
}

export async function getOrderItems(orderID) {
    //bit of a doozy of a query for my junior brain.
    //grab all the rows from order_items table (besides itemID),
    //define aliases for both order_items and products tables to shorten the query
    //then for each row in order_items find the matching product in the products table and return the rows
    const results = await pool.query(
        `SELECT oi.orderid AS "orderID", oi.prodid as "prodID",
        p.prodname AS "prodName", oi.quantity, oi.priceatpurchase AS "priceAtPurchase"
        FROM order_items oi JOIN products p ON oi.prodid = p.prodid WHERE oi.orderid = $1`, [orderID]);
    return results.rows;
}

export async function addOrderItem(orderID, prodID, quantity, priceAtPurchase) {
    const results = await pool.query(
        `INSERT INTO order_items (orderid, prodid, quantity, priceatpurchase) VALUES ($1, $2, $3, $4)
        RETURNING orderid AS "orderID", prodid AS "prodID", quantity, priceatpurchase AS "priceAtPurchase"`,
        [orderID, prodID, quantity, priceAtPurchase]);
        return results.rows[0];
}

export async function getRecentPurchases() {
    const results = await pool.query(
        //grab the first item from the last 10 orders placed for the carousel
        //DISTINCT ON returns only the first unique row per orderID- it'll only return the first item in a given order
        
        //DISTINCT ON forces orderid first, but we want to order by date... subquery time.
        `SELECT * FROM (
            SELECT DISTINCT ON (o.orderid)
            o.orderid AS "orderID", o.orderdate AS "orderDate", oi.prodid AS "prodID", p.prodname AS "prodName", p.prodtype AS "prodType"
            FROM orders o
            JOIN order_items oi ON o.orderid = oi.orderid
            JOIN products p ON oi.prodid = p.prodid
            ORDER BY o.orderid
        )
        subquery
            ORDER BY "orderDate" DESC
            LIMIT 10`
        //first query grabs the items, subquery orders them by recency
    );
    return results.rows;
}