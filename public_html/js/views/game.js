define(function (require) {

    var Backbone = require('backbone'),
        BaseView = require('views/base'),
        tmpl = require('tmpl/game'),
        $ = require('jquery'),
        createjs = require('easel'),
        alertify = require('alertify'),
        MainSquareView = require('views/mainSquare'),
        MainSquareModel = require('models/mainSquare'),
        user = require('models/user');

    var GameView = BaseView.extend({
        initialize: function () {
            this.$page = $('#page');
            this.$page.append(this.el);
            this.render();
            this.hide();
            this.closeSocket();
            this.websocket = null;
            this.yourColorField = this.$el.find('#you');
            this.oppColorField = this.$el.find('#opponent');
        },

        template: tmpl,

        events: {
            'click #gameCanvas': 'gameClick',
            'click #main': 'mainClick'
        },

        show: function () {
            if (user.get('isAuth') === false) {
                Backbone.history.navigate('#', true);
                return;
            }
            this.$el.appendTo("#page");
            this.$el.show();
            this.preloaderIn();
            this.trigger('show', this);
            this.stage = new createjs.Stage("gameCanvas");
            this.yourColorField.text('');
            this.oppColorField.text('');
            this.websocket = new WebSocket("ws://" + window.location.hostname + ":" + window.location.port + "/game");
            this.websocket.onmessage = this.handleMessage.bind(this);
            this.YOU = 1;
            this.OPPONENT = -1;
            this.STARTX = 100;
            this.STARTY = 100;
        },

        hide: function () {
            this.$el.hide();
            this.closeSocket();
        },

        closeSocket: function () {
            if (this.websocket) {
                this.websocket.close();
                this.websocket.onmessage = null;
                this.websocket = null;
            }
        },

        onContinue: function (resp) {
            this.mainSquareModel.set({
                'isClickable': true
            });
            alertify.warning('It`s your turn bro!');
            if (resp.map[0] === null) {
                this.mainSquareModel.get('blockModels').forEach(function (model) {
                    model.set({
                        'playerId': this.YOU
                    });
                }.bind(this));
            } else {
                resp.map[0].forEach(function (string) {
                    var parent, child, playerId,
                        splitted = string.split(".");
                    parent = splitted[0];
                    child = splitted[1];
                    playerId = splitted[2];
                    if (playerId == user.get('id')) {
                        playerId = this.YOU;
                    }
                    else {
                        playerId = this.OPPONENT;
                    }
                    if (this.mainSquareModel.get('blockModels')[parent].get
                        ('squareModels')[child].get('value') != playerId) {
                        this.mainSquareModel.get('blockModels')[parent].get
                        ('squareModels')[child].set({
                            'value': playerId
                        });
                        this.check();
                        this.renderNext(parseInt(child) + 1, this.YOU);
                    }
                }.bind(this));
            }
        },

        onWin: function () {
            //TODO
        },

        onLose: function () {
            //TODO
        },

        onId: function () {
            //TODO
        },

        onStartGame: function (resp) {
            this.preloaderOut();
            alertify.alert('Tic tac toe', 'Your opponent: ' + resp.opponentName, function () {
            });
            this.yourColorField.text(user.get('login'));
            this.oppColorField.text(resp.opponentName);
            this.mainSquareModel = new MainSquareModel(this.STARTX, this.STARTY, this.YOU, this.OPPONENT);
            this.mainSquareView = new MainSquareView(this.mainSquareModel, this.stage);
        },

        onEnd: function (resp) {
            this.closeSocket();
            user.getScore();
            if (resp.winner == user.get('id')) {
                this.mainSquareModel.set({
                    'value': this.YOU,
                    'isFinished': true
                });
                this.renderGame();
                alertify.alert('Tic tac toe', 'You win bro!', function () {
                    Backbone.history.navigate('#menu', true);
                });

            } else {
                this.mainSquareModel.set({
                    'value': this.OPPONENT,
                    'isFinished': true
                });
                this.renderGame();
                alertify.alert('Tic tac toe', 'You lose bro!', function () {
                    Backbone.history.navigate('#menu', true);
                });
            }
        },

        onDisconnect: function () {
            this.closeSocket();
            alertify.alert('Tic tac toe', 'Opponent disconnected', function () {
            });
            Backbone.history.navigate('#menu', true);
        },

        onDraw: function () {
            this.closeSocket();
            user.getScore();
            this.mainSquareModel.set({
                'value': 'draw',
                'isFinished': true
            });
            this.renderGame();
            alertify.alert('Tic tac toe', 'It`s a draw!', function () {
                Backbone.history.navigate('#menu', true);
            });
        },

        onBusy: function () {
            //TODO
        },

        onWrong: function () {
            //TODO
        },

        onTurn: function () {
            //TODO
        },

        handleMessage: function (msg) {
            var resp = JSON.parse(msg.data);
            var responseMap = {
                0: this.onContinue,
                1: this.onWin,
                2: this.onLose,
                3: this.onId,
                4: this.onStartGame,
                5: this.onEnd,
                6: this.onDisconnect,
                7: this.onDraw,
                101: this.onBusy,
                102: this.onWrong,
                103: this.onTurn
            };
            responseMap[resp.status].call(this, resp);
            this.renderGame();
        },

        gameClick: function (event) {
            event.preventDefault();
            var square = this.mainSquareModel.onClick(event.offsetX, event.offsetY);
            if (square) {
                if(this.websocket && this.websocket.readyState == 1) {
                    this.websocket.send((square.get('parentId') - 1) + '.' + (square.get('id') - 1));
                    this.check();
                    this.renderNext(square.get('id'), this.OPPONENT);
                    this.mainSquareModel.set({
                        'isClickable': false
                    });
                    this.renderGame();
                }
                else {
                    alertify.alert('Tic tac toe', 'Unknown error, sorry bro!');
                }
            }
        },

        renderNext: function (index, value) {
            if (this.mainSquareModel.get('blockModels')[index - 1].get('isFinished')) {
                this.mainSquareModel.get('blockModels').forEach(function (model) {
                    if (model.get('isFinished')) {
                        model.set({
                            'playerId': 0,
                            'isClickable': false
                        });
                    } else {
                        model.set({
                            'playerId': value,
                            'isClickable': true
                        });
                    }
                }.bind(this));
            } else {
                this.mainSquareModel.get('blockModels').forEach(function (model) {
                    if (model.get('id') == index) {
                        model.set({
                            'playerId': value,
                            'isClickable': true
                        });
                    } else {
                        model.set({
                            'playerId': 0,
                            'isClickable': false
                        });
                    }
                }.bind(this));
            }
        },

        check: function () {
            this.mainSquareModel.get('blockModels').forEach(function (model) {
                model.check();
            }.bind(this));
        },

        renderGame: function () {
            this.mainSquareView.render();
            this.stage.update();
        },

        mainClick: function (event) {
            event.preventDefault();
            alertify.confirm('Tic tac toe', 'Do you wanna give up bro ?',
                function () {
                    Backbone.history.navigate('#menu', true);
                },
                function () {

                });
        }
    });
    return new GameView();
});

