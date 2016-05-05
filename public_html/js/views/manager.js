define(function (require) {
    var Backbone = require('backbone');

    var Manager = Backbone.View.extend({
        views: [],
        
        addViews: function (views) {
            views.forEach(function (currentView) {
                this.listenTo(currentView, 'show', this.onShow.bind(this, currentView));
            }.bind(this));
            this.views = this.views.concat(views);
        },

        onShow: function (currentView) {
            this.views.forEach(function (view) {
                if (view !== currentView) {
                    view.hide();
                }
            });
        }

    });

    return new Manager();
});