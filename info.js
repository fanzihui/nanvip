const request = require('request')
const cheerio  = require('cheerio')
const baseUrl = 'http://nanrenvip.xyz'
const url = 'http://nanrenvip.xyz/fanhaoku/AB1SSNI-279.html'

request(url,function(err,res,body){
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
    let title,work,fanhao,issue,duration,director,coded,producer,publisher,cate,pic
    title = $('.article .heading').text()
    work = $('.artCon p').eq(0).text()
    fanhao = $('.artCon p').eq(1).text()
    issue = $('.artCon p').eq(2).text()
    duration = $('.artCon p').eq(3).text()
    director = $('.artCon p').eq(4).text()
    coded = $('.artCon p').eq(5).text()
    publisher = $('.artCon p').eq(6).text()
    producer = $('.artCon p').eq(7).text()
    cate = $('.artCon p').eq(8).text()
    pic = baseUrl + $('.artCon p').last().find('img').attr('data-original')
    function format(val){
        return val.split('：')[1]
    }
    option = {
        name: param.name,
        title: title,
        work: format(work),
        fanhao: format(fanhao),
        issue: format(issue),
        duration: format(duration),
        director: format(director),
        coded: format(coded),
        producer: format(producer),
        publisher: format(publisher),
        cate: format(cate),
        pic : pic,
    }
    console.log('option',option)
})

