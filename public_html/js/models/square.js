define(function (require) {
        var Backbone = require('backbone');
    
        var SquareModel = Backbone.Model.extend({
                defaults: {
                    size: 40,
                    value: 0,
                    isClickable: true
                },
                initialize: function(posX, posY) {
                    this.set({
                        'posX': posX,
                        'posY': posY
                    });
                }
            });
        return SquareModel;
    }
);