var path = require('path');

var config = {
	liferayBundleDir: path.resolve('../bundles/tomcat-8.0.32')
};

if (process.env.LIFERAY_BUNDLE_HOME) {
	config.liferayBundleDir = process.env.LIFERAY_BUNDLE_HOME;
}

module.exports = config;