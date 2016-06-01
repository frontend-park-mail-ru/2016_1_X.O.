define(function (require) {
        var Backbone = require('backbone'),
            _ = require('underscore'),
            BlockModel = require('models/block');

        var MainSquareModel = Backbone.Model.extend({
            defaults: {
                size: 600,
                value: 0,
                centerX: 300,
                centerY: 300,
                intervalBetweenBlock: 20,
                isClickable: false,
                isFinished: false,
                blockModels: []
            },

            initialize: function (posX, posY, id, playerId) {
                this.set({
                    'posX': posX,
                    'posY': posY,
                    'id': id,
                    'playerId': playerId
                });

                var currentX = 0,
                    currentY = 0,
                    x0 = this.get('posX'),
                    y0 = this.get('posY');

                for (var i = 1; i <= 9; i++) {
                    this.set({
                        'blockModels': this.get('blockModels').concat(
                            new BlockModel(x0 + currentX, y0 + currentY, i, this.get('playerId')))
                    });
                    if (i === 9) {
                        break;
                    }
                    if (i % 3 === 0) {
                        currentY += this.get('blockModels')[i - 1].get('size') +
                            this.get('intervalBetweenBlock');
                        currentX = 0;
                    } else {
                        currentX += this.get('blockModels')[i - 1].get('size') +
                            this.get('intervalBetweenBlock');
                    }
                }

            },

            check: function () {
                var values = [],
                    i;

                if (this.get('isFinished')) {
                    return;
                }

                this.get('blockModels').forEach(function (block) {
                    values.push(block.get('value'));
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
                this.set({'isFinished': true, 'isClickable': false, 'value': 'draw'});
            },

            onClick: function (x,y) {
                if(this.get('isClickable') === false) {
                    return;
                }
                var square,
                    self = this;
                self.square = null;
                this.get('blockModels').forEach(function(model) {
                    square = model.onClick(x,y);
                    if(square) {
                       self.square = square;
                    }
                }.bind(this));
                return self.square;
            }
        });
        return MainSquareModel;
    }
);
