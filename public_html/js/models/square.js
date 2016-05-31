define(function (require) {
        var Backbone = require('backbone');

        var SquareModel = Backbone.Model.extend({
            defaults: {
                size: 40,
                value: 0,
                isClickable: true
            },

            initialize: function (posX, posY, id, parentId, socket) {
                this.set({
                    'posX': posX,
                    'posY': posY,
                    'id': id,
                    'parentId': parentId,
                    'socket': socket
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
                    x0 - half <= x && y0 - half <= y &&
                    x0 + half >= x && y0 + half >= y
                ) {
                    this.set({'value': playerModel.get('id'), 'isClickable': false});
                    playerModel.changePlayer();
                    this.trigger('socketSend', this);
                    this.get('socket').send((this.get('parentId') - 1) + '.' + (this.get('id') - 1));
                    return this.get('id');
                }
            }

        });
        return SquareModel;
    }
);