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

var app = function (option){
    if(option.name == '' || option.name == undefined){
        return
    }
    knex('person_person').where({name:option.name}).select('id').then(res=>{
        if(res.length == 0){
            knex('person_person')
                .insert({
                    name: option.name,
                    desc: option.desc,
                    enname: option.enname,
                    work_num: option.work_num,
                    birthday: option.birthday,
                    debut: option.debut,
                    sanwei: option.sanwei,
                    chest: option.chest,
                    avatar : option.avatar,
                    hit: option.hit,
                    add_date: now,
                    mod_date: now,
                }).then(res1=>{
                console.log('人物结束ID：',res1)
            })
        } else {
            console.log('人物表,已有数据,请勿插入')
        }
    })
}
module.exports = app


