define(function(require) {
    var Backbone = require('backbone'),
        BlockView = require('views/block'),
        blocksCollection = require('collections/blocks');

    var BlocksView = Backbone.View.extend({
        render: function(stage) {
            blocksCollection.each(function (block) {
                var blockView = new BlockView(block, stage);
                blockView.render();
            })
        }
    });
    return BlocksView;
});