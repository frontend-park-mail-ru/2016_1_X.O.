define(function (require) {
        var Backbone = require('backbone'),
            SquareCollection = require('collections/squares'),
            Model = require('models/block');

        var BlocksCollection = SquareCollection.extend({
            model: Model
        });
    
        return BlocksCollection;
    }
);
