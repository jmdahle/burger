# burger

## About burger
Burger is a restuarant app that lets users select (devour) the burgers that are available on the menu, view the burgers that have already been devoured, and add new burgers to the menu.

See the [demo](https:link)

## Installation
The burger app relies on Node.js to provide the web server, epress to providing routing, and mysql to store burger information.

1. [Download](https://nodejs.org/en/download/) and install Node.js
2. [Download](https://dev.mysql.com/downloads/mysql/) and install MySql
3. Create the database using the script ```schema.sql``` found in the repository (note this will **erase** any existing bamazon database and populate it with initial values) and ```seeds.sql``` to populate a few sample burgers.
4. Use the Node.js package manager - npm - to install the required Node.js packages.  Running ```npm install``` from the command line will install the following Node.js packages:
    * [mysql](https://www.npmjs.com/package/mysql)
    * [express](https://www.npmjs.com/package/express)
    * [express-handlebars](https://www.npmjs.com/package/express-handlebars)
    * [dotenv](https://www.npmjs.com/package/dotenv)

The 'dotenv' package is used for local database credentials.  You will need to supply a ```.env``` file with the following information, accessed by the ```common.js``` file.  **NOTE: DB credentials are supplied in a different manner when the application is deployed to Heroku or other hosting service that provisions the DB for a deployed project.**

```bash
    # database user credentials
    HOST=yourDBhost
    DBPORT=yourDBport
    DATABASE=burgers_db
    USER=yourDBuser
    PASSWORD=yourDBpassword
```

## Usage



## Technical Notes
* The burger app is an exercise in separating Model, View, and Controller layers.  
    * Burger uses a custom ORM (Object Relational Model, config/orm.js) to supply non-model/table specific DB functionality and dynamically create valid SQL.
    * Burger uses a custom data model (models/burger.js) to map the burger data onto the ORM database access.
    * Burger uses a custom controller (controllers/burger_controller.js) to supply routing for the client browser and map to database access through the data model.
    * Burger uses express and handlebars to provide client UI.  JQuery is used client side to dynamically populate the page with data provided through an API call (GET) and supply user-provided input to add or update the data (also through API calls - PUT and POST).
* Burger uses JQuery "data" method to supply to retrieve indexes, identifying individual DB records to update.  (NOTE: I had tried stroing those indexes in custom attributes (e.g., 'data-id="1"'), but had difficulty accessing follwing a click event.)
* Burger uses Materialize front end to provide UI and mobile-responsive behavior.  

## Resources
* All original code as of 8/2019, John Dahle, related to class exercise except where explicitly noted
* FAVICON licensed under Creative Commons.  No atttribution needed.  Downloaded from [here](https://www.favicon.cc/?action=icon&file_id=757516).
* Burger logo is licensed for personal use.  Downloaded from [here](http://clipart-library.com/clipart/149342.htm).
* Code is found at [GitHub Repository](https://github.com/jmdahle/burger)
