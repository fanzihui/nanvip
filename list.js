const request = require('request')
const cheerio  = require('cheerio')
// const Info = require('./info')
const baseUrl = 'http://nanrenvip.xyz'
const url = 'http://nanrenvip.xyz/nvyouku/ssyouya.html'

request(url,function(err,res,body){
    let $ = cheerio.load(body)
    /**
     * avator 头像
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
    let avator,name,desc,enname,work_num,birthday,debut,sanwei,chest,title,link,option
    avator = baseUrl + $('.infopic .face').attr('src')
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
        avator: avator,
        name: name,
        desc: desc,
        enname: format(enname),
        work_num: format(work_num).replace(/\n/g,'').replace(/\s/g,''),
        birthday: format(birthday),
        debut: format(debut),
        sanwei: format(sanwei),
        chest: format(chest),
    }
    console.log(option)
    $('.zp_list .avps_list ul li').each(function(index,ele){
        if(!$(this).hasClass('nom')){
            title = $(this).find('a').text()
            link = baseUrl + $(this).find('a').attr('href')
            // console.log(`title::title} \n link:link} \n -----------,
            // Info({name: name, link:link})
        }
    })
})
