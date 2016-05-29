define(function (require) {

        var $ = require('jquery'),
            Backbone = require('backbone'),
            _ = require('underscore'),
            BaseView = require('views/base'),
            tmpl = require('tmpl/login'),
            User = require('models/user');

        var LoginView = BaseView.extend({
            template: tmpl,

            events: {
                'submit #loginForm': 'submit'
            },

            initialize: function() {
                this.$page = $('#page');
                this.$page.append(this.el);
                this.render();
                this.fields = {
                    login: this.$el.find('#loginInput'),
                    password: this.$el.find('#passwordInput')
                };
                this.errorFields = {
                    login: this.$el.find('#loginError'),
                    password: this.$el.find('#passwordError')
                };
                this.hide();
            },

            show: function() {
                this.$page.append(this.el);
                _.each(this.fields, function(field) {
                    field.val('');
                });
                _.each(this.errorFields, function (errorField) {
                    errorField.text('');
                });
                this.$el.show();
                this.trigger('show', this);
            },

            handleAuth: function() {
                Backbone.history.navigate('', true);
            },

            submit: function (event) {
                event.preventDefault();
                var user = new User();
                this.listenToOnce(user, 'authSuccess', this.handleAuth());
                var uData = {
                    login: this.fields.login.val(),
                    password: this.fields.password.val()
                };
                var errors = user.validate(uData);

                _.each(this.errorFields, function(errorField) {
                    errorField.text('');
                });

                if(errors && errors.length) {
                    _.each(errors, function(error) {
                        if(this.errorFields[error.field]) {
                            this.errorFields[error.field].text(error.error);
                        }
                    }.bind(this));
                }
                else
                {
                    user.login(uData.login, uData.password);
                }
            }
        });

        return new LoginView();
    }
);