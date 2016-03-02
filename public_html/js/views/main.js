define(function (require) {

        var Backbone = require('backbone'),
            tmpl = require('tmpl/main');

        var mainView = Backbone.View.extend({
            template: tmpl,

            initialize: function () {
                this.render();
            },
            render: function () {
                this.$el.html(this.template());
                return this;
            },
            show: function () {
                $('#page').html(this.el);
                this.$el.show();
            },
            hide: function () {
                this.$el.hide();
            }
        });

        return new mainView();
    }
);