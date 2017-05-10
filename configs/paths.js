const paths = {
  baseDir: './',
  srcFolder: 'src/',
  buildFolder: 'build/',
  prodFolder: 'prod/',
  view: {
    srcFolder: '',
    buildFolder: '',
    prodFolder: '',
    files: '*.pug',
    deepFiles: '**/*.pug'
  },
  style: {
    srcFolder: '',
    buildFolder: 'css/',
    prodFolder: 'css/',
    files: '*.scss',
    deepFiles: '**/*.scss'
  },
  js: {
    srcFolder: 'js/',
    buildFolder: 'js/',
    prodFolder: 'js/',
    files: '*.js',
    deepFiles: '**/*.js'
  },
  image: {
    srcFolder: '**/images/',
    buildFolder: 'images/',
    prodFolder: 'images/',
    files: '*.{gif,jpeg,jpg,png,ico,svg}',
    deepFiles: '**/*.{gif,jpeg,jpg,png,ico,svg}'
  },
  sprite: {
    prefixFolder: 'sprite-',
    prefixFile: '',
    srcFolder: '*/',
    buildFolder: '*/',
    prodFolder: '*/',
    files: '*.png'
  },
  spriteSvg: {
    srcFolder: '',
    buildFolder: '',
    prodFolder: '',
    files: 'ico-*.svg',
    deepFiles: '**/ico-*.svg'
  },
  font: {
    srcFolder: 'fonts/',
    buildFolder: 'fonts/',
    prodFolder: 'fonts/',
    files: '*.{woff2,woff,eot,ttf,svg}',
    deepFiles: '**/*.{woff2,woff,eot,ttf,svg}'
  },
  src: {
    view: {},
    style: {},
    js: {},
    image: {},
    sprite: {},
    spriteSvg: {},
    font: {}
  },
  build: {
    view: {},
    style: {},
    js: {},
    image: {},
    sprite: {},
    spriteSvg: {},
    font: {}
  },
  prod: {
    view: {},
    style: {},
    js: {},
    image: {},
    sprite: {},
    spriteSvg: {},
    font: {}
  }
};

/** src files of project */
paths.src.folder = paths.baseDir + paths.srcFolder;
/** view */
paths.src.view.folder = paths.src.folder + paths.view.srcFolder;
paths.src.view.files = paths.src.view.folder + paths.view.deepFiles;
/** style */
paths.src.style.folder = paths.src.folder + paths.style.srcFolder;
paths.src.style.files = paths.src.style.folder + paths.style.deepFiles;
/** js */
paths.src.js.folder = paths.src.folder + paths.js.srcFolder;
paths.src.js.files = paths.src.js.folder + paths.js.deepFiles;
/** image */
paths.src.image.folder = paths.src.folder + paths.image.srcFolder;
paths.src.image.files = paths.src.image.folder + paths.image.deepFiles;
/** sprite */
paths.src.sprite.folder = `${paths.src.image.folder}${paths.sprite.prefixFolder}${paths.sprite.srcFolder}`;
paths.src.sprite.files = paths.src.sprite.folder + paths.sprite.prefixFile + paths.sprite.files;
/** sprite svg */
paths.src.spriteSvg.folder = `${paths.src.image.folder}${paths.spriteSvg.srcFolder}`;
paths.src.spriteSvg.files = paths.src.spriteSvg.folder + paths.spriteSvg.files;
/** font */
paths.src.font.folder = paths.src.folder + paths.font.srcFolder;
paths.src.font.files = paths.src.font.folder + paths.font.deepFiles;

/** build files of project */
paths.build.folder = paths.baseDir + paths.buildFolder;
/** view */
paths.build.view.folder = paths.build.folder + paths.view.buildFolder;
paths.build.view.files = paths.build.view.folder + paths.view.deepFiles;
/** style */
paths.build.style.folder = paths.build.folder + paths.style.buildFolder;
paths.build.style.files = paths.build.style.folder + paths.style.deepFiles;
/** js */
paths.build.js.folder = paths.build.folder + paths.js.buildFolder;
paths.build.js.files = paths.build.js.folder + paths.js.deepFiles;
/** image */
paths.build.image.folder = paths.build.folder + paths.image.buildFolder;
paths.build.image.files = paths.build.image.folder + paths.image.deepFiles;
/** sprite */
paths.build.sprite.folder = `${paths.build.image.folder}${paths.sprite.prefixFolder}${paths.sprite.buildFolder}`;
paths.build.sprite.files = paths.build.sprite.folder + paths.sprite.prefixFile + paths.sprite.files;
/** sprite svg */
paths.build.spriteSvg.folder = `${paths.build.image.folder}${paths.spriteSvg.srcFolder}`;
paths.build.spriteSvg.files = paths.build.spriteSvg.folder + paths.spriteSvg.files;
/** font */
paths.build.font.folder = paths.build.folder + paths.font.buildFolder;
paths.build.font.files = paths.build.font.folder + paths.font.deepFiles;

/** prod files of project */
paths.prod.folder = paths.baseDir + paths.prodFolder;
/** view */
paths.prod.view.folder = paths.prod.folder + paths.view.prodFolder;
paths.prod.view.files = paths.prod.view.folder + paths.view.deepFiles;
/** style */
paths.prod.style.folder = paths.prod.folder + paths.style.prodFolder;
paths.prod.style.files = paths.prod.style.folder + paths.style.deepFiles;
/** js */
paths.prod.js.folder = paths.prod.folder + paths.js.prodFolder;
paths.prod.js.files = paths.prod.js.folder + paths.js.deepFiles;
/** image */
paths.prod.image.folder = paths.prod.folder + paths.image.prodFolder;
paths.prod.image.files = paths.prod.image.folder + paths.image.deepFiles;
/** sprite */
paths.prod.sprite.folder = `${paths.prod.image.folder}${paths.sprite.prefixFolder}${paths.sprite.prodFolder}`;
paths.prod.sprite.files = paths.prod.sprite.folder + paths.sprite.prefixFile + paths.sprite.files;
/** sprite svg */
paths.prod.spriteSvg.folder = `${paths.prod.image.folder}${paths.spriteSvg.srcFolder}`;
paths.prod.spriteSvg.files = paths.prod.spriteSvg.folder + paths.spriteSvg.files;
/** font */
paths.prod.font.folder = paths.prod.folder + paths.font.prodFolder;
paths.prod.font.files = paths.prod.font.folder + paths.font.deepFiles;

module.exports = paths;
