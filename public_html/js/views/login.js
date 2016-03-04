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

            submit: function() {
                var u = new User();
                u.email = this.$('#email-input').val();
                u.password = this.$('#password-input').val();
                alert('email: ' + u.email.toString() +'\npassword: ' + u.password.toString());
            }
        });

        return new LoginView();
    }
);