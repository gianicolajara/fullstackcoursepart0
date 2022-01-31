import React from 'react'
import Blog from './Blog'

const ListBlogs = ({
  blogs,
  setErrorMessage,
  setBlogs,
  user,
  handleClickLike,
}) => {
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
            <Blog
              key={blog.id}
              blog={blog}
              setErrorMessage={setErrorMessage}
              setBlogs={setBlogs}
              blogs={blogs}
              user={user}
              handleClickLike={handleClickLike}
            />
          ))
      ) : (
        <p>there are no blogs available</p>
      )}
    </div>
  )
}

export default ListBlogs
