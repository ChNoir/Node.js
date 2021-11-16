const b_sqlite3 = require ("better-sqlite3")
const sqlite_fun = require('./Function/Sqlite_fun')

const DBmain = new b_sqlite3('./Data/main.db')
const sqlit_f = new sqlite_fun(DBmain)




console.log(sqlit_f.SELECT_All('USERS'))

DBmain.close();