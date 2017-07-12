//主文件gulp
var gulp = require('gulp');
//插件引入
var less = require('gulp-less');
var path = require('path');
var cleanCSS = require('gulp-clean-css');
var rename=require('gulp-rename');
var livereload = require("gulp-livereload");
var uglify = require('gulp-uglify');
var pump = require('pump');
var del=require('del');
var minimg = require("gulp-imagemin");
gulp.task('default', function(cb) {
  // 将你的默认的任务代码放在这
	pump([
		//路径
        gulp.src('js/*.js'),
        //压缩js
        uglify(),
        //输出目录
        gulp.dest('lib')
    ],
    cb
  );
 

});

//编译less 压缩 改名
gulp.task('less', function () {
	//less文件路径
    gulp.src('./styles/less/core.less')
    //编译less
    .pipe(less())
    //css压缩
    .pipe(cleanCSS())
    //改名 .min后缀
    .pipe(rename({
    	suffix :".min"
    }))
    //输出目录
    .pipe(gulp.dest('./styles/css/'))
    //livereload
    .pipe(livereload())
});

gulp.task('mincss',function(){
	gulp.src('./styles/css/*.css')
	//压缩css
	.pipe(cleanCSS())
	//重命名
	.pipe(rename({
		suffix:".min"
	}))
	.pipe(gulp.dest('./lib/css'))
})
//watch 模块
gulp.task('watch', function() {
	//监听livereload
	 livereload.listen();
	 //watch 路径,改变后的动作
     gulp.watch("./styles/less/core.less",["less"]);
});
//压缩图片
gulp.task('minimg',function(){
	 gulp.src('images/banner01.jpg')//原路径
        .pipe(imagemin())//压缩
        .pipe(gulp.dest('lib/images'))//压缩后路径

});

//删除
gulp.task("del",['minimg'],function(cb){  //依赖minimg任务
//采用异步删除，删除完毕后，调用cb回调函数，告诉gulp任务已经完成。
	del("js/show.js").then(function(){
		cb();
	});
});

