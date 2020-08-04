const getGpxFiles = require('./get-gpx-files');

const purgeCache = (args) => {
    const files = getGpxFiles(pathname);
};

module.exports = purgeCache;
