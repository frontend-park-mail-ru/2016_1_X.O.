define(function (require) {

    var Backbone = require('backbone'),
        BaseView = require('views/base'),
        tmpl = require('tmpl/game'),
        createjs = require('easel'),
        MainSquareView = require('views/mainSquare'),
        MainSquareModel = require('models/mainSquare'),
        SinglePlayerModel = require('models/singlePlayer'),
        user = require('models/user');

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
            if(user.get('isAuth') === false) {
                Backbone.history.navigate('#', true);
            }
            if(!this.websocket) {
                if(this.websocket.readyState === 3)
                {
                    this.websocket = new WebSocket("ws://127.0.0.1/game");
                }
            }
        },
        
        hide: function() {
            this.$el.hide();
            if(this.websocket && this.websocket.readyState < 2) {
                this.websocket.close();
            }
        }
    });
    return new GameView();
});

