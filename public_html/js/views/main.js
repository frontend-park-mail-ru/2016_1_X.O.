define(function (require) {

        var Backbone = require('backbone'),
            BaseView = require('views/base'),
            user = require('models/user'),
            tmpl = require('tmpl/main');

        var MainView = BaseView.extend({
            template: tmpl,

            show: function () {
                this.$el.appendTo("#page");
                this.$el.show();
                this.trigger('show', this);
                if(user.get('isAuth')) {
                    Backbone.history.navigate('#menu', true);
                }
            }

        });

        return new MainView();
    }
);