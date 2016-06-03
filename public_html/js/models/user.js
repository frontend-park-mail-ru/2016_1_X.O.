define(function(require) {
    var Backbone = require('backbone'),
        $ = require('jquery'),
        alertify = require('alertify');

    var UserModel = Backbone.Model.extend({
        defaults: {
            login: "",
            score: 0,
            id: 0,
            isAuth: false,
            sessionUrl: "/session",
            userUrl: "/user"
        },
        
        getScore: function() {
            var self = this;
            $.ajax({
                url: this.get('userUrl'),
                method: "GET",
                data: {
                    'id': self.get('id')
                }
            }).done(function (resp) {
                var parsed = JSON.parse(resp);
                self.set({
                    'score': parsed.score
                });
            }).fail(function (response) {
                alertify.alert('Tic tac toe', 'Server error');
            });
        },

        getId: function() {
            var self = this;
            $.ajax({
                url: this.get('sessionUrl'),
                method: "GET"
            }).done(function (resp) {
                var parsed = JSON.parse(resp);
                self.set({
                    'isAuth': true,
                    'id': parsed.id
                });
                self.trigger("authDone", alertify.alert('TicTacToe', 'Welcome, ' + self.get('login')));
            }).fail(function (response) {
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
                self.getId();
                self.set({
                    'login': uLogin
                })
            }).fail(function (response) {
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
                self.login(uLogin, uPassword);
            }).fail(function (response) {
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
                });
                alertify.alert('TicTacToe', 'Good bye, ' + self.get('login'));
                Backbone.history.navigate('', true);
            }).fail(function(response){
                self.handleServerError(response.responseText);
                Backbone.history.navigate('', true);
            })
        },

        validate: function(data) {
            var errors = [];

            var emailRegexp = /^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$/,
                passwRegexp = /^[0-9a-zA-Z]{5,20}$/,
                loginRegexp = /^[0-9a-zA-Z]{5,20}$/;

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
                        error: 'Bad email bro!'
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
                    error: 'Bad login bro!'
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
                    error: 'Bad password bro!'
                });
            }

            if(errors.length) {
                return errors;
            }
        },

        handleServerError: function(data) {
            data = JSON.parse(data);
            var responseMap = {
                    1: "Bad input data",
                    2: "Login required",
                    101: "Login in use",
                    102: "Email in use",
                    103: "Bad login",
                    104: "Bad email",
                    105: "Bad password",
                    106: "Bad id",
                    107: "Wrong credentials",
                    108: "No user"
            };
            if (responseMap[data.error]) {
                alertify.alert('Server error', responseMap[data.error] + ' bro!');
            }
            else {
                alertify.alert('Server error', 'Unknown error bro!');
            }
        }
        
    });

    return new UserModel();
});