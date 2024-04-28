import express from "express";
import {PORT, mongoDBURL } from "./config.js"
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    console.log("request is: ", req);
    return res.status(200).send("WELCOME TO BOOK STORE! *_*");
});


// Get all books 
app.get('/books', async (req, res) => {
    try {
        const getBooks = await Book.find({});
        return res.status(200).json({
            count: getBooks.length,
            data: getBooks
        });
    }
    catch(error) {
        console.log(error.message);
        return res.status(500).send({messgae: error.message});
    }
});

// Get book by id
app.get('/books/:bookid', async (req, res) => {
    try {
        const {bookid} = req.params;
        const getBook = await Book.findById(bookid);
        return res.status(200).json(getBook);
    }
    catch(error) {
        console.log(error.message);
        return res.status(500).send({messgae: error.message});
    }
});


// Create book 
app.post('/books', async (req, res) => {
    try {
        if(!req.body.title ||
            !req.body.author ||
            !req.body.publishYear) {
                res.status(400).send("Send all required fields!");
            }

        const newBook = {
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear,
        };

        const book = await Book.create(newBook);

        if (book) {
            return res.status(201).send(`Successfully created new book ${book}`);
        }
    }
    catch(error) {
        console.log(error.message);
        return res.status(500).send({message: error.message});
    }
});

// Update a book

app.put('/books/:bookid', async(req, res) => {
    try {
        if(!req.body.title &&
            !req.body.author &&
            !req.body.publishYear) {
                res.status(400).send("Empty body, send one field!");
            }
        const {bookid} = req.params;
        const result = await Book.findByIdAndUpdate(bookid, req.body);
        
        if (!result) {
            return res.status(400).send({message: "Unable to update.!"});
        }
        return res.status(200).send({message: "Updated Book successfully!"})
    }
    catch(error) {
        console.log(error.message);
        return res.status(500).send({message: error.message});
    }
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