define(function (require) {

        var $ = require('jquery'),
            Backbone = require('backbone'),
            _ = require('underscore'),
            BaseView = require('views/base'),
            tmpl = require('tmpl/login'),
            user = require('models/user');

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
                this.$el.appendTo("#page");
                this.$el.show();
                this.trigger('show', this);
                this.listenTo(user, 'checkOk', this.onCheckOk);
                this.listenTo(user, 'checkFail', this.onCheckFail);
                if(user.get('isAuth') && user.get('login') !== "") {
                    Backbone.history.navigate('#menu', true);
                    return;
                } else {
                    user.checkData();
                }
                _.each(this.fields, function(field) {
                    field.val('');
                });
                _.each(this.errorFields, function (errorField) {
                    errorField.text('');
                });
                this.listenToOnce(user, 'authDone', this.handleAuth);
            },
            
            onCheckOk: function() {
                Backbone.history.navigate('#menu', true);
            },
            
            onCheckFail: function () {
                
            },

            handleAuth: function() {
                Backbone.history.navigate('#menu', true);
            },

            hide: function () {
                this.$el.hide();
                this.stopListening(user, 'checkOk', this.onCheckOk);
                this.stopListening(user, 'checkFail', this.onCheckFail);
            },

            submit: function (event) {
                event.preventDefault();
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