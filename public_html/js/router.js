define(function (require) {
        var Backbone = require('backbone'),
            mainView = require('views/main'),
            loginView = require('views/login'),
            registerView = require('views/register'),
            scoreboardView = require('views/scoreboard'),
            gameView = require('views/game'),
            canvasView = require('views/canvas'),
            viewManager = require('views/manager');

        var Router = Backbone.Router.extend({
            routes: {
                'login': 'loginAction',
                'register': 'registerAction',
                'scoreboard': 'scoreboardAction',
                'game': 'gameAction',
                'canvas': 'canvasAction',
                '*default': 'defaultAction'
            },

            initialize: function () {
                viewManager.addView(mainView);
                viewManager.addView(loginView);
                viewManager.addView(registerView);
                viewManager.addView(scoreboardView);
                viewManager.addView(gameView);
                viewManager.addView(canvasView);
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
            },
            canvasAction: function() {
                canvasView.show();
            }
        });

        return new Router();
    }
);