define(function (require) {
    var Backbone = require('backbone'),
        _ = require('underscore');
        user = require('models/user');

    var Session = Backbone.Model.extend({
        defaults: {
            'isAuth': false,
            'id': ''
        },
        urlRoot: '/session',
        initialize: function() {
            this.excludeAttrs = ['isAuth', 'id'];
            this.fetch({
                success: function(model, response) {
                    this.set({
                        'isAuth': true
                    });
                    user.set({
                        'id': response.id
                    });
                }.bind(this),
                error: function(model, response) {
                    this.set({
                        'isAuth': false
                    });
                    alert(user.handleServerError(response.responseText));
                }.bind(this)
            });
            user.on('login', function() {
                this.set('isAuth', true);
                this.trigger('login');
            }.bind(this));
        },

        login: function(data) {
            this.save({
                'login': data.login,
                'password': data.password
            },{
                success: function (model, response) {
                    user.set('id', response.id);
                    user.fetch();
                    this.set({
                        'isAuth': true
                    });
                    this.trigger('login');
                }.bind(this),
                error: function (model, response) {
                    alert(user.handleServerError(response.responseText));
                }.bind(this),
                method: 'put'
            });
        },
        logout: function() {
            this.save(null, {
                success: function() {
                    this.set({
                        'isAuth': false
                    });
                    user.clear();
                }.bind(this),
                error: function (model, response) {
                    alert(user.handleServerError(response.responseText));
                }.bind(this),
                method: 'delete'
            });
        },
        destroy: function(options) {
            this.isNew = function() {return false;};
            Backbone.Model.prototype.destroy.apply(this, arguments);
            this.isNew = Backbone.Model.prototype.isNew;
        },
        save: function (attrs, options) {
            attrs = attrs || this.toJSON();
            options = options || {};
            if (this.excludeAttrs) {
                attrs = _.omit(attrs, this.excludeAttrs);
            }
            options.attrs = attrs;
            Backbone.Model.prototype.save.call(this, attrs, options);
        },

        isLoggedIn: function() {
            return this.get('isAuth');
        }
    });

    return new Session();
});