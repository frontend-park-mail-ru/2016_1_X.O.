define(function (require) {

    var Backbone = require('backbone');

    var SinglePlayerModel = Backbone.Model.extend({
        defaults: {
            id: 1
        },

        changePlayer: function () {
            if (this.get('id') === 1) {
                this.set({'id': -1});
            } else {
                this.set({'id': 1});
            }
        }
    });

    return SinglePlayerModel;
});
