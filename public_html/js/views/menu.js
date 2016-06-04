define(function (require) {

        var Backbone = require('backbone'),
            BaseView = require('views/base'),
            tmpl = require('tmpl/menu'),
            alertify = require('alertify'),
            user = require('models/user');

        var MenuView = BaseView.extend({
            template: tmpl,
            
            events: {
                'click #logout': 'handleLogout',
                'click #info': 'handleInfo'
            },
            
            show: function () {
                this.$el.appendTo("#page");
                this.$el.show();
                this.trigger('show', this);
                this.listenTo(user, 'checkOk', this.onCheckOk);
                this.listenTo(user, 'checkFail', this.onCheckFail);
                this.listenTo(user, 'scoreOk', this.onScoreOk);
                this.listenTo(user, 'scoreFail', this.onScoreFail);
                if(user.get('isAuth') === false || user.get('login') === "") {
                    user.checkData();
                } 
            },

            onCheckOk: function() {
                
            },

            onCheckFail: function () {
                Backbone.history.navigate('#', true);
            },

            hide: function () {
                this.$el.hide();
                this.stopListening(user, 'checkOk', this.onCheckOk);
                this.stopListening(user, 'checkFail', this.onCheckFail);
                this.stopListening(user, 'scoreOk', this.onScoreOk);
                this.stopListening(user, 'scoreFail', this.onScoreFail);
            },
            
            handleLogout: function(event) {
                event.preventDefault();
                user.logout();
            },

            onScoreFail: function () {
                alertify.alert('Tic tac toe', 'Server error');
            },

            onScoreOk : function () {
                alertify.alert('Tic tac toe', 'Login: ' + user.get('login') + '<br/> Score: ' + user.get('score'));
            },

            handleInfo: function (event) {
                event.preventDefault();
                user.getScore();
            }
        });

        return new MenuView();
    }
);