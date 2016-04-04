define(function (require) {

        var Backbone = require('backbone'),
            _ = require('underscore'),
            BaseView = require('views/base'),
            tmpl = require('tmpl/register'),
            User = require('models/user');

        var RegisterView = BaseView.extend({
            template: tmpl,

            initialize: function () {
                this.$page = $('#page');
                this.$page.append(this.el);
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
                this.hide();
            },

            show: function () {
                this.$page.append(this.el);
                this.fields.email.val('');
                this.fields.login.val('');
                this.fields.password.val('');
                _.each(this.errorFields, function (item) {
                    item.text('');
                });
                this.$el.show();
                this.trigger('show', this);
                var video = document.querySelector('.b-shia .b-shia__container video');
                video.style.visibility = "hidden";
                video.src = "/../video/shia.webm";
                video.load();
                video.style.visibility = "visible";
                video.play();
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

                var user = new User();
                var errors = user.validate(uData);

                _.each(this.errorFields, function (item) {
                    item.text('');
                });

                if (errors && errors.length) {
                    _.each(errors, function (error) {
                        if (this.errorFields[error.field]) {
                            this.errorFields[error.field].text(error.error);
                        }
                    }.bind(this));
                }
                else {
                    user.set({email: uData.email, login: uData.login, password: uData.password});
                    Backbone.history.navigate('', true);
                }

            }
        });

        return new RegisterView();
    }
);