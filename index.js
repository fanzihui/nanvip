// 总结规则
// http://nanrenvip.xyz/nvyouku/1-0-0-0-0-0-0.html
// http://nanrenvip.xyz/nvyouku/1-0-0-0-0-0-1.html
// http://nanrenvip.xyz/nvyouku/1-0-0-0-0-0-2.html
const Crawler = require("crawler");
const List = require('./list')
const Domain = 'http://nanrenvip.cc'
const baseUrl = 'http://nanrenvip.cc/nvyouku/1-0-0-0-0-0-'
const zero = 0
const suffix = '.html'
const want_page = 10

var c = new Crawler({
    maxConnections : 10,
    forceUTF8:false,
    rateLimit: 100,
    callback : function (error, res, done) {
        if(error){
            console.log(error);
        }else{
            var $ = res.$;
            // 获取总页数
            // let page_total = $('.dede_pages ul').children().last().find('a').attr('href').replace(/(.+\-)(\d{1,4})(\.\w+)/,'$2')
            // console.log('page_total',page_total)
            // let spider_page = want_page || page_total
            // console.log(spider_page)
            $('.avps_ny ul li').each(function(index,ele){
                let name = $(this).find('span').text()
                let link = Domain + $(this).find('a').attr('href')
                let avatar = Domain + $(this).find('img').attr('data-original')
                console.log(`index: ${index} name: ${name} \n link ${link} \n avator ${avatar}`)
                // http://nanrenvip.cc/nvyouku/ssyouya.html
                // console.log(`index: ${index} name: ${name} \n link ${link} \n avator ${avatar}`)
                // http://nanrenvip.cc/nvyouku/ssyouya.html
                List(link)
            })
        }
        done();
    }
});
let urlArr = []
for(var i = 0 ; i <= 1; i++){
    console.log('开始时间:', Date.now())
    urlArr.push(baseUrl.concat(i,suffix))
    console.log('结束时间:', Date.now())
}
c.queue(urlArr);
