var gulp = require("gulp");
var ts = require("gulp-typescript");
var del = require('del');
var serverTsProject = ts.createProject("./Server/tsconfig.json");

gulp.task('server', ['clean','config','buildServer']);
gulp.task('buildServer', buildServer);
gulp.task('clean', clean);
gulp.task('config', copyConfig);

function clean() {
    var paths = del.sync(['Server/dist/**', '!Server/dist', '!Server/dist/config.json', '!Server/dist/public', '!Server/dist/tmp', '!Server/dist/public/**', '!Server/dist/tmp/**']);
    if(paths.length > 0){
        console.log("Deleted files \n");
        paths.forEach(path => {
            console.log(path);
        });
    }
}

function buildServer(){
    return serverTsProject.src()
        .pipe(serverTsProject())
        .js
        .pipe(gulp.dest("./Server/dist"));
}

function copyConfig(){
    return gulp.src('./Server/src/config.sample.json').pipe(gulp.dest('./Server/dist'));
}