define(function (require) {

        var Backbone = require('backbone'),
            BaseView = require('views/base'),
            tmpl = require('tmpl/menu'),
            user = require('models/user');

        var MenuView = BaseView.extend({
            template: tmpl,
            
            events: {
                'click #logout': 'handleLogout'
            },
            
            show: function () {
                this.$el.appendTo("#page");
                this.$el.show();
                this.trigger('show', this);
                if(user.get('isAuth') === false) {
                    Backbone.history.navigate('#', true);
                }
            },
            
            handleLogout: function(event) {
                event.preventDefault();
                user.logout();
            }
        });

        return new MenuView();
    }
);