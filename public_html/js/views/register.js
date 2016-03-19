define(function (require) {

        var Backbone = require('backbone'),
            _ = require('underscore'),
            BaseView = require('views/base'),
            tmpl = require('tmpl/register'),
            User = require('models/user');

        var RegisterView = BaseView.extend({
            template: tmpl,

            initialize: function() {
                this.render();
                this.fields = {
                    email: this.$el.find('#emailInput'),
                    login: this.$el.find('#loginInput'),
                    password: this.$el.find('#passwordInput')
                };
                this.errorFields = {
                    email: this.$el.find('#emailError'),
                    login: this.$el.find('#loginError'),
                    password: this.$el.find('#passwordError')
                };
            },

            events: {
                'submit #registerForm': 'submit'
            },

            submit: function (event) {
                event.preventDefault();
                var uData = {
                    email: this.fields.email.val(),
                    login: this.fields.login.val(),
                    password: this.fields.password.val()
                };
                var u = new User();
                var errors = u.validate(uData);

                _.each(this.errorFields, function(item) {
                    item.text('');
                });

                if(errors != undefined && errors.length) {
                    var errorFields = this.errorFields;
                    _.each(errors, function(error) {
                        if(errorFields[error.field] !== undefined) {
                            errorFields[error.field].text(error.error);
                        }
                    });
                }
                else
                {
                    Backbone.history.navigate('', true);
                }

            }
        });

        return new RegisterView();
    }
);