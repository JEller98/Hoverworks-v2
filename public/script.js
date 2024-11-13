window.onload = () => {
    getData("items");
    getData("orders");
};

//make a GET request to a given data URI
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

    //use the fetch API to make a request and get info
    const response = await fetch(uri, config);
    const results = await response.json();
    
    //the ever-elusive switch statement, here for control flow purposes!
    switch (path) {
        //if the path is "items", build rows for the items table.
        case "items":
            buildItems(results.prods);
            break;
        //if the path is "orders", build rows for the orders table.    
        case "orders":
            buildOrders(results.ords);
            break;    
    }
}

//I wonder if I could make this generic and accept either prods OR ords...
const buildItems = prods => {
    //select the table itself first
    const table = document.querySelector("#products table");

    //for each product in the list of products, populate a new element with its info and append to the table
    for (const thing of prods) {
        //make a new row
        const row = document.createElement("tr");

        //ID, Name, Category, Price, Quantity in stock... this is gonna be a bit ugly.
        const id = document.createElement("td");
        const name = document.createElement("td");
        const cat = document.createElement("td");
        const pr = document.createElement("td");
        const quan = document.createElement("td");

        //put the cells in the row
        row.append(id, name, cat, pr, quan);

        id.textContent = thing.prodID;
        name.textContent = thing.prodName;
        cat.textContent = thing.prodType;
        pr.textContent = thing.prodPrice;

        //stock can be NULL, so check for it.
        if(thing.stock === null) {
            //Note: I wouldn't normally check for NULL like this, but isNaN didn't detect NULL values.
            //Whatever magic makes this work, right?
            quan.textContent = "Out of stock";
        }
        else {
            quan.textContent = thing.stock;
        }

        //currently erroring due to row being NULL somehow...
        console.log(row);
        console.log(isNaN(row));
   
        // table.append(row);
    }
}

const buildOrders = ords => {
    console.log("Orders... dude."); //replace this once you get buildItems functional, repurpose that for this one
}