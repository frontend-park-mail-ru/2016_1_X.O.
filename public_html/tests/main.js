require.config({
    urlArgs: "_=" + (new Date()).getTime(),
    baseUrl: "../js",
    paths: {
        jquery: "lib/jquery",
        underscore: "lib/underscore",
        backbone: "lib/backbone",
        materialize: "lib/materialize",
        hammerjs: "lib/hammer.min",
        easel: "lib/easel",
        alertify: "lib/alertify"
    },
    shim: {
        'jquery' : {
            exports: '$'
        },
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
        },
        'alertify': {
            exports: 'alertify'
        }
    }
});

var tests = [
    'tests/scoreModel.test',
    'tests/userModel.test',
    'tests/scoresCollection.test',
    'tests/managerView.test'
];

require(tests, function () {
    QUnit.load();
    QUnit.start();
});
