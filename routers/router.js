import express from "express";

const router = express.Router();

//default route
router.get("/", (req, res) => {
    //return something with the response, or else it'll freeze
    res.status(200).send("Hello, world!");
});

//products routes
router.post("/products", (req, res) =>{
    //C for create
    res.status(200).send("POST products");
});

router.get("/products", (req, res) => {
    //R for read
    res.status(200).send("GET products");
});

router.put("/products", (req, res) => {
    //U for update
    res.status(200).send("PUT products");
});

router.delete("/products", (req, res) => {
    //D for delete
    res.status(200).send("DELETE products")
});

//orders routes
router.post("/orders", (req, res) => {
    res.status(200).send("POST orders");
});

router.get("/orders", (req, res) => {
    res.status(200).send("GET orders");
});

router.put("/orders", (req, res) => {
    res.status(200).send("PUT orders");
});

router.delete("/orders", (req, res) => {
    res.status(200).send("DELETE orders");
});

export default router;