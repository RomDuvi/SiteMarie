var gulp = require("gulp");
var ts = require("gulp-typescript");
var serverTsProject = ts.createProject("./Server/tsconfig.json");

gulp.task("default",()=>{
    buildServer();
});

gulp.task("server",()=>{
    return buildServer();
})

function buildServer(){
    return serverTsProject.src().pipe(serverTsProject()).js.pipe(gulp.dest("./Server/dist"));
}