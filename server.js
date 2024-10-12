import express from "express";
import chalk from "chalk";

const app = express();

//default route, for bugtesting purposes
app.get("/", (req, res) => {
    res.status(200).json({
        message: "Hello, world!"
    });

    res.end();
});


//starting the server
app.listen(3030, () => `Server started on ${chalk.blue("Port 4242")}`);