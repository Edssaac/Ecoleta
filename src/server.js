const express = require("express")
const server = express()

//Pegar o banco de dados
const db = require("./database/db")


//Configurar pasta pública 
server.use(express.static("public"))


//Habilitar o uso do req.body na nossa aplicação
server.use(express.urlencoded({ extended: true}))

//Utilizando template engine 
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})

//Configurar caminhos da minha aplicação
//Página inicial
//req: resquisição/pedido
//res: resposta 
server.get("/", (req, res) => {
    return res.render("index.html", {title: "Seu marketplace de coleta de resíduos"})
})



server.get("/creat-point", (req, res) => {

    //req.query:  query strings da nossa url
    console.log(req.query)



    return res.render("creat-point.html")
})



server.post("/savepoint", (req, res) => {
    
    //req.body: O corpo do nosso formulário
    // console.log(req.body)

    // Inserir dados no banco de dados
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
        req.body.image,
        req.body.name,
        req.body.addres,
        req.body.number,
        req.body.state,
        req.body.city,
        req.body.items

    ]

    function afterInsertData(err) {
        if (err) {
            return console.log(err)            
        }
        console.log("Cadastro com sucesso")
        console.log(this) 
        
        return res.render("creat-point.html", { saved: true})
    }

    //DESLIGAR QUANDO NÃO QUISER ATUALIZAÇÕES!
    // db.run(query, values, afterInsertData ) 
    
})



server.get("/search", (req, res) => {

    const search = req.query.search

    if (search == "") {
        //Pesquisa vazia
        return res.render("search.html", { total: 0} )        
    }

    //Pegar os dados do banco de dados
    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err, rows) {
        if (err) {
            return console.log(err)            
        }

        console.log("Aqui estão os seus registros")
        console.log(rows)

        //Total de itens
        const total = rows.length

        //Mostrar a página HTML com os dados do banco de dados
        return res.render("search.html", { places: rows, total: total} )
    })


})





//Ligar o servidor
server.listen(3000)