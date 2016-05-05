define(function (require) {
        var Backbone = require('backbone'),
            mainView = require('views/main'),
            loginView = require('views/login'),
            registerView = require('views/register'),
            scoreboardView = require('views/scoreboard'),
            gameView = require('views/game'),
            viewManager = require('views/manager'),
            views = [mainView, loginView, registerView, scoreboardView, gameView];



        var Router = Backbone.Router.extend({
            routes: {
                'login': 'loginAction',
                'register': 'registerAction',
                'scoreboard': 'scoreboardAction',
                'game': 'gameAction',
                '*default': 'defaultAction'
            },

            initialize: function () {
                viewManager.addViews(views);
            },
            loginAction: function () {
                loginView.show();
            },
            registerAction: function () {
                registerView.show();
            },
            scoreboardAction: function () {
                scoreboardView.show();
            },
            gameAction: function () {
                gameView.show();
            },
            defaultAction: function () {
                mainView.show();
            }
        });

        return new Router();
    }
);