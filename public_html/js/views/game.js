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
            'click #gameCanvas': 'gameClick'
        },

        show: function () {
            this.$el.appendTo("#page");
            this.$el.show();
            $("#preloader").fadeIn('slow');
            $("#page").fadeOut('slow');
            document.getElementById('page').style.display = 'none';
            this.trigger('show', this);
            this.stage = new createjs.Stage("gameCanvas");
            if (user.get('isAuth') === false) {
                Backbone.history.navigate('#', true);
            }
            this.websocket = new WebSocket("ws://127.0.0.1:8090/game");
            this.websocket.onmessage = this.handleMessage.bind(this);
        },

        hide: function () {
            this.$el.hide();
            if (this.websocket && this.websocket.readyState < 2) {
                this.websocket.close();
            }
        },

        handleMessage: function (msg) {
            var self = this;
            var resp = JSON.parse(msg.data);
            console.log(resp);
            switch (resp.status) {
                case "START_GAME":
                    $("#preloader").fadeOut('slow');
                    $("#page").fadeIn('slow');
                    document.getElementById('page').style.display = 'block';
                    alertify.alert('Tic tac toe', 'Your opponent: ' + resp.opponentName);
                    this.mainSquareModel = new MainSquareModel(100, 100, 1, -1);
                    this.mainSquareView = new MainSquareView(this.mainSquareModel, this.stage);
                    break;
                case "OPPONENT_DISCONNECT":
                    alertify.alert('Tic tac toe', 'Opponent disconected');
                    Backbone.history.navigate('#menu', true);
                    break;
                case "ERROR_FIELD_BUSY":
                    return;
                case "ERROR_WRONG_SQUARE":
                    return;
                case "ERROR_WRONG_USER_TURN":
                    return;
                case "ERROR_WRONG_DATA":
                    return;
                case 0:
                case "CONTINUE_GAME":
                    this.mainSquareModel.set({
                        'isClickable': true
                    });
                    alertify.warning('It`s your turn bro!');
                    if (resp.map[0] === null) {
                        this.mainSquareModel.get('blockModels').forEach(function(model){
                            model.set({
                                'playerId': 1
                            });
                        });
                    }
                    else {
                        var i;
                        for (i = 0; i < resp.map[0].length; i++) {
                            var parent, child, playerId,
                                splitted = resp.map[0][i].split(".");
                            parent = splitted[0];
                            child = splitted[1];
                            playerId = splitted[2];
                            if (playerId == user.get('id')) {
                                playerId = 1;
                            }
                            else {
                                playerId = -1;
                            }
                            if (this.mainSquareModel.get('blockModels')[parent].get
                                ('squareModels')[child].get('value') != playerId) {
                                this.mainSquareModel.get('blockModels')[parent].get
                                ('squareModels')[child].set({
                                    'value': playerId
                                });
                                if (self.mainSquareModel.get('blockModels')[child].get('isFinished')) {
                                    self.mainSquareModel.get('blockModels').forEach(function (model) {
                                        if (model.get('isFinished')) {
                                            model.set({
                                                'playerId': 0,
                                                'isClickable': false
                                            });
                                        } else {
                                            model.set({
                                                'playerId': 1,
                                                'isClickable': true
                                            });
                                        }
                                    });
                                } else {
                                    self.mainSquareModel.get('blockModels').forEach(function (model) {
                                        if ((model.get('id') - 1) == child) {
                                            model.set({
                                                'playerId': 1,
                                                'isClickable': true
                                            });
                                        } else {
                                            model.set({
                                                'playerId': 0,
                                                'isClickable': false
                                            });
                                        }
                                    });
                                }
                            }
                        }
                    }
                    break;
            }
            this.mainSquareModel.get('blockModels').forEach(function (model) {
                model.check();
            }.bind(this));
            this.mainSquareModel.check();
            this.mainSquareView.render();
            this.stage.update();
        },

        gameClick: function(event) {
            var self = this;
            event.preventDefault();
            var square = self.mainSquareModel.onClick(event.offsetX, event.offsetY);
            if (square) {
                this.websocket.send((square.get('parentId') - 1) + '.' + (square.get('id') - 1));
                this.mainSquareModel.get('blockModels').forEach(function (model) {
                    model.check();
                }.bind(this));
                this.mainSquareModel.check();
                if(this.mainSquareModel.get('blockModels')[square.get('id') - 1].get('isFinished')) {
                    self.mainSquareModel.get('blockModels').forEach(function (model) {
                        if (model.get('isFinished')) {
                            model.set({
                                'playerId': 0,
                                'isClickable': false
                            });
                        } else {
                            model.set({
                                'playerId': -1,
                                'isClickable': true
                            });
                        }
                    });
                } else {
                    self.mainSquareModel.get('blockModels').forEach(function (model) {
                        if (model.get('id') == square.get('id')) {
                            model.set({
                                'playerId': -1,
                                'isClickable': true
                            });
                        } else {
                            model.set({
                                'playerId': 0,
                                'isClickable': false
                            });
                        }
                    });
                }
                this.mainSquareModel.set({
                    'isClickable': false
                });
                this.mainSquareView.render();
                this.stage.update();
            }
        }
    });
    return new GameView();
});

