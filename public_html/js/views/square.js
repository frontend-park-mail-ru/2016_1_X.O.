define(function(require) {
    var Backbone = require('backbone'),
        createjs = require('easel');

    var SquareView = Backbone.View.extend({

        initialize: function(model, stage) {
            this.stage = stage;
            this.model = model;
        },

        render: function() {
            var rect = new createjs.Shape();
            //определение каким цветом рисовать
            switch (this.model.get('value')) {
                //не помеченный квадрат
                case 0:
                    rect.graphics.beginFill("#d1c4e9");
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
        }
    });

    return SquareView;
});