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
                outputStyle: 'nested',
            },
            dist: {
                files: {
                    'public_html/css/main.css': 'public_html/scss/main.scss'
                }
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
                files: 'public_html/scss/*.scss',
                tasks: ['sass'],
                options: {
                    atBegin: true
                }
            },
            server: {
                files: [
                    'public_html/js/**/*.js',
                    'public_html/css/**/*.css',
                    'public_html/scss/**/*.scss'
                ],
                options: {
                    //livereload: true
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

    grunt.registerTask('test', ['qunit:all']);
    grunt.registerTask('default', ['concurrent']);

};