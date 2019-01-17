const Crawler = require("crawler");
const NameSql = require('./nameSql')
const Info = require('./info')
const http = require('http');
const fs = require('fs')
const Domain = 'http://nanrenvip.cc'
function saveImage(url,path) {
    http.get(url,function (req,res) {
        var imgData = '';
        req.on('data',function (chunk) {
            imgData += chunk;
        })
		req.setEncoding('binary');
        req.on('end',function () {
            fs.writeFileSync(path,imgData,'binary',function (err) {
                console.log('保存图片成功'+path)
            })
        })
    })
}

var app = function(url){
    // console.log('url',url)
    var c = new Crawler({
        maxConnections : 10,
        forceUTF8:false,
        callback : function (error, res, done) {
            if(error){
                console.log(error);
            }else{
                var $ = res.$;
                /**
                 * avatar 头像
                 * name 名字
                 * desc 介绍
                 * enname 别名
                 * work_num 作品数量
                 * birthday 生日
                 * debut 出道
                 * sanwei 三围
                 * chest 罩杯
                 * title 标题
                 * link 链接
                 */
                let avatar,name,desc,enname,work_num,birthday,debut,sanwei,chest,title,link,option
                avatar = Domain + $('.infopic .face').attr('src')
                name = $('.infosay h1').text()
                desc = $('.infosay p').text()
                enname = $('.infosay .pos-a li').eq(0).text()
                work_num = $('.infosay .pos-a li').eq(1).text().trim()
                birthday = $('.infosay .pos-a li').eq(2).text()
                debut = $('.infosay .pos-a li').eq(3).text()
                sanwei = $('.infosay .pos-a li').eq(4).text()
                chest = $('.infosay .pos-a li').eq(5).text()
                function format(val){
                    return val.split('：')[1]
                }
                option = {
                    avatar: avatar,
                    name: name,
                    enname: format(enname),
                    desc: desc,
                    work_num: format(work_num).replace(/\n/g,'').replace(/\s/g,''),
                    birthday: format(birthday),
                    debut: format(debut),
                    sanwei: format(sanwei),
                    chest: format(chest),
                    hit: Math.ceil(Math.random()*10),
                }
                // 下载图片
                var imgPath= __dirname + "/images/"+ avatar.split('/')[avatar.split('/').length-1];
                saveImage(avatar,imgPath)
                // console.log(option)
                NameSql(option)
                $('.zp_list .avps_list ul li').each(function(index,ele){
                    if(!$(this).hasClass('nom')){
                        title = $(this).find('a').text()
                        link = Domain + $(this).find('a').attr('href')
                        // console.log(`title:${title} \n link${link} \n -----------`)
                        Info({name: name, link:link})
                    }
                })
            }
            done();
        }
    });
    c.queue(url);
}
module.exports = app
