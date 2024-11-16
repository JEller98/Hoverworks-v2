//should I declare some global variables up here? And some listeners that exist outside of functions?

//keep the forms in a variable for later
const itemForm = document.querySelector("#new-item");
const orderForm = document.querySelector("#new-order");

//these listens for someone to hit the submit button, then overrides the "default submission"
//behavior and instead calls newItem() down below
itemForm.addEventListener("submit", event => {
    event.preventDefault();

    if (event.target.id === "new-item") {
        newItem();
    }
});

orderForm.addEventListener("submit", event => {
    event.preventDefault();

    if (event.target.id === "new-order") {
        newOrder();
    }
})

window.onload = () => {
    getData("items");
    getData("orders");
};

//utility function
const getData = async path => {
    //i hope this doesn't get messy...
    const uri = `http://localhost:3030/${path}`;
    const config = {
        method: "get",
        mode: "cors",
        headers: {
            "Content-Type": "application/json"
        }
    };

    //GET response status code: 200 (OK); no other codes are programmed for GET
    //may need to account for server errors or something though...
    const response = await fetch(uri, config);
    const results = await response.json();
    
    //the ever-elusive switch statement, here for control flow purposes!
    switch (path) {
        //if the path is "items", build rows for the items table.
        case "items":
            //maybe see about adding a "clear table" function?
            buildItems(results.prods);
            break;
        //if the path is "orders", build rows for the orders table.    
        case "orders":
            buildOrders(results.ords);
            break;    
    }
}

//utility function
const handleClicks = event => {
    //let's start by grabbing the ID of the product and the table itself
    const row = event.target.closest("tr");

    const id = row.children[0].innerHTML;
    
    //check the class of the button that was clicked
    //This is more switch statements than I've written in the past 2 years!
    switch (event.target.className) {
        case "editItem" : 
            editItem(id);
            break;
        case "saveItem" :
            saveItem(row);
            break;
        case "delItem" :
            deleteItem(id);
            break;
        case "editOrder" :
            editOrder(id);
            break;
        case "saveOrder" :
            saveOrder(row);
            break;
        case "delOrder" : 
            deleteOrder(id);
            break;    
    }
}

//utility function
const wipeTable = async path => {
    //should probably make table a constant at this point...
    const table = document.querySelector(`#${path}-table`);

    //selecting every row that isn't the header
    const rows = table.querySelectorAll("tr:not(:first-child)");
    
    //for each row in the collection, remove it by passing it to an arrow function.
    rows.forEach(row => row.remove());
    
    //getting the table to NOT remove the header row was a headache... I need some coffee after this.
}

//I wonder if I could make this generic and accept either prods OR ords...
const buildItems = prods => {
    //select the table itself first
    const table = document.querySelector("#products-table");

    //for each product in the list of products, populate a new element with its info and append to the table
    for (const thing of prods) {
        //make a new row
        const row = document.createElement("tr");
        row.className = "itemRow";

        //ID, Name, Category, Price, Quantity in stock, plus 2 buttons... this is gonna be a bit ugly.
        const id = document.createElement("td");
        const name = document.createElement("td");
        const cat = document.createElement("td");
        const pr = document.createElement("td");
        const quan = document.createElement("td");
        const edit = document.createElement("button");
        const del = document.createElement("button");

        //put the cells in the row
        row.append(id, name, cat, pr, quan, edit, del);

        id.textContent = thing.prodID;
        id.className = "prodID";
        name.textContent = thing.prodName;
        name.className = "prodName";
        cat.textContent = thing.prodType;
        cat.className = "prodType";
        pr.textContent = thing.prodPrice;
        pr.className = "prodPrice";

        //stock can be NULL, so check for it.
        if(thing.stock === null) {
            //Note: I wouldn't normally check for NULL like this, but isNaN didn't detect NULL values.
            //Whatever magic makes this work, right?
            quan.textContent = "Out of stock";
        }
        else {
            quan.textContent = thing.stock;
        }

        quan.className = "stock";

        edit.innerHTML = "Edit";
        edit.className = "editItem";
        del.innerHTML = "Delete";
        del.className = "delItem";
   
        table.append(row);
    }
    //adding a generic click listener for the table
    table.addEventListener("click", handleClicks);
}

