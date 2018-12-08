const request = require('request')
const cheerio  = require('cheerio')
const List = require('./list')
const baseUrl = 'http://nanrenvip.xyz'
// const url = 'http://nanrenvip.xyz/nvyouku/1-0-0-0-0-0-0.html'

var app = function (url){
    request(url,function(err,res,body){
        if(body == '' || body == undefined){
            return
        }
        let $ = cheerio.load(body)
        let name,link,avator,option
        $('.avps_ny ul li').each(function(index,ele){
            name = $(this).find('span').text()
            link = baseUrl + $(this).find('a').attr('href')
            // avator = baseUrl + $(this).find('img').attr('data-original')
            // console.log(`index: ${index} name: ${name} \n link ${link} \n avator ${avator}`)
            List(link)
        })
    })
}
module.exports = app
