define(function (require) {
        var Backbone = require('backbone'),
            _ = require('underscore'),
            BlockModel = require('models/block'),
            SquareModel = require('models/square'),
            alertify = require('alertify');

        var BlocksCollection = Backbone.Collection.extend({
            model: BlockModel,

            initialize: function () {
                this._isFinished = false;
                this._isClickable = false;
            },

            setStatus: function () {
                this._isFinished = !this._isFinished;
            },
            
            setClickTrue: function () {
                this._isClickable = true;
            },

            setClickFalse: function () {
                this._isClickable = false;
            },
            
            getClick: function () {
                return this._isClickable;
            },

            getStatus: function () {
                return this._isFinished;
            },

            createBlocks: function (x0, y0, socket) {
                var intervalBetweenBlock = 20,
                    currentX = 0,
                    currentY = 0;

                for (var i = 1; i <= 9; i++) {
                    this.add(new BlockModel(x0 + currentX, y0 + currentY, i, socket));
                    if (i === 9) {
                        break;
                    }
                    if (i % 3 === 0) {
                        currentY += this.at(i - 1).get('size') + intervalBetweenBlock;
                        currentX = 0;
                    } else {
                        currentX += this.at(i - 1).get('size') + intervalBetweenBlock;
                    }
                }
            },

            check: function () {
                var values = [],
                    i;

                if (this.getStatus()) {
                    return;
                }

                for (i = 0; i < 9; i++) {
                    values.push(this.at(i).get('value'));
                }


                //ряд
                for (i = 0; i < 9; i++) {
                    if (values[i] && (values[i] === values[i + 1]) && (values[i] === values[i + 2])) {
                        alertify.alert('Tic tac toe','WIN ' + values[i].toString());
                        this.setStatus();
                        return;
                    }
                    i += 2;
                }
                //колонна
                for (i = 0; i < 3; i++) {
                    if (values[i] && (values[i] === values[i + 3]) && (values[i] === values[i + 6])) {
                        alertify.alert('Tic tac toe','WIN ' + values[i].toString());
                        this.setStatus();
                        return;
                    }
                }
                //диагональ
                if (values[0] && (values[0] === values[4]) && (values[0]) === values[8]) {
                    alertify.alert('Tic tac toe','WIN ' + values[0].toString());
                    this.setStatus();
                    return;
                }

                //побочная диагональ
                if (values[2] && (values[2] === values[4]) && (values[2]) === values[6]) {
                    alertify.alert('Tic tac toe','WIN ' + values[2].toString());
                    this.setStatus();
                    return;
                }

                //ничья
                for (i = 0; i < 9; i++) {
                    if (!values[i]) {
                        return;
                    }
                }
                alertify.alert('Tic tac toe','DRAW');
                this.setStatus();
            }
        });
        return new BlocksCollection();
    }
);
