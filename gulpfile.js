var gulp = require("gulp");
var ts = require("gulp-typescript");
var serverTsProject = ts.createProject("./Server/tsconfig.json");
var clientTsProject = ts.createProject("./Client/src/tsconfig.app.json");

gulp.task("default",()=>{
    buildServer();
    buildClient();
});

gulp.task("server",()=>{
    return buildServer();
});

gulp.task("client",()=>{
    buildClient();
    buildAssets();
});

function buildServer(){
    return serverTsProject.src().pipe(serverTsProject()).js.pipe(gulp.dest("./Server/dist"));
}

function buildClient(){
    return clientTsProject.src().pipe(clientTsProject()).js.pipe(gulp.dest("./Client/dist"));
}

function buildAssets(){
    return gulp.src('Client/src/assets/*.*').pipe(gulp.dest("./Client/dist/assets"));
}