require.config({
    urlArgs: "_=" + (new Date()).getTime(),
    baseUrl: "js",
    paths: {
        jQuery: "lib/jquery",
        underscore: "lib/underscore",
        backbone: "lib/backbone",
        materialize: 'lib/materialize'
    },
    shim: {
        'backbone': {
            deps: ['underscore', 'jquery', 'materialize'],
            exports: 'Backbone'
        },
        'underscore': {
            exports: '_'
        }
    }
});
