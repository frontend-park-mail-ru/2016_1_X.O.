define(function (require) {

    var Backbone = require('backbone'),
        BaseView = require('views/base'),
        tmpl = require('tmpl/game'),
        $ = require('jquery'),
        createjs = require('easel'),
        alertify = require('alertify'),
        BlocksView = require('views/blocks'),
        blocksCollection = require('collections/blocks'),
        SinglePlayerModel = require('models/singlePlayer'),
        user = require('models/user');

    var GameView = BaseView.extend({
        initialize: function () {
            this.$page = $('#page');
            this.$page.append(this.el);
            this.blocksView = new BlocksView;
            this.player = new SinglePlayerModel;
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
            if(user.get('isAuth') === false) {
                Backbone.history.navigate('#', true);
            }
            this.websocket = new WebSocket("ws://127.0.0.1:8090/game");
            this.websocket.onmessage = this.handleMessage.bind(this);
        },
        
        hide: function() {
            this.$el.hide();
            if(this.websocket && this.websocket.readyState < 2) {
                this.websocket.close();
            }
        },

        handleMessage: function (msg) {
            var resp = JSON.parse(msg.data);
            console.log(resp);
            switch(resp.status) {
                case "START_GAME":
                    $("#preloader").fadeOut('slow');
                    $("#page").fadeIn('slow');
                    document.getElementById('page').style.display = 'block';
                    alertify.alert('Tic tac toe', 'Your opponent: ' + resp.opponentName);
                    this.player.set({'id' : 1});
                    blocksCollection.reset();
                    blocksCollection.createBlocks(100, 100, this.websocket);
                    blocksCollection.setClickFalse();
                    this.blocksView.render(this.stage, this.player);
                    this.stage.update();
                    break;
                case "OPPONENT_DISCONNECT": 
                    alertify.alert('Tic tac toe', 'Opponent disconected');
                    Backbone.history.navigate('#menu', true);
                    break;                
            }
            if(resp.map && resp.map[0] === null) {
                blocksCollection.setClickTrue();
                alertify.warning('It`s your turn bro!');
            }
            if(resp.map && resp.map[0] !== null) {
                blocksCollection.setClickTrue();
                alertify.warning('It`s your turn bro!');
                for(var i = 0; i < resp.map[0].length; i++) {
                    var parent, child, playerId,
                        splitted = resp.map[0][i].split(".");
                    parent = splitted[0];
                    child = splitted[1];
                    playerId = splitted[2];
                }
            }
        },

        gameClick: function(event) {
            if(blocksCollection.getClick() === false) {
                return;
            }
            var next;
            this.nextVal = 0;
            event.preventDefault();
            blocksCollection.models.forEach(function (block) {
                next = block.onClick(event.offsetX, event.offsetY, this.player);
                if(next) {
                    this.nextVal = next;
                    block.check();
                    this.blocksView.check();
                }
            }.bind(this));

            if(this.nextVal) {
                if(blocksCollection.at(this.nextVal - 1).get('isFinished')) {
                    blocksCollection.models.forEach(function (block) {
                        if(!block.get('isFinished')) {
                            block.set({'isClickable': true});
                        }
                    });
                } else {
                    blocksCollection.models.forEach(function (block) {
                        block.set({'isClickable': false});
                    });
                    blocksCollection.at(this.nextVal - 1).set({'isClickable': true});
                }
            }
            this.blocksView.render(this.stage, this.player);
            this.stage.update();
        }
    });
    return new GameView();
});

