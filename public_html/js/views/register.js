define(function (require) {

        var Backbone = require('backbone'),
            BaseView = require('views/base'),
            tmpl = require('tmpl/register'),
            User = require('models/user');

        var RegisterView = BaseView.extend({
            template: tmpl,

            events: {
                'submit #register-form': 'submit'
            },

            submit: function() {
                var u = new User();
                u.email = this.$('#email-input').val();
                u.password = this.$('#password-input').val();
                alert('email: ' + u.email.toString() +'\npassword: ' + u.password.toString());
            }
        });

        return new RegisterView();
    }
);