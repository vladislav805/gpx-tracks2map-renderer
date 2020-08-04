const fs = require('fs');
const path = require('url');
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
    const rawXml = openFile(path);

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

/**
 *
 * @param {Record<string, any>} args
 * @param {string[]} files
 * @param {function(status: string): void} onParsedFile
 * @returns {object[][]}
 */
const parseGpx = ({ args, files, onParsedFile }) => {
    const tracks = [];
    let left = files.length;

    for (const file of files) {
        let result;

        onParsedFile(`Parsing files... [${--left} left]`);

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
    return tracks;
};

module.exports = parseGpx;
