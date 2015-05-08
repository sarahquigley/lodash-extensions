module.exports = function(grunt) {

  require('time-grunt')(grunt);

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Configure variables for use across grunt tasks
  var config = {
    dirs: {
      src: 'src',
      build: 'build'
    },
    files: {
      scripts: [
        '<%= config.dirs.src %>/main.coffee',
      ],
      tests: [
        '<%= config.dirs.src %>/**/*.spec.coffee'
      ]
    }
  };

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    config: config,

    // Clean tasks    - For erasing contents of specified directories
    // clean:build      - Clean build directory (location of compiled files)
    clean: {
      build: [config.dirs.build]
    },

    // Coffee tasks   - Coffeescript compilation
    // coffee:build     - Compile coffeescript files to build directory
    coffee: {
      build: {
        files: {
          '<%= config.dirs.build %>/main.js': config.files.scripts
        }
      }
    },

    // Concurrent tasks   - Allow tasks to be run concurrently
    // concurrent:test    - Allow unit-tests and watch task to be run simultaneously
    concurrent: {
      test: {
        tasks: [
          'karma:concurrent',
          'watch'
        ],
        options: {
          logConcurrentOutput: true
        }
      }
    },

    // Karma - test runner
    // karma:concurrent   - Run test in the background
    // karma:single       - Run tests once
    karma: {
      options: {
        configFile: 'karma.conf.js'
      },
      // Keep tests running in the background
      concurrent: {
        singleRun: false
      },
      // Run tests once
      single: {
        singleRun: true
      }
    },

    // Watch tasks      - Watch for changes in specified directories, and re-run specified task(s)
    // watch:coffee     - Watch coffeescript files, re-compile coffeescripts
    // watch:wiredep    - Watch bower.json for new bower_components, and inject new dependencies
    watch: {
      coffee: {
        files: config.files.scripts,
        tasks: ['coffee:build']
      },

      wiredep: {
        files: ['bower.json'],
        tasks: ['wiredep:test']
      }
    },

    // Wiredep tasks    - Inject bower dependencies automatically into source code
    // wiredep:test     - Inject bower dependencies into karma config
    wiredep: {
      test:{
        src: 'karma.conf.js',
        fileTypes: {
          js: {
            block: /(([\s\t]*)\/\/\s*bower:*(\S*))(\n|\r|.)*?(\/\/\s*endbower)/gi, // Wire dependencies between '// bower:extension' and '// endbower'
            detect: {
              js: /'(.*\.js)'/gi
            },
            replace: {
              js: '\'{{filePath}}\','
            }
          }
        }
      }
    }

  });

  // Custom tasks

  // test                     - Run a single run of unit tests
  //    [--no-install-deps]   - Skip dependency installation.
  grunt.registerTask('test', 'Run unit tests', function(){
    if(! grunt.option('no-install-deps')){
      grunt.task.run([
        'npm-install',
      ]);
    }

    grunt.task.run([
      'wiredep:test',
      'clean:build',
      'coffee:build',
      'karma:single'
    ]);
  });

  // build            - Compile files to build directory, watch files for changes, optionally run tests concurrently
  //    [--test]              - Run unit tests concurrently
  //    [--no-install-deps]   - Skip dependency installation.
  grunt.registerTask('build', 'Build, optionally run tests', function(){
    if(! grunt.option('no-install-deps')){
      grunt.task.run([
        'npm-install',
      ]);
    }

    grunt.task.run([
      'clean:build',
      'coffee:build',
    ]);

    if(grunt.option('test')){
      grunt.task.run([
        'wiredep:test',
        'concurrent:test'
      ]);
    } else {
      grunt.task.run(['watch']);
    }
  });

  // default task   - run by grunt when no task is specified
  grunt.registerTask('default', 'build');
};
