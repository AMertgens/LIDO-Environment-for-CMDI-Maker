// include gulp
var gulp = require('gulp'); 
 
// include plug-ins
//var jshint = require('gulp-jshint');
var changed = require('gulp-changed');
//var imagemin = require('gulp-imagemin');
//var minifyHTML = require('gulp-minify-html');
var concat = require('gulp-concat');
var stripDebug = require('gulp-strip-debug');
var uglify = require('gulp-uglify');
var minifyCSS = require('gulp-minify-css');
//var htmlreplace = require('gulp-html-replace');
//var header = require('gulp-header');
//var manifest = require('gulp-manifest');
var notify = require('gulp-notify');
//var imageResize = require('gulp-image-resize');


var source_scripts = [
	"src/js/lido_main.js",
	"src/js/lido_generator.js",
	"src/js/lido_forms.js",
	"src/js/lido_1.js",
	"src/js/lido_2.js",
	"src/js/lido_3.js",
	"src/js/lido_4.js",
	"src/js/lido_5.js",
	"src/js/lido_output.js"
];
 
 



// minify new images
gulp.task('imagemin', function() {
	var imgSrc = './src/img/**/*',
		imgDst = './build/img';
 
	gulp.src(imgSrc)
		//.pipe(changed(imgDst))
		.pipe(imagemin())
		.pipe(gulp.dest(imgDst));
});



// minify new or changed HTML pages
gulp.task('htmlminify', function() {
  //var htmlSrc = './*.html';
  var htmlSrc = './src/index.html';
  //because we first replace script and style tags and then replace the file
  //at the build direction
  
  
  var htmlDst = './build';
 
  gulp.src(htmlSrc)
    .pipe(changed(htmlDst))
    .pipe(htmlreplace({
        'css': 'styles/styles.css',
        'js': 'js/script.js'
    }))
    .pipe(minifyHTML())
    .pipe(gulp.dest(htmlDst))
	.pipe(notify({message: 'HTML minify task complete'}));
});


// JS concat, strip debugging, minify, and add header
gulp.task('scripts', function() {
  gulp.src(source_scripts)
    .pipe(concat('lido_environment.js')).on('error', errorHandler)
    //.pipe(stripDebug())
    .pipe(uglify()).on('error', errorHandler)
    .pipe(gulp.dest('./build/')).on('error', errorHandler)
	.pipe(notify({message: 'Scripts task complete'}));
});


gulp.task('script-workers', function() {
  gulp.src(worker_and_dynamic_scripts)
    .pipe(gulp.dest('./build/js/'))
	.pipe(notify({message: 'Script workers task complete'}));
});


var style_sources = [
	"./src/css/layout-lido.css",
];


// CSS concat and minify
gulp.task('styles', function() {
  gulp.src(style_sources)
    .pipe(concat('lido_environment.css'))
    .pipe(minifyCSS())
    .pipe(gulp.dest('./build/'))
	.pipe(notify({message: 'Styles task complete'}));
});


gulp.task('manifest', function(){
  gulp.src(['build/**/*'])
    .pipe(manifest({
      hash: true,
      filename: 'cmdi_maker.appcache',
	  network: ["*"],  //important, so that network stuff like version checker works
      exclude: ['cmdi_maker.appcache', 'img/logos/Thumbs.db']
     }))
    .pipe(gulp.dest('build'))
	.pipe(notify({message: 'Manifest task complete'}));
});


/* Don't use ImageMagick because it has a bug that makes some PNGs transparent. GraphicsMagick is in this case better. */
/* But we don't do image resizing at all at this point. */
/*
gulp.task('resize', function () {
  gulp.src(['src/img/icons/*'])
    .pipe(imageResize({ 
      width : 36,
      height : 36,
      upscale : false,
	  imageMagick: false
    }))
    .pipe(gulp.dest('build/img/icons/'));
});
*/


// default gulp task
gulp.task('default', ['scripts', 'styles'], function() {});


// Error handler
function errorHandler (error) {
  console.log(error.toString());
  this.emit('end');
}


