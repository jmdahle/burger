$(document).ready( function() {
    // respond to document events
    $(document).on('click', '.devourit', devourBurger);
    $(document).on('submit', '#new-burger-form', addBurger);

    // initial page population
    loadBurgers();

    /**
     * loads data and (re-)creates lists of available and devoured burgers
     * 
     */
    function loadBurgers() {
        $.get('/api/burgers', (data) => {
            let burgers = data;
            displayBurgers(burgers);
        });
    }
    
    /**
     * Places each burger into available or devoured lists
     * 
     * @param {array of objects} burgers 
     */
    function displayBurgers(burgers) {
        // clear burger menu and devoured list
        $('#burger-menu').empty();
        $('#burgers-eaten').empty();
        for (let i = 0; i < burgers.length; i++) {
            let burgerItem = createBurgerItem(burgers[i]);
            if (burgers[i].devoured) {
                // add burger to devoured list
                $('#burgers-eaten').append(burgerItem);
            } else {
                // add burger to burger menu
                $('#burger-menu').append(burgerItem);
            }
        }
    }
    
    /**
     * Creates the HTML (via JQuery) for each burger
     * 
     * @param {object} burger 
     */
    function createBurgerItem(burger) {
        // jquery for burger items - an array of elements (or closing tags) joined together (similar to += to a string)
        let newBurgerItem = $(
            [
            `<li class='collection-item'>`,
            burger.burger_name.trim(),
            //`<button class='devourit btn-small secondary-content'>Devour</button>`,
            `<a class='devourit secondary-content'>DEVOUR</a>`,
            `</li>`
            ].join('')
        );
        // add the id to the button as data
        newBurgerItem.find('.devourit').data('id',burger.id);
        if (burger.devoured) {
            // hide the button for devoured burgers
            newBurgerItem.find('.devourit').css('display','none');
        }
        return newBurgerItem;
    }

    /**
     * Processes the 'click' event for devouring a burger, calling the api/devour route to update the devoured status
     * 
     * @param {object} event 
     */
    function devourBurger(event) {
        // get the burger id from the button
        let burgerId = $(this).data('id');
        // console.log(burgerId);
        $.ajax({    // PUT for a database UPDATE
            method: 'PUT',
            url: '/api/devour',
            data: {id: burgerId}
        }).then( (returnData) => {   
            loadBurgers();  // after PUT resolves, re-query the database
        });
    }

    /**
     * Processes the 'click' event for adding a new burger, calling the apr/add route and passing the new burger data
     * 
     * @param {object} event 
     */
    function addBurger(event) {
        event.preventDefault();
        if ($('#burger-name').val().trim().length > 0) { // prevent 0 length burger names
            let newBurger = {
                burger_name: $('#burger-name').val().trim()
            }
            // console.log(newBurger);
            $.post('/api/add', newBurger, loadBurgers).then( (returnData) => { // POST for database CREATE
                $('#burger-name').val(''); // re-set input to blank
                loadBurgers(); // re-load burgers
            });
        }   
    }

});

