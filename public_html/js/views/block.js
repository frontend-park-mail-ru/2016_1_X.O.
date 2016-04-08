define(function (require) {
    var Backbone = require('backbone'),
        createjs = require('easel'),
        _ = require('underscore'),
        SquareView = require('views/square');

    var BlockView = SquareView.extend({

        addSquares: function () {
            if (this.model.get('isFinished')) {
                return;
            }
            _.forEach(this.model.get('collection').models, function (model) {
                var squareView = new SquareView(model, this.stage);
                squareView.renderSquare("#d1c4e9");
            }.bind(this));
        },

        renderBorder: function (player) {
            var color = '';
            var border = new createjs.Shape();
            if (this.model.get('isClickable')) {
                if (player.get('id') === 1) {
                    color = '#ffff00';
                } else {
                    color = '#d50000';
                }
            } else {
                color = "#ffffff";
            }
            border.graphics.beginStroke(color);
            border.graphics.setStrokeStyle(4);
            this.renderRect(border);
            this.stage.addChild(border);
        },

        renderBlock: function (player) {
            this.renderSquare("#f3e5f5");
            this.renderBorder(player);
            this.addSquares();
        }
    });

    return BlockView;
});