define(function (require) {
    var Backbone = require('backbone'),
        _ = require('underscore'),
        BlocksCollection = require('collections/blocks');

    var MainSquareModel = Backbone.Model.extend({
        defaults: {
            value: 0,
            intervalBetweenBlock: 20,
            isClickable: true,
            isFinished: false,
            collection: new BlocksCollection
        },

        initialize: function (posX, posY, size) {
            this.set({
                'posX': posX,
                'posY': posY,
                'size': size
            });
            this.doCreate();
        },
        
        doCreate: function () {
            
        }
    });

    return MainSquareModel;
});