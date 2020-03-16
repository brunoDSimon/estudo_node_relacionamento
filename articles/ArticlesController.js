const express = require("express");
const router = express.Router();
const Category = require("../categories/Category");
const Article = require("./Article");
const slugify = require("slugify");

router.get("/admin/articles", (req, res) =>{
    Article.findAll(
       { include:[{
            model: Category,
            required: true
        }]}
    ).then(articles =>{
        
        console.log(articles);
        res.render("admin/articles/index",{articles: articles})
    })
})

router.get("/admin/articles/new", (req, res) =>{
    Category.findAll().then(categories =>{
        include:[{
            model: Category
        }]
        res.render("admin/articles/new",{categories: categories});
    })
})
router.post("/article/save", (req, res) =>{
    var title = req.body.title;
    var body = req.body.body;
    console.log(body, 'body');
    var category = req.body.category
    Article.create({
        title: title,
        slug: slugify(title),
        body: body,
        categoryId: category
    }).then(() => {
        res.redirect("/admin/articles");
    });
});
router.post("/articles/delete", (req, res) =>{
    const id = req.body.id;
    if(id != undefined){
        if(!isNaN(id)){
            Article.destroy({
                where:{
                    id: id
                }
            }).then(() =>{
                res.redirect("/admin/articles");
            })
        }else{ ///null
            res.redirect("/admin/articles");
        }
    }else ///nul
    {
        res.redirect("/admin/articles");
    }
});

router.get("/admin/articles/edit/:id", (req, res) => {
    var id = req.params.id;
    Article.findByPk(id).then(article => {
        if(article != undefined){
            Category.findAll().then(categories => {
                res.render("admin/articles/edit", {categories: categories, article: article});
            });
        }else {
            res.redirect("/");
        }
    }).catch(error =>{
        res.redirect("/");
    })
});
router.post("/articles/update", (req,res) => {
    var id = req.body.id;
    var title = req.body.title;
    var body = req.body.body
    var category = req.body.category
    Article.update({title: title, body: body, category: categoryId, slug:slugify(title)},{
        where:{
            id: id
        }
    }).then(() => {
        res.redirect("admin/article");
    }).catch(err =>{
        res.redirect("/");
    })
})

router.get("/articles/page/:num",(req,res) =>{
    var page = req.params.num;
    var offset = 0;
    if(isNaN(page) || page == 1 ){
        offset = 0
    }else{
        // DEFINIR UM LIMITE PARA A PAGINACAO E FAZER VEZES O MESMO VALOR PARA MUDAR O QUE ESTA VINDO NA PAGINA 
        offset = parseInt(page) * 4;
    }

    Article.findAndCountAll({
        limit: 4,
        offset: offset
    }).then(articles =>{
        res.json(articles);
    })
});

module.exports = router;