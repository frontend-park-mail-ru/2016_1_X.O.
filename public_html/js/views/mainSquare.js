define(function (require) {
    var Backbone = require('backbone'),
        createjs = require('easel'),
        _ = require('underscore'),
        SquareView = require('views/square'),
        BlockView = require('views/block');

    var MainSquareView = SquareView.extend({
        addBlocks: function(player) {
            if (this.model.get('isFinished')) {
                return;
            }
            _.forEach(this.model.get('collection').models, function (block) {
                var blockView = new BlockView(block, this.stage);
                blockView.renderBlock(player);
            }.bind(this));
        },

        check: function () {
            this.model.check();
            if (!this.model.get('isFinished')) {
                return;
            }
            var status = '';
            switch (this.model.get('value')) {
                case 0:
                    status = 'draw';
                    break;
                case 1:
                    status = 'win 1';
                    break;
                case -1:
                    status = 'win -1';
                    break;
            }
            alert(status);
            Backbone.history.navigate('', true);
            this.model.set({
                'isFinished': false
            });
        },
        
        renderMainSquare: function(player) {
            this.renderSquare("#ffffff");
            this.addBlocks(player)
        }
    });

    return MainSquareView;
});