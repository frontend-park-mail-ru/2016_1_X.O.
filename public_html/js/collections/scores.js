define(function (require) {

    var Backbone = require('backbone'),
        Score = require('models/score');

    var ScoreCollection = Backbone.Collection.extend({
        model: Score,
        comparator: function(score) {
            return -score.get('score');
        }
    });

    return new ScoreCollection;
});