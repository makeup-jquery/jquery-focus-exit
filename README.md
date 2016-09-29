# jquery-focus-exit

<p>
    <a href="https://travis-ci.org/ianmcburnie/jquery-focus-exit"><img src="https://api.travis-ci.org/ianmcburnie/jquery-focus-exit.svg?branch=master" alt="Build Status" /></a>
    <a href='https://coveralls.io/github/ianmcburnie/jquery-focus-exit?branch=master'><img src='https://coveralls.io/repos/ianmcburnie/jquery-focus-exit/badge.svg?branch=master&service=github' alt='Coverage Status' /></a>
    <a href="https://david-dm.org/ianmcburnie/jquery-focus-exit"><img src="https://david-dm.org/ianmcburnie/jquery-focus-exit.svg" alt="Dependency status" /></a>
    <a href="https://david-dm.org/ianmcburnie/jquery-focus-exit#info=devDependencies"><img src="https://david-dm.org/ianmcburnie/jquery-focus-exit/dev-status.svg" alt="devDependency status" /></a>
</p>

Triggers 'focusExit' event when keyboard focus moves to a non-descendant of widget. This type of behaviour is especially desirable for non-modal overlays.

JavaScript's native 'focusout' event fires when any descendant of a given element loses keyboard focus, even if another descendant immediately gains focus. This type of behaviour is not desirable for non-modal overlays.

```js
// init plugin
$(collection).focusExit();

// handle event
$(collection).on('focusExit', function(e, data) {
    console.log(data.lostFocus, data.gainedFocus);
})
```

## Experimental

This plugin is still in an experimental state, until it reaches v1.0.0 you must consider all minor releases as breaking changes. Patch releases may introduce new features, but will be backwards compatible.

## Install

```js
npm install jquery-focus-exit
```

## Development

Run `npm start` to run the demo page using browser-sync. Run `npm run tdd` for test driven development. All tests are located in `test.js`.

Useful NPM scripts:

* `npm start` runs demo page on local server and re-syncs browser on source file change
* `npm test` runs tests & generates reports (see reports section below)
* `npm run tdd` test driven development: watches code and re-tests after any change
* `npm run lint` lints code and reports to jshint.txt
* `npm run build` cleans, lints, tests and minifies (called on `npm prepublish` hook)

Execute `npm run` to view all available CLI scripts.

## Reports

Each test run will generate the following reports:

* `/test_reports/coverage` contains Istanbul code coverage report
* `/test_reports/html` contains HTML test report
* `/test_reports/junit` contains JUnit test report

## CI Build

https://travis-ci.org/ianmcburnie/jquery-focus-exit

## Code Coverage

https://coveralls.io/github/ianmcburnie/jquery-focus-exit?branch=master
