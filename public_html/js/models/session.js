define(function (require) {
    var Backbone = require('backbone'),
        _ = require('underscore');
        user = require('models/user');

    var Session = Backbone.Model.extend({
        defaults: {
            'isAuth': false,
            'id': ''
        },
        urlRoot: '/session'
    });

    return new Session();
});