const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");
const categoriesController = require("./categories/CategoriesController");
const articlesController = require("./articles/ArticlesController");
const Article = require("./articles/Article");
const Category = require("./categories/Category");

app.get("/", (req, res) =>{
    res.render("index");
})

app.set('view engine', 'ejs');

app.use(express.static('public'));

app.use(bodyParser.urlencoded ({extended: false}));
app.use(bodyParser.json());


connection.authenticate().then(() =>{
    console.log("conectado senhor")
    }).catch((error) =>{
        console.log("procura o erro do banco ai mane" + error);
    })

app.use("/",categoriesController);
app.use("/",articlesController);



app.listen(4400,() =>{console.log("se o servidor esta rodando e o que importa");})