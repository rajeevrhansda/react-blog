const express = require("express")
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();


// MONGO_URL = mongodb+srv://blog:admin123@cluster0.htnet.mongodb.net/?retryWrites=true&w=majority
mongoose
    .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: true
    })
    .then(console.log("Connected to MongoDB"))
    .catch((error) => console.log("ERROR",error));

app.listen("5000", () => {
    console.log("Backend is running");
})