//working
const buildOrders = ords => {
    //select the table
    const table = document.querySelector("#orders-table");

    //for each product in the list of products, populate a new element with its info and append to the table
    for (const thing of ords) {
        const row = document.createElement("tr");
        row.className = "orderRow";

        //ID, CustomerName, Date Placed, Order Subtotal, Order Total, Status, Edit Button, Delete Button...
        const id = document.createElement("td");
        const name = document.createElement("td");
        const date = document.createElement("td");
        const subtotal = document.createElement("td");
        const total = document.createElement("td");
        const status = document.createElement("td");
        const edit = document.createElement("button");
        const del = document.createElement("button");

        //put the cells in the row
        row.append(id, name, date, subtotal, total, status, edit, del);

        id.textContent = thing.orderID;
        id.className = "orderID";
        name.textContent = thing.orderName;
        name.className = "orderName";
        date.textContent = thing.orderDate;
        date.className = "orderDate";
        subtotal.textContent = thing.orderSubTotal;
        subtotal.className = "orderSubTotal";
        total.textContent = thing.orderTotal;
        total.className = "orderTotal";
        status.textContent = thing.orderStatus;
        status.className = "orderStatus";

        edit.innerHTML = "Edit";
        edit.className = "editOrder";
        del.innerHTML = "Delete";
        del.className = "delOrder";
   
        table.append(row);
    }
    //adding a generic click listener for the table
    table.addEventListener("click", handleClicks);
}

//working
const newItem = async () => {

    //create a formData object and populate it with form data; I read about this from MDN
    //source: https://developer.mozilla.org/en-US/docs/Learn/Forms/Sending_forms_through_JavaScript
    const formData = new FormData(itemForm);

    //converting from FormData's special content type to plain old JSON, since that's what my application expects
    const formDataData = {};

    //strange format for the iterator, suppose this helps me get used to inline functions though
    formData.forEach((key, value) => {
        formDataData[value] = key; //for some reason the keys and values got jumbled up, so this sets them the "right" way
    });

    //this feels distinctly kludgey
    jsonData = JSON.stringify(formDataData);

    //crazy thing here: I originally thought the form itself had to be created by clicking a button on the site
    //instead of it just being part of the base HTML file
    const uri = `http://localhost:3030/items`;
    const config = {
        method: "post",
        mode: "cors",
        headers: {
            "Content-Type": "application/json"
        },
        body: jsonData
    };

    //we need to keep in mind any errors (like the database service being down)
    try {
        //send it off and print out the result of the fetch call
        const response = await fetch(uri, config);
        const result = await response.json();

        /*
        POST status codes:
        201 (Created)- Item added to DB
        400 (Bad Request)- Incorrectly-formatted data

        So, if !response.ok, tell the user they did something wrong
        */

        console.log(result);
        wipeTable("products");
        getData("items");
    }
    catch (err) {
        //something got borked.
        console.log(err);
    }
}

//working
const newOrder = async () => {
    //running out of time, I hate violating the DRY principle but it's basically the same functionality for both
    //just not smart enough to make these generic...
    const formData = new FormData(orderForm);

    //converting from FormData's special content type to plain old JSON, since that's what my application expects
    const formDataData = {};

    //strange format for the iterator, suppose this helps me get used to inline functions though
    formData.forEach((key, value) => {
        formDataData[value] = key; //for some reason the keys and values got jumbled up, so this sets them the "right" way
    });

    //this feels distinctly kludgey
    jsonData = JSON.stringify(formDataData);

    console.log(jsonData);
    //crazy thing here: I originally thought the form itself had to be created by clicking a button on the site
    //instead of it just being part of the base HTML file
    const uri = `http://localhost:3030/orders`;
    const config = {
        method: "post",
        mode: "cors",
        headers: {
            "Content-Type": "application/json"
        },
        body: jsonData
    };

    //we need to keep in mind any errors (like the database service being down)
    try {
        //send it off and print out the result of the fetch call
        const response = await fetch(uri, config);
        const result = await response.json();

        /*
        POST status codes:
        201 (Created)- Item added to DB
        400 (Bad Request)- Incorrectly-formatted data

        So, if !response.ok, tell the user they did something wrong
        */

        console.log(result);
        wipeTable("orders");
        getData("orders");
    }
    catch (err) {
        //something got borked.
        console.log(err);
    }
}

