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
                this.$page.html(loginView.el)
            },
            registerAction: function () {
                this.$page.html(registerView.el)
            },
            scoreboardAction: function () {
                this.$page.html(scoreboardView.el)
            },
            gameAction: function () {
                this.$page.html(gameView.el)
            },
            defaultAction: function () {
                this.$page.html(mainView.el)
            }
        });

        return new Router();
    }
);