define(function (require) {
        var Backbone = require('backbone'),
            _ = require('underscore'),
            SquareModel = require('models/square');

        var BlockModel = Backbone.Model.extend({
            defaults: {
                size: 180,
                value: 0,
                intervalBetweenRect: 20,
                isClickable: true,
                isFinished: false,
                squareModels: []
            },

            initialize: function (posX, posY, id) {
                this.set({
                    'posX': posX,
                    'posY': posY,
                    'id': id
                });

                var currentX = 0,
                    currentY = 0,
                    squareX = 60,
                    squareY = 60,
                    x0 = this.get('posX') - squareX,
                    y0 = this.get('posY') - squareY;

                for (var i = 1; i <= 9; i++) {
                    this.set({
                        'squareModels': this.get('squareModels').concat(
                            new SquareModel(x0 + currentX, y0 + currentY, i))
                    });
                    if (i === 9) {
                        break;
                    }
                    if (i % 3 === 0) {
                        currentY += this.get('squareModels')[i - 1].get('size') +
                            this.get('intervalBetweenRect');
                        currentX = 0;
                    } else {
                        currentX += this.get('squareModels')[i - 1].get('size') +
                            this.get('intervalBetweenRect');
                    }
                }

            },

            onClick: function (x, y, playerModel) {
                var x0 = this.get('posX'),
                    y0 = this.get('posY'),
                    half = this.get('size') / 2,
                    next;

                this.nextVal = 0;

                if (!this.get('isClickable')) {
                    return;
                }
                if (
                    (x0 - half <= x && y0 - half <= y) &&
                    (x0 - half <= x && y0 + half >= y) &&
                    (x0 + half >= x && y0 - half <= y) &&
                    (x0 + half >= x && y0 + half >= y)
                ) {
                    this.get('squareModels').forEach(function (square) {
                        next = square.onClick(x, y, playerModel);
                        if (next) {
                            this.nextVal = next;
                        }
                    }.bind(this));
                    return this.nextVal;
                }
            },

            check: function () {
                var values = [],
                    i;

                if (this.get('isFinished')) {
                    return;
                }

                this.get('squareModels').forEach(function (square) {
                    values.push(square.get('value'));
                });
                //ряд
                for (i = 0; i < 9; i++) {
                    if (values[i] && (values[i] === values[i + 1]) && (values[i] === values[i + 2])) {
                        this.set({'isFinished': true, 'isClickable': false, 'value': values[i]});
                        return;
                    }
                    i += 2;
                }
                //колонна
                for (i = 0; i < 3; i++) {
                    if (values[i] && (values[i] === values[i + 3]) && (values[i] === values[i + 6])) {
                        this.set({'isFinished': true, 'isClickable': false, 'value': values[i]});
                        return;
                    }
                }
                //диагональ
                if (values[0] && (values[0] === values[4]) && (values[0]) === values[8]) {
                    this.set({'isFinished': true, 'isClickable': false, 'value': values[0]});
                    return;
                }

                //побочная диагональ
                if (values[2] && (values[2] === values[4]) && (values[2]) === values[6]) {
                    this.set({'isFinished': true, 'isClickable': false, 'value': values[2]});
                    return;
                }

                //ничья
                for (i = 0; i < 9; i++) {
                    if (!values[i]) {
                        return;
                    }
                }
                this.set({'isFinished': true, 'isClickable': false});
            }
        });
        return BlockModel;
    }
);