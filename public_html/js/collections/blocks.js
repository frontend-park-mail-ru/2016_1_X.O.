define(function (require) {
        var Backbone = require('backbone'),
            _ = require('underscore'),
            BlockModel = require('models/block');

        var BlocksCollection = Backbone.Collection.extend({
            model: BlockModel,

            initialize: function () {
                this._isFinished = false;
            },

            setStatus: function () {
                this._isFinished = !this._isFinished;
            },

            getStatus: function () {
                return this._isFinished;
            },

            createBlocks: function (x0, y0) {
                var intervalBetweenBlock = 20,
                    currentX = 0,
                    currentY = 0;

                for (var i = 1; i <= 9; i++) {
                    this.add(new BlockModel(x0 + currentX, y0 + currentY, i));
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
                        alert('WIN ' + values[i].toString());
                        this.setStatus();
                        return;
                    }
                    i += 2;
                }
                //колонна
                for (i = 0; i < 3; i++) {
                    if (values[i] && (values[i] === values[i + 3]) && (values[i] === values[i + 6])) {
                        alert('WIN ' + values[i].toString());
                        this.setStatus();
                        return;
                    }
                }
                //диагональ
                if (values[0] && (values[0] === values[4]) && (values[0]) === values[8]) {
                    alert('WIN ' + values[0].toString());
                    this.setStatus();
                    return;
                }

                //побочная диагональ
                if (values[2] && (values[2] === values[4]) && (values[2]) === values[6]) {
                    alert('WIN ' + values[2].toString());
                    this.setStatus();
                    return;
                }

                //ничья
                for (i = 0; i < 9; i++) {
                    if (!values[i]) {
                        return;
                    }
                }
                alert('DRAW');
                this.setStatus();
            }
        });
        return new BlocksCollection();
    }
);
