define(function(require) {
    var Backbone = require('backbone'),
        createjs = require('easel');

    var SquareView = Backbone.View.extend({

        initialize: function(model, stage) {
            this.stage = stage;
            this.model = model;
        },

        handleClick: function (e) {
            e.preventDefault();
            this.model.handleClick(e.offsetX, e.offsetY, 1);
        },
        
        renderRect: function (rect) {
            rect.graphics.drawRect(
                this.model.get('posX') - this.model.get('size') / 2,
                this.model.get('posY') - this.model.get('size') / 2,
                this.model.get('size'),
                this.model.get('size')
            );
        },

        renderSquare: function(neutralColor) {
            var rect = new createjs.Shape();
            var color = '';
            switch (this.model.get('value')) {
                case 0:
                    color = neutralColor;
                    break;
                case 1:
                    color = "#ffff00";
                    break;
                case -1:
                    color = "#d50000";
                    break;
            }
            rect.graphics.beginFill(color);
            this.renderRect(rect);
            this.stage.addChild(rect);
        }
    });

    return SquareView;
});