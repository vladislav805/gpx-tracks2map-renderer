const write = text => {
    process.stdout.clearLine();
    process.stdout.write(`${text}\r`);
};

module.exports = {
    write,
};
