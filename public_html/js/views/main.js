define(function (require) {

        var Backbone = require('backbone'),
            BaseView = require('views/base'),
            user = require('models/user'),
            tmpl = require('tmpl/main');

        var MainView = BaseView.extend({
            template: tmpl,

            show: function () {
                this.$el.appendTo("#page");
                this.$el.show();
                this.trigger('show', this);
                this.listenTo(user, 'checkOk', this.onCheckOk);
                this.listenTo(user, 'checkFail', this.onCheckFail);
                if(user.get('isAuth') && user.get('login') !== "") {
                    Backbone.history.navigate('#menu', true);
                } else {
                    user.checkData();
                }
            },

            onCheckOk: function() {
                Backbone.history.navigate('#menu', true);
            },

            onCheckFail: function () {
                
            },

            hide: function () {
                this.$el.hide();
                this.stopListening(user, 'checkOk', this.onCheckOk);
                this.stopListening(user, 'checkFail', this.onCheckFail);
            }
        });

        return new MainView();
    }
);