import * as gulp from 'gulp';
import * as project from '../aurelia.json';
import * as path from 'path';
import * as del from 'del';
import * as rename from 'gulp-rename';
import {CLIOptions} from 'aurelia-cli';


let dist = project.platform.release;
let rootFiles = [
  'index.html',
  'index.js'
];

export default gulp.series(
  deleteFolder,
  gulp.parallel(
    copyRoot,
    copyPackage,
    copyScripts,
    copyStyles,
    copyFonts,
    copyLocales
  ),
  buildElectron
);

function deleteFolder() {
  return del([
    path.join(dist, '**/*'),
    '!' + dist
  ]);
}
function copyRoot() {
  return gulp.src(rootFiles).pipe(gulp.dest(dist));
}
function copyPackage() {
  return gulp.src('package.electron.json').pipe(rename('package.json')).pipe(gulp.dest(dist));
}
function copyScripts() {
  return gulp.src('scripts/**/*.*')
    .pipe(gulp.dest(path.join(dist, 'scripts')));
}
function copyStyles() {
  return gulp.src('styles/**/*.*')
    .pipe(gulp.dest(path.join(dist, 'styles')));
}
function copyFonts() {
  return gulp.src('fonts/**/*.*')
    .pipe(gulp.dest(path.join(dist, 'fonts')));
}
function copyLocales() {
  return gulp.src('locales/**/*.*')
    .pipe(gulp.dest(path.join(dist, 'locales')));
}

function buildElectron(cb) {
  var builder = require("electron-builder");

  // not tested on IOS!

  // signing (windows only?)
  // process.env.CSC_LINK = "file://C:\\Sertificates\\X-Company\\codesigningcert.pfx";
  // process.env.CSC_KEY_PASSWORD = "xxxxxxxxx";

  // build and other properties, more options in package.json (build section)
  // also see https://goo.gl/5jVxoO
  let config: any = {
    devMetadata: {
      directories: project.platform.electron,
      build: {
        extraResources:[{
          from: project.platform.electron.buildResources + '/icons/128x128.png',
          to: 'icon.png'
        }],

        win: {
          icon: project.platform.electron.buildResources + '/icon.ico',
          signingHashAlgorithms: ['sha256']
        },
        nsis: {
          language: 1033
        }
      }
    }
  };

  // do not create installer if in developer environment
  // this only work if `targets` is undefined
  if (!config.targets) config.dir = CLIOptions.getEnvironment() === 'dev' ? true : false;
  
  builder.build(config).then(()=> { cb });  
}
