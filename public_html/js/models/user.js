define(function(require) {
    var Backbone = require('backbone');

    var UserModel = Backbone.Model.extend({
        defaults: {
            email: '',
            login: '',
            password: ''
        },

        validateLogin: function(login) {
          var loginRegexp = /^[0-9a-zA-Z]{1,16}$/;
          if(login === '') {
              return {
                  field: 'login',
                  error: 'Where is your login bro?'
              }
          }
          else if(!loginRegexp.test(login)) {
              return {
                  field: 'login',
                  error: 'Wrong login bro!'
              }
          }
        },

        validateEmail: function(email) {
          var emailRegexp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
          if(email === '') {
              return {
                  field: 'email',
                  error: 'Where is your email bro?'
              }
          }
          else if(!emailRegexp.test(email)) {
              return {
                  field: 'email',
                  error: 'Wrong email bro!'
              }
          }
        },

        validatePass: function(password) {
          var passwRegexp = /^[0-9a-zA-Z]{1,16}$/;
          if(password === '') {
              return {
                  field: 'password',
                  error:'Where is your password bro?'
              }
          }
          else if(!passwRegexp.test(password)) {
              return {
                  field: 'password',
                  error: 'Wrong password bro!'
              }
          }
        }
    });

    return UserModel;
});
