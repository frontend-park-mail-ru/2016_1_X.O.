define(function (require) {
    var Backbone = require('backbone'),
        $ = require('jquery'),
        _ = require('underscore'),
        BaseView = require('views/base'),
        tmpl = require('tmpl/register'),
        user = require('models/user');

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
            _.each(this.fields, function (field) {
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
            if($(window).width() >= 800) {
                this.video.load();
                this.video.style.visibility = "visible";
                //На случай прямого запроса на /#register
                this.preloaderOut();
                //
                this.video.play();
            }
        },

        hide: function () {
            this.video.style.visibility = "hidden";
            this.video.pause();
            this.$el.hide();
            this.stopListening(user, 'checkOk', this.onCheckOk);
            this.stopListening(user, 'checkFail', this.onCheckFail);
        },

        events: {
            'submit #registerForm': 'submit'
        },

        handleAuth: function() {
            Backbone.history.navigate('#menu', true);
        },

        submit: function (event) {
            event.preventDefault();
            var uData = {
                email: this.fields.email.val(),
                login: this.fields.login.val(),
                password: this.fields.password.val()
            };
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
                user.register(uData.email, uData.login, uData.password);
            }
        }
    });
    return new RegisterView();
});
