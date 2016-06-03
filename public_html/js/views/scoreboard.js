define(function (require) {

        var Backbone = require('backbone'),
            $ = require('jquery'),
            BaseView = require('views/base'),
            tmpl = require('tmpl/scoreboard'),
            scoreboardCollection = require('collections/scores');

        var ScoreboardView = BaseView.extend({
            template: tmpl,

            initialize: function () {
                this.$page = $('#page');
                this.$page.append(this.el);
                this.render();
                this.hide();
            },

            render: function () {
                this.$el.html(this.template({scores: scoreboardCollection.toJSON()}));
                return this;
            },

            show: function () {
                var self = this;
                scoreboardCollection.reset();
                $.ajax({
                    url: '/top',
                    method: "GET"
                }).done(function (resp) {
                    var parsed = JSON.parse(resp);
                    parsed.topUsers.forEach(function(user) {
                        scoreboardCollection.add({
                            'name': user.login,
                            'score': user.score
                        })
                    }.bind(self));
                    self.render();
                    self.$el.appendTo("#page");
                    self.$el.show();
                    self.trigger('show', self);
                }).fail(function (response) {
                    console.log(response.responseText);
                    Backbone.history.navigate('#menu', true);
                });
            }
        });

        return new ScoreboardView();
    }
);
