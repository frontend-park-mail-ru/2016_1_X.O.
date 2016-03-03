define(function (require) {

    var Backbone = require('backbone'),
        Score = require('models/score');

    var ScoreCollection = Backbone.Collection.extend({
        model: Score,
        comparator: function(score) {
            return -score.get('score');
        }
    });

    return new ScoreCollection(
        [
            {'name': 'A', 'score': 100},
            {'name': 'B', 'score': 20},
            {'name': 'C', 'score': 88},
            {'name': 'D', 'score': 50},
            {'name': 'E', 'score': 42},
            {'name': 'F', 'score': 15},
            {'name': 'G', 'score': 200},
            {'name': 'X', 'score': 10},
            {'name': 'Y', 'score': 1},
            {'name': 'Z', 'score': 23}
        ]
    );
});