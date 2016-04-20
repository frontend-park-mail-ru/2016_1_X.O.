define(function (require) {

        var Backbone = require('backbone'),
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
                this.fields.login.val('');
                this.fields.password.val('');
                this.$el.show();
                _.each(this.errorFields, function (item) {
                    item.text('');
                });
                this.trigger('show', this);
            },

            submit: function (event) {
                event.preventDefault();
                var uData = {
                        login: this.fields.login.val(),
                        password: this.fields.password.val()
                    },

                    user = new User(),

                    errors = [
                        user.validateLogin(uData.login),
                        user.validatePass(uData.password)
                    ],

                    crap = 0;

                _.each(this.errorFields, function (item) {
                    item.text('');
                });

                _.each(errors, function (error) {
                    if (error && this.errorFields[error.field]) {
                        this.errorFields[error.field].text(error.error);
                        crap++;
                    }
                }.bind(this));

                if (crap === 0) {
                    //TODO
                }
            }
        });

        return new LoginView();
    }
);