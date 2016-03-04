define(function (require) {
    var Backbone = require('backbone');
    var ScoreModel = require('models/score');
    QUnit.module('models/score');

    QUnit.test("scoreModel - экземпляр Backbone.Model", function (assert) {
        var scoreModel = new ScoreModel();
        assert.ok(scoreModel instanceof Backbone.Model);
    });
});
