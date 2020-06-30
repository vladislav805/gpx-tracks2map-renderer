const parseArgs = (spec, defaults) => {
    const args = process.argv.slice(2); // [node, file, ...args]

    const result = {};

    for (let index = 0; index < args.length; ++index) {
        const val = args[index];
        const key = val.slice(1);

        if (val.startsWith('-') && key in spec) {
            const next = args[index + 1];
            if (spec[key] !== 'flag') {
                if (next) {
                    let value = next;

                    if (spec[key] === 'number') {
                        value = +value;

                        if (isNaN(value)) {
                            throw new Error(`Argument ${val} should be number`);
                        }
                    }

                    result[key] = value;
                } else {
                    throw new Error(`Argument ${val} should have value`);
                }
                ++index;
            } else {
                result[key] = true;
            }
        }
    }

    return { ...defaults, ...result };
};

module.exports = parseArgs;
