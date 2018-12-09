const request = require('request')
const cheerio  = require('cheerio')
const List = require('./list')
const baseUrl = 'http://nanrenvip.xyz'
// const url = 'http://nanrenvip.xyz/nvyouku/1-0-0-0-0-0-0.html'

var app = function (url){
    if(url == '' || url == undefined){
        return
    }
    request(url,function(err,res,body){
        if(body == '' || body == undefined){
            return
        }
        let $ = cheerio.load(body)
        let name,link,avator
        $('.avps_ny ul li').each(function(index,ele){
            name = $(this).find('span').text()
            link = baseUrl + $(this).find('a').attr('href')
            // avatar = baseUrl + $(this).find('img').attr('data-original')
            // console.log(`index: ${index} name: ${name} \n link ${link} \n avator ${avatar}`)
            List(link)
        })
    })
}
module.exports = app
