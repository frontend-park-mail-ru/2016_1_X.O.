define(function (require) {

    var Backbone = require('backbone'),
        Square = require('models/square');

    var SquaresCollection = Backbone.Collection.extend({
        model: Square       
        
    });

    
    return SquaresCollection;
});