define(function (require) {
    var Backbone = require('backbone'),
        $ = require('jquery'),
        _ = require('underscore'),
        BaseView = require('views/base'),
        tmpl = require('tmpl/register'),
        session = require('models/session'),
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
            this.$page.append(this.el);
            _.each(this.fields, function (field) {
                field.val('');
            });
            _.each(this.errorFields, function (errorField) {
                errorField.text('');
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
                // user.save({
                //         email: uData.email,
                //         login: uData.login,
                //         password: uData.password
                //     },
                //     {
                //         success: function (model, response) {
                //             session.save({
                //                 login: uData.login,
                //                 password: uData.password
                //             }, {
                //                 success: function (model, response) {
                //                     alert('success');
                //                     //TODO
                //                 },
                //                 error: function (model, response) {
                //                     console.log(model.toJSON());
                //                     alert(user.handleServerError(response.responseText));
                //                 }
                //             })
                //         },
                //         error: function (model, response) {
                //             console.log(model.toJSON());
                //             alert(user.handleServerError(response.responseText));
                //         }
                //     });
                $.ajax({
                    url: "/user",
                    method: "PUT",
                    data: uData
                }).done(function () {
                    $.ajax({
                        url: "/session",
                        method: "PUT",
                        data: {
                            login: uData.login,
                            password: uData.password
                        }
                    }).done(function () {
                        alert('success');
                        //TODO
                        Backbone.history.navigate('', true);
                    });
                }).fail(function (response) {
                    alert(user.handleServerError(response.responseText));
                });
            }
        }
    });
    return new RegisterView();
});
