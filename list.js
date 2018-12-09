const request = require('request')
const cheerio  = require('cheerio')
const Info = require('./info')
const baseUrl = 'http://nanrenvip.xyz'
const url = 'http://nanrenvip.xyz/nvyouku/ssyouya.html'
const NameSql = require('./nameSql')

// var app = function(url){
    if(url == '' || url == undefined){
        return
    }
    request(url,function(err,res,body){
        if(body == '' || body == undefined){
            return
        }
        let $ = cheerio.load(body)
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
        avatar = baseUrl + $('.infopic .face').attr('src')
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
        NameSql(option)
        setTimeout(function(){
            $('.zp_list .avps_list ul li').each(function(index,ele){
                if(!$(this).hasClass('nom')){
                    title = $(this).find('a').text()
                    link = baseUrl + $(this).find('a').attr('href')
                    // console.log(`title:${title} \n link${link} \n -----------`)
                    Info({name: name, link:link})
                }
            })
        },1000)
    })
// }
// module.exports = app
