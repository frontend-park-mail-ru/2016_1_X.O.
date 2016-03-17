require.config({
    urlArgs: "_=" + (new Date()).getTime(),
    baseUrl: "js",
    paths: {
        jquery: "lib/jquery",
        underscore: "lib/underscore",
        backbone: "lib/backbone",
        materialize: "lib/materialize",
        hammerjs: "lib/hammer.min",
        easel: "lib/easel"
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
        },
        'easel': {
            exports: 'createjs'
        }
    }
});

require(['main']);
