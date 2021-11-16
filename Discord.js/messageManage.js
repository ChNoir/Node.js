const Discord = require('discord.js');

const b_sqlite3 = require ("better-sqlite3")
const sqlite_fun = require('./Function/Sqlite_fun.js')
const DBmain = new b_sqlite3('./Data/main.db')
const sqlit_f = new sqlite_fun(DBmain)
const MessageFlage = require('./Data/MessageFlag.json')

module.exports = async (client, msg , flag , arg ) => { 

    var embed ;
    var LANGUE ;
    var attachment ;
    var DM = (msg.channel.type == "dm")

    
    if (DM) {
        var LangueGuild = sqlit_f.SELECT_FROM_WHERE('LANGUE','USERS',`ID_USER = ${msg.author.id}`)[0].LANGUE
    }
    else {
        var LangueGuild = sqlit_f.SELECT_FROM_WHERE('LANGUE','GUILDS',`ID_GUILD = ${msg.guild.id}`)[0].LANGUE
    }


    try {
        var LANGUE = client.langues.get(LangueGuild)
        
    } catch (error) {
        var LANGUE = client.langues.get("FR")

        attachment = new Discord.MessageAttachment('./Image/CroiRouge.png')

        embed = new Discord.MessageEmbed()
            .attachFiles(attachment)
            .setAuthor(`Error : ${MessageFlage.ERREUR_GUILD_LANGUE_UNDEFINED} | FR`,'attachment://CroiRouge.png')
            .setDescription(`La langue choisi ["${LangueGuild}"] ne pas valide. Langue par defaut : FR `)
            .setColor("RED")
            .setTimestamp(new Date)

        if (DM) { msg.author.send(embed)}
        msg.channel.send(embed);

        
        var LangueGuild = "FR"
    }
    
    
    switch (flag) {
        case MessageFlage.ERREUR_COMMENDE_UNDEFINED:
            
            attachment = new Discord.MessageAttachment('./Image/CroiRouge.png')

            embed = new Discord.MessageEmbed()
                .attachFiles(attachment)
                .setAuthor(`${LANGUE.Erreur} : ${MessageFlage.ERREUR_COMMENDE_UNDEFINED}`,'attachment://CroiRouge.png')
                .setDescription(`>>> ${LANGUE.ERREUR_COMMENDE_UNDEFINED_Description} `)
                .setColor("RED")
                .setTimestamp(new Date)

            if (DM) { 
                embed.setDescription(`>>> ${LANGUE.ERREUR_COMMENDE_UNDEFINED_Description} \n${LANGUE.ERREUR_COMMENDE_UNDEFINED_DM_Description} `)
                return msg.author.send(embed)}
        return msg.channel.send(embed);
        
        case MessageFlage.PING : 

            embed = new Discord.MessageEmbed()
                .addField("🏓 Ping :" , Math.round(client.ws.ping) )
                .addField("⏲️ Latency :" ,  `${( msg.createdTimestamp - Date.now())} ms` )
                .setColor("RANDOM")


            if (DM) { return msg.author.send(embed)}
        return msg.channel.send(embed);

        case MessageFlage.ERREUR_MESSAGE_DM :
            
            attachment = new Discord.MessageAttachment('./Image/CroiRouge.png')

            embed = new Discord.MessageEmbed()
                .attachFiles(attachment)
                .setAuthor(`${LANGUE.Erreur} : ${MessageFlage.ERREUR_MESSAGE_DM}`,'attachment://CroiRouge.png')
                .setDescription(`>>> ${LANGUE.ERREUR_MESSAGE_DM_Description} `)
                .setColor("RED")
                .setTimestamp(new Date)


            if (DM) { return msg.author.send(embed)}
        return msg.channel.send(embed);
    
        case MessageFlage.LANGUE_DISPLAY :

            
            let Descri = ">>> ";
            for(var i = 0 ; i < arg.length; i++ ) { 
                if (LangueGuild == arg[i]) { Descri = Descri + "> "}
                Descri = Descri + arg[i] + "\n"
            } 
            
            embed = new Discord.MessageEmbed()
            .setColor("GREEN")
            .setAuthor(LANGUE.LANGUE_DISPLAY_Author)
            .setDescription(`${Descri}`)
            .setFooter(LANGUE.LANGUE_DISPLAY_Footer)



            if (DM) { return msg.author.send(embed)}
        return msg.channel.send(embed);


        case MessageFlage.LANGUE_UPDATE :

            embed = new Discord.MessageEmbed()
            .setColor("GREEN")
            .setDescription(`${LANGUE.LANGUE_UPDATE_Description}`)
            
            if (DM) { return msg.author.send(embed)}
        return msg.channel.send(embed);

        case MessageFlage.ERREUR_COMMENDE_ARG :

            attachment = new Discord.MessageAttachment('./Image/CroiRouge.png')
            if (arg[0] == null) { arg[0] = 0 }
            console.log("ERREUR_COMMENDE_ARG_Description_" + arg[0])
            embed = new Discord.MessageEmbed()
            .attachFiles(attachment)
            .setAuthor(`${LANGUE.Erreur} : ${MessageFlage.ERREUR_COMMENDE_ARG} `,'attachment://CroiRouge.png')
            .setDescription(LANGUE[("ERREUR_COMMENDE_ARG_Description_" + arg[0] )])
            .setTimestamp(new Date)

            if (DM) { return msg.author.send(embed)}
        return msg.channel.send(embed);

        default:

            attachment = new Discord.MessageAttachment('./Image/CroiRouge.png')

            embed = new Discord.MessageEmbed()
                .attachFiles(attachment)
                .setAuthor(`${LANGUE.Erreur} : ${MessageFlage.ERREUR_MESSAGE_FLAG}`,'attachment://CroiRouge.png')
                .setDescription(`>>> ${LANGUE.ERREUR_MESSAGE_FLAG_Description} \n FlagCode : ${flag}`)
                .setColor("RED")
                .setTimestamp(new Date)

            if (DM) { return msg.author.send(embed)}
        return msg.channel.send(embed);
            
    }

    return ;

}