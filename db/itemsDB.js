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
//methods to interact with the DB down here

//functioning as intended
async function getItems() {
    //creating a connection
    const connect = await connectFunc();

    //destructuring, but only grabbing the results; 'properties' is basically useless
    const [results] = await connect.query("SELECT * FROM products");

    //closing connection, then returning the results
    await connect.end();

    return results;
}

//this is working. probably.
async function getItemByID(id) {
    //new connection!
    const connect = await connectFunc();

    //plugging id into the query value
    const [results] = await connect.query("SELECT * FROM products WHERE prodID = ?", [id]);

    //close the connection!
    await connect.end();
    return results;
}

//working, I think?
async function addItem(prodType, prodPrice, prodName, prodDesc, stock, deckLength, skateSize) {

    //connect to the database...
    const connect = await connectFunc();

    const [results] = await connect.query(
        "INSERT INTO products (prodType, prodPrice, prodName, prodDesc, stock, deckLength, skateSize) " +
        "VALUES (?, ?, ?, ?, ?, ?, ?)", [prodType, prodPrice, prodName, prodDesc, stock, deckLength, skateSize]);

        //if no rows are affected, cool, it's a new product!
        if (results.affectedRows === 0) {
            //close the connection
            await connect.end();
            return null;
        }
        else {
            //otherwise, return what's already in there
            const newProduct = await getItemByID(results.insertId);

            //close the connection
            await connect.end();
            return newProduct;
        }
}

async function updateItem (prodType, prodPrice, prodName, prodDesc, stock, deckLength, skateSize, id) {
    //connect again
    const connect = await connectFunc();

    const [results] = await connect.query("UPDATE products " +
        "SET prodType = ?, prodPrice = ?, prodName = ?, prodDesc = ?, stock = ?, deckLength = ?, skateSize = ? WHERE prodID = ?",
        [prodType, prodPrice, prodName, prodDesc, stock, deckLength, skateSize, id]);

    //close the connection
    await connect.end();
    
    //no affected rows means nothing was updated.
    if (results.affectedRows === 0) {
        return null;
    }
    else {
        return results;
    }
}

//working mostly as intended, I think, possibly, maybe.
async function deleteItem(id) {
    //create a connection to the database
    const connect = await connectFunc();

    const [results] = await connect.query("DELETE FROM products WHERE prodID = ?", [id]);
    
    //close the connection, it's not needed any more.
    await connect.end();

    //beginning to think I should be making this affectedRows check into its own function. Maybe in a future iteration...
    if (results.affectedRows === 0) {
        return null;
    }
    else {
        return results;
    }
}
export default {getItems, getItemByID, addItem, updateItem, deleteItem};