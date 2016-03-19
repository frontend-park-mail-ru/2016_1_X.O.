define(function (require) {

        var Backbone = require('backbone'),
            BaseView = require('views/base'),
            tmpl = require('tmpl/login'),
            User = require('models/user');

        var LoginView = BaseView.extend({
            template: tmpl,

            events: {
                'submit #loginForm': 'submit'
            },

            submit: function (event) {
                event.preventDefault();
                Backbone.history.navigate('', true);
            }

        });

        return new LoginView();
    }
);