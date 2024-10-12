//imports
import express from "express";
import chalk from "chalk";

//creating the server
const app = express();

//currently the only route
app.get("/", (req, res) => res.redirect("/home"));

//starting the server
app.listen(3030, () => console.log(`Server started on ${chalk.blue("Port 3030")}`));