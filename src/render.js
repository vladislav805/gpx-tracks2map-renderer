const path = require('path');
const logSymbols = require('log-symbols');
const parseGpx = require('./parse-gpx');
const drawing = require('./drawing');
const getGpxFiles = require('./get-gpx-files');
const { LogLevel } = require('./log');
const { log } = require('./log');

/**
 *
 * @param {Record<string, any>} args
 * @param {Ora} cli
 */
const render = async(args, cli) => {
    const pathname = path.resolve(process.cwd(), args.input);

    log(args, LogLevel.INFO, `cwd: ${process.cwd()}`);
    log(args, LogLevel.INFO, `working path: ${pathname}`);

    const files = getGpxFiles(pathname);

    log(args, LogLevel.VERBOSE, `Found files:\n${files.join('\n')}`);

    cli = cli.stopAndPersist({
        symbol: logSymbols.success,
        text: `Found ${files.length} gpx files`,
    });

    const tracks = parseGpx({
        files,
        args,
        onParsedFile: status => {
            cli.text = status;
            cli.render();
        },
    });

    cli = cli.stopAndPersist({
        symbol: logSymbols.success,
        text: `Files parsed`,
    });

    const resultFile = await drawing({
        tracks,
        args,
        onProgress: status => {
            cli.text = status;
            cli.render();
        },
    });

    cli.succeed(`Successfully saved in ${resultFile}`);
};

module.exports = render;
