const fs = require('fs');
const { Canvas, loadImage } = require('canvas');
const { edges } = require('./config');

const Range = {
    NS: edges.N - edges.S,
    WE: edges.W - edges.E,
};

/**
 * lng = x
 * lat = y
 */

const getPositionByLocation = (lat, lng) => {
    lat -= edges.S;
    lng -= edges.E;
    return {
        x: lng / Range.WE,
        y: lat / Range.NS,
    };
};

/**
 *
 * @param {object[][]} tracks
 * @param {object} args
 * @param {function(status: string): void} onProgress
 */
module.exports = async({ tracks, args, onProgress }) => {
    if (!fs.existsSync(args['map-image'])) {
        throw new Error(`File with map ${args['map-image']} does not exists`);
    }

    const image = await loadImage(args['map-image'])

    const { width, height } = image;

    const canvas = new Canvas(width, height);
    const ctx = canvas.getContext('2d');

    ctx.drawImage(image, 0, 0);

    const draw = (x, y) => ctx.lineTo(x * width, (1 - y) * height);

    ctx.lineWidth = +args['line-width'];

    let left = tracks.length;
    for (const track of tracks) {
        onProgress(`Drawing tracks... [${--left} left]`);

        ctx.beginPath();

        ctx.strokeStyle = args['line-color'];

        for (const { lat, lng } of track) {
            const { x, y } = getPositionByLocation(lat, lng);
            draw(x, y);
        }

        ctx.stroke();
    }

    onProgress(`Saving stream...`);

    const out = fs.createWriteStream(`${args.output}.png`);

    return new Promise(resolve => {
        const stream = canvas.createPNGStream();
        stream.pipe(out);
        out.on('finish', () => {
            resolve(out.path);
        });
    });
};
