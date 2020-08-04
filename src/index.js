const showHelp = require('./help');
const render = require('./render');
const parseArgs = require('./parse-args');
const purgeCache = require('./purge-cache');

const supportedActions = ['render', 'help', 'version', 'purge-cache'];

/** @type {Ora} */
const cli = require('ora')({ hideCursor: true }).start();

const { action, args } = parseArgs({
    input: 'string', // path to directory with gpx files
    output: 'string', // path to file with result
    'log-level': 'number', // 0 - disabled, 1 - verbose, 2 - max verbose
    'disable-cache': 'flag', // disable reading parsed gpx files
    'disable-caching': 'flag', // disable writing parsed gpx files
    'line-color': 'string', // track line color
    'line-width': 'number', // track width in pixels
    'map-image': 'string', // path to file with map
}, {
    input: '',
    output: 'result',
    'log-level': 0,
    'disable-cache': false,
    'disable-caching': false,
    'line-color': '#ff0000',
    'line-width': 5,
    'map-image': 'map.png',
});

if (!supportedActions.includes(action)) {
    cli.fail(`Unsupported action. Supported: ${supportedActions.join(', ')}`);
    process.exit(2);
}

switch (action) {
    case 'help': {
        cli.stop();
        showHelp();
        break;
    }

    case 'version': {
        cli.stop();
        console.log(`${process.env.npm_package_name}: v${process.env.npm_package_version}`);
        break;
    }

    case 'purge-cache': {
        purgeCache(args);
        break;
    }

    case 'render': {
        try {
            void render(args, cli);
        } catch (e) {
            cli.fail(`${e.message}\n${e.stack}`);
        }
    }
}
