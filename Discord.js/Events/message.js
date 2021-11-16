const Discord = require('discord.js');

const b_sqlite3 = require ("better-sqlite3")
const sqlite_fun = require('../Function/Sqlite_fun.js')
const DBmain = new b_sqlite3('./Data/main.db')
const sqlit_f = new sqlite_fun(DBmain)




module.exports = async (client, msg) => {
    
    var prefix ;
    var DM = (msg.channel.type == "dm")

    if ( !(msg.type === 'DEFAULT' && msg.author.bot === false) ) { return ;} // Gate message type && Bot 
   
    if (DM) {
        prefix = '^^';
    }
    else {
        prefix = sqlit_f.SELECT_FROM_WHERE('prefix','GUILDS',`ID_GUILD = ${msg.guild.id}`)[0].PREFIX;
    }
   
    const MessageManage = require("../messageManage.js")
    const MessageFlage = require("../Data/MessageFlag.json")
    
    if(!msg.content.startsWith(prefix)) { 
        if(DM) { MessageManage(client, msg, MessageFlage.ERREUR_COMMENDE_UNDEFINED);}
        return; 
    } // Gate prefix

    const args = msg.content.slice(prefix.length).trim().split(/ +/g);
    const commandeName = args.shift().toLowerCase(); 
    const commande   = client.commandes.get(commandeName);
    


    if (!commande) { 
        MessageManage(client, msg, MessageFlage.ERREUR_COMMENDE_UNDEFINED);
        return ;
    } // Gate Erreur commende

    if (commande.global.DM == false && DM == true ) {
        MessageManage(client, msg, MessageFlage.ERREUR_MESSAGE_DM);
        return ;
    } 




    commande.run(client, msg, args)

}