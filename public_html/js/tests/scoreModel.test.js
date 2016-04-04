define(function (require) {
    QUnit.module('models/score');

    QUnit.test("scoreModel - экземпляр Backbone.Model", function (assert) {
        var Backbone = require('backbone');
        var ScoreModel = require('models/score');
        
        var scoreModel = new ScoreModel();
        assert.ok(scoreModel instanceof Backbone.Model, "scoreModel - экземпляр Backbone.Model");
    });
});
