define(function (require) {

    var Backbone = require('backbone'),
        BaseView = require('views/base'),
        tmpl = require('tmpl/game'),
        createjs = require('easel'),
        BlocksView = require('views/blocks'),
        blocksCollection = require('collections/blocks');

    var GameView = BaseView.extend({
        template: tmpl,

        events: {
            'click #newGame' : 'game'
        },

        game: function (event) {
            event.preventDefault();

            function init() {
                this.blocksView = new BlocksView();
                render();
            }

            function render() {
                var stage = new createjs.Stage("gameCanvas");
                blocksCollection.createBlocks(100, 100);
                this.blocksView.render(stage);
                stage.update();
                //requestAnimationFrame(render);
            }
            
            // отрисовка поля
            init();
        }

    });
    return new GameView();
});

