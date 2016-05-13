define(function (require) {
        var Backbone = require('backbone');

        var SquareModel = Backbone.Model.extend({
            defaults: {
                size: 40,
                value: 0,
                isClickable: true
            },

            setInit: function (posX, posY, id) {
                this.set({
                    'posX': posX,
                    'posY': posY,
                    'id': id
                });
            },

            initialize: function (posX, posY, id) {
                this.setInit(posX, posY, id);
            },

            isInside: function (x, y) {
                if (!this.get('isClickable')) {
                    return false;
                }
                
                var x0 = this.get('posX'),
                    y0 = this.get('posY'),
                    half = this.get('size') / 2;
                
                return x0 - half <= x && y0 - half <= y && x0 + half >= x && y0 + half >= y
            },

            handleClick: function (x, y, playerModel) {
                if (!this.isInside(x, y)) {
                    return;
                }
                this.set({
                    'value': playerModel,
                    'isClickable': false
                });
                //playerModel.changePlayer();
                this.trigger(this.get('id').toString());
            }

        });
        return SquareModel;
    }
);