const logSymbols = require('log-symbols');

const LogLevel = {
    INFO: 1,
    VERBOSE: 2,
};

const log = (args, from, text) => {
    if (args['log-level'] >= from) {
        console.log(`${logSymbols.info} ${text}`);
    }
};

module.exports = {
    log,
    LogLevel,
};
