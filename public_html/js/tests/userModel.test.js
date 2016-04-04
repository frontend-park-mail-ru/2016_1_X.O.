define(function (require) {
    QUnit.module('models/user');

    QUnit.test("userModel - экземпляр Backbone.Model", function (assert) {
        var Backbone = require('backbone');
        var UserModel = require('models/user');
        var userModel = new UserModel();
        assert.ok(userModel instanceof Backbone.Model, "userModel - экземпляр Backbone.Model");
    });
});