define(function (require) {

        var $ = require('jquery'),
            Backbone = require('backbone'),
            _ = require('underscore'),
            BaseView = require('views/base'),
            tmpl = require('tmpl/login'),
            session = require('models/session'),
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

            submit: function (event) {
                event.preventDefault();
                var user = new User();
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
                    $.ajax({
                        url: "/session",
                        method: "PUT",
                        data: {
                            login: uData.login,
                            password: uData.password
                        }
                    }).done(function(data){
                        data = JSON.parse(data);
                        var id = data.id;
                        $.ajax({
                            url: "/user",
                            method: "GET",
                            data: {
                                id: id
                            }
                        }).done(function(data){
                            console.log(data);
                            alert('success');
                            //TODO
                            Backbone.history.navigate('', true);
                        });
                    }).fail(function(response) {
                        alert(user.handleServerError(response.responseText));
                    });
                }
            }
        });

        return new LoginView();
    }
);