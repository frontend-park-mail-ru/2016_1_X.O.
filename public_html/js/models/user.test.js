define(function (require) {
    var Backbone = require('backbone');
    var UserModel = require('models/user');
    QUnit.module('models/score');

    QUnit.test("userModel - экземпляр Backbone.Model", function (assert) {
        var userModel = new UserModel();
        assert.ok(userModel instanceof Backbone.Model);
    });
});