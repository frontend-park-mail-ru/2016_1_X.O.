define(function (require) {
    var Backbone = require('backbone'),
        _ = require('underscore'),
        BlockModel = require('models/block'),
        BlocksCollection = require('collections/blocks');

    var MainSquareModel = BlockModel.extend({
        initialize: function (posX, posY, size) {
            this.set({
                'posX': posX,
                'posY': posY,
                'size': size
            });
            this.doCreate();
        },
        
        doCreate: function () {
            var currentX = 0,
                currentY = 0,
                blockX = 200,
                blockY = 200,
                x0 = this.get('posX') - blockX,
                y0 = this.get('posY') - blockY;

            this.set({
                'collection': new BlocksCollection(x0, y0, currentX, currentY,
                    this.get('intervalBetweenRect'))
            });
        }

        // handleFinish: function() {
        //     if(!this.get('isFinished')) {
        //         return;
        //     }
        // }
    });

    return MainSquareModel;
});