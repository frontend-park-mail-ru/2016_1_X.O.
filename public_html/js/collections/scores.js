define(function (require) {

    var Backbone = require('backbone'),
        Score = require('models/score');

    var ScoreCollection = Backbone.Collection.extend({
        model: Score,
        comparator: function(score) {
            return -score.get('score');
        }
    });

    var scores = new ScoreCollection();
    for (var i = 0; i < 10; i++) {
        scores.add({'name': Math.random().toString(36).substr(2, Math.floor(Math.random() * 10 + 1)),
            'score': Math.floor(Math.random() * 10000)});
    }

    return scores;
});