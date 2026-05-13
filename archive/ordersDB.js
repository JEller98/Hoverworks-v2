import PG from "pg";
import dotenv from "dotenv";

//import the config
dotenv.config({
    path: "./config.env"
});

const {DB_HOST, DB_PORT, DB_DATABASE, DB_USER, DB_PASSWORD} = process.env;

//establish connection via environment variables
const pool = new PG.Pool({
    host: DB_HOST || "localhost",
    port: DB_PORT,
    database: DB_DATABASE,
    user: DB_USER,
    password: DB_PASSWORD
});

//                                                 get/add functions moved to db.js


// update/delete functionality disabled for Hoverworks v2

// async function updateOrder (orderName, orderSubTotal, orderTax, orderPromo, orderTotal, orderStatus, orderID) {
//     const connect = await connectFunc();
//     const [results] = await connect.query("UPDATE orders " +
//         "SET orderName = ?, orderSubTotal = ?, orderTax = ?, orderPromo = ?, orderTotal = ?, orderStatus = ? WHERE orderID = ?", 
//         [orderName, orderSubTotal, orderTax, orderPromo, orderTotal, orderStatus, orderID]);

//     await connect.end();

//     //no affected rows? no updates
//     if (results.affectedRows === 0) {
//         return null;
//     }
//     else {
//         return results;
//     }
// }


// async function deleteOrder(id) {
//     const connect = await connectFunc();
//     const [results] = await connect.query("DELETE FROM orders WHERE orderID = ?", [id]);
    

//     await connect.end();
//     //beginning to think I should be making this affectedRows check into its own function. Maybe in a future iteration...
//     if (results.affectedRows === 0) {
//         return null;
//     }
//     else {
//         return results;
//     }
// }
export default {getOrders, getOrderByID, addOrder};