define(function (require) {

    var Backbone = require('backbone'),
        BaseView = require('views/base'),
        tmpl = require('tmpl/game'),
        createjs = require('easel'),
        BlocksView = require('views/blocks'),
        blocksCollection = require('collections/blocks'),
        SinglePlayerModel = require('models/singlePlayer');

    var GameView = BaseView.extend({
        initialize: function () {
            this.$page = $('#page');
            this.$page.append(this.el);
            this.$who = this.$el.find('#who');
            this.blocksView = new BlocksView();
            this.player = new SinglePlayerModel;
            this.render();
            this.hide();
        },

        template: tmpl,

        events: {
            'click #gameCanvas': 'gameClick'
        },

        show: function () {
            this.$el.appendTo("#page");
            this.$who.text('Player : ' + this.player.get('id').toString());
            this.stage = new createjs.Stage("gameCanvas");
            this.stage.clear();
            blocksCollection.createBlocks(100, 100);
            this.start();
            this.$el.show();
            this.trigger('show', this);
        },

        start: function () {
            this.blocksView.render(this.stage);
            this.stage.update();
        },

        gameClick: function (event) {
            var next;
            this.nextVal = 0;
            event.preventDefault();
            blocksCollection.models.forEach(function (block) {
                next = block.onClick(event.offsetX, event.offsetY, this.player);
                if(next) {
                    this.nextVal = next;
                    block.check();
                    this.blocksView.check();
                }
            }.bind(this));

            if(this.nextVal) {
                blocksCollection.models.forEach(function (block) {
                    block.set({'isClickable': false});
                });
                blocksCollection.at(this.nextVal - 1).set({'isClickable': true});
            }

            this.start();
            this.$who.text('Player : ' + this.player.get('id').toString());
        }
    });
    return new GameView();
});

