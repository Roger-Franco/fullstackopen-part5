import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import './index.css'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

const Notification = ({ message, className }) => {
  if (message === null) {
    return null
  }

  return (
    <div className={className}>
      {message}
    </div>
  )
}

const Footer = () => {
  const footerStyle = {
    color: 'green',
    fontStyle: 'italic',
    fontSize: 16,
  }
  return (
    <div style={footerStyle}>
      <br />
      <em>Blog app, Department of Computer Science, University of Helsinki 2022</em>
    </div>
  )
}

const App = () => {
  const [loginVisible, setLoginVisible] = useState(false)
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

   const noteFormRef = useRef()

   const getBlogs = async () => {
     const blogs = await blogService.getAll()
     setBlogs(blogs)
     
   }

  useEffect(() => {
    getBlogs()
    // blogService.getAll().then(blogs =>
    //   setBlogs( blogs )
    // )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }
  function logOut() {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

//   const loginForm = () => {
//     const hideWhenVisible = { display: loginVisible ? 'none' : '' }
//     const showWhenVisible = { display: loginVisible ? '' : 'none' }

//     return (
//       <div>
//         <div style={hideWhenVisible}>
//           <button onClick={() => setLoginVisible(true)}>log in</button>
//         </div>
//         <div style={showWhenVisible}>
//           <LoginForm
//             username={username}
//             password={password}
//             handleUsernameChange={({ target }) => setUsername(target.value)}
//             handlePasswordChange={({ target }) => setPassword(target.value)}
//             handleSubmit={handleLogin}
//           />
//           <button onClick={() => setLoginVisible(false)}>cancel</button>
//         </div>
//       </div>
//     )
// }

  const postBlog = async (blogObject) => {
    noteFormRef.current.toggleVisibility()
    // event.preventDefault()
    // const blogObject = {
    //   title: event.target.title.value,
    //   author: event.target.author.value,
    //   url: event.target.url.value,
    // }
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
      })

    // event.target.title.value = ''
    // event.target.author.value = ''
    // event.target.url.value = ''
    setErrorMessage(blogObject.title + ' by ' + blogObject.author + ' added')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
  }
  

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={errorMessage} className={!user ? 'error' : 'added'} />
      {!user && 
      <Togglable buttonLabel="log in">
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
        </Togglable>
      // loginForm()
      }
      {user && <div>
        <p>{user.name} logged in <button onClick={logOut}>logout</button> </p>
        <h3>create New Blog</h3>
        {/* {blogForm()} */}
        <Togglable buttonLabel="new blog" ref={noteFormRef}>
          <BlogForm createBlog={postBlog} />
        </Togglable>
        {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
          <Blog key={blog.id} getBlogs={getBlogs} blog={blog} />
        )}
        
      </div>
      }
      <Footer />
    </div>
  )
}

export default App