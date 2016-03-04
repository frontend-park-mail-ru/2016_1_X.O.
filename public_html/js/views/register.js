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

            submit: function(event) {
                event.preventDefault();
                var u = new User();
                u.set({email: this.$('#email-input').val(), password: this.$('#password-input').val()});
                alert('email: ' + u.get('email').toString() +'\npassword: ' + u.get('password').toString());
                Backbone.history.navigate('', true);
            }
        });

        return new RegisterView();
    }
);