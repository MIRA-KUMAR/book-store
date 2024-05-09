import express from "express";
import {PORT, mongoDBURL } from "./config.js"
import mongoose from "mongoose";
import booksRoute from "./routes/booksRoute.js";
import cors from 'cors';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    console.log("request is: ", req);
    return res.status(200).send("WELCOME TO BOOK STORE! *_*");
});

app.use('/books', booksRoute);

/*
CORS - Web security mechanism to protect the domain from unauthorized web browsers to access it.
*/
// OPTION 1: To allow all the web browsers or port
// app.use(cors('*'));

// OPTION 2: Allow only specific browsers/port
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    allowedHeaders: ['Content-Type'],
    })
);

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