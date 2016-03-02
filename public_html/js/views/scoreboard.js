define(function (require) {

        var Backbone = require('backbone'),
            tmpl = require('tmpl/scoreboard');

        var scoreboardView = Backbone.View.extend({
            template: tmpl,

            initialize: function () {
                //TODO
            },

            render: function () {
            },

            show: function () {

            },

            hide: function () {

            }
        });

        return new scoreboardView();
    }
);