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
                if (Math.random() >= 0.5) {
                    alert('ETO WIN');
                }
                else {
                    alert('TI PROIGRAL');
                }
            }
        });

        return new GameView();
    }
);