const express = require('express');
const burger = require('../models/burger.js');

const router = express.Router();

// route path: GET /
router.get('/', (request, response) => {
        response.render('index');
});

// route path: GET /api/burgers
router.get('/api/burgers', (request, response) => {
    burger.all( (data) => {
        response.json(data);
    });
});

// route path: POST /api/add
router.post('/api/add', (request, response) => {
    burger.create({
        burger_name: request.body.burger_name
        }, 
        (data) => {
            // status - 201 - created
            response.status(201).end();
        }
    );
});

// route path: PUT /api/devour
router.put('/api/devour', (request,response) => {
    console.log(request.body);
    burger.udpate({
        devoured: true
        }, 
        request.body.id,
        (data) => {
            // status - 204 - no content
            response.status(204).end();
        }
    );
})

module.exports = router;