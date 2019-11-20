const express = require("express");
const router = express.Router();
const Category = require("./Category");
const slugify = require("slugify")

router.post("/categories/save", (req, res) =>{
    var title= req.body.title;
    if(title != undefined){
        Category.create({
            title: title,
            slug: slugify(title)
        }).then(() => {
            res.redirect("/")
        })
    }else{
        res.redirect("/admin/categories/new");
    }
})

router.get("/admin/categories/new", (req, res)=>{
    res.render("../views/admin/categories/new.ejs");
})
router.get("/admin/categories" ,(req, res) => {
    res.render("../views/admin/categories/index.ejs");
})
module.exports = router;