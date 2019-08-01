$(document).ready( function() {
    // respond to document events
    $(document).on('click', 'button.devourit', devourBurger)
    $(document).on('submit', '#new-burger-form', addBurger)

    // initial page population
    loadBurgers();

    function loadBurgers() {
        $.get('/api/burgers', (data) => {
            let burgers = data;
            displayBurgers(burgers);
        });
    }
    
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
                // add burger (and button) to burger menu
                $('#burger-menu').append(burgerItem);
            }
        }
    }
    
    function createBurgerItem(burger) {
        let newBurgerItem = $(
            [
            `<li class='collection-item'>`,
            burger.burger_name.trim(),
            `<button class='devourit btn-small secondary-content'>Devour</button>`,
            `</li>`
            ].join('')
        );
        newBurgerItem.find('button.devourit').data('id',burger.id);
        if (burger.devoured) {
            newBurgerItem.find('button.devourit').css('display','none');
        }
        return newBurgerItem;
    }

    function devourBurger(event) {
        event.stopPropagation();
        let burgerId = $(this).data('id');
        console.log(burgerId);
        $.ajax({
            method: 'PUT',
            url: '/api/devour',
            data: {id: burgerId}
        }).then( () => {   
            loadBurgers();
        });
    }

    function addBurger(event) {
        event.preventDefault();
        let newBurger = {
            burger_name: $('#burger-name').val().trim()
        }
        console.log(newBurger);
        $.post('/api/add', newBurger, loadBurgers);
        $('#burger-name').val('');
    }

});

