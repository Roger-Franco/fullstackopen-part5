const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'String examples',
    author: 'String examples',
    url: 'String examples',
    likes: 2
  },
  {
    title: 'String examples 2',
    author: 'String examples 2',
    url: 'String examples 2',
    likes: 6
  }
]

const nonExistingId = async () => {
  const blog = new Blog(
    {
      title: 'willremovethissoon',
      author: 'willremovethissoon',
      url: 'willremovethissoon',
      likes: 2
    })
  await blog.save()
  await blog.deleteOne()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs, nonExistingId, blogsInDb
}