// Creates blogsRouter instance and exports all routes

const blogsRouter = require('express').Router();
const Blog = require("../models/blog");


blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id)
    response.json(blog)
})

blogsRouter.delete('/:id', async (request, response) => {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
})

blogsRouter.post('/', async(request, response) => {
    const blog = new Blog(request.body)
    try {
        const result = await blog.save()
        response.status(201).json(result)
    } catch (error) {
        response.status(400).json(error)
        // next(exception)
    }
})

blogsRouter.put('/:id', async(request, response) => {
    const id = request.params.id
    const newLikes = request.body.likes
    const updatedBlog = await Blog.findByIdAndUpdate(id, {likes:newLikes}, {new:true})
    response.json(updatedBlog)
})





module.exports = blogsRouter