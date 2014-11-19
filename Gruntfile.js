/* global module:false */

module.exports = function(grunt) {

	var port = grunt.option('port') || 8000;

	// Project configuration
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		uglify: {
			build: {
				src: 'js/reveal.js',
				dest: 'js/reveal.min.js'
			}
		},

		cssmin: {
			compress: {
				files: {
					'css/reveal.min.css': [ 'css/reveal.css' ]
				}
			}
		},

		sass: {
			main: {
				files: {
					'css/theme/default.css': 'css/theme/source/default.scss',
					'css/theme/futuretech.css': 'css/theme/source/futuretech.scss'
				}
			}
		},

		jshint: {
			options: {
				curly: false,
				eqeqeq: true,
				immed: true,
				latedef: true,
				newcap: true,
				noarg: true,
				sub: true,
				undef: true,
				eqnull: true,
				browser: true,
				expr: true,
				globals: {
					head: false,
					module: false,
					console: false,
					unescape: false
				}
			},
			files: [ 'Gruntfile.js', 'js/reveal.js' ]
		},

		connect: {
			server: {
				options: {
					port: port,
					base: '.'
				}
			}
		},

		zip: {
			'reveal-js-presentation.zip': [
				'index.html',
				'css/**',
				'js/**',
				'lib/**',
				'images/**',
				'plugin/**'
			]
		},

		watch: {
			main: {
				files: [ 'Gruntfile.js', 'js/reveal.js', 'css/reveal.css' ],
				tasks: 'default'
			},
			theme: {
				files: [ 'css/theme/source/*.scss', 'css/theme/template/*.scss' ],
				tasks: 'sass'
			}
		}

	});

	// Dependencies
	grunt.loadNpmTasks( 'grunt-contrib-jshint' );
	grunt.loadNpmTasks( 'grunt-contrib-cssmin' );
	grunt.loadNpmTasks( 'grunt-contrib-uglify' );
	grunt.loadNpmTasks( 'grunt-contrib-watch' );
	grunt.loadNpmTasks( 'grunt-contrib-sass' );
	grunt.loadNpmTasks( 'grunt-contrib-connect' );
	grunt.loadNpmTasks( 'grunt-zip' );

	// Default task
	grunt.registerTask( 'default', [ 'compile', 'server' ] );

    grunt.registerTask( 'compile', [ 'jshint', 'sass', 'cssmin', 'uglify' ] );

	// Package presentation to archive
	grunt.registerTask( 'package', [ 'default', 'zip' ] );

	// Serve presentation locally
	grunt.registerTask( 'server', [ 'connect', 'watch' ] );

};
