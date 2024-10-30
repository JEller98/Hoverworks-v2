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
console.log(`Connected to MySQL on port ${chalk.blue(DB_PORT)}`);

//methods to interact with the DB down here
async function getItems() {
    //destructuring, but only grabbing the results; 'properties' is basically useless
    const [results] = await connect.query("SELECT * FROM products");
    return results;
}

async function getItemByID(id) {
    //plugging id into the query value
    const [results] = await connect.query("SELECT * FROM products WHERE prodID = ?", [id]);
    return results;
}

async function addItem(prodType, prodPrice, prodName) {
    const [results] = await connect.query("INSERT INTO products " + 
        "(prodType, prodPrice, prodName) VALUES " +
        "(?, ?, ?)", [prodType, prodPrice, prodName]);
        //only including the NOT NULL columns in this; may play around with "..." later for a more robust option

        //if no rows are affected, cool, it's a new product!
        if (results.affectedRows === 0) {
            return null;
        }
        else {
            //otherwise, return what's already in there, I think?
            const newProduct = await getProdByID(results.insertId);
            return newProduct;
        }
}

async function updateItem (id) {
    //we have not been taught how to update yet; I'd assume we use a placeholder for the parameter
    //that represents the column to update + the info to update it with.
}

async function deleteItem(id) {
    //first time writing the delete function, hope this doesn't break anything...
    const [results] = await connect.query("DELETE * FROM products WHERE prodID = ?", [id]);
    return results;
}
export default {getItems, getItemByID, addItem, updateItem, deleteItem};