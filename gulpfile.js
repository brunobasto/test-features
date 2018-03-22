'use strict';

var gulp = require('gulp');
var runSequence = require('run-sequence');

var registerUXlTestsTasks = require('./tasks/test-ux');

registerUXlTestsTasks();

gulp.task('test', function(done) {
	runSequence('test:ux', done);
});

gulp.task('test:ci', function(done) {
	runSequence('test:ux:saucelabs', done);
});