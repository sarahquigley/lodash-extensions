# lodash-extensions

[![Build Status](https://travis-ci.org/sarahquigley/lodash-extensions.svg)](https://travis-ci.org/sarahquigley/lodash-extensions)
[![Dependency Status](https://gemnasium.com/sarahquigley/lodash-extensions.svg)](https://gemnasium.com/sarahquigley/lodash-extensions)
[![devDependency Status](https://david-dm.org/sarahquigley/lodash-extensions/dev-status.svg)](https://david-dm.org/sarahquigley/lodash-extensions#info=devDependencies)
[![GitHub release](https://img.shields.io/github/release/sarahquigley/lodash-extensions.svg)](https://github.com/sarahquigley/lodash-extensions/releases)
[![Coverage Status](https://coveralls.io/repos/sarahquigley/lodash-extensions/badge.svg?branch=master&service=github)](https://coveralls.io/github/sarahquigley/lodash-extensions?branch=master)

A library of extensions for lodash.js.


## Installation

This package can be installed via bower:

```
bower install lodash-extensions --save
```

This package can be installed via npm:

```
npm install lodash-extensions --save
```


## Installing dependencies


### Install node.js and node package manager (npm).

From Debian and Ubuntu based distributions, use the following commands:

```
sudo apt-get install nodejs
sudo apt-get install nodejs-legacy
sudo apt-get install npm
```

For other distributions, you will not need the nodejs-legacy package. For information about other distributions, see:
[Installing node.js via package manager](https://github.com/joyent/node/wiki/Installing-Node.js-via-package-manager)


### Install Grunt Client (Optional)

To use the `grunt-cli`, it is easiest if it is installed globally.

```
sudo npm install -g grunt-cli
```

If you do not wish to install the `grunt-cli`, a script (see `grunt` file in project root) has been included. This allows you to use the local `grunt-cli` installation to run `grunt` commands. To do so, replace `grunt` in all `grunt` commands with `./grunt`.

e.g. `grunt` becomes `./grunt`, `grunt build` becomes `./grunt build`


### Install Project Specific Dependencies

This project has two kinds of dependencies: tools and libraries.

Tools:

*  are for managing and testing the application
*  are specified in `package.json`.
*  are installed via `npm`, the node package manager.

Libraries:

*  are the client-side dependencies which actually get shipped with the app.
*  are specified in `bower.json`.
*  are installed via `bower`, a client-side code package manager.

In this project, `npm install` has been configured to automatically run `bower install`, so we can simply run:

```
npm install
```

This will create the following folders:

* `node_modules` - contains the npm packages for tools needed.
* `app/bower_components` - contains bower packages for libraries needed.



## Testing


### Unit Tests

Unit tests are written in [Jasmine 2.0](http://jasmine.github.io/), and run with the [Karma Test Runner](http://karma-runner.github.io/0.12/index.html). We provide a Karma configuration file to run them.

* Configuration for karma is found in `karma.conf.js`
* Unit tests are to be named as follows: `*.spec.coffee`



## Grunt tasks

Note: if using local grunt (described above), replace `grunt` in all commands listed below with `./grunt`.

e.g. `grunt build` becomes `./grunt build`


### grunt build 

This tasks compiles Coffeescript source files to Javascript in the build directory. It watches those files for changes, and re-compiles them on change.

This is the default grunt task.

Command: `grunt` or `grunt build`.

This task also gives you the option of running unit tests and compiling Coffeescript source files simultaneously. Tests will automatically re-run in response to changes in the source code / specs.

Command: `grunt --test` or `grunt build --test`


### grunt test

This tasks compiles Coffeescript source files to Javascript in the build directory, and runs a single run of unit tests, outputing the test results to the console. Changes to files are not watched and the task terminates as soon as the unit tests complete.

Command: `grunt test`
