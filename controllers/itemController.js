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
    //junk data check
    if (isNaN(req.params.id)) {
        res.status(400).json({
            message: `Please enter a numeric ID.`
        }).send();
    }
    else {
        //get the ID out of the request body and send it to the database
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
                message: `No record found with ID #${id}`
            }).send();
        }
    }
}

const addItem = async (req, res) => {
    //get the non-NULLable fields out of the body and send them off
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
    //making sure the ID is a number
    if(isNaN(req.params.id)) {
        res.status(400).json({
            message: `Please enter a numeric ID.`
        }).send();
    }
    else {
        const {prodType, prodPrice, prodName} = req.body;
        const id = parseInt(req.params.id);
    
        const result = await db.updateItem(prodType, prodPrice, prodName, id);
        if (result === null) {
            res.status(404).json({
                message: `No record found with ID #${id}`
            }).send();
        }
        else {
            const item = result[0];
            const product = await db.getItemByID(id);
    
            res.status(200).json({
                message: `Item with ID #${id} has been updated.`,
                product
            }).send();
        }
    }
}

const deleteItem = async (req, res) => {
    //could probably make this number-checking its own function... hmm...
    if(isNaN(req.params.id)) {
        res.status(400).json({
            message: `Please enter a numeric ID.`
        }).send();
    }
    else {
        //get the ID out of the request body
        const id = parseInt(req.params.id);
        const result = await db.deleteItem(id);

        //if there was a result, let the user know
        if (result !== null) {
            res.status(200).json({
                message: `Item #${id} has been deleted from the database.`
            }).send();
        }
        else {
            //the ID wasn't in the database
            res.status(404).json({
                message: `No item was found in the database with ID #${id}`
            }).send();
        }
    }
}

export {getItems, getItemByID, addItem, updateItem, deleteItem};