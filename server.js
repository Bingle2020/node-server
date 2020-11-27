const express = require('express');
const app = express();
const path = require('path')
const fs = require('fs');

//设置跨域访问
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

function getTxts() {
    fs.readdir('./interviews',function(err,files){
        var dirs = [];
        for(var i = 0;i<files.length;i++){
            var filename = files[i];
            var stats = fs.statSync('./interviews/'+ filename);
            if(stats.isDirectory()){
                dirs.push(filename);
            }
        }
        return dirs;
    });
}

app.get('/', function(req, res) {
    res.status(200),
        res.json(getTxts())
});

//配置服务端口
const server = app.listen(3000, function() {

    const host = 'localhost';

    const port = 3000;

    console.log(`服务器已启动, 请访问地址：http://${host}:${port}`);
})