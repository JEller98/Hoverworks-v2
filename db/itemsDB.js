import mysql from "mysql2/promise";
import dotenv from "dotenv";
import chalk from "chalk";

//import the config
dotenv.config({
    path: "./config.env"
});

const {DB_DATABASE, DB_HOST, DB_PORT, DB_USER, DB_PASSWORD} = process.env;

//connect to the database
const connect = await mysql.createConnection({
    host: DB_HOST,
    port: DB_PORT,
    database: DB_DATABASE,
    user: DB_USER,
    password: DB_PASSWORD
});

//fill in the port here
console.log(`Connected to MySQL on port ${chalk.blue(DB_PORT)}`);

//methods to interact with the DB down here
