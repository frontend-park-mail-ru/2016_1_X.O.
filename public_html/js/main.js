define(function (require) {
    var Backbone = require('backbone'),
        router = require('router'),
        $ = require('jquery');

    Backbone.history.start();

    var removePreloader = function() {
        $("#preloader").fadeOut('slow');
        $("#page").fadeIn('slow');
        document.getElementById('page').style.display = 'block';
    };

    setTimeout(removePreloader, 5000);
});
