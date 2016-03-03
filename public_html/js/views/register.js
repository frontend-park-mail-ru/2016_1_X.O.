define(function (require) {

        var Backbone = require('backbone'),
            BaseView = require('views/base'),
            tmpl = require('tmpl/register');

        var RegisterView = BaseView.extend({
            template: tmpl
        });

        return new RegisterView();
    }
);