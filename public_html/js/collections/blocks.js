define(function (require) {
        var Backbone = require('backbone'),
            BlockModel = require('models/block');

        var BlocksCollection = Backbone.Collection.extend({
            model: BlockModel,

            createBlocks: function (x0, y0) {
                var intervalBetweenBlock = 20,
                    currentX = 0,
                    currentY = 0;

                for (var i = 1; i <= 9; i++) {
                    this.add(new BlockModel(x0 + currentX, y0 + currentY, i));
                    if (i === 9) break;
                    if (i % 3 === 0) {
                        currentY += this.at(i-1).get('size') + intervalBetweenBlock;
                        currentX = 0;
                    } else {
                        currentX += this.at(i-1).get('size') + intervalBetweenBlock;
                    }
                }
            }
        });
        return new BlocksCollection();
    }
);
