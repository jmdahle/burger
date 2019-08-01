const express = require('express');
const exphbs = require('express-handlebars');

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.static('public'));  // sets a static route for public - available at root (used for accessing client side includes like image, css and js files)

// middleware
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// use handlebars with .handlebars extension as render (template) engine
app.engine('handlebars', exphbs({defaultLayout:'main'}));
app.set('view engine', 'handlebars');

// routing via the controller layer
const routes = require('./controllers/burger_controller.js');
app.use(routes);

app.listen(PORT, () => {
    console.log("Server listening on: http://localhost:" + PORT);
  });
  