define(function (require) {

        var Backbone = require('backbone'),
            BaseView = require('views/base'),
            tmpl = require('tmpl/menu'),
            alertify = require('alertify'),
            user = require('models/user');

        var MenuView = BaseView.extend({
            template: tmpl,
            
            events: {
                'click #logout': 'handleLogout',
                'click #info': 'handleInfo'
            },
            
            show: function () {
                this.$el.appendTo("#page");
                this.$el.show();
                this.trigger('show', this);
                this.preloaderOut();
                if(user.get('isAuth') === false) {
                    Backbone.history.navigate('#', true);
                }
                user.getScore();
            },
            
            handleLogout: function(event) {
                event.preventDefault();
                user.logout();
            },

            handleInfo: function (event) {
                event.preventDefault();
                if(user.get('isAuth') === false) {
                    alertify.alert('Tic tac toe', 'You are not logged in bro!', function () {
                        Backbone.history.navigate('#', true);
                    });
                }
                alertify.alert('Tic tac toe', 'Login: ' + user.get('login') + '<br/> Score: ' + user.get('score'));
            }
        });

        return new MenuView();
    }
);