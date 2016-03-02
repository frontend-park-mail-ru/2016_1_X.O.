define(function (require) {
        var Backbone = require('backbone'),
            mainView = require('views/main'),
            gameView = require('views/game'),
            loginView = require('views/login'),
            scoreboardView = require('views/scoreboard'),
            registerView = require('views/register');

        var Router = Backbone.Router.extend({
                routes: {
                    '': 'mainAction',
                    'login': 'loginAction',
                    'register': 'registerAction',
                    'scoreboard': 'scoreboardAction',
                    'game': 'gameAction',
                    '*default': 'defaultAction'
                },
                mainAction: function () {
                    mainView.show();
                    console.log('main');
                },
                loginAction: function () {
                    loginView.show();
                    console.log('login');
                },
                registerAction: function () {
                    registerView.show();
                    console.log('reg');
                },
                scoreboardAction: function () {
                    scoreboardView.show();
                    console.log('score');
                },
                gameAction: function () {
                    gameView.show();
                    console.log('game');
                },
                defaultAction: function () {
                    console.log('def');
                }
            }
        );

        return new Router();
    }
);