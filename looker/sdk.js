const {
	Looker31SDK: LookerSDK
} = require('@looker/sdk');
const {
	NodeSettingsIniFile,
	NodeSession
} = require('@looker/sdk-node');

const localConfig = './looker.ini';

/** Settings retrieved from the configuration file */
const settings = new NodeSettingsIniFile('', localConfig, 'Looker');
/**
 * Automatic authentication support for the Node SDK
 * Initialized node-based session manager
 */
const session = new NodeSession(settings);
/** Initialized SDK object for the Node runtime */
module.exports.sdk = new LookerSDK(session);