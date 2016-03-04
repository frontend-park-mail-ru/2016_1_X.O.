define(function(require) {
    require('backbone');
    require('underscore');
    var scoreBoard = require('collections/scores');

    QUnit.module('collections/scores');

    QUnit.test('Сортировка', function(assert) {
        var scoreBoardJSON = scoreBoard.toJSON();
        for (var i = 1; i < scoreBoardJSON.length; i++) {
            assert.ok(scoreBoardJSON[i-1].score >= scoreBoardJSON[i].score);
        }
    });
});