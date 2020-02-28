const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");
const categoriesController = require("./categories/CategoriesController");
const articlesController = require("./articles/ArticlesController");
const Article = require("./articles/Article");
const Category = require("./categories/Category");

app.get("/", (req, res) =>{
    Article.findAll({
        order:[['id', 'DESC']]
    }).then(articles =>{
        Category.findAll().then(categories =>{
            res.render("index", {articles: articles, categories: categories});
        })
    })
})
app.get("/:slug", (req,res) =>{
    var slug = req.params.slug;
    Article.findOne({
        where:{
            slug: slug
        }
    }).then(article =>{
        if(article != undefined){
            Category.findAll().then(categories =>{
                res.render("article", {article: article, categories: categories});
            })
        }else{
            res.redirect("/");
        }
    }).catch(err => {
        res.redirect("/");
    });
})
app.get("/category/:slug", (req,res) =>{
    var slug = req.params.slug;
    Category.findOne({
        where:{
            slug: slug
        }, include:[{model:Article}]
    }).then(category =>{
        if(category != undefined){ 
            category.findAll().then(categories =>{
                res.render("/index", {articles: category.articles, categories: categories})
            })
        }else{
            res.redirect("/");
        }
    }).catch(error =>{
        res.redirect("/");
    })
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