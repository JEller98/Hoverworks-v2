//imports
import express from "express";
import chalk from "chalk";
import router from "./routers/router.js";

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

//mount the router
app.use("/", router);

//starting the server
app.listen(3030, () => console.log(`Server started on ${chalk.blue("Port 3030")}`));