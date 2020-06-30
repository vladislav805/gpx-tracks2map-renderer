const fs = require('fs');
const { write } = require('./terminal');
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
 */
module.exports = async({ tracks, args }) => {
    if (!fs.existsSync(args['map-image'])) {
        console.error(`File with map ${args['map-image']} does not exists`);
        return;
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
        write(`Stage 2: drawing tracks... ${--left} left...`);

        ctx.beginPath();

        ctx.strokeStyle = args['line-color'];

        for (const { lat, lng } of track) {
            const { x, y } = getPositionByLocation(lat, lng);
            draw(x, y);
        }

        ctx.stroke();
    }

    write(`\rStage 3: saving stream...`);

    const out = fs.createWriteStream(`${args.output}.png`);

    const stream = canvas.createPNGStream();
    stream.pipe(out);
    out.on('finish', () => {
        write(`Successfully saved in ${out.path}\n`);
    });
};
