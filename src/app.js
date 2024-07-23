//const express = require("express");
import express from "express";
import productRouter from "./routes/products.router.js"
import cartRouter from "./routes/carts.router.js"

const app = express();
const PUERTO = 8000;

//MIDDLEWARE
app.use(express.json());

app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);


app.listen(PUERTO, () => {
    console.log("Escuchando en el puerto 8000");
})