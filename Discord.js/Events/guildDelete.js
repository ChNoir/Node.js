const Discord = require('discord.js'); 

////////////////////////////////////////////////////
//                    SQLite                      //
////////////////////////////////////////////////////

const b_sqlite3 = require ("better-sqlite3")
const sqlite_fun = require('../Function/Sqlite_fun.js')
const DBmain = new b_sqlite3('./Data/main.db')
const sqlit_f = new sqlite_fun(DBmain)


module.exports = async (client,guild) => { 

    sqlit_f.DELETE_FROM_WHERE('GUILDS',`ID_GUILD = ${guild.id}`)
    console.log('ban');
    

    
}