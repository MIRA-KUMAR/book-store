import express from "express";
import {PORT, mongoDBURL } from "./config.js"
import mongoose from "mongoose";

const app = express();

app.get('/', (req, res) => {
    console.log("request is: ", req);
    return res.status(200).send("WELCOME TO BOOK STORE! *_*");
});

mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log("Database is connected.")
        app.listen(PORT, () => {
            console.log(`App is listening on port: ${PORT}!`);
        });
    })
    .catch((error) => {
        console.log(error);
    });