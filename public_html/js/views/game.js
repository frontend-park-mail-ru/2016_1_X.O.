define(function (require) {

    var Backbone = require('backbone'),
        BaseView = require('views/base'),
        tmpl = require('tmpl/game'),
        $ = require('jquery'),
        alertify = require('alertify'),
        MainSquareView = require('views/mainSquare'),
        MainSquareModel = require('models/mainSquare'),
        user = require('models/user');

    var GameView = BaseView.extend({
        initialize: function () {
            this.$page = $('#page');
            this.$page.append(this.el);
            // this.mainSquareView = new MainSquareView;
            // this.mainSquareModel = new MainSquareModel;
            this.render();
            this.hide();
            this.websocket = null;
        },

        template: tmpl,

        show: function () {
            this.$el.appendTo("#page");
            this.$el.show();
            $("#preloader").fadeIn('slow');
            $("#page").fadeOut('slow');
            document.getElementById('page').style.display = 'none';
            this.trigger('show', this);
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

        sendSqr: function(msg) {
            if(this.websocket && this.websocket.readyState < 2) {
                this.websocket.send(msg);
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
                    break;
                case "OPPONENT_DISCONNECT": {
                    alertify.alert('Tic tac toe', 'Opponent disconected');
                    Backbone.history.navigate('#menu', true);
                    break;
                }
            }
            if(resp.map && resp.map[0] !== null) {
                for(var i = 0; i < resp.map.length; i++) {
                    var parent, child, playerId,
                        splitted = resp.map[i].split(".");
                    parent = splitted[0];
                    child = splitted[1];
                    playerId = splitted[2];
                }
            }
        }
    });
    return new GameView();
});

