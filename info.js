const Crawler = require("crawler");
const Domain = 'http://nanrenvip.xyz'
const WorkSql = require('./workSql')
var app = function(param){
    if(param.name == '' || param.name == undefined){
        return
    }
    let url = param.link
    var c = new Crawler({
        maxConnections : 10,
        forceUTF8:false,
        callback : function (error, res, done) {
            if(error){
                console.log(error);
            }else{
                var $ = res.$;
                /**
                 * title 标题
                 * work 作品
                 * fanhao 番号
                 * issue 发行日期
                 * duration 播放时长
                 * director 导演
                 * coded  类型: 有码/无码
                 * producer 制作商
                 * publisher 发行商
                 * cate 类别
                 * pic 图片
                 */
                let title,fanhao,issue,duration,coded,cate,pic
                title = $('.artCon p').eq(0).text()
                fanhao = $('.artCon p').eq(1).text()
                issue = $('.artCon p').eq(2).text()
                duration = $('.artCon p').eq(3).text()
                coded = $('.artCon p').eq(5).text()
                cate = $('.artCon p').eq(8).text()
                pic = Domain + $('.artCon p').last().find('img').attr('data-original')
                function format(val){
                    return val.split('：')[1]
                }
                option = {
                    name: param.name,
                    // name: '三上悠亜',
                    title: format(title),
                    fanhao: format(fanhao),
                    issue: format(issue),
                    duration: format(duration),
                    coded: format(coded),
                    cate: format(cate),
                    pic : pic,
                    hit: Math.ceil(Math.random()*10),
                }
                // console.log('option',option)
                WorkSql(option)
            }
            done();
        }
    });
    c.queue(url);
}
module.exports = app
