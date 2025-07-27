// functions needed from node:test
const {test, describe , after, beforeEach} = require('node:test')
// functions needed from node:assert
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require("../app")
const helper = require('./test_helper')
const Blog = require('../models/blog')
const {request} = require("express");
const bcrypt = require('bcrypt')
const User = require('../models/user')


const api = supertest(app)


beforeEach(async ()=>{
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)

    // Promise.all adds all objects in parallel ==> see For of (in order)
    // const blogObjects = helper.initialBlogs
    //     .map(blog => new Blog(blog))
    // const promiseArray = blogObjects.map(blog => blog.save())
    // await Promise.all(promiseArray)

    // insertMany is better
    // for (let blog of helper.initialBlogs){
    //     let blogObject = new Blog(blog)
    //     await blogObject.save()
    // }

})


describe('backend tests', ()=>{
    test("blogs are returned as json", async ()=>{
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('content-type', /application\/json/)
    })

    test('all notes are returned', async ()=>{
        const response = await api
            .get('/api/blogs')
            .expect(200)
            .expect('content-type', /application\/json/)
        assert.strictEqual(response.body.length, helper.initialBlogs.length)
    })

    test('id are returned as json and not _id', async ()=>{
        const response = await api
            .get('/api/blogs')
            .expect(200)
            .expect('content-type', /application\/json/)
        assert(response.body[0].id)
        assert(!response.body[0]._id)
        assert.strictEqual(typeof response.body[0].id, 'string')
    })

    test('a specific note is within the returned notes', async () => {
        const response = await api.get('/api/blogs')
        const blogs = response.body.map(e => e.author)
        assert(blogs.includes('Michael Chan'))
        assert.strictEqual(response.body.length, helper.initialBlogs.length)
    })

    test('a valid note can be added ', async () => {
        const newBlog = {
            _id: "5a422b3a1b54a676234d17f9",
            title: "async/await simplifies making async calls",
            author: "Edsger W. Dijkstra",
            url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
            likes: 12,
            __v: 0
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const blogsAtEnd = await helper.blogsInDb()
        assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)

        const titles = blogsAtEnd.map(r => r.title)
        assert(titles.includes('async/await simplifies making async calls'))
    })

    test('a specific blog can be viewed', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToView = blogsAtStart[0]
        const resultBlog = await api
            .get(`/api/blogs/${blogToView.id}`)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        assert.deepStrictEqual(resultBlog.body, blogToView)
    })

    test('a blog can be deleted', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToDelete = blogsAtStart[0]


        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .expect(204)

        const blogsAtEnd = await helper.blogsInDb()

        const titles = blogsAtEnd.map(n => n.title)
        assert(!titles.includes(blogToDelete.content))

        assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1)
    })

    test('a blog can be updated', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToUpdate = blogsAtStart[0]
        const newLikes = {likes: 999}

        const updatedBlog = await api
            .put(`/api/blogs/${blogToUpdate.id}`)
            .send(newLikes)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        assert.strictEqual(updatedBlog.body.likes, newLikes.likes)
    })

// This tests that underfilleed post objects are rejected
//     test('note without content is not added', async () => {
//         const newBlog = {
//             author: "Robert C. Martin",
//         }
//
//         await api
//             .post('/api/blogs')
//             .send(newBlog)
//             .expect(400)
//
//         const response = await api.get('/api/blogs')
//
//         assert.strictEqual(response.body.length, initialNotes.length)
//     })
//     const notesAtEnd = await helper.notesInDb()
//
//     assert.strictEqual(notesAtEnd.length, helper.initialNotes.length)
    describe('when there is initially one user in db', () => {
        beforeEach(async () => {
            await User.deleteMany({})

            const passwordHash = await bcrypt.hash('sekret', 10)
            const user = new User({ username: 'root', passwordHash })

            await user.save()
        })

        test('creation succeeds with a fresh username', async () => {
            const usersAtStart = await helper.usersInDb()

            const newUser = {
                username: 'mluukkai',
                name: 'Matti Luukkainen',
                password: 'salainen',
            }

            await api
                .post('/api/users')
                .send(newUser)
                .expect(201)
                .expect('Content-Type', /application\/json/)

            const usersAtEnd = await helper.usersInDb()
            assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

            const usernames = usersAtEnd.map(u => u.username)
            assert(usernames.includes(newUser.username))
        })

        test('creation fails with proper statuscode and message if username already taken', async () => {
            const usersAtStart = await helper.usersInDb()

            const newUser = {
                username: 'root',
                name: 'Superuser',
                password: 'salainen',
            }

            const result = await api
                .post('/api/users')
                .send(newUser)
                .expect(400)
                .expect('Content-Type', /application\/json/)

            const usersAtEnd = await helper.usersInDb()
            assert(result.body.error.includes('expected `username` to be unique'))

            assert.strictEqual(usersAtEnd.length, usersAtStart.length)
        })
    })

    after(async ()=>{
        await mongoose.connection.close()
    })
})

test.skip('dummy returns one', ()=>{
    const blogs = []

    const result = listHelper.dummy(blogs)
    assert.strictEqual(result , 1)
})



