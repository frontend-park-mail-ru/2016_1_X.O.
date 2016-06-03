define(function (require) {
    QUnit.module('models/user');

    QUnit.test("userModel - экземпляр Backbone.Model", function (assert) {
        var Backbone = require('backbone');
        var userModel = require('models/user');
        assert.ok(userModel instanceof Backbone.Model, "userModel - экземпляр Backbone.Model");
    });
});