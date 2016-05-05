define(function(require) {
    var Backbone = require('backbone');

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


            if(data.email === '') {
                errors.push({
                    field: 'email',
                    error: 'Where is your email bro?'
                });
            }
            else if(!emailRegexp.test(data.email)) {
                errors.push({
                    field: 'email',
                    error: 'Wrong email bro!'
                });
            }


            if(data.login === '') {
                errors.push({
                    field: 'login',
                    error: 'Where is your login bro?'
                });
            }
            else if(!loginRegexp.test(data.login)) {
                errors.push({
                    field: 'login',
                    error: 'Wrong login bro!'
                });
            }

            if(data.password === '') {
                errors.push({
                    field: 'password',
                    error: 'Where is your password bro?'
                });
            }
            else if(!passwRegexp.test(data.password)) {
                errors.push({
                    field: 'password',
                    error: 'Wrong password bro!'
                });
            }

            if(errors.length) {
                return errors;
            }
        },

        handleServerError: function(data) {
            data = JSON.parse(data);
            console.log(data);
            switch(data.error){
                case 1:
                    return "BAD_INPUT_DATA";
                    break;
                case 2:
                    return "LOGIN_REQUIRED";
                    break;
                case 101:
                    return "LOGIN_IN_USE";
                    break;
                case 102:
                    return "EMAIL_IN_USE";
                    break;
                case 103:
                    return "BAD_LOGIN";
                    break;
                case 104:
                    return "BAD_EMAIL";
                    break;
                case 105:
                    return "BAD_PASSWORD";
                    break;
                case 106:
                    return "BAD_ID";
                    break;
                case 107:
                    return "WRONG_CREDENTIALS";
                    break;
                case 108:
                    return "NO_USER";
                    break;
                default:
                    return "Unknown error"
            }
        }
    });

    return UserModel;
});