define(function(require) {

    var Backbone = require('backbone');

    var ScoreModel = Backbone.Model.extend({
        defaults: {
            name: '',
            score: 0
        }
    });

    return ScoreModel;
});