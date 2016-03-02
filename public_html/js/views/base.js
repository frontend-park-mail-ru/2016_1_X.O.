define(function (require) {
        var Backbone = require('backbone');


        var BaseView = Backbone.View.extend({
            template: {},
            initialize: function () {
                this.$page = $('#page');
                this.render();
            },
            render: function () {
                this.$el.html(this.template);
                return this;
            },
            show: function () {
                this.$page.html(this.render().$el);
                // Добавляет всем кнопкам вызов события 'navigate'
                // Внутри события передается id кнопки
                this.$el.find('a').click(function (event) {
                    //event.preventDefault();
                    this.trigger('navigate', $(this).attr('id'));
                }.bind(this));
                this.$el.show();
            },
            hide: function () {
                this.$el.hide();
            }
        });

        return BaseView;
    }
);
