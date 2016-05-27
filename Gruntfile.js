module.exports = function (grunt) {

    grunt.initConfig({
        shell: {
            options: {
                stdout: true,
                stderr: true
            },
            server: {
                command: 'java -jar tictactoe-1.0.1-jar-with-dependencies.jar 8090'
            }
        },
        fest: {
            templates: {
                files: [{
                    expand: true,
                    cwd: 'templates',
                    src: '*.xml',
                    dest: 'public_html/js/tmpl'
                }],
                options: {
                    template: function (data) {
                        return grunt.template.process(
                            'define(function () { return <%= contents %> ; });',
                            {data: data}
                        );
                    }
                }
            }
        },
        sass: {
            options: {
                outputStyle: 'nested'
            },
            dist: {
                files: {
                    'public_html/css/main.css': 'scss/main.scss'
                }
            }
        },
        requirejs: {
            compile: {
                options: {
                    baseUrl: "./public_html/js",
                    mainConfigFile: "./public_html/js/config.js",
                    include: ["../../node_modules/almond/almond.js", "main.js"],
                    out: "dist/js/build.min.js",
                    findNestedDependencies: true,
                    wrap: true,
                    insertRequire: ["main.js"]
                }
            }
        },
        concat: {
            css: {
                src: './public_html/css/*.css',
                dest: './public_html/css/concat/concat.css'
            }
        },
        cssmin: {
            target: {
                src: './public_html/css/concat/concat.css',
                dest: './dist/css/concat.min.css'
            }
        },
        watch: {
            fest: {
                files: ['templates/*.xml'],
                tasks: ['fest'],
                options: {
                    interrupt: true,
                    atBegin: true
                }
            },
            sass: {
                files: 'scss/*.scss',
                tasks: ['sass'],
                options: {
                    atBegin: true
                }
            },
            server: {
                files: [
                    'public_html/js/**/*.js',
                    'public_html/css/**/*.css',
                    'scss/**/*.scss'
                ],
                options: {
                    livereload: true
                }
            }
        },
        concurrent: {
            target: ['watch', 'shell'],
            options: {
                logConcurrentOutput: true
            }
        },
        qunit: {
            all: ['./public_html/tests/index.html']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-fest');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-concat');

    grunt.registerTask('compile', ['requirejs', 'concat', 'cssmin']);
    grunt.registerTask('test', ['qunit:all']);
    grunt.registerTask('default', ['concurrent']);

};