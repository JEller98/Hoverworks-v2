//the controller seems to be a "front end" for the JS file that interfaces with the DB.
//it grabs the data from the user's request, then passes it along to the DB file.
import db from "./../db/itemsDB.js";

//                                                 get function moved to controller.js

// R

// const getItemByID = async (req, res) => {
//     //junk data check
//     if (isNaN(req.params.id)) {
//         res.status(400).json({
//             message: `Please enter a numeric ID.`
//         }).send();
//     }
//     else {
//         //get the ID out of the request body and send it to the database
//         const id = parseInt(req.params.id);
//         const result = await db.getItemByID(id);

//         //if the provided ID exists in the database, return it.
//         if (result.length !== 0) {
//             const product = result[0];
//             res.status(200).json({
//                 message: `Found item with ID #${id}`,
//                 product
//             }).send();
//         }   
//         else { //id doesn't exist
//             res.status(404).json({
//                 message: `No record found with ID #${id}`
//             }).send();
//         }
//     }
// }

// C/U/D disabled for Hoverworks v2

//this function's almost running off my screen. definitely need to write some utility functions to automate some of the checks
// const addItem = async (req, res) => {
//     //get the properties out of the request body
//     const {prodType, prodPrice, prodName, prodDesc, stock, deckLength, skateSize} = req.body;

//     //checking for NULLs in non-NULLable columns
//     if(!prodType || !prodPrice || !prodName) {
//         res.status(400).json({
//             message: `prodType, prodPrice and prodName cannot be NULL.`
//         });
//         res.send();
//     }
//     else {
//         //ensuring the user enters a number for the price
//         if(isNaN (prodPrice) || isNaN(stock)) {
//             res.status(400).json({
//                 message: `Price and amount in stock must be numeric.`
//             }).send();
//         }
//         else {
//             const result = await db.addItem(prodType, prodPrice, prodName, prodDesc, stock, deckLength, skateSize);

//             //store the returned item and print it out for the user
//             const item = result[0];
    
//             res.status(201).json({
//                 message: `Item saved with ID #${item.prodID}`,
//                 item
//             }).send();
//         }
//     }
// }

// const updateItem = async (req, res) => {
//     //making sure the non-NULLables aren't NULL
//     let id = req.params.id;
//     const {prodType, prodPrice, prodName, prodDesc, stock, deckLength, skateSize} = req.body;

//     if(!id || !prodType || !prodPrice || !prodName) {
//         res.status(400).json({
//             message: `ID, prodType, prodPrice and prodName cannot be NULL.`
//         }).send();
//     }
//     else
//     {
//         //making sure the ID is a number
//         if(isNaN(id) || isNaN(prodPrice)) {
//             res.status(400).json({
//                 message: `ID and prodPrice must be numeric.`
//             }).send();
//         }
//         else { 
//             id = parseInt(id);
//             const result = await db.updateItem(prodType, prodPrice, prodName, prodDesc, stock, deckLength, skateSize, id);

//             //if nothing in the DB matches the id
//             if (result === null) {
//                 res.status(404).json({
//                     message: `No record found with ID #${id}`
//                 }).send();
//             }
//             else {
//                 const item = result[0];
//                 const product = await db.getItemByID(id);
            
//                 res.status(200).json({
//                     message: `Item with ID #${id} has been updated.`,
//                     product
//                 }).send();
//             }
//         }  
//     }
// }

// const deleteItem = async (req, res) => {
//     //could probably make this number-checking its own function... hmm...
//     if(isNaN(req.params.id)) {
//         res.status(400).json({
//             message: `Please enter a numeric ID.`
//         }).send();
//     }
//     else {
//         //get the ID out of the request body
//         const id = parseInt(req.params.id);
//         //I wonder if it's more memory-efficient to read the param twice, or to just store it as a "let" variable?
        
//         const result = await db.deleteItem(id);

//         //if there was a result, let the user know
//         if (result !== null) {
//             res.status(200).json({
//                 message: `Item #${id} has been deleted from the database.`
//             }).send();
//         }
//         else {
//             //the ID wasn't in the database
//             res.status(404).json({
//                 message: `No item was found in the database with ID #${id}`
//             }).send();
//         }
//     }
// }

export {getItems, getItemByID};