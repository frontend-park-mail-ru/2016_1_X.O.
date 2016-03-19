define(function(require) {
    var $ = require('jquery'),
        Backbone = require('backbone');

    var UserModel = Backbone.Model.extend({
        defaults: {
            email: '',
            login: '',
            password: ''
        },

        validate: function(data) {
            var errors = [];

            var emailRegexp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                passwRegexp = /^[0-9a-zA-Z]{1,16}$/,
                loginRegexp = /^[0-9a-zA-Z]{1,16}$/;


            if($.trim(data.email) === '') {
                errors.push({
                    field: 'email',
                    error: 'Where is your email bro?'
                });
            }
            else if(!emailRegexp.test($.trim(data.email))) {
                errors.push({
                    field: 'email',
                    error: 'Wrong email bro!'
                });
            }


            if($.trim(data.login) === '') {
                errors.push({
                    field: 'login',
                    error: 'Where is your login bro?'
                });
            }
            else if(!loginRegexp.test($.trim(data.login))) {
                errors.push({
                    field: 'login',
                    error: 'Wrong login bro!'
                });
            }

            if($.trim(data.password) === '') {
                errors.push({
                    field: 'password',
                    error: 'Where is your password bro?'
                });
            }
            else if(!passwRegexp.test($.trim(data.password))) {
                errors.push({
                    field: 'password',
                    error: 'Wrong password bro!'
                });
            }

            if(errors.length) {
                return errors;
            }
        }
    });

    return UserModel;
});