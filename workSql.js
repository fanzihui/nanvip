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
    database : 'ssbc',
    port: '3306',
  }
});

// var name = '三上悠亜'
var app = function(option){
    if(option.name == '' || option.name == undefined){
        return
    }
    knex('person_person').where({name:option.name}).select('id').then(res=>{
        if(res.length > 0){
            let person_id = res[0].id
            // console.log('person_id',person_id)
            knex('person_work').where({fanhao:option.fanhao}).select('id').then(res1=>{
                if(res1.length == 0){
                    knex('person_work')
                        .insert({
                            person_id: person_id,
                            title: option.title,
                            fanhao: option.fanhao,
                            issue: option.issue,
                            duration: option.duration,
                            coded: option.coded,
                            cate: option.cate,
                            pic : option.pic,
                            hit: option.hit,
                            add_date: now,
                            mod_date: now,
                        }).then(res2=>{
                        console.log('作品结束ID: ',res2)
                    })
                } else {
                    console.log('作品表,已有数据,请勿插入')
                }
            })
        } else {
            console.log('没有此人')
        }
    })
}

module.exports = app


