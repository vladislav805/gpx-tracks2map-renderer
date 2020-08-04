const fs = require('fs');

/**
 *
 * @param {string} dir
 * @returns {string[]}
 */
const getGpxFilesRecursive = dir => {
    let result = [];

    if (dir.includes('node_modules')) {
        return result;
    }

    fs.readdirSync(dir).forEach(file => {
        file = `${dir}/${file}`;
        const stat = fs.statSync(file);

        if (stat && stat.isDirectory() && fs.existsSync(file)) {
            result = result.concat(getGpxFilesRecursive(file))
        } else if (file.endsWith('.gpx')) {
            result.push(file);
        }
    });

    return result;
};

module.exports = getGpxFilesRecursive;
