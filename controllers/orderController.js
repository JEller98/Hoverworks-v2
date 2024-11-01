import db from "./../db/ordersDB.js";

const getOrders = async (req, res) => {
    const ords = await db.getOrders();

    //if no error, get how many orders are in the DB
    res.status(200).send({
        message: `Returning ${ords.length} items`,
        ords
    });
}

const getOrderByID = async (req, res) => {
    //junk data check
    if (isNaN(req.params.id)) {
        res.status(400).json({
            message: `Please enter a numeric ID.`
        }).send();
    }
    else {
        //get the ID, send it to the DB
        const id = parseInt(req.params.id);
        const result = await db.getOrderByID(id);

        //if the provided ID exists in the database, return it.
        if (result.length !== 0) {
            const order = result[0];
            res.status(200).json({
                message: `Found order with ID #${id}`,
                order
            }).send();
        }   
        else { //id doesn't exist
            res.status(404).json({
                message: `No order was found with ID #${id}`
            }).send();
        }
    }
}

const addOrder = async (req, res) => {
    //get the fields out of the body and send them off
    const {orderName, orderSubTotal, orderTax, orderPromo, orderTotal, orderStatus} = req.body;

    //making sure non-NULLables are indeed not NULL
    if (!orderName || !orderSubTotal || !orderTotal || !orderStatus) {
        res.status(400).json({
            message: `Name, Subtotal, Total and Status cannot be NULL.`
        }).send();
    }
    else {
        //ensuring the user enters a number for the price
        if(isNaN (orderSubTotal) || isNaN (orderTotal)) {
            res.status(400).json({
                message: `Subtotal and Total must both be numeric values.`
            }).send();
        }
        else {
            const result = await db.addOrder(orderName, orderSubTotal, orderTax, orderPromo, orderTotal, orderStatus);

            //store the returned item and print it out for the user
            const order = result[0];
    
            res.status(201).json({
                message: `Order has been saved with ID #${order.orderID}`,
                order
            }).send();
        }
    }
}

//feel like there's better options for control flow... having 5 brackets all close at the bottom isn't a good look
const updateOrder = async (req, res) => {
    let id = req.params.id;
    const {orderName, orderSubTotal, orderTax, orderPromo, orderTotal, orderStatus} = req.body;
    
    //check for NULL values
    if(!id || !orderName || !orderSubTotal || !orderTotal || !orderStatus) {
        res.status(400).json({
            message: `ID, Name, Subtotal, Total and Status cannot be NULL.`
        }).send();
    }
    else {
        //making sure the ID is a number
    if(isNaN(req.params.id)) {
        res.status(400).json({
            message: `Please enter a numeric ID.`
        }).send();
    }
    else { 
        //making sure the totals are numbers, too
        if(isNaN (orderSubTotal) || isNaN (orderTotal)) {
            res.status(400).json({
                message: `Subtotal and Total must both be numeric values.`
            }).send();
        }
        else {
            const id = parseInt(req.params.id);
            const result = await db.updateOrder(orderName, orderSubTotal, orderTax, orderPromo, orderTotal, orderStatus, id);

            //if nothing in the DB matches the id
                if (result === null) {
                    res.status(404).json({
                        message: `No order found with ID #${id}`
                    }).send();
                }
                else {
                    const order = await db.getOrderByID(id);
            
                    res.status(200).json({
                        message: `Order with ID #${id} has been updated.`,
                        order
                    }).send();
                }
            }  
        }
    }
}

const deleteOrder = async (req, res) => {
    //could probably make this number-checking its own function... hmm...
    if(isNaN(req.params.id)) {
        res.status(400).json({
            message: `Please enter a numeric ID.`
        }).send();
    }
    else {
        //get the ID out of the request body
        const id = parseInt(req.params.id);
        const result = await db.deleteOrder(id);

        //if there was a result, tell the user
        if (result !== null) {
            res.status(200).json({
                message: `Order #${id} has been deleted from the database.`
            }).send();
        }
        else {
            //the ID wasn't in the database
            res.status(404).json({
                message: `No order was found in the database with ID #${id}`
            }).send();
        }
    }
}

export {getOrders, getOrderByID, addOrder, updateOrder, deleteOrder};