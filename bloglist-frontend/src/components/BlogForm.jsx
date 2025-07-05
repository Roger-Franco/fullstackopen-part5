const BlogForm = ({ createBlog }) => {

  const addBlog = async (event) => {
      event.preventDefault()
      const blogObject = {
        title: event.target.title.value,
        author: event.target.author.value,
        url: event.target.url.value,
      }
      createBlog(blogObject)
  
      event.target.title.value = ''
      event.target.author.value = ''
      event.target.url.value = ''
      
    }
  return (
    <div>
      <h2>Create a New Blog</h2>

      <form onSubmit={addBlog}>
        <div>
        title
        <input
          id="title"
          type="text"
          name="title"
          placeholder='write title here'
        />
      </div>
      <div>
        author
        <input
          id="author"
          type="text"
          name="author"
        />
      </div>
      <div>
        url
        <input
          id="url"
          type="text"
          name="url"
        />
      </div>
        <button type="submit">save</button>
      </form>
    </div>
  )
}

export default BlogForm;
{/* <form onSubmit={postBlog}>
      <div>
        title
        <input
          type="text"
          name="title"
        />
      </div>
      <div>
        author
        <input
          type="text"
          name="author"
        />
      </div>
      <div>
        url
        <input
          type="text"
          name="url"
        />
      </div>
      <button type="submit">create</button>
    </form> */}