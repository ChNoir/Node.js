const Discord   = require('discord.js');
const MessageManage = require("../messageManage.js")
const MessageFlage = require("../Data/MessageFlag.json")

///////////////////////////////
const NameCmd   = 'prefix' 
///////////////////////////////

module.exports.run = async (client, msg, args) => { 
    
    if (args[0] == null) { MessageManage(client,msg,MessageFlage.ERREUR_COMMENDE_UNDEFINED_ARG) }
    if (args[0].length != 2) { MessageManage(client,msg,MessageFlage.ERREUR_COMMENDE_ARG,[2]) }
    
   


}
module.exports.global = {
    name: NameCmd,
    premissions: "NONE",
    owner: true,
    DM : false 
    
    
};