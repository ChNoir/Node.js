////////////////////////////////////////////////////
//                   Constante                    //
////////////////////////////////////////////////////

const b_sqlite3 = require ("better-sqlite3")
const sqlite_fun = require('./Function/Sqlite_fun')

const Discord   = require ('discord.js');
const fs = require ("fs");
const Config = require ("./Data/config.json")

const client = new Discord.Client()
const DBmain = new b_sqlite3('Data/main.db')
const sqlit_f = new sqlite_fun(DBmain)


////////////////////////////////////////////////////
//              Discord collection                //
////////////////////////////////////////////////////

client.commandes     = new Discord.Collection();
client.langues      = new Discord.Collection();

////////////////////////////////////////////////////
//           Require files commandes              //
////////////////////////////////////////////////////

fs.readdir('./Commandes', (err, files) => {
    
    if (err) { return console.error(err); }
    console.log(`${files.length} commandes chargés : /Commandes`);

    files.forEach(file => {
        if (!file.endsWith('.js')) { return }
        const command = require(`./Commandes/${file}`)
        client.commandes.set(command.global.name, command)
    })
   
})

fs.readdir('./Langues', (err, files) => {
    
    if (err) { return console.error(err); }
    console.log(`${files.length} langues chargés : /Langues`);

    files.forEach(file => {
        if (!file.endsWith('.json')) { return }
        const command = require(`./Langues/${file}`)
        client.langues.set( file.split('.')[0] , command)
    })
   
})


////////////////////////////////////////////////////
//                    Events                      //
////////////////////////////////////////////////////

fs.readdir('./Events', (error, file) => {
    if (error) { return console.error(error); }
        console.log(`${file.length} events chargés : /Events`);

        file.forEach((file) => {
            
            const events = require(`./Events/${file}`);
            const event = file.split('.')[0];
            client.on(event, events.bind(null, client));

        });
});






client.login(Config.token);