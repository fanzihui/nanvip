// 插入到数据库
const moment = require('moment')
// 时间
const now = moment().format('YYYY-MM-DD HH:mm:ss')
console.log(now)


// 连接数据库
var knex = require('knex')({
  client: 'mysql',
  connection: {
    host : '127.0.0.1',
    user : 'root',
    password : 'root',
    database : 'nanvip',
    port: '3306',
  }
});
knex('nuyou_info').where({name:wd}).select('id').then(res=>{
    if(res.length > 0){
        let person_id = res[0].id
        knex('nuyou_work').where({title:wd}).select('id').then(res1=>{
            if(res.length == 0){
                knex('nuyou_work')
                    .insert({
                        person_id: person_id,
                        title: option.title,
                        work: option.work,
                        fanhao: option.fanhao,
                        issue: option.issue,
                        duration: option.duration,
                        director: option.director,
                        coded: option.coded,
                        producer: option.producer,
                        publisher: option.publisher,
                        cate: option.cate,
                        pic : option.pic,
                    }).then(res1=>{
                    console.log('res',res)
                })
            } else {
                console.log('已有数据,请勿插入')
            }
        })
    } else {
        console.log('没有此人')
    }
})




