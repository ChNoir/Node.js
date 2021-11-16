const Discord = require('discord.js'); 

////////////////////////////////////////////////////
//                    SQLite                      //
////////////////////////////////////////////////////

const b_sqlite3 = require ("better-sqlite3")
const sqlite_fun = require('../Function/Sqlite_fun.js')
const DBmain = new b_sqlite3('./Data/main.db')
const sqlit_f = new sqlite_fun(DBmain)



module.exports = async (client , guild) => { 

    sqlit_f.INSERT_INTO('GUILDS','ID_GUILD,PREFIX,LANGUE' ,`('${guild.id}','^^','FR')`);

    var list = []
    guild.members.cache.each( cache => {  if(cache.user.bot === false) { list.push(cache.user.id) }   } )
    
    list.forEach( id => {
        sqlit_f.INSERT_INTO("USERS","ID_USER,LANGUE",`('${id}','FR')`,false)
    })


    console.log('add');
   

}