define(function (require) {

        var Backbone = require('backbone'),
            BaseView = require('views/base'),
            tmpl = require('tmpl/main');

        var MainView = BaseView.extend({
            template: tmpl
        });

        return new MainView();
    }
);