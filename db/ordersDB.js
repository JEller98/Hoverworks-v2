import mysql from "mysql2/promise";
import dotenv from "dotenv";
import chalk from "chalk";

//import the config
dotenv.config({
    path: "./config.env"
});

const {DB_DATABASE, DB_HOST, DB_PORT, DB_USER, DB_PASSWORD} = process.env;

//connect to the database
const connect = await mysql.createConnection({
    host: DB_HOST,
    port: DB_PORT,
    database: DB_DATABASE,
    user: DB_USER,
    password: DB_PASSWORD
});
//fill in the port here
console.log(`Connected to MySQL on ${chalk.magenta("Port", DB_PORT)}`);

//repurposed methods from itemsDB
async function getOrders() {
    //grab everything
    const [results] = await connect.query("SELECT * FROM orders");
    return results;
}

async function getOrderByID(id) {
    //plug in the ID
    const [results] = await connect.query("SELECT * FROM orders WHERE orderID = ?", [id]);
    return results;
}

async function addOrder(orderName, orderSubTotal, orderTax, orderPromo, orderTotal, orderStatus) {
    const [results] = await connect.query(
        "INSERT INTO orders (orderName, orderSubTotal, orderTax, orderPromo, orderTotal, orderDate, orderStatus) " +
        "VALUES (?, ?, ?, ?, ?, NOW(), ?)", [orderName, orderSubTotal, orderTax, orderPromo, orderTotal, orderStatus]);

        //no rows affected
        if (results.affectedRows === 0) {
            return null;
        }
        else {
            //return what already exists instead
            const newOrder = await getOrderByID(results.insertId);
            return newOrder;
        }
}

async function updateOrder (orderName, orderSubTotal, orderTax, orderPromo, orderTotal, orderStatus, orderID) {
    const [results] = await connect.query("UPDATE orders " +
        "SET orderName = ?, orderSubTotal = ?, orderTax = ?, orderPromo = ?, orderTotal = ?, orderStatus = ? WHERE orderID = ?", 
        [orderName, orderSubTotal, orderTax, orderPromo, orderTotal, orderStatus, orderID]);

    //no affected rows? no updates
    if (results.affectedRows === 0) {
        return null;
    }
    else {
        return results;
    }
}


async function deleteOrder(id) {
    const [results] = await connect.query("DELETE FROM orders WHERE orderID = ?", [id]);
    
    //beginning to think I should be making this affectedRows check into its own function. Maybe in a future iteration...
    if (results.affectedRows === 0) {
        return null;
    }
    else {
        return results;
    }
}
export default {getOrders, getOrderByID, addOrder, updateOrder, deleteOrder};