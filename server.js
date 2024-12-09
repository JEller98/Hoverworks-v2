//imports
import express from "express";
import chalk from "chalk";
import itemRouter from "./routers/itemRouter.js";
import orderRouter from "./routers/orderRouter.js";

//creating the server
const app = express();

//static files from the public directory
/*  
    -make sure it has the period in front of it; . signals to check in the current directory.
    no period will make it check in the root directory, like your C drive.
    -also, the .static function just makes the files available in the paths; anything in the
    directory provided by .static can be accessed through the URL.
*/
app.use(express.static("./public"));

//parse JSON in a request body, just in case
app.use(express.json());

//mount the routers
app.use("/items", itemRouter);
app.use("/orders", orderRouter);

//starting the server
app.listen(3030, "0.0.0.0.", () => console.log(`Server started on ${chalk.blue("Port 3030")}`));