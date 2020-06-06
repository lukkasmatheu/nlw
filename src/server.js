const express = require("express")
const server = express()
//caminhos da aplicação

//pegar o banco de dados

const db = require("./database/db")

server.use(express.static("public"))

//habilitar uso do req.body

server.use(express.urlencoded({extended: true}))


//template engine

const nunjucks = require("nunjucks")

nunjucks.configure("src/views", {
    express: server,
    noCache: true
})



server.get("/", (req, res)=>{
   return res.render("index.html")
})

server.get("/create-point", (req, res)=>{
    return res.render("create-point.html")
})

server.post("/savepoint" ,(req,res)=>{

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
    const reqBody = req.body
    const values = [
        reqBody.image,
        reqBody.name,
        reqBody.address,
        reqBody.address2,
        reqBody.state,
        reqBody.city,
        reqBody.items
    ]

    function afterInsertData(err){
        if(err){
            return console.log(err)
        }
        console.log("cadastrado com sucesso")
        console.log(this)
        return res.render("create-point.html",{saved : true})
    }
    db.run(query,values, afterInsertData)

    
})

server.get("/search", (req, res)=>{
    const search = req.query.search

    //if(search == ""){
      //  return res.render("search-results.html", {total:0})
    //}
    
    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`,function(err,rows){
        if(err){
            return res.send("ERRO AO CADASTRAR PONTO DE COLETA!")
        }
        const total = rows.length
        //mostrar a pagina html com os dados do banco de dados
        return res.render("search-results.html", {places : rows, total})
    })
    
})


// ouvir a porta 3000
server.listen(3000)

