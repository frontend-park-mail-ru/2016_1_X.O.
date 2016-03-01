define(
    ['backbone', 'views/main', 'views/scoreboard', 'views/game', 'views/login', 'views/register'],
    function (Backbone) {
        var Router = Backbone.Router.extend({
            routes: {
                'scoreboard': 'scoreboardAction',
                'game': 'gameAction',
                'login': 'loginAction',
                '*default': 'defaultActions'
            },
            defaultActions: function () {
                // TODO
            },
            scoreboardAction: function () {
                // TODO
            },
            gameAction: function () {
                // TODO
            },
            loginAction: function () {
                // TODO
            }
        });

        return new Router();
    });