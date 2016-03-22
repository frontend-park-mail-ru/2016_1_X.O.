define(function (require) {

    var Backbone = require('backbone'),
        BaseView = require('views/base'),
        tmpl = require('tmpl/game'),
        createjs = require('easel');

    var GameView = BaseView.extend({
        template: tmpl,

        events: {
            'click #newGame' : 'game'
        },

        game: function (event) {
            event.preventDefault();
            var square = function (x, y) {
                //координату лучше привязывать к середине квадрата, тогда попадание мышкой будет проще считать
                this.posX = x;
                this.posY = y;
                this.value = 0;
                this.size = 30;
            };

            var collection = [];

            function init() {
                //получение контекста рисования
                var startPosX = 40,
                    startPosY = 40,
                    intervalBetweenBlock = 50,
                    intervalBetweenRect = 20,
                //отодвигаем отрисовку в сторону, точка отсчета
                    posXBlock = startPosX,
                    posYBlock = startPosY,
                //внутри кластера
                    currentX,
                    currentY;

                //создаем кучу элементов
                //создаем блок
                for (var i = 1; i <= 9; i++) {
                    collection.push([]);
                    currentX = 0;
                    currentY = 0;
                    //создаем внутри блока прямоугольники
                    for (var j = 1; j <= 9; j++) {
                        collection[i - 1].push(new square(posXBlock + currentX, posYBlock + currentY));
                        //size = 30
                        if (j === 9) break;
                        if (j % 3 === 0) {
                            currentY += 30 + intervalBetweenRect;
                            currentX = 0;
                        } else {
                            currentX += 30 + intervalBetweenRect;
                        }
                    }
                    //30/2 пол ширины квадратика
                    if (i % 3 === 0) {
                        posYBlock += currentY + 30 / 2 + intervalBetweenBlock;
                        posXBlock = startPosX;
                    } else {
                        posXBlock += currentX + 30 / 2 + intervalBetweenBlock;
                    }
                }
                //запуск рендера
                render();
                //запуск имитатора действий каждые 3 cек
                setInterval(action, 300);
            }

            function action() {
                var indexBlock = Math.random() * 9 ^ 0,
                    indexNode = Math.random() * 9 ^ 0,
                    indexPlayer = Math.sign(Math.random() * 10 - 5);
                collection[indexBlock][indexNode].value = indexPlayer;
            }

            function render() {
                var stage = new createjs.Stage("gameCanvas");
                //отрисовка квадратов
                for (var i = 0; i < 9; i++) {
                    for (var j = 0; j < 9; j++) {
                        var rect = new createjs.Shape();
                        //определение каким цветом рисовать
                        switch (collection[i][j].value) {
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
                            collection[i][j].posX - collection[i][j].size / 2,
                            collection[i][j].posY - collection[i][j].size / 2,
                            collection[i][j].size,
                            collection[i][j].size
                        );
                        stage.addChild(rect);
                    }
                }
                //отрисовка всего контекста
                stage.update();
                //циклическая отрисовка
                requestAnimationFrame(render);
            }
            // отрисовка поля
            init();
        }

    });
    return new GameView();
});

