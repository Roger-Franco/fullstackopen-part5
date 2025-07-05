const dummy = (blogs) => {
  return 1
}

const listWithSeveralBlogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
  {
    _id: "5a422bc61b54a676233d5kfc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 8,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0
  }
]

const totalLikes = (blog) => {
  // const likes = blog.map((blog) => {
  //   return blog.likes
  // })
  // console.log(likes, 'blog.likes')
  // console.log(blog[0].likes, 'blog.likes')
  // return blog[0].likes
  return blog.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  let maxLikes = 0
  // let favoriteBlog = null
  // for (let blog of blogs) {
  //   if (blog.likes > maxLikes) {
  //     maxLikes = blog.likes
  //     favoriteBlog = blog
  //   }
  // }
  // return favoriteBlog
  // return blogs.reduce((favoriteBlog, blog) => blog.likes > favoriteBlog.likes ? blog : favoriteBlog, { likes: 0 })
  blogs.map((blog) => {
    maxLikes = Math.max(maxLikes, blog.likes)
    // return maxLikes
  })
  const favoriteBlog = blogs.find((blog) => blog.likes === maxLikes)
  // console.log(favoriteBlog, 'favoriteBlog')
  return favoriteBlog
}

const mostBlogs = (blogs) => {
  const authors = {}
  const authorsArray = []
  let maior = 0
  for (let blog of blogs) {
    if (authors[blog.author]) {
      authors[blog.author] += 1
    } else {
      authors[blog.author] = 1
    }
    authorsArray.push(blog.author)
  }
  Object.keys(authors).forEach((item) => {
    maior = Math.max(maior, authors[item])
  });
  const arrayBlog = Object.keys(authors).map((item) => {
    return { author: item, blogs: authors[item] }
  })
  const result = arrayBlog.find((blog) => blog.blogs === maior)
  return result
}

const mostLikes = (blogs) => {
  let moreQuantity = 0
  blogs.map((blog) => {
    moreQuantity = Math.max(moreQuantity, blog.likes)
    return moreQuantity
  })
  const result = blogs.find((blog) => blog.likes === moreQuantity)
  return { author: result.author, likes: result.likes }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}