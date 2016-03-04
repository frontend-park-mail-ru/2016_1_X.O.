define(function (require) {

        var Backbone = require('backbone'),
            BaseView = require('views/base'),
            tmpl = require('tmpl/login'),
            User = require('models/user');

        var LoginView = BaseView.extend({
            template: tmpl,

            events: {
                'submit #login-form': 'submit'
            },

            submit: function(event) {
                event.preventDefault();
                var u = new User();
                u.set({email: this.$('#email-input').val(), password: this.$('#password-input').val()});
                alert('email: ' + u.get('email').toString() +'\npassword: ' + u.get('password').toString());
                Backbone.history.navigate('', true);
            }
        });

        return new LoginView();
    }
);