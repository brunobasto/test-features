#!/usr/bin/env node

var gulp = require('gulp');
var Yadda = require('yadda');

var yargs = require('yargs')
	.string('_')
	.usage('test-features [command] [options]')
	.alias('f', 'feature-files')
	.alias('v', 'version')
	.option('feature-files', {
		demand: true,
		describe: 'The glob matching the feature file to be tested'
	})
	.describe('version', 'Prints current version')
	.help('h')
	.epilog('Copyright 2015')
	.version(function() {
		return require('../package').version;
	});

var argv = yargs.argv;

require('../gulpfile');

if (argv['feature-files']) {
	console.log('using feature files', argv['feature-files']);
	Yadda.featureFiles = argv['feature-files'];
}

for (var task in gulp.tasks) {
	yargs.command(task, 'Gulp task');
}

gulp.start.apply(gulp, ['test']);