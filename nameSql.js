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
    if(res.length == 0){
        knex('nuyou_info')
            .insert({
                name: option.name,
                desc: option.desc,
                enname: option.enname,
                work_num: option.work_num,
                birthday: option.birthday,
                debut: option.debut,
                sanwei: option.sanwei,
                chest: option.chest,
                avator : option.avator,
                add_date: now,
                mod_date: now,
            }).then(res=>{
            console.log('res',res)
        })
    } else {
        console.log('已有数据,请勿插入')
    }
})



