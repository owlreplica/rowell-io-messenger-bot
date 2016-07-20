'use strict';

module.exports = function (grunt) {

  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.initConfig({

    coffee: {
      lib: {
        expand: true,
        cwd: 'src/lib',
        src: ['**/*.coffee'],
        dest: 'lib',
        ext: '.js',
        options: {
          sourceMap: true
        }
      }
    }
  });
  grunt.registerTask('default', ['coffee']);

};

