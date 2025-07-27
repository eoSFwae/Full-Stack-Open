// Creates blogsRouter instance and exports all routes
const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router();
const Blog = require("../models/blog");
const User = require('../models/user')

const getTokenFrom = request => {
    const authorization = request.get('authorization')
    if (authorization && authorization.startsWith('Bearer ')) {
        return authorization.replace('Bearer ', '')
    }
    return null
}

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog
        .find({})
        .populate('user', {username:1, name:1})
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
    const body = request.body

    const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
    if (!decodedToken.id) {
        return response.status(401).json({ error: 'token invalid' })
    }
    const user = await User.findById(decodedToken.id)

    if (!user) {
        return response.status(400).json({ error: 'userId missing or not valid' })
    }

    // const blog = new Blog(request.body)
    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: user.id,
    })

    try {
        const result = await blog.save()
        user.blogs = user.blogs.concat(result._id)
        await user.save()

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