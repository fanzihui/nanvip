// 总结规则
// http://nanrenvip.xyz/nvyouku/1-0-0-0-0-0-0.html
// http://nanrenvip.xyz/nvyouku/1-0-0-0-0-0-1.html
// http://nanrenvip.xyz/nvyouku/1-0-0-0-0-0-2.html
const request = require('request')
const cheerio  = require('cheerio')
const Female = require('./name')
const baseUrl = 'http://nanrenvip.xyz/nvyouku/1-0-0-0-0-0-'
const zero = 0
const suffix = '.html'
const url = baseUrl.concat(zero,suffix)
const want_page = 1
request(url,function(err,res,body){
    if(body == '' || body == undefined){
        return
    }
    let $ = cheerio.load(body)
    // 获取总页数
    let page_total = $('.dede_pages ul').children().last().find('a').attr('href').replace(/(.+\-)(\d{1,4})(\.\w+)/,'$2')
    console.log('page_total',page_total)
    let spider_page = want_page || page_total
    console.log(spider_page)
    for(var i = 0 ; i <= spider_page; i++){
        // console.log(baseUrl.concat(i,suffix))
        setTimeout(function(){
            Female(baseUrl.concat(i,suffix))
        },1000*i)
    }
})
