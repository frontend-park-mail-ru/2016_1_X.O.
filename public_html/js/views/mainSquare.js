define(function (require) {
    var Backbone = require('backbone'),
        createjs = require('easel'),
        _ = require('underscore'),
        alertify = require('alertify'),
        BlockView = require('views/block');

    var MainSquareView = Backbone.View.extend({

        initialize: function (model, stage) {
            this.model = model;
            this.stage = stage;
        },

        render: function () {
            var rect = new createjs.Shape();
            switch (this.model.get('value')) {
                //не помеченный квадрат
                case 0:
                    rect.graphics.beginFill("#ffffff");
                    break;
                //помечен тобой
                case 1:
                    //TODO YOU WIN
                    rect.graphics.beginFill("#ffff00");
                    break;
                //помечен противником
                case -1:
                    //TODO YOU LOSE
                    rect.graphics.beginFill("#d50000");
                    break;
                //ничья
                case 'draw':
                    //TODO DRAW
                    rect.graphics.beginFill("#f3e5f5");
                    break;
            }
            rect.graphics.drawRect(
                this.model.get('centerX') - this.model.get('size') / 2,
                this.model.get('centerY') - this.model.get('size') / 2,
                this.model.get('size'),
                this.model.get('size')
            );
            this.stage.addChild(rect);

            if (!this.model.get('isFinished')) {
                _.each(this.model.get('blockModels'), function (model) {
                    var blockView = new BlockView(model, this.stage);
                    blockView.render();
                }.bind(this));
            }
        }
    });

    return MainSquareView;
});