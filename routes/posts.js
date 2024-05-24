// Aquí estarán todas las rutas
const express = require("express");
const router = express.Router();
const Post = require("../models/Post.js"); 

router.post("/create", async(req, res) => {
    try {
        const post = await Post.create(req.body);
        res.status(201).send(post);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "There was a problem trying to create a new post" });
    }
});


//todas las publicaciones
router.get("/", async(req, res) => {
    try {
        const posts = await Post.find();
        res.status(200).send(posts);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "There was a problem trying to select posts" });
    }
});

//publicación por id
router.get("/id/:id", async(req, res) => {
    try {  
        const {id}= req.params;
        const posts = await Post.find({ id: `${id}`}).exec();
        res.status(200).send(posts);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "There was a problem trying to select post by ID" });
    }
});

//publicación por titulo
router.get("/title/:title", async(req, res) => {
    try {  
        const {title}= req.params;
        const posts = await Post.find({ title: `${title}`}).exec();
        res.status(200).send(posts);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "There was a problem trying to select post by title" });
    }
});

//actualizar una publicación
router.put("/id/:id", async(req, res) => {
    try {  
        const {id}= req.params;
        const {title, body} = req.body;
        const result = await Post.updateOne({ id: `${id}`},{$set: { title: `${title}`,  body: `${body}`}}).exec();
        res.status(200).send(result);
    } catch (error) {
        console.error(error);
        res
            .status(500)
            .send({ message: "There was a problem trying to update title and body of post by ID" });
    }
});

//eliminar una publicación
router.delete("/id/:id", async(req, res) => {
    try {  
        const {id}= req.params;
        const posts = await Post.deleteOne({ id: `${id}`}).exec();
        res.status(200).send(posts);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "There was a problem trying to delete post by ID" });
    }
});

module.exports = router;




