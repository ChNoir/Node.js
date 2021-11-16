const Discord   = require('discord.js');
const MessageManage = require("../messageManage.js")
const MessageFlage = require("../Data/MessageFlag.json")
const fs = require ("fs");

const b_sqlite3 = require ("better-sqlite3")
const sqlite_fun = require('../Function/Sqlite_fun.js')
const DBmain = new b_sqlite3('./Data/main.db')
const sqlit_f = new sqlite_fun(DBmain)



///////////////////////////////
const NameCmd   = 'langue' 
///////////////////////////////

module.exports.run = async (client, msg, args) => { 
    
    var langues = [] ;

    fs.readdirSync('./Langues').forEach( file => {
            if (!file.endsWith('.json')) { return }
                
                langues.push( file.split('.')[0] ) 
                
        })

        
    

    // fs.readdir('./Langues', (err, files) => {
    //     if (err) { return console.error(err); }
        
    //     files.forEach(file => {
    //         if (!file.endsWith('.json')) { return }
            
    //         langues.push( file.split('.')[0] ) 
    //         console.log(langues)
    //     })
    //     console.log(langues)
           
    // })

    
    

    if (args[0] == null) {
        
        MessageManage(client,msg, MessageFlage.LANGUE_DISPLAY,langues)
    }
    else{
        let tamp = true ;
        langues.forEach(langue => {
            if (langue == args[0].toLocaleUpperCase() ) {

                if (msg.channel.type == "dm") { 
                    sqlit_f.UPDATE_SET_WHERE("USERS",`LANGUE = '${args[0]}'`,`ID_USER = ${msg.author.id}`)
                }
                else if ( msg.guild.ownerID == msg.author.id ) {
                    sqlit_f.UPDATE_SET_WHERE("GUILDS",`LANGUE = '${args[0]}'`,`ID_GUILD = ${msg.guild.id}`)
                }

                MessageManage(client,msg, MessageFlage.LANGUE_UPDATE,langue)
                tamp = false ;
                return ;
            }
        })

        if (tamp) { MessageManage(client,msg, MessageFlage.ERREUR_COMMENDE_ARG, 1 )}
    }





}
module.exports.global = {
    name: NameCmd,
    premissions: "NONE",
    owner: false,
    DM : true 
    
    
};