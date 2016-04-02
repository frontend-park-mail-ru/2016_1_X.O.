define(function (require) {

    var Backbone = require('backbone'),
        BaseView = require('views/base'),
        tmpl = require('tmpl/game'),
        createjs = require('easel'),
        BlocksView = require('views/blocks'),
        blocksCollection = require('collections/blocks'),
        SinglePlayerModel = require('models/singlePlayer');

    var GameView = BaseView.extend({
        template: tmpl,

        events: {
            'click #newGame': 'game',
            'click #gameCanvas': 'gameClick'
        },

        game: function (event) {
            this.$who = this.$el.find('#who');
            event.preventDefault();
            this.blocksView = new BlocksView();
            this.player = new SinglePlayerModel;
            this.stage = new createjs.Stage("gameCanvas");
            blocksCollection.createBlocks(100, 100);
            this.blocksView.render(this.stage);
            this.stage.update();
            this.$who.text('Player : ' + this.player.get('id').toString());
        },

        gameClick: function (event) {
            event.preventDefault();
            blocksCollection.models.forEach(function (block) {
                block.onClick(event.offsetX, event.offsetY, this.player)
            }.bind(this));
            this.blocksView.render(this.stage);
            this.stage.update();
            this.$who.text('Player : ' + this.player.get('id').toString());
        }

    });
    return new GameView();
});

