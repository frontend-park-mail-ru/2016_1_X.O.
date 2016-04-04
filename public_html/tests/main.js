require.config({
    urlArgs: "_=" + (new Date()).getTime(),
    baseUrl: "../js",
    paths: {
        jquery: "lib/jquery",
        underscore: "lib/underscore",
        backbone: "lib/backbone",
        materialize: "lib/materialize",
        hammerjs: "lib/hammer.min",
        easel: "lib/easel"
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
        'easel': {
            exports: 'createjs'
        },
        'hammerjs': {
            exports: 'Hammer'
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
