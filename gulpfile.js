var gulp = require("gulp");
var ts = require("gulp-typescript");
var del = require('del');
var inject = require('gulp-inject');
var serverTsProject = ts.createProject("./Server/tsconfig.json");
var clientTsProject = ts.createProject("./Client/src/tsconfig.app.json");

var vendor_files = ['./Client/node_modules/angular/angular.js'];
gulp.task('client', gulp.series(clean, copyIndex, buildAssets, buildClient, copyVendor));

gulp.task('index', gulp.series(cleanServer, copyIndex));

gulp.task("default",()=>{
    buildServer();
    buildClient();
});

gulp.task("server", gulp.series(clean, copyPackage, buildServer, copyConfig));

gulp.task("cleanServer", cleanServer);

function clean(done) {
    del(['dist/**/*.*']);
    done();
}

function cleanServer(done) {
    del(['./Server/dist/**']).then(paths => {
        console.log('Deleted files and folders:\n', paths.join('\n'));
        done();
    });
}

function copyIndex() {
    var sources = gulp.src(vendor_files, {read: false});
    return gulp.src('./client/src/index.html')
        .pipe(inject(sources, {name: 'app', ignorePath: 'node_modules', addPrefix: 'vendor' }))
        .pipe(gulp.dest('./dist', {overwrite: true}));
}

function copyVendor() {
    return gulp.src(vendor_files, {base: './node_modules'}).pipe(gulp.dest('./dist/vendor', {overwrite: true}));
}

function copyPackage(){
    return gulp.src('./package.json').pipe(gulp.dest('./Server/dist'))
}

function buildServer(){
    return serverTsProject.src().pipe(serverTsProject()).js.pipe(gulp.dest("./Server/dist/server"));
}

function buildClient(){
    return clientTsProject.src().pipe(clientTsProject()).js.pipe(gulp.dest("./Client/dist"));
}

function buildAssets(){
    return gulp.src('Client/src/assets/*.*').pipe(gulp.dest("./Client/dist/assets"));
}

function copyConfig(){
    return gulp.src('./Server/src/config.sample.json').pipe(gulp.dest('./Server/dist/server'));
}