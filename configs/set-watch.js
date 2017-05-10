const isDevelopment = process.env.NODE_ENV.trim() === 'development';
module.exports = () => (cb) => {
  if (isDevelopment) {
    global.isWatching = true;
  }
  cb();
};
