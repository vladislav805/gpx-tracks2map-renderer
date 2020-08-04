const write = text => {
    process.stdout.clearLine();
    process.stdout.write(`${text}\r`);
};

const SYMBOL_OK = '✔';

module.exports = {
    write,
    SYMBOL_OK,
};
