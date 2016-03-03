define(function (require) {

        var Backbone = require('backbone'),
            BaseView = require('views/base'),
            tmpl = require('tmpl/scoreboard'),
            ScoreboardCollection = require('collections/scores');

        var ScoreboardView = BaseView.extend({
            template: tmpl,

            render: function () {
                this.$el.html(this.template({scores: ScoreboardCollection.toJSON()}));
                return this;
            },

            collection: ScoreboardCollection
        });

        return new ScoreboardView();
    }
);
