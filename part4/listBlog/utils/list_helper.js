// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((likes, blog) => likes + blog.likes, 0)
}

// eslint-disable-next-line no-unused-vars
const favoriteBlog = (blogs) => {
  const blogFilter = blogs.reduce(
    (blog, actualBlog) =>
      actualBlog.likes > blog.likes ? (blog = actualBlog) : blog,
    { likes: 0 },
  )
  return {
    title: blogFilter.title,
    author: blogFilter.author,
    likes: blogFilter.likes,
  }
}

const mostBlogs = (blogs) => {
  const listMostBlogs = []

  blogs.forEach((blog) => {
    if (listMostBlogs.length === 0) {
      listMostBlogs.push({
        author: blog.author,
        blogs: 1,
      })
    } else {
      const index = listMostBlogs.findIndex((x) => x.author === blog.author)
      if (index !== -1) {
        listMostBlogs[index].blogs++
      } else {
        listMostBlogs.push({
          author: blog.author,
          blogs: 1,
        })
      }
    }
  })

  const filterMostBlog = listMostBlogs.reduce(
    (mostBlog, actualBlog) =>
      (mostBlog = actualBlog.blogs > mostBlog.blogs ? actualBlog : mostBlog),
    { blogs: 0 },
  )

  return filterMostBlog
}

const mostLikes = (blogs) => {
  const reduceBlogs = blogs.reduce(
    (mostLikes, actualBlog) =>
      (mostLikes = actualBlog.likes > mostLikes.likes ? actualBlog : mostLikes),
    { likes: 0 },
  )

  const { author, likes } = reduceBlogs

  return {
    author,
    likes,
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}
