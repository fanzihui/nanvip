const path = require('path');
const http = require('http');
const fs = require('fs');

var app = async function(url){
    if(url != null && url != undefined){
        let name = url.replace(/(.+\/)(\w+\.jpg)/g,'$2')
        //先访问图片
        http.get(url, (res) => {
           //用来存储图片二进制编码
           let imgData = '';
           //设置图片编码格式
           res.setEncoding("binary");
           //检测请求的数据
           res.on('data', (chunk) => {
               imgData += chunk;
           })
           //请求完成执行的回调
           res.on('end', () => {
               // 通过文件流操作保存图片
               fs.writeFile(`./images/${name}.jpg`, imgData, 'binary', (error) => {
                    console.log(error)
                   if (error) {
                       console.log('下载失败');
                   } else {
                       console.log('下载成功！')
                   }
               })
           })
       })
    }
}

module.exports = app

