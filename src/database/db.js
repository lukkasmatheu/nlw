// importar dependencias sqlite3

const sqlite3 = require("sqlite3").verbose()

// criar objeto que ira realizar operações no banco de dados

const db = new sqlite3.Database("./src/database/database.db")

module.exports = db

/*db.serialize(()=> {
    //criar tabela
    db.run(`
        CREATE TABLE IF NOT EXISTS places (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            image TEXT,
            name TEXT,
            address TEXT,
            address2 TEXT,
            state TEXT,
            city TEXT,
            items TEXT
        );
    `)
    //inserir dados na tabela
    const query =`
        INSERT INTO places (
            image,
            name,
            address,
            address2,
            state,
            city,
            items
        ) VALUES (?,?,?,?,?,?,?);
    `
    const values = [
        "data:image/jpeg;base64,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",
        "PaperSide",
        "Lucas matheus, parque são jorge",
        "numero 255",
        "parana",
        "curitiba",
        "Residuos Eletrônicos"
    ]

    function afterInsertData(err){
        if(err){
            return console.log(err)
        }
        console.log("cadastrado com sucesso")
        console.log(this)
    }
    db.run(query,values, afterInsertData)

    db.all(`SELECT * FROM places`,function(err,rows){
        if(err){
            return console.log(err)
        }
        console.log("Aqui estão ou seus registros")
        console.log(rows)
        
    })
    db.run(`DELETE FROM places WHERE id = ?`, [2],function(err,rows){
        if(err){
           return console.log(err)
        }

        console.log("elemento deletado")
        console.log(rows)
    })
})*/