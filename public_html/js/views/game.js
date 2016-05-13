define(function (require) {

    var Backbone = require('backbone'),
        BaseView = require('views/base'),
        tmpl = require('tmpl/game'),
        createjs = require('easel'),
        MainSquareView = require('views/mainSquare'),
        MainSquareModel = require('models/mainSquare'),
        SinglePlayerModel = require('models/singlePlayer');

    var GameView = BaseView.extend({
        initialize: function () {
            this.$page = $('#page');
            this.$page.append(this.el);
            this.render();
            this.hide();
        },

        template: tmpl,

        show: function () {
            this.$el.appendTo("#page");
            this.$el.show();
            this.trigger('show', this);
        }
    });
    return new GameView();
});

