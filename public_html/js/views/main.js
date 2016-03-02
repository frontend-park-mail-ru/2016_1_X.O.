define(function (require) {

        var BaseView = require('views/base'),
            tmpl = require('tmpl/main');

        var View = BaseView.extend({
            template: tmpl
        });

        return new View();
    }
);