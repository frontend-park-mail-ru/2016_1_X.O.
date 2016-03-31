define(function (require) {
        var Backbone = require('backbone'),
            _ = require('underscore');
            SquareModel = require('models/square');

        var BlockModel = Backbone.Model.extend({
            defaults: {
                size: 180,
                value: 0,
                intervalBetweenRect: 20,
                isClickable: true,
                squareModels: []
            },

            initialize: function (posX, posY) {
                this.set({
                    'posX': posX,
                    'posY': posY
                });

                var currentX = 0,
                    currentY = 0,
                    x0 = this.get('posX') - 60,
                    y0 = this.get('posY') - 60;

                for (var i = 1; i <= 9; i++) {
                    this.set({'squareModels': this.get('squareModels').concat(
                        new SquareModel(x0 + currentX, y0 + currentY))
                    });
                    if (i === 9) break;
                    if (i % 3 === 0) {
                            currentY += this.get('squareModels')[i-1].get('size') +
                                this.get('intervalBetweenRect');
                            currentX = 0;
                    } else {
                            currentX += this.get('squareModels')[i-1].get('size') +
                                this.get('intervalBetweenRect');
                    }
                }
                
            }
        });
        return BlockModel;
    }
);