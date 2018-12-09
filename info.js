const request = require('request')
const cheerio  = require('cheerio')
const WorkSql = require('./workSql')
const baseUrl = 'http://nanrenvip.xyz'
// const url = 'http://nanrenvip.xyz/fanhaoku/AB1SSNI-279.html'

var app = function(param){
    if(param.name == '' || param.name == undefined){
        return
    }
    let url = param.link
    request(url,function(err,res,body){
        if(body == '' || body == undefined){
            return
        }
        let $ = cheerio.load(body)
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
        pic = baseUrl + $('.artCon p').last().find('img').attr('data-original')
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
    })
}

module.exports = app
