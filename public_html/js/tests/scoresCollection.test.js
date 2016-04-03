define(function(require) {
    var Backbone = require('backbone');
    var scoreCollection = require('collections/scores');

    QUnit.module('collections/scores');

    QUnit.test("scoreCollection - экземпляр Backbone.Collection", function () {
        QUnit.ok(scoreCollection instanceof Backbone.Collection, "scoreCollection - экземпляр Backbone.Collection");
    });

    QUnit.test('Сортировка', function() {
        var scoreCollectionJSON = scoreCollection.toJSON();
        var crap = true;
        for (var i = 1; i < scoreCollectionJSON.length; i++) {
            if(scoreCollectionJSON[i-1].score < scoreCollectionJSON[i].score) {
                crap = false;
                break;
            }
        }
        QUnit.ok(crap, "sorted");
    });
});