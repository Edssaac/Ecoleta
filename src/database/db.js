//importar a dependência do sqtlite3
const sqtlite3 = require("sqlite3").verbose()

//criar o objeto que irá fazer operações no banco de dados
const db = new sqtlite3.Database("./src/database/database.db")

module.exports = db
// utilizar o objeto de banco de dados, para nossas operações
db.serialize( () => {
    //com comandos SQL eu vou:

    //1 - criar uma tabela 
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

    //2 - inserir dados na tabala
    const query = `
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
        "https://images.unsplash.com/photo-1528323273322-d81458248d40?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=801&q=80",
        "Papersider",
        "Guilherme Gemballa, Jardim América",
        "Nº 260",
        "Santa Catarina",
        "Rio do Sul",
        "Papéis e Papelão"
    ]

    function afterInsertData(err) {
        if (err) {
            return console.log(err)            
        }
        console.log("Cadastro com sucesso")
        console.log(this)        
    }

    //DESLIGAR QUANDO NÃO QUISER ATUALIZAÇÕES!
    // db.run(query, values, afterInsertData ) 

    // 3 - consultar os dados da tabela
    db.all(`SELECT *  FROM places`, function(err, rows) {
        if (err) {
            return console.log(err)            
        }

        console.log("Aqui estão os seus registros")
        console.log(rows)
    })

    // 4 - deletar um dado da tabela            número de id a ser deletado.
    db.run(`DELETE FROM places WHERE id = ?`, [19], function(err) {
        if (err) {
            return console.log(err)            
        }   
        
        console.log("Resgistro deletado com sucesso!")
    })

}) 