//working?
const editItem = async id => {
    //select the table, then the row associated with the provided ID
    const table = document.querySelector("#products-table");

     //check for the provided ID in the table rows
     for (let i = 0; i < table.children.length; i++) {
        if (table.children[i].tagName === "TR") {
            //grabbing the current row
            const row = table.children[i];

            if (row.children[0].textContent === id) {
                //swap out the various parts of the row with input fields
                for (const elem of row.children) {
                    //probably a better way of doing this...
                    if (elem.className === "prodName") {
                        //#0 is ID, #1 is Name, #2 is Category, #3 is Price, #4 is stock...
                            elem.innerHTML = `<input type = "text" value = ${elem.textContent}>`;

                    }
                    //gotta swap this one out with 3 radio buttons. this is gonna be tricky to style, I feel.
                    //scratch that, buttons can come later
                    else if (elem.className === "prodType") {

                        elem.innerHTML = `<input type = "text" value = ${elem.textContent}>`;
                    }
                    else if (elem.className === "prodPrice") {
                        elem.innerHTML = `<input type = "text" value = ${elem.textContent}>`;
                    }
                    else if (elem.className === "stock") {
                        elem.innerHTML = `<input type = "text" value = ${elem.textContent}>`;
                    }
                    //swap the edit button for a save button
                    else if (elem.className === "editItem") {
                        elem.innerHTML = "Save";
                        elem.className = "saveItem";
                    }
                }
            }
        }
    }
}

//working??
const saveItem = async row => {
    //get the items out of the row; this feels like a time where destructuring would save the day, but I'm playing it safe (and kludgey).
    const id = row.children[0].innerHTML;
    const name = row.querySelector(".prodName input").value;
    const category = row.querySelector(".prodType input").value;
    const price = row.querySelector(".prodPrice input").value;
    const stock = row.querySelector(".stock input").value;

    //now make the request...
    const uri = `http://localhost:3030/items/${id}`;
    const config = {
        method: "put",
        mode: "cors",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            prodType: category, //necessary
            prodPrice: price, //necessary
            prodName: name, //necessary
            prodDesc: null,
            stock: stock, //necessary
            deckLength: null,
            skateSize: null
        })
    };

    /*
    UPDATE status codes:
    200 (OK)- Item was updated
    400 (Bad Request)- Malformed data
    404 (Not found)- Item not in DB
    
    404 shouldn't be a worry (knock on wood), but I have to handle 400...
    */
    const response = await fetch(uri, config);
    
    if (response.ok) {
        const results = await response.json();
        console.log(results);
        wipeTable("products");
        getData("items");
    }
    else {
        console.log(`Error: ${response.status} ${response.statusText}`);
    }
}

//working???
const editOrder = async id => {
    //select the table, then the row associated with the provided ID
    const table = document.querySelector("#orders-table");

    //check for the provided ID in the table rows
    for (let i = 0; i < table.children.length; i++) {
        if (table.children[i].tagName === "TR") {
            //grabbing the current row
            const row = table.children[i];

            if (row.children[0].textContent === id) {
                //swap out the various parts of the row with input fields
                for (const elem of row.children) {
                    //probably a better way of doing this...
                    if (elem.className === "orderName") {
                        //#0 is ID, #1 is Name, #2 is Date, #3 is Subtotal, #4 is Total, #5 is Status...
                        elem.innerHTML = `<input type = "text" value = ${elem.textContent}>`;
                    }
                    else if (elem.className === "orderDate") {
                        elem.innerHTML = `<input type = "date">`;
                    }
                    else if (elem.className === "orderSubTotal") {
                        elem.innerHTML = `<input type = "text" value = ${elem.textContent}>`;
                    }
                    else if (elem.className === "orderTotal") {
                        elem.innerHTML = `<input type = "text" value = ${elem.textContent}>`;
                    }
                    else if (elem.className === "orderStatus") {
                        elem.innerHTML = `<input type = "text" value = ${elem.textContent}>`;
                    }
                    //swap the edit button for a save button
                    else if (elem.className === "editOrder") {
                        elem.innerHTML = "Save";
                        elem.className = "saveOrder";
                    }
                }
            }
        }
    }
}

