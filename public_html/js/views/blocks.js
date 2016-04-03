define(function(require) {
    var Backbone = require('backbone'),
        BlockView = require('views/block'),
        blocksCollection = require('collections/blocks');

    var BlocksView = Backbone.View.extend({
        render: function(stage, player) {
            blocksCollection.each(function (block) {
                var blockView = new BlockView(block, stage);
                blockView.render(player);
            })
        },

        check: function() {
            blocksCollection.check();
            if(blocksCollection.getStatus()) {
                Backbone.history.navigate('', true);
                blocksCollection.setStatus();
            }
        }
    });
    return BlocksView;
});