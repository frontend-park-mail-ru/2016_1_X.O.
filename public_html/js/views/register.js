define(function (require) {

        var Backbone = require('backbone'),
            BaseView = require('views/base'),
            tmpl = require('tmpl/register'),
            User = require('models/user');

        var RegisterView = BaseView.extend({
            template: tmpl
        });

        return new RegisterView();
    }
);