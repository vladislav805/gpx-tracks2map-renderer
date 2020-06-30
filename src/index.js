const parseArgs = require('./parse-args');
const parseGpx = require('./parse-gpx');
const drawing = require('./drawing');

const args = parseArgs({
    output: 'string', // path to file with result
    'disable-cache': 'flag', // disable reading parsed gpx files
    'disable-caching': 'flag', // disable writing parsed gpx files
    'line-color': 'string', // track line color
    'line-width': 'number', // track width in pixels
    'map-image': 'string', // path to file with map
}, {
    output: 'result',
    'disable-cache': false,
    'disable-caching': false,
    'line-color': '#ff0000',
    'line-width': 5,
    'map-image': 'map.png',
});

Promise.resolve(args)
    .then(parseGpx)
    .then(drawing)
