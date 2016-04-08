define(function (require) {
    var Backbone = require('backbone'),
        BlockView = require('views/block'),
        blocksCollection = require('collections/blocks');

    var BlocksView = Backbone.View.extend({
        render: function (stage, player) {
            blocksCollection.each(function (block) {
                var blockView = new BlockView(block, stage);
                blockView.renderBlock(player);
            })
        },

        check: function () {
            blocksCollection.check();
            if (!blocksCollection.getStatus()) {
                return;
            }
            Backbone.history.navigate('', true);
            blocksCollection.setStatus();
        }
    });
    return BlocksView;
});