define(function (require) {
        var Backbone = require('backbone');


        var BaseView = Backbone.View.extend({
            template: {},
            initialize: function () {
                this.render();
            },
            render: function () {
                this.$el.html(this.template);
                return this;
            }
        });

        return BaseView;
    }
);
