define(function (require) {
        var Backbone = require('backbone');

        var SquareModel = Backbone.Model.extend({
            defaults: {
                size: 40,
                value: 0,
                isClickable: true
            },

            initialize: function (posX, posY, id) {
                this.set({
                    'posX': posX,
                    'posY': posY,
                    'id': id
                });
            },

            onClick: function (x, y, playerModel) {
                var x0 = this.get('posX'),
                    y0 = this.get('posY'),
                    half = this.get('size') / 2;

                if (!this.get('isClickable')) {
                    return;
                }
                if (
                    (x0 - half <= x && y0 - half <= y) &&
                    (x0 - half <= x && y0 + half >= y) &&
                    (x0 + half >= x && y0 - half <= y) &&
                    (x0 + half >= x && y0 + half >= y)
                ) {
                    this.set({'value': playerModel.get('id'), 'isClickable': false});
                    playerModel.changePlayer();
                    return this.get('id');
                }
            }

        });
        return SquareModel;
    }
);