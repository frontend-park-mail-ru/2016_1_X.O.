define(function (require) {
        var Backbone = require('backbone');


        var BaseView = Backbone.View.extend({
            template: {},
            initialize: function () {
                this.$page = $('#page');
                this.$page.append(this.el);
                this.render();
                this.hide();
            },
            render: function () {
                this.$el.html(this.template);
                return this;
            },
            show: function () {
                this.$el.appendTo("#page");
                this.$el.show();
                this.trigger('show', this);
            },
            hide: function () {
                this.$el.hide();
            }
        });

        return BaseView;
    }
);
