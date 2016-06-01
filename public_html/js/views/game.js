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
            this.websocket = null;
        },

        template: tmpl,

        events: {
            'click #gameCanvas': 'gameClick',
            'click #main': 'mainClick' //TODO
        },

        show: function () {
            this.$el.appendTo("#page");
            this.$el.show();
            this.preloaderIn();
            this.trigger('show', this);
            this.stage = new createjs.Stage("gameCanvas");
            if (user.get('isAuth') === false) {
                Backbone.history.navigate('#', true);
            }
            this.websocket = new WebSocket("ws://127.0.0.1:8090/game");
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

        closeSocket: function() {
            if (this.websocket && this.websocket.readyState < 2) {
                this.websocket.close();
                this.websocket.onmessage = null;
                this.websocket = null;
            }
        },

        handleMessage: function (msg) {
            var resp = JSON.parse(msg.data);
            console.log(resp);
            switch (resp.status) {
                case "START_GAME":
                    this.preloaderOut();
                    alertify.alert('Tic tac toe', 'Your opponent: ' + resp.opponentName);
                    this.mainSquareModel = new MainSquareModel(this.STARTX, this.STARTY, this.YOU, this.OPPONENT);
                    this.mainSquareView = new MainSquareView(this.mainSquareModel, this.stage);
                    break;
                case "OPPONENT_DISCONNECT":
                    alertify.alert('Tic tac toe', 'Opponent disconnected');
                    this.closeSocket();
                    Backbone.history.navigate('#menu', true);
                    break;
                // case "ERROR_FIELD_BUSY":
                //     //TODO
                //     return;
                // case "ERROR_WRONG_SQUARE":
                //     //TODO
                //     return;
                // case "ERROR_WRONG_USER_TURN":
                //     //TODO
                //     return;
                // case "ERROR_WRONG_DATA":
                //     //TODO
                //     return;
                case 0:
                    this.mainSquareModel.set({
                        'isClickable': true
                    });
                    alertify.warning('It`s your turn bro!');
                    this.mainSquareModel.get('blockModels').forEach(function(model){
                        model.set({
                            'playerId': this.YOU
                        });
                    }.bind(this));
                    break;
                case "CONTINUE_GAME":
                    this.mainSquareModel.set({
                        'isClickable': true
                    });
                    alertify.warning('It`s your turn bro!');
                        resp.map[0].forEach(function(string) {
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
                    break;
            }
            this.renderGame();
        },

        gameClick: function(event) {
            event.preventDefault();
            var square = this.mainSquareModel.onClick(event.offsetX, event.offsetY);
            if (square) {
                this.websocket.send((square.get('parentId') - 1) + '.' + (square.get('id') - 1));
                this.check();
                this.renderNext(square.get('id'), this.OPPONENT);
                this.mainSquareModel.set({
                    'isClickable': false
                });
                this.renderGame();
            }
        },

        renderNext: function (index, value) {
            if(this.mainSquareModel.get('blockModels')[index - 1].get('isFinished')) {
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

        check: function() {
            this.mainSquareModel.get('blockModels').forEach(function (model) {
                model.check();
            }.bind(this));
            this.mainSquareModel.check();
        },

        renderGame: function() {
            this.mainSquareView.render();
            this.stage.update();
        },

        mainClick: function() {
            //TODO
        }
    });
    return new GameView();
});

