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
            this.video = document.querySelector('.b-shia .b-shia__container video');
            this.video.style.visibility = "hidden";
            this.video.src = "/../video/shia.webm";
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
            this.video.load();
            this.video.style.visibility = "visible";
            this.video.play();
        },

        hide: function () {
            this.video.style.visibility = "hidden";
            this.video.pause();
            this.$el.hide();
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
                },

                user = new User(),

                errors = [
                    user.validateEmail(uData.email),
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

    return new RegisterView();
});
