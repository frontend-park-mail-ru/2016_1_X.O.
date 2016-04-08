define(function (require) {

    var Backbone = require('backbone'),
        SquareModel = require('models/square');

    var SquaresCollection = Backbone.Collection.extend({
        model: SquareModel,

        createCollection: function(x0, y0, currentX, currentY, interval) {
            for (var i = 1; i <= 9; i++) {
                this.add(new SquareModel(x0 + currentX, y0 + currentY, i));
                if (i === 9) {
                    break;
                }
                if (i % 3 === 0) {
                    currentY += this.at(i - 1).get('size') + interval;
                    currentX = 0;
                } else {
                    currentX += this.at(i - 1).get('size') + interval;
                }
            }
            return this;
        }
        
    });

    
    return SquaresCollection;
});