define(function(require) {

    QUnit.module('collections/scores');

    QUnit.test("scoreCollection - экземпляр Backbone.Collection", function (assert) {
        var Backbone = require('backbone');
        var scoreCollection = require('collections/scores');
        assert.ok(scoreCollection instanceof Backbone.Collection, "scoreCollection - экземпляр Backbone.Collection");
    });

    QUnit.test('Сортировка', function(assert) {
        var Backbone = require('backbone');
        var scores = require('collections/scores');
        for (var j = 0; j < 10; j++) {
            scores.add({'name': Math.random().toString(36).substr(2, Math.floor(Math.random() * 10 + 1)),
                'score': Math.floor(Math.random() * 10000)});
        }
        var scoreCollectionJSON = scores.toJSON();
        var crap = true;
        for (var i = 1; i < scoreCollectionJSON.length; i++) {
            if(scoreCollectionJSON[i-1].score < scoreCollectionJSON[i].score) {
                crap = false;
                break;
            }
        }
        assert.ok(crap, "sorted");
    });
});