/**
 * @file Extends `./overrides-javascript` but ignores unsafe types.
 */

const overridesJavaScript = require('./overrides-javascript');

/**
 * typescript-eslint
 *
 * @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules
 */
overridesJavaScript.overrides[0].rules['@typescript-eslint/no-unsafe-argument'] = 'off';
overridesJavaScript.overrides[0].rules['@typescript-eslint/no-unsafe-assignment'] = 'off';
overridesJavaScript.overrides[0].rules['@typescript-eslint/no-unsafe-call'] = 'off';
overridesJavaScript.overrides[0].rules['@typescript-eslint/no-unsafe-member-access'] = 'off';
overridesJavaScript.overrides[0].rules['@typescript-eslint/no-unsafe-return'] = 'off';

module.exports = overridesJavaScript;
