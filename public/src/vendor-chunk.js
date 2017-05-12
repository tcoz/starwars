require('!!script-loader!core-js/client/shim.js');

/**
 * Polyfill is needed to implement 2015+ generators.
 * Polyfill MUST load before zone.js, or zone.js promises will be overwritten
 * and throw very nasty app crashing error.
 */
require('!!script-loader!babel-polyfill/dist/polyfill.js');

/**
 * Zone enables a sort of 'tick' for bindings and change detection.
 * databinding won't work without it. It's kind of the new $digest.
 */
require('!!script-loader!zone.js/dist/zone.js');

require('!!script-loader!reflect-metadata/test/Reflect.js');
require('!!script-loader!rxjs/bundles/Rx.js');



