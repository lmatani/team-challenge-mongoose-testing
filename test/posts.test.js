const request = require("supertest");
const router = require('../routes/posts.js');
const Post = require("../models/Post.js"); 

describe('createPost', () => {
    test('should create a post', async () => {
    
        const postDetails = {
            id: 7,
            title: 'El titulo de mi post',
            body: 'Esto es el cuerpo que está describiendo el mejor post del mundo mundial',
        };
        const { newPost } = await request(router).post("/create").send(postDetails).expect(201);
       
        const match = await Post.find({ id: 7}).exec();
        expect(match.id).toBe(7);

    });
});