//working????
const saveOrder = async row => {
    //get the items out of the row; this feels like a time where destructuring would save the day, but I'm playing it safe (and kludgey).
    const id = row.children[0].innerHTML;
    const name = row.querySelector(".orderName input").value;
    const date = row.querySelector(".orderDate input").value;
    const subtotal = row.querySelector(".orderSubTotal input").value;
    const total = row.querySelector(".orderTotal input").value;
    const status = row.querySelector(".orderStatus input").value;

    //now make the request...
    const uri = `http://localhost:3030/orders/${id}`;
    const config = {
        method: "put",
        mode: "cors",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            orderName: name, //necessary
            orderSubTotal: subtotal, //necessary
            orderTax: null,
            orderPromo: null,
            orderTotal: total, //necessary
            orderDate: date, //necessary
            orderStatus: status //necessary
        })
    };

    /*
    UPDATE status codes:
    200 (OK)- Item was updated
    400 (Bad Request)- Malformed data
    404 (Not found)- Item not in DB
    
    404 shouldn't be a worry (knock on wood), but I have to handle 400...
    */
    const response = await fetch(uri, config);
    
    if (response.ok) {
        const results = await response.json();
        console.log(results);
        wipeTable("orders");
        getData("orders");
    }
    else {
        console.log(`Error: ${response.status} ${response.statusText}`);
    }
}

//working
const deleteItem = async (id) => {
    //get the table first...
    const table = document.querySelector("#products-table");

    //check for the provided ID in the table rows
    for (let i = 0; i < table.children.length; i++) {
        if (table.children[i].tagName === "TR") {
            //grabbing the current row
            const row = table.children[i];
            if (row.children[0].textContent === id) {
                //gonna ask the user if they're sure they want to delete the item first
                const confirm = window.confirm(`Are you sure you want to delete ${row.children[1].textContent} from the database?`);
                if (confirm) {
                    row.remove();

                    // make a DELETE HTTP request to the database, right?
                    const uri = `http://localhost:3030/items/${id}`;
                    const config = {
                        method: "delete",
                        mode: "cors",
                        headers: {
                            "Content-Type": "application/json"
                        }
                    };

                    /*
                    DELETE response status codes:
                    200 (OK)- Item was deleted
                    404 (Not Found)- Item not in DB
                    404 shouldn't be an issue here since the user can only click buttons that correspond to existing entries...
                    I hope... better to error-proof just to be safe.
                    */
                    try {
                        const response = await fetch (uri, config);

                        //if the response code is something outside the 200 range, throw an error.
                        if(!response.ok) {
                            throw new Error(`An error has occurred. Status: ${response.status}`);
                        }
                        else { //otherwise, print the results to the console.
                            const results = await response.json();
                            console.log(results);
                        }
                    }
                    catch (err) {
                        //print out the error if there is one
                        console.log(err);
                    }
                }
            }
        }
    }
}

//waiting on completion of deleteItem()
const deleteOrder = async id => {
    //get the table first...
    const table = document.querySelector("#orders-table");

    //check for the provided ID in the table rows
    for (let i = 0; i < table.children.length; i++) {
        if (table.children[i].tagName === "TR") {
            //grabbing the current row
            const row = table.children[i];
            if (row.children[0].textContent === id) {
                //gonna ask the user if they're sure they want to delete the item first
                const confirm = window.confirm(`Are you sure you want to delete ${row.children[1].textContent} from the database?`);
                if (confirm) {
                    row.remove();

                    // make a DELETE HTTP request to the database, right?
                    const uri = `http://localhost:3030/orders/${id}`;
                    const config = {
                        method: "delete",
                        mode: "cors",
                        headers: {
                            "Content-Type": "application/json"
                        }
                    };

                    /*
                    DELETE response status codes:
                    200 (OK)- Item was deleted
                    404 (Not Found)- Item not in DB
                    404 shouldn't be an issue here since the user can only click buttons that correspond to existing entries...
                    I hope... better to error-proof just to be safe.
                    */
                    try {
                        const response = await fetch (uri, config);

                        //if the response code is something outside the 200 range, throw an error.
                        if(!response.ok) {
                            throw new Error(`An error has occurred. Status: ${response.status}`);
                        }
                        else { //otherwise, print the results to the console.
                            const results = await response.json();
                            console.log(results);
                        }
                    }
                    catch (err) {
                        //print out the error if there is one
                        console.log(err);
                    }
                }
            }
        }
    }
}