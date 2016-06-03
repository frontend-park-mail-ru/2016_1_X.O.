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
            this.$el.appendTo("#page");
            this.$el.show();
            this.preloaderIn();
            this.trigger('show', this);
            this.stage = new createjs.Stage("gameCanvas");
            if (user.get('isAuth') === false) {
                Backbone.history.navigate('#', true);
            }
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

        closeSocket: function() {
            if (this.websocket) {
                this.websocket.close();
                this.websocket.onmessage = null;
                this.websocket = null;
            }
        },

        handleMessage: function (msg) {
            var resp = JSON.parse(msg.data);
            console.log(resp);
            switch (resp.status) {
                case 4: //START GAME
                    this.preloaderOut();
                    alertify.alert('Tic tac toe', 'Your opponent: ' + resp.opponentName, function(){});
                    this.yourColorField.text(user.get('login'));
                    this.oppColorField.text(resp.opponentName);
                    this.mainSquareModel = new MainSquareModel(this.STARTX, this.STARTY, this.YOU, this.OPPONENT);
                    this.mainSquareView = new MainSquareView(this.mainSquareModel, this.stage);
                    break;
                case 6: //OPPONENT DISCONNECT
                    alertify.alert('Tic tac toe', 'Opponent disconnected', function(){});
                    this.closeSocket();
                    Backbone.history.navigate('#menu', true);
                    break;
                // case 101: //FIELD BUSY
                //     //TODO
                //     return;
                // case 102: //WRONG SQUARE
                //     //TODO
                //     return;
                // case 103: //WRONG TURN
                //     //TODO
                //     return;
                case 0: //CONTINUE
                    this.mainSquareModel.set({
                        'isClickable': true
                    });
                    alertify.warning('It`s your turn bro!');
                    if(resp.map[0] === null) {
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
                    break;
                case 5: //GAME END
                    if (resp.winner == user.get('id')) {
                        this.mainSquareModel.set({
                            'value': this.YOU,
                            'isFinished': true
                        });
                        this.renderGame();
                        alertify.alert('Tic tac toe', 'You win bro!', function() {
                            Backbone.history.navigate('#menu', true);
                        });

                    } else {
                        this.mainSquareModel.set({
                            'value': this.OPPONENT,
                            'isFinished': true
                        });
                        this.renderGame();
                        alertify.alert('Tic tac toe', 'You lose bro!', function() {
                            Backbone.history.navigate('#menu', true);
                        });
                    }
                    return;
                case 7: //DRAW
                    this.mainSquareModel.set({
                        'value': 'draw',
                        'isFinished': true
                    });
                    this.renderGame();
                    alertify.alert('Tic tac toe', 'It`s a draw', function() {
                        Backbone.history.navigate('#menu', true);
                    });
                    return;
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
        },

        renderGame: function() {
            this.mainSquareView.render();
            this.stage.update();
        },

        mainClick: function(event) {
            event.preventDefault();
            alertify.confirm('Tic tac toe', 'Do you wanna give up bro ?',
                function(){
                    Backbone.history.navigate('#menu', true);
                },
                function(){

                });
        }
    });
    return new GameView();
});

