import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import CreateBlogForm from './CreateBlogForm'
import { act } from 'react-dom/test-utils'

describe('<CreateBlogForm />', () => {
  test('<CreateBlogForm /> submit', async () => {
    const createBlog = jest.fn()

    const component = render(<CreateBlogForm handleCreateBlog={createBlog} />)

    const inputTitle = component.container.querySelector('#title')
    const inputAuthor = component.container.querySelector('#author')
    const inputUrl = component.container.querySelector('#url')
    const form = component.container.querySelector('#create-blog-form')

    fireEvent.change(inputTitle, {
      target: { value: 'localhost 2' },
    })

    fireEvent.change(inputAuthor, {
      target: { value: 'gianicola jara' },
    })

    fireEvent.change(inputUrl, {
      target: { value: 'https://cloud.mongodb.com/' },
    })

    await act(async () => {
      fireEvent.submit(form)
    })

    expect(createBlog.mock.calls).toHaveLength(1)
  })
})
