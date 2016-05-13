define(function(require) {
    var Backbone = require('backbone'),
        _ = require('underscore');

    var UserModel = Backbone.Model.extend({
        defaults: {
            email: "",
            login: ""
        },

        urlRoot: "/user",

        sync: function (method, model, options) {
            if (method === "create") {
                method = "update";
            }
            options || (options = {});
            options.url = this.urlRoot;
            return Backbone.sync.apply(this, arguments)
        },

        save : function(key, value, options) {

            var attributes={}, opts={};

            //Need to use the same conditional that Backbone is using
            //in its default save so that attributes and options
            //are properly passed on to the prototype
            if (_.isObject(key) || key == null) {
                attributes = key;
                opts = value;
            } else {
                attributes = {};
                attributes[key] = value;
                opts = options;
            }

            //Since backbone will post all the fields at once, we
            //need a way to post only the fields we want. So we can do this
            //by passing in a JSON in the "key" position of the args. This will
            //be assigned to opts.data. Backbone.sync will evaluate options.data
            //and if it exists will use it instead of the entire JSON.
            if (opts && attributes) {
                opts.data = JSON.stringify(attributes);
                opts.contentType = "application/json";
            }

            //Finally, make a call to the default save now that we've
            //got all the details worked out.
            return Backbone.Model.prototype.save.call(this, attributes, opts);
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

    return new UserModel();
});