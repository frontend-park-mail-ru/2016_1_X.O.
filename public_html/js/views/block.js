define(function (require) {
    var Backbone = require('backbone'),
        createjs = require('easel'),
        _ = require('underscore'),
        SquareView = require('views/square');

    var BlockView = Backbone.View.extend({

        initialize: function (model, stage) {
            this.model = model;
            this.stage = stage;
        },

        render: function () {
            var rect = new createjs.Shape();
            //определение каким цветом рисовать
            switch (this.model.get('value')) {
                //не помеченный квадрат
                case 0:
                    rect.graphics.beginFill("#f3e5f5");
                    break;
                //помечен тобой
                case 1:
                    rect.graphics.beginFill("#ffff00");
                    break;
                //помечен противником
                case -1:
                    rect.graphics.beginFill("#d50000");
                    break;
            }
            //сама отрисовка
            rect.graphics.drawRect(
                this.model.get('posX') - this.model.get('size') / 2,
                this.model.get('posY') - this.model.get('size') / 2,
                this.model.get('size'),
                this.model.get('size')
            );
            this.stage.addChild(rect);

            var border = new createjs.Shape();

            if (this.model.get('isClickable')) {
                border.graphics.beginStroke("#9c27b0");
                border.graphics.setStrokeStyle(4);
            } else {
                border.graphics.beginStroke("#f3e5f5");
                border.graphics.setStrokeStyle(1);
            }
            border.graphics.drawRect(
                this.model.get('posX') - this.model.get('size') / 2,
                this.model.get('posY') - this.model.get('size') / 2,
                this.model.get('size'),
                this.model.get('size')
            );
            this.stage.addChild(border);

            if (!this.model.get('isFinished')) {
                _.each(this.model.get('squareModels'), function (model) {
                    var squareView = new SquareView(model, this.stage);
                    squareView.render();
                }.bind(this));
            }
        }
    });

    return BlockView;
});