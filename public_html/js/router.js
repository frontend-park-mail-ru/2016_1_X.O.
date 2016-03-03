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
                this.$page = $('#page');
            },
            loginAction: function () {
                this.$page.html(LoginView.render().$el)
            },
            registerAction: function () {
                this.$page.html(RegisterView.render().$el)
            },
            scoreboardAction: function () {
                this.$page.html(ScoreboardView.render().$el)
            },
            gameAction: function () {
                this.$page.html(GameView.render().$el)
            },
            defaultAction: function () {
                this.$page.html(MainView.render().$el)
            }
        });

        return new Router();
    }
);