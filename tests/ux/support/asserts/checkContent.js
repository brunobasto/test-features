var isIE = require('../utils/isIE');
var waitFor = require('./waitFor');

module.exports =  function(type, element, falseCase, origText, done) {
	var instance = this;
	var browser = this.browser;

	var assertText = function(text) {
		if (falseCase) {
			origText.should.not.equal(text);
		}
		else {
			origText.should.equal(text);
		}
	};

	if (type === 'inputfield') {
		browser.getValue(element)
			.then(assertText)
			.catch(function(err) {
				should.not.exist(err);
			})
			.call(done)
	}
	else {
		var executeAction = function() {
			browser.getText(element)
			.then(assertText)
			.catch(function(err) {
				should.not.exist(err);
			})
			.call(done)
		};

		browser.elements(element)
		.then(function (elements) {
			if (elements.value.length === 0) {
				waitFor.call(instance, element, null, 'visible', executeAction);
			}
			else {
				executeAction();
			}
		})
		.catch(function(err) {
			should.not.exist(err);
		});
	}
};