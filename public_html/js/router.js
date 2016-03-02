define(function (require) {
        var Backbone = require('backbone'),
            MainView = require('views/main'),
            LoginView = require('views/login'),
            RegisterView = require('views/register'),
            ScoreboardView = require('views/scoreboard'),
            GameView = require('views/game');

        var Router = Backbone.Router.extend({
            routes: {
                'login': 'loginAction',
                'register': 'registerAction',
                'scoreboard': 'scoreboardAction',
                'game': 'gameAction',
                '*default': 'defaultAction'
            },

            initialize: function () {

            },
            loginAction: function () {
                LoginView.show();
            },
            registerAction: function () {
                RegisterView.show();
            },
            scoreboardAction: function () {
                ScoreboardView.show();
            },
            gameAction: function () {
                GameView.show();
            },
            defaultAction: function () {
                MainView.show();
            }
        });

        return new Router();
    }
);