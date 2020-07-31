const fs = require('fs');
const getGpxFiles = require('./get-gpx-files');
const { write } = require('./terminal');
const { convert } = require('xmlbuilder2');

/**
 * @param {string} path
 * @returns {string}
 */
const openFile = path => fs.readFileSync(path, { encoding: 'utf-8' });

/**
 *
 * @param {string} path
 * @param {string} data
 */
const writeFile = (path, data) => fs.writeFileSync(path, data, { encoding: 'utf-8' });

/**
 * @param {string} path Path
 * @returns {object[][]}
 */
const convertXml2json = path => {
    let rawXml = openFile(path);

    if (rawXml.charCodeAt(0) === 0xFEFF) {
        rawXml = rawXml.substring(1);
    }

    const xml = convert(rawXml, { format: 'object' });

    let segments = xml.gpx.trk.trkseg;

    if (!Array.isArray(segments)) {
        segments = [segments];
    }

    return segments.reduce((list, current) => list.concat(current.trkpt), []).map(cur => {
        return {
            lat: +cur['@lat'],
            lng: +cur['@lon'],
        };
    });
};


module.exports = args => {
    const files = getGpxFiles(process.cwd());

    const tracks = [];
    let left = files.length;

    for (const file of files) {
        let result;

        write(`Stage 1: parsing files... ${--left} left`);

        const fileCache = `${file}.json`;
        if (!args['disable-cache'] && fs.existsSync(fileCache)) {
            result = JSON.parse(openFile(fileCache));
        } else {
            result = convertXml2json(file)

            if (!args['disable-caching']) {
                writeFile(fileCache, JSON.stringify(result));
            }
        }

        tracks.push(result);
    }

    return { tracks, args };
};
