//the controller seems to be a "front end" for the JS file that interfaces with the DB.
//it grabs the data from the user's request, then passes it along to the DB file.
import db from "./../db/itemsDB.js";

const getItems = async (req, res) => {
    const prods = await db.getItems();

    //if no error, get how many items are in the DB
    res.status(200).send({
        message: `Returning ${prods.length} items`,
        prods
    });
}

const getItemByID = async (req, res) => {
    //get the ID out of the request body
    const id = parseInt(req.params.id);
    const result = await db.getItemByID(id);

    //if the provided ID exists in the database, return it.
    if (result.length !== 0) {
        const product = result[0];
        res.status(200).json({
            message: `Found item with ID #${id}`,
            product
        }).send();
    }
    else { //id doesn't exist
        res.status(404).json({
            message: `Record not found with ID #${id}`
        }).send();
    }
}

const addItem = async (req, res) => {
    const {prodType, prodPrice, prodName} = req.body;

    const result = await db.addItem(prodType, prodPrice, prodName);

    //if we don't get any response back from the DB...
    if (result === null) {
        res.status(400).json({
            message: "Something went wrong."
        }).send();
    }
    else {
        //store the returned item and print it out for the user
        const item = result[0];

        res.status(201).json({
            message: `Item saved with ID#${item.prodID}`,
            item
        }).send();
    }
}

const updateItem = async (req, res) => {
    const {itemType, itemPrice, itemName} = req.body;

    const result = await db.updateItem(itemType, itemPrice, itemName);
    
}

const deleteItem = async (req, res) => {
    //get the ID out of the request body
    const id = parseInt(req.params.id);
    const result = await db.deleteItem(id);

    //this one's busted. currently it deletes no matter what, even if there isn't a legit item in the DB.
    //if there was a result, let the user know
    if (result.length !== 0) {
        res.status(200).json({
            message: `Item #${id} has been deleted from the database.`
        }).send();
    }
    else {
        //the ID wasn't in the database
        res.status(404).json({
            message: `No item was found in the database with ID#${id}`
        }).send();
    }
}

export {getItems, getItemByID, addItem, updateItem, deleteItem};