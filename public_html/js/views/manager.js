define(function (require) {
    var Backbone = require('backbone'),
        _ = require('underscore');

    var views = [];

    var Manager = Backbone.View.extend({

        addView: function (currentView) {
            this.listenTo(currentView, 'show', this.onShow.bind(this, currentView));
        },

        onShow: function (currentView) {
            views.forEach(function (view) {
                if (view != currentView) {
                    view.hide();
                }
            });
        }

    });

    return new Manager();
});