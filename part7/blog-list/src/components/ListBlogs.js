import React from 'react'
import Blog from './Blog'

const ListBlogs = ({ blogs, user }) => {
  const orderByLikes = (a, b) => {
    if (a.likes < b.likes) {
      return 1
    }

    if (a.likes > b.likes) {
      return -1
    }

    return 0
  }

  return (
    <div id="blogs">
      {blogs.length > 0 ? (
        blogs
          .sort(orderByLikes)
          .map((blog) => (
            <Blog key={blog.id} blog={blog} blogs={blogs} user={user} />
          ))
      ) : (
        <p>there are no blogs available</p>
      )}
    </div>
  )
}

export default ListBlogs
