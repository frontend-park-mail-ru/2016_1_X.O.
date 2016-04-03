define(function (require) {
        var Backbone = require('backbone'),
            BaseView = require('views/base'),
            tmpl = require('tmpl/canvas');

        var CanvasView = BaseView.extend({
            template: tmpl,

            show: function() {
                this.$el.appendTo("#page");
                this.$el.show();
                this.trigger('show', this);
                this.draw();
            },

            draw: function () {
                var c = document.querySelector('#homeCanvas'),
                    ctx = c.getContext('2d'),
                    w , h,
                    t = 0,
                    max = Math.max,
                    pow = Math.pow,
                    PI = Math.PI,
                    sin = Math.sin,
                    cos = Math.cos,

                    n = 8, // оттенки
                    m = 4, // повторение оттенкок
                    p = 32, //точек в ветки
                    r,
                    beta, gamma, //ветки и точки
                    x0, y0, x1, y1,
                    hue,
                    t_step = 1 / 60,
                    requestID;


                var trimUnit = function (input_str, unit) {
                    return parseInt(input_str.split(unit)[0], 10);
                };

                var spiral = function () {
                    ctx.clearRect(0, 0, w, h);

                    for (var i = 0; i < n * m; i++) {
                        beta = i * 2 * PI / (n * m);
                        x0 = 0;

                        ctx.beginPath();
                        hue = i * 360 / n;
                        ctx.translate(w / 2, h / 2);
                        ctx.rotate(t / 3);
                        ctx.fillStyle = 'hsl(' + hue + ', 100%, 65%)';

                        for (var j = 0; j < p; j++) {
                            gamma = j * 2 * PI / p;
                            r = max(1, pow(2 * (j * (p - j)), .43) - 10);

                            x0 += 3.4 * r;
                            y0 = x0 * sin(gamma + 2 * t + x0 / 99) / 5;

                            x1 = x0 * cos(beta) - y0 * sin(beta);
                            y1 = x0 * sin(beta) + y0 * cos(beta);

                            ctx.moveTo(x1, y1);
                            ctx.arc(x1, y1, r, 0, 2 * PI);
                        }

                        ctx.closePath();
                        ctx.fill();
                        ctx.rotate(-t / 3);
                        ctx.translate(-w / 2, -h / 2);
                    }

                    t += t_step;

                    requestID = requestAnimationFrame(spiral)
                };

                var initCanvas = function () {
                    var s;

                    setTimeout(function () {
                        s = getComputedStyle(c);
                        w = c.width = trimUnit(s.width, 'px');
                        h = c.height = trimUnit(s.height, 'px');
                        if (requestID) {
                            cancelAnimationFrame(requestID);
                        }
                        spiral();
                    }, 0);
                };

                //шаги
                initCanvas();

                //on resize
                addEventListener('resize', initCanvas, false);
            }
        });

        return new CanvasView();
    }
);
