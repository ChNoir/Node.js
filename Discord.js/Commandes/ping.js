const Discord   = require('discord.js');
const MessageManage = require("../messageManage.js")
const MessageFlage = require("../Data/MessageFlag.json")

///////////////////////////////
const NameCmd   = 'ping' 
///////////////////////////////

module.exports.run = async (client, msg, args) => { 
    MessageManage(client,msg,MessageFlage.PING)
}
module.exports.global = {
    name: NameCmd,
    premissions: "NONE",
    owner: false,
    DM : true 
    
    
};