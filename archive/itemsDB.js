import PG from "pg";
import dotenv from "dotenv";

//import the config
dotenv.config({
    path: "./config.env"
});

const {DB_HOST, DB_DATABASE, DB_PORT, DB_USER, DB_PASSWORD} = process.env;

//establishing db connection; it's now postgres, not mysql
const pool = new PG.Pool({
    host: DB_HOST || "localhost",
    port: DB_PORT,
    database: DB_DATABASE,
    user: DB_USER,
    password: DB_PASSWORD
});

//                                                 get function moved to db.js


//unsure if this works currently
// async function getItemByID(id) {
//     //plugging id into the query value
//     const results = await pool.query("SELECT * FROM products WHERE prodID = $1", [id]);

//     return results.rows;
// }

// C/U/D disabled for v2

//working, I think?
// async function addItem(prodType, prodPrice, prodName, prodDesc, stock, deckLength, skateSize) {

//     //connect to the database...
//     const connect = await connectFunc();

//     const [results] = await connect.query(
//         "INSERT INTO products (prodType, prodPrice, prodName, prodDesc, stock, deckLength, skateSize) " +
//         "VALUES (?, ?, ?, ?, ?, ?, ?)", [prodType, prodPrice, prodName, prodDesc, stock, deckLength, skateSize]);

//         //if no rows are affected, cool, it's a new product!
//         if (results.affectedRows === 0) {
//             //close the connection
//             await connect.end();
//             return null;
//         }
//         else {
//             //otherwise, return what's already in there
//             const newProduct = await getItemByID(results.insertId);

//             //close the connection
//             await connect.end();
//             return newProduct;
//         }
// }

// async function updateItem (prodType, prodPrice, prodName, prodDesc, stock, deckLength, skateSize, id) {
//     //connect again
//     const connect = await connectFunc();

//     const [results] = await connect.query("UPDATE products " +
//         "SET prodType = ?, prodPrice = ?, prodName = ?, prodDesc = ?, stock = ?, deckLength = ?, skateSize = ? WHERE prodID = ?",
//         [prodType, prodPrice, prodName, prodDesc, stock, deckLength, skateSize, id]);

//     //close the connection
//     await connect.end();
    
//     //no affected rows means nothing was updated.
//     if (results.affectedRows === 0) {
//         return null;
//     }
//     else {
//         return results;
//     }
// }

// //working mostly as intended, I think, possibly, maybe.
// async function deleteItem(id) {
//     //create a connection to the database
//     const connect = await connectFunc();

//     const [results] = await connect.query("DELETE FROM products WHERE prodID = ?", [id]);
    
//     //close the connection, it's not needed any more.
//     await connect.end();

//     //beginning to think I should be making this affectedRows check into its own function. Maybe in a future iteration...
//     if (results.affectedRows === 0) {
//         return null;
//     }
//     else {
//         return results;
//     }
// }
export default {getItems, getItemByID};