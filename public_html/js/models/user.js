define(function(require) {
    var Backbone = require('backbone');

    var UserModel = Backbone.Model.extend({
        defaults: {
            email: '',
            password: ''
        }
    });

    return UserModel;
});