define(function (require) {
        var Backbone = require('backbone');

        var SquareModel = Backbone.Model.extend({
            defaults: {
                size: 40,
                isClickable: true,
                value: 0
            },

            initialize: function (posX, posY, id, parentId) {
                this.set({
                    'posX': posX,
                    'posY': posY,
                    'id': id,
                    'parentId': parentId
                });
            },

            onClick: function (x, y) {
                if(this.get('isClickable' === false)) {
                    return;
                }
                var x0 = this.get('posX'),
                    y0 = this.get('posY'),
                    half = this.get('size') / 2;
                
                    if(x0 - half <= x && y0 - half <= y &&
                    x0 + half >= x && y0 + half >= y) {
                        this.set({
                            'value': 1,
                            'isClickable': false
                        });
                        return this;
                    }
            }

        });
        return SquareModel;
    }
);