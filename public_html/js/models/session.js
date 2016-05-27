define(function (require) {
    var Backbone = require('backbone'),
        _ = require('underscore'),
        user = require('models/user');

    var Session = Backbone.Model.extend({
        defaults: {
            "isAuth": false,
            "id": ""
        },
        urlRoot: "/session",

        sync: function (method, model, options) {
            if (method === "create") {
                method = "update";
            }
            options || (options = {});
            options.url = this.urlRoot;
            return Backbone.sync.apply(this, arguments)
        },

        save : function(key, value, options) {

            var attributes={}, opts={};

            //Need to use the same conditional that Backbone is using
            //in its default save so that attributes and options
            //are properly passed on to the prototype
            if (_.isObject(key) || key == null) {
                attributes = key;
                opts = value;
            } else {
                attributes = {};
                attributes[key] = value;
                opts = options;
            }

            //Since backbone will post all the fields at once, we
            //need a way to post only the fields we want. So we can do this
            //by passing in a JSON in the "key" position of the args. This will
            //be assigned to opts.data. Backbone.sync will evaluate options.data
            //and if it exists will use it instead of the entire JSON.
            if (opts && attributes) {
                opts.data = JSON.stringify(attributes);
                opts.contentType = "application/json";
            }

            //Finally, make a call to the default save now that we've
            //got all the details worked out.
            return Backbone.Model.prototype.save.call(this, attributes, opts);
        }
    });

    return new Session();
});