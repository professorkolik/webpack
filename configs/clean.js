const del = require('del');

module.exports = options => () => del([options.src]);
