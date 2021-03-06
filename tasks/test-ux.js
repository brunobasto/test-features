'use strict';

var gulp = require('gulp');
var selenium = require('selenium-standalone');
var runSequence = require('run-sequence');
var fs = require('fs');

var runner = require('../tests/ux/runner');
var kill = require('./lib/kill');

var seleniumProcess;

module.exports = function() {
	gulp.task('test:ux', ['test:ux:start-selenium'], function(done) {
		runner({
			sauceLabs: false,
			browsers: [
				{
					browserName: 'chrome'
				}
			]
		}, function() {
			runSequence('test:ux:stop-selenium', done);
		});
	});

	gulp.task('test:ux:saucelabs', ['test:ux:start-selenium'], function(done) {
		runner({
			sauceLabs: true,
			browsers: [
				{
					browserName: 'chrome',
					name: 'Liferay Forms - UX - Chrome',
					platform: 'Windows 7',
					screenResolution: '1600x1200'
				},
				{
					browserName: 'firefox',
					name: 'Liferay Forms - UX - Firefox',
					platform: 'Windows 7',
					screenResolution: '1600x1200'
				}
			]
		}, function() {
			runSequence('test:ux:stop-selenium', done);
		});
	});

	gulp.task('test:ux:install-selenium', [], function(done) {
		selenium.install({
			version: '2.53.1',
			baseURL: 'http://selenium-release.storage.googleapis.com',
			drivers: {
				chrome: {
					version: '2.22',
					arch: process.arch,
					baseURL: 'https://chromedriver.storage.googleapis.com'
				}
			}
		}, done);
	});

	gulp.task('test:ux:start-selenium', ['test:ux:install-selenium'], function(done) {
		var out = fs.openSync('./selenium.out', 'a');

		selenium.start({
			version: '2.53.1',
			spawnOptions: {
				detached: false,
				stdio: ['ignore', out, out]
			}
		}, function(err, child) {
			seleniumProcess = child;

			var shutDown = function() {
				if (seleniumProcess) {
					kill(seleniumProcess.pid);
				}
			};

			process.on('exit', shutDown);
			process.on('SIGTERM', shutDown);

			done();
		});
	});

	gulp.task('test:ux:stop-selenium', [], function(done) {
		if (seleniumProcess) {
			kill(seleniumProcess.pid);
		}

		done();
	});
};