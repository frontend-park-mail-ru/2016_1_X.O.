define(function (require) {
        var Backbone = require('backbone'),
            _ = require('underscore'),
            SquareModel = require('models/square'),
            SquaresCollection = require('collections/squares');

        var BlockModel = SquareModel.extend({
            defaults: {
                size: 180,
                value: 0,
                intervalBetweenRect: 20,
                isClickable: true,
                isFinished: false
            },

            initialize: function (posX, posY, id) {
                this.setInit(posX, posY, id);
                this.doCreate();
            },

            doCreate: function () {
                var currentX = 0,
                    currentY = 0,
                    squareX = 60,
                    squareY = 60,
                    x0 = this.get('posX') - squareX,
                    y0 = this.get('posY') - squareY;

                this.set({
                    'collection': new SquaresCollection(x0, y0, currentX, currentY,
                    this.get('intervalBetweenRect'))
                });
            },

            check: function () {
                var values = [],
                    i;

                if (this.get('isFinished')) {
                    return;
                }

                _.forEach(this.get('collection').models, function (square) {
                    values.push(square.get('value'));
                });
                //ряд
                for (i = 0; i < 9; i++) {
                    if (values[i] && (values[i] === values[i + 1]) && (values[i] === values[i + 2])) {
                        this.set({
                            'isFinished': true, 
                            'isClickable': false, 
                            'value': values[i]
                        });
                        return;
                    }
                    i += 2;
                }
                //колонна
                for (i = 0; i < 3; i++) {
                    if (values[i] && (values[i] === values[i + 3]) && (values[i] === values[i + 6])) {
                        this.set({
                            'isFinished': true,
                            'isClickable': false,
                            'value': values[i]
                        });
                        return;
                    }
                }
                //диагональ
                if (values[0] && (values[0] === values[4]) && (values[0]) === values[8]) {
                    this.set({
                        'isFinished': true,
                        'isClickable': false,
                        'value': values[0]
                    });
                    return;
                }

                //побочная диагональ
                if (values[2] && (values[2] === values[4]) && (values[2]) === values[6]) {
                    this.set({
                        'isFinished': true,
                        'isClickable': false, 
                        'value': values[2]
                    });
                    return;
                }

                //ничья
                for (i = 0; i < 9; i++) {
                    if (!values[i]) {
                        return;
                    }
                }
                this.set({
                    'isFinished': true, 
                    'isClickable': false
                });
            }
        });
        return BlockModel;
    }
);