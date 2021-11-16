
class Sqlite_fun {

    #DBmain = null ;
    constructor(linkDataBase ) {
        this.#DBmain = linkDataBase

    }

    //////////////////////////////////////


    //////////////////////////////////////

    SELECT_All(FROM) {
        try {
            return this.#DBmain.prepare(`SELECT * FROM ${FROM}`).all()
        } catch (error) {
            console.log("error DB")
            console.log(error)
           
        }
    }

    SELECT_FROM(SELECT,FROM) {

        try {
            return this.#DBmain.prepare(`SELECT ${SELECT} FROM ${FROM}`).all()
        } catch (error) {
            console.log("error DB")
            console.log(error)
        }
    } 

    SELECT_FROM_WHERE (SELECT,FROM,WHERE){

        try {
            return this.#DBmain.prepare(`SELECT ${SELECT} FROM ${FROM} WHERE ${WHERE}`).all()
        } catch (error) {
            console.log("error DB")
            console.log(error)
        }

    }

    INSERT_INTO(table,column,value,R_err = true){

        try {
            this.#DBmain.prepare(`INSERT INTO ${table} (${column}) VALUES ${value} `).run()
        } catch (error) {
            if (R_err) {
                console.log("error DB")
                console.log(error)
            }
            
        }


    }

    UPDATE_SET_WHERE(table,SET,WHERE) {

        try {
            this.#DBmain.prepare(`UPDATE ${table} SET ${SET} WHERE ${WHERE} `).run()
        } catch (error) {
            console.log("error DB")
            console.log(error)
        }

    }

    CREATE_TABLE(table, arg) {

        try {
            this.#DBmain.prepare(`CREATE TABLE ${table}( ${arg} )`).run()

        } catch (error) {
            console.log("error DB")
            console.log(error)
        }

    }

    DELETE_FROM_WHERE(FROM,WHERE) {
        try {
            this.#DBmain.prepare(`DELETE FROM ${FROM} WHERE ${WHERE} `).run()
        } catch (error) {
            console.log("error DB")
            console.log(error)
        }
    }

    DELETE_FROM_(FROM) {

        try {
            this.#DBmain.prepare(`DELETE FROM ${FROM}`).run()
        } catch (error) {
            console.log("error DB")
            console.log(error)
        }
    }

    DROP_TABLE(TABLE) {

        try {
            this.#DBmain.prepare(`DROP TABLE ${TABLE}`).run()
        } catch (error) {
            console.log("error DB")
            console.log(error)
        }

    }

    ALTER_TABLE_ADD_COLUMN (TABLE,arg) {

        try {
            this.#DBmain.prepare(`ALTER TABLE ${TABLE} ADD COLUMN ${arg} `).run()
        } catch (error) {
            console.log("error DB")
            console.log(error)
        }

    }

    ALTER_TABLE_DROP_COLUMN (TABLE,arg) {

        try {
            this.#DBmain.prepare(`ALTER TABLE ${TABLE} DROP COLUMN ${arg} `).run()
        } catch (error) {
            console.log("error DB")
            console.log(error)
        }

    }

    ALTER_TABLE_RENAME_COLUMN(TABLE,name,rename){
        try {
            this.#DBmain.prepare(`ALTER TABLE ${TABLE} RENAME_COLUMN ${name} TO ${rename} `).run()
        } catch (error) {
            console.log("error DB")
            console.log(error)
        }
    }


    //////////////////////////////////////

   

    




}

module.exports = Sqlite_fun ;