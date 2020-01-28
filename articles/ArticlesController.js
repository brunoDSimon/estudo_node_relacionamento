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
module.exports = router;