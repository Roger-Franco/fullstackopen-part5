/* eslint-disable no-undef */
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
  // Blog.find({}).then(blogs => {
  //   response.json(blogs)
  // })
})

blogsRouter.get('/:id', async (request, response, next) => {

  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.json(blog)
  } else {
    response.status(404).end()
  }

  // Blog.findById(request.params.id)
  //   .then(blog => {
  //     if (blog) {
  //       response.json(blog)
  //     } else {
  //       response.status(404).end()
  //     }
  //   })
  //   .catch(error => next(error))
})

blogsRouter.post('/', async (request, response, next) => {
  const body = request.body

  const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }
  const user = await User.findById(decodedToken.id)

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user.id
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  response.status(201).json(savedBlog)

  // blog.save()
  //   .then(savedBlog => {
  //     response.json(savedBlog)
  //   })
  //   .catch(error => next(error))
})

blogsRouter.delete('/:id', async (request, response, next) => {

  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()

  // Blog.findByIdAndDelete(request.params.id)
  //   .then(() => {
  //     response.status(204).end()
  //   })
  //   .catch(error => next(error))
})

blogsRouter.put('/:id', async (request, response, next) => {
  const body = request.body

  console.log(body, 'body backend 87')
  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  }

  await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })

  response.status(200).json(blog)

  // Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  //   .then(updatedBlog => {
  //     response.json(updatedBlog)
  //   })
  //   .catch(error => next(error))
})

module.exports = blogsRouter