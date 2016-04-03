define(function (require) {
    var Backbone = require('backbone');
    var UserModel = require('models/user');
    QUnit.module('models/user');

    QUnit.test("userModel - экземпляр Backbone.Model", function () {
        var userModel = new UserModel();
        QUnit.ok(userModel instanceof Backbone.Model, "userModel - экземпляр Backbone.Model");
    });
});