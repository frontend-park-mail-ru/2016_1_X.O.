define(function (require) {

        var Backbone = require('backbone'),
            BaseView = require('views/base'),
            tmpl = require('tmpl/login');

        var LoginView = BaseView.extend({
            template: tmpl
        });

        return new LoginView();
    }
);