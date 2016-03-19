define(function (require) {
    var Backbone = require('backbone'),
        _ = require('underscore');

    var views = [];

    var Manager = Backbone.View.extend({

        addView: function (currentView) {
            views.push(currentView);
            this.listenTo(currentView, 'show', function () {
                _.each(views, function (view) {
                    if (view != currentView) {
                        view.hide();
                    }
                });
            });
        }

    });

    return new Manager();
});