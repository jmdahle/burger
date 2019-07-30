const express = require('express');
const burger = require('../models/burger.js');

const router = express.Router();

// route path: GET /
router.get('/', (request, response) => {
    burger.all( (data) => {
        // pass the data to handlebars template
        let hbObject = {
            burgers: data
        }
        response.render('index', hbObject);
    });
})

// route path: POST /api/add

// route path: PUT /api/update/:burgerId




module.exports = router;