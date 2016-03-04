define(function (require) {

        var Backbone = require('backbone'),
            BaseView = require('views/base'),
            tmpl = require('tmpl/game');

        var GameView = BaseView.extend({
            template: tmpl,

            events: {
                'click #win' : 'win'
            },

            win: function() {
                alert('ETO WIN');
            }
        });

        return new GameView();
    }
);