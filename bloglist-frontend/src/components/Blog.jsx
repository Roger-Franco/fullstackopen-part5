import { useEffect, useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, getBlogs }) => {
  const [visible, setVisible] = useState(false)
  const [likes, setLikes] = useState(blog.likes)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  useEffect(() => {
    const updateLikes = async () => {
      const blogUpdated = { ...blog, likes: likes }
      const result = await blogService.update(blog.id, blogUpdated)
      setLikes(result.likes)
    }
    updateLikes()
  }, [likes])

  const removeBlog = async () => {
    window.confirm(`remove blog ${blog.title} by ${blog.author}`)
    await blogService.remove(blog.id)
    getBlogs()
  }


  return (
  <div className='blog' style={blogStyle}>
    {blog.title} - {blog.author} <button onClick={() => setVisible(!visible)}>{visible ? 'hide' : 'view'}</button>
    {visible &&
      <div>
        <div>{blog.url}</div>
        <div>likes {likes} <button onClick={() => setLikes(likes + 1)}>like</button></div>
        <div>{blog.user && blog.user.name }</div>
        {blog.user &&
        <button id="remove-button" onClick={removeBlog}>remove</button>
        }
      </div>
    }
  </div>  
)}

export default Blog