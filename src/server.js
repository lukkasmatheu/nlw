const express = require("express")
const server = express()
//caminhos da aplicação
server.use(express.static("public"))


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

server.get("/search-result", (req, res)=>{
    return res.render("search-results.html")
})


// ouvir a porta 3000
server.listen(3000)

