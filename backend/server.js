require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const pageRoutes = require('./routes/Pages')

// express app
const app = express();

// middleware - between receiving requests and doing shit with it
app.use(express.json());

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
})

// routes
app.use('/pages', pageRoutes);

// connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // listen for requests
        app.listen(process.env.PORT, () => {
            console.log('Connected to db, listening on port', process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error);
    })