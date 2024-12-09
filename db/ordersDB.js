import mysql from "mysql2/promise";
import dotenv from "dotenv";

//import the config
dotenv.config({
    path: "./config.env"
});

const {DB_DATABASE, DB_PORT, DB_USER, DB_PASSWORD} = process.env;

let host;
if (process.env.DB_HOST) { //if there's an environment variable provided for the host
    host = process.env.DB_HOST; //assign it
}
else {
    host = "localhost"; //if there isn't an environment variable provided for the host, then set it to localhost.
}

//creating connections only when necessary to avoid timeouts and crashes
async function connectFunc() {
    return await mysql.createConnection({
        host: host,
        port: DB_PORT,
        database: DB_DATABASE,
        user: DB_USER,
        password: DB_PASSWORD
    });
}

//repurposed methods from itemsDB
async function getOrders() {
    const connect = await connectFunc();

    //grab everything
    const [results] = await connect.query("SELECT * FROM orders");
    
    await connect.end();
    return results;
}

async function getOrderByID(id) {
    const connect = await connectFunc();

    //plug in the ID
    const [results] = await connect.query("SELECT * FROM orders WHERE orderID = ?", [id]);

    await connect.end();
    return results;
}

async function addOrder(orderName, orderSubTotal, orderTax, orderPromo, orderTotal, orderStatus) {
    const connect = await connectFunc();

    const [results] = await connect.query(
        "INSERT INTO orders (orderName, orderSubTotal, orderTax, orderPromo, orderTotal, orderDate, orderStatus) " +
        "VALUES (?, ?, ?, ?, ?, NOW(), ?)", [orderName, orderSubTotal, orderTax, orderPromo, orderTotal, orderStatus]);

        //no rows affected
        if (results.affectedRows === 0) {
            await connect.end();
            return null;
        }
        else {
            //return what already exists instead
            const newOrder = await getOrderByID(results.insertId);

            await connect.end();
            return newOrder;
        }
}

async function updateOrder (orderName, orderSubTotal, orderTax, orderPromo, orderTotal, orderStatus, orderID) {
    const connect = await connectFunc();
    const [results] = await connect.query("UPDATE orders " +
        "SET orderName = ?, orderSubTotal = ?, orderTax = ?, orderPromo = ?, orderTotal = ?, orderStatus = ? WHERE orderID = ?", 
        [orderName, orderSubTotal, orderTax, orderPromo, orderTotal, orderStatus, orderID]);

    await connect.end();

    //no affected rows? no updates
    if (results.affectedRows === 0) {
        return null;
    }
    else {
        return results;
    }
}


async function deleteOrder(id) {
    const connect = await connectFunc();
    const [results] = await connect.query("DELETE FROM orders WHERE orderID = ?", [id]);
    

    await connect.end();
    //beginning to think I should be making this affectedRows check into its own function. Maybe in a future iteration...
    if (results.affectedRows === 0) {
        return null;
    }
    else {
        return results;
    }
}
export default {getOrders, getOrderByID, addOrder, updateOrder, deleteOrder};