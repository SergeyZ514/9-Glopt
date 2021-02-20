const gulp = require('gulp'),
   browserSync = require('browser-sync'),
   sass = require('gulp-sass'),
   cleanCSS = require('gulp-clean-css'),
   autoprefixer = require('autoprefixer'),
   postcss = require('gulp-postcss'),
   rename = require('gulp-rename'),
   imagemin = require('gulp-imagemin'),
   htmlmin = require('gulp-htmlmin'),
   fileInclude = require('gulp-file-include'),
   uglify = require('gulp-uglify-es').default,
   webp = require('gulp-webp'),
   imageminWebp = require('imagemin-webp'),
   webpHtml = require('gulp-webp-html'),
   webpCss = require('gulp-webp-css'),
   newer = require('gulp-newer'),
   imageminPngquant = require('imagemin-pngquant'),
   imageminZopfli = require('imagemin-zopfli'),
   imageminMozjpeg = require('imagemin-mozjpeg'),
   favicons = require('gulp-favicons'),
   wait = require('gulp-wait');

const path = {
   html: {
      src: ['./src/**/*.html', '!./src/_*.html'],
      dist: './dist/',
      watch: './src/**/*.html',
   },
   styles: {
      src: './src/sass/style.scss',
      dist: './dist/css/',
      watch: [
         './src/sass/**/*.+(scss|sass|css)',
         '!./src/sass/**/#*.+(scss|sass|css)',
      ],
   },
   scripts: {
      src: [
         './src/js/**/**/script.js',
         '!./src/js/**/#*.js',
         '!./src/js/libs/',
      ],
      dist: './dist/js/',
      watch: './src/js/**/*.js',
   },
   script_libs: {
      src: './src/js/libs/**/*.js',
      dist: './dist/js/',
      watch: './src/js/libs/**/*.js',
   },
   images: {
      src: [
         './src/img/**/*.{jpg,jpeg,png,gif,tiff,svg}',
         '!./src/img/favicon/*',
      ],
      dist: './dist/img/',
      watch: [
         './src/img/**/*.{jpg,jpeg,png,gif,svg,tiff}',
         '!./src/img/favicon/*',
      ],
   },
   favicon: {
      src: './src/img/favicon/*.{jpg,jpeg,png,gif}',
      dist: './dist/img/favicons/',
      watch: './src/img/favicon/*',
   },
   fonts: {
      src: './src/fonts/**/*.{woff,woff2}',
      dist: './dist/fonts/',
      watch: './src/fonts/**/*.{woff,woff2}',
   },
};

gulp.task('server', function () {
   browserSync({
      server: {
         baseDir: './dist/',
         host: '192.168.1.64',
         port: 3000,
         notify: false,
      },
   });
});

gulp.task('styles', function () {
   return gulp
      .src(path.styles.src)
      .pipe(wait(80))
      .pipe(sass().on('error', sass.logError))
      .pipe(postcss([autoprefixer()]))
      .pipe(webpCss({ webpClass: '', noWebpClass: '.no-webp' }))
      .pipe(gulp.dest(path.styles.dist))
      .pipe(cleanCSS({ compatibility: 'ie11' }))
      .pipe(rename({ suffix: '.min', prefix: '' }))
      .pipe(gulp.dest(path.styles.dist))
      .pipe(browserSync.stream());
});

gulp.task('scripts', function () {
   return gulp
      .src(path.scripts.src)
      .pipe(newer(path.scripts.dist))
      .pipe(fileInclude())
      .pipe(gulp.dest(path.scripts.dist))
      .pipe(uglify())
      .pipe(rename({ suffix: '.min', prefix: '' }))
      .pipe(gulp.dest(path.scripts.dist))
      .pipe(browserSync.stream());
});

gulp.task('script_libs', () => {
   return gulp
      .src(path.script_libs.src)
      .pipe(newer(path.script_libs.dist))
      .pipe(gulp.dest(path.script_libs.dist))
      .pipe(browserSync.stream());
});

gulp.task('fonts', function () {
   return gulp
      .src(path.fonts.src)
      .pipe(newer(path.fonts.dist))
      .pipe(gulp.dest(path.fonts.dist))
      .pipe(browserSync.stream());
});

gulp.task('webp', function () {
   return gulp
      .src(path.images.src)
      .pipe(newer(path.images.dist))
      .pipe(
         webp(
            imageminWebp({
               lossless: true,
               quality: 100,
               alphaQuality: 100,
            })
         )
      )
      .pipe(gulp.dest(path.images.dist))
      .pipe(browserSync.stream());
});

gulp.task('images', function () {
   return gulp
      .src(path.images.src)
      .pipe(newer(path.images.dist))
      .pipe(
         imagemin([
            imageminPngquant({
               speed: 5,
               quality: [0.6, 0.8],
            }),
            imageminZopfli({
               more: true,
            }),
            imageminMozjpeg({
               progressive: true,
               quality: 90,
            }),
            imagemin.svgo({
               plugins: [
                  { removeViewBox: false },
                  { removeUnusedNS: false },
                  { removeUselessStrokeAndFill: false },
                  { cleanupIDs: false },
                  { removeComments: true },
                  { removeEmptyAttrs: true },
                  { removeEmptyText: true },
                  { collapseGroups: true },
               ],
            }),
         ])
      )
      .pipe(gulp.dest(path.images.dist))
      .pipe(browserSync.stream());
});

gulp.task('favicons', function () {
   return gulp
      .src(path.favicon.src)
      .pipe(newer(path.favicon.dist))
      .pipe(
         favicons({
            icons: {
               appleIcon: true,
               favicons: true,
               online: false,
               appleStartup: false,
               android: false,
               firefox: false,
               yandex: false,
               windows: false,
               coast: false,
            },
         })
      )
      .pipe(gulp.dest(path.favicon.dist))
      .pipe(browserSync.stream());
});

gulp.task('html', function () {
   return gulp
      .src(path.html.src)
      .pipe(fileInclude())
      .pipe(webpHtml())
      .pipe(htmlmin({ collapseWhitespace: true }))
      .pipe(gulp.dest(path.html.dist))
      .pipe(browserSync.stream());
});

gulp.task('watch', function () {
   gulp
      .watch(path.styles.watch, { usePolling: true })
      .on('change', gulp.parallel('styles'));
   gulp
      .watch(path.html.watch, { usePolling: true })
      .on('change', gulp.parallel('html'));
   gulp
      .watch(path.scripts.watch, { usePolling: true })
      .on('change', gulp.parallel('scripts'));
   gulp
      .watch(path.fonts.watch, { usePolling: true })
      .on('all', gulp.parallel('fonts'));
   gulp
      .watch(path.images.watch, { usePolling: true })
      .on('all', gulp.parallel('images'));
   gulp
      .watch(path.images.watch, { usePolling: true })
      .on('all', gulp.parallel('webp'));
   gulp
      .watch(path.favicon.watch, { usePolling: true })
      .on('all', gulp.parallel('favicons'));
   gulp
      .watch(path.script_libs.watch, { usePolling: true })
      .on('all', gulp.parallel('script_libs'));
});

gulp.task(
   'default',
   gulp.parallel(
      'server',
      'watch',
      'html',
      'styles',
      'scripts',
      'fonts',
      'webp',
      'images',
      'favicons',
      'script_libs'
   )
);
