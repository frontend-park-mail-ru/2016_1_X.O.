// QUnit.config.autostart = false;
require.config({
    urlArgs: "_=" + (new Date()).getTime(),
    baseUrl: "../js",
    paths: {
        jquery: "lib/jquery",
        underscore: "lib/underscore",
        backbone: "lib/backbone",
        materialize: "lib/materialize",
        hammerjs: "lib/hammer.min"
    },
    shim: {
        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        'underscore': {
            exports: '_'
        },
        'materialize': {
            deps: ['jquery', 'hammerjs'],
            exports: 'Materialize'
        },
        'hammerjs': {
            exports: 'Hammer'
        }
    }
});

var tests = [
    'models/score.test',
    'models/user.test',
    'collections/scores.test'
];

require(tests, function () {
    QUnit.load();
    QUnit.start();
});
