define(function (require) {
    var Backbone = require('backbone'),
        viewManager = require('views/manager');

    QUnit.module('views/manager');

    QUnit.test("viewManager - экземпляр Backbone.View", function () {
        QUnit.ok(viewManager instanceof Backbone.View, "viewManager - экземпляр Backbone.View");
    });

    QUnit.test("viewManager works", function () {

        var SomeView = Backbone.View.extend({
                initialize: function () {
                    this.key = false;
                },

                show: function () {
                    this.trigger('show');
                },

                hide: function () {
                    this.key = true;
                }
            }),

            firstView = new SomeView(),
            secondView = new SomeView();

        viewManager.addView(firstView);
        viewManager.addView(secondView);

        firstView.show();
        QUnit.ok(secondView.key, "hide second when show first");
        secondView.show();
        QUnit.ok(firstView.key, "hide first when show second");

    });
});