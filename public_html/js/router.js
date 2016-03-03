define(function (require) {
        var Backbone = require('backbone'),
            mainView = require('views/main'),
            loginView = require('views/login'),
            registerView = require('views/register'),
            scoreboardView = require('views/scoreboard'),
            gameView = require('views/game');

        var Router = Backbone.Router.extend({
            routes: {
                'login': 'loginAction',
                'register': 'registerAction',
                'scoreboard': 'scoreboardAction',
                'game': 'gameAction',
                '*default': 'defaultAction'
            },

            initialize: function () {
                this.$page = $('#page');
            },
            loginAction: function () {
                this.$page.html(loginView.render().$el)
            },
            registerAction: function () {
                this.$page.html(registerView.render().$el)
            },
            scoreboardAction: function () {
                this.$page.html(scoreboardView.render().$el)
            },
            gameAction: function () {
                this.$page.html(gameView.render().$el)
            },
            defaultAction: function () {
                this.$page.html(mainView.render().$el)
            }
        });

        return new Router();
    }
);