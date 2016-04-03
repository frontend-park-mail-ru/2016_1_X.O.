define(function (require) {
    var Backbone = require('backbone');
    var ScoreModel = require('models/score');
    QUnit.module('models/score');

    QUnit.test("scoreModel - экземпляр Backbone.Model", function () {
        var scoreModel = new ScoreModel();
        QUnit.ok(scoreModel instanceof Backbone.Model, "scoreModel - экземпляр Backbone.Model");
    });
});
