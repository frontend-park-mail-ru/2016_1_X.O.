define(function(require) {
    var Backbone = require('backbone'),
        $ = require('jquery');

    var UserModel = Backbone.Model.extend({
        defaults: {
            login: "",
            id: 0,
            isAuth: false,
            sessionUrl: "/session",
            userUrl: "/user"
        },

        getId: function() {
            var self = this;
            $.ajax({
                url: this.get('sessionUrl'),
                method: "GET"
            }).done(function (resp) {
                console.log('get done');
                var parsed = JSON.parse(resp);
                self.set({
                    'isAuth': true,
                    'id': parsed.id
                });
                self.trigger("authDone", alert('aaaa'));
            }).fail(function (response) {
                console.log('get fail');
                self.handleServerError(response.responseText);
            });
        },

        login: function(uLogin, uPassword) {
            var self = this;
            $.ajax({
                url: self.get('sessionUrl'),
                method: "PUT",
                data: {
                    login: uLogin,
                    password: uPassword
                }
            }).done(function () {
                console.log('log done');
                self.getId();
            }).fail(function (response) {
                console.log('log fail');
                self.handleServerError(response.responseText);
            });
        },

        register: function(uEmail, uLogin, uPassword) {
            var self = this;
            $.ajax({
                url: self.get('userUrl'),
                method: "PUT",
                data: {
                    email: uEmail,
                    login: uLogin,
                    password: uPassword
                }
            }).done(function () {
                console.log('reg done');
                self.login(uLogin, uPassword);
            }).fail(function (response) {
                console.log('reg fail');
                self.handleServerError(response.responseText);
            });
        },

        logout: function () {
            var self = this;
            $.ajax({
                method: "DELETE",
                url: "/session"
            }).done(function(){
                self.set({
                    'isAuth': false
                })
            }).fail(function(response){
                self.handleServerError(response.responseText);
            })
        },

        validate: function(data) {
            var errors = [];

            var emailRegexp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                passwRegexp = /^[0-9a-zA-Z]{1,16}$/,
                loginRegexp = /^[0-9a-zA-Z]{1,16}$/;

            if(data.email !== undefined) {
                if (data.email === '') {
                    errors.push({
                        field: 'email',
                        error: 'Where is your email bro?'
                    });
                }
                else if (!emailRegexp.test(data.email)) {
                    errors.push({
                        field: 'email',
                        error: 'Wrong email bro!'
                    });
                }
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
            var responseMap = {
                    1: "BAD_INPUT_DATA",
                    2: "LOGIN_REQUIRED",
                    101: "LOGIN_IN_USE",
                    102: "EMAIL_IN_USE",
                    103: "BAD_LOGIN",
                    104: "BAD_EMAIL",
                    105: "BAD_PASSWORD",
                    106: "BAD_ID",
                    107: "WRONG_CREDENTIALS",
                    108: "NO_USER"
            };
            if (responseMap[data.error]) {
                //TODO
                console.log(responseMap[data.error])
            }
            else {
                //TODO
                console.log('unknown error');
            }
        }
    });

    return UserModel;
});