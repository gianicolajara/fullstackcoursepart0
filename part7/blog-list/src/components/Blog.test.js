import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

const blog = {
  title: 'localhost',
  author: 'gianicola jara',
  url: 'https://www.youtube.com/',
  likes: 1,
  id: '61f2eb029072849f8bee0c28',
  user: ['61f2e9a79072849f8bee0c0a'],
}

const user = {
  username: 'Gianicola',
  name: 'Gianicola',
  id: '61f2e9a79072849f8bee0c0a',
}

describe('<Blog />', () => {
  let component

  test('renders blog', () => {
    component = render(<Blog blog={blog} user={user} />)
    const div = component.container.querySelector('.viewContent')

    expect(div).toHaveTextContent('localhost')
    expect(div).toHaveTextContent('gianicola jara')
    expect(div).not.toHaveTextContent('https://www.youtube.com/')
    expect(div).not.toHaveTextContent('likes')
  })

  test('clicking the button call event show handler', () => {
    component = render(<Blog blog={blog} user={user} />)
    const button = component.getByText('show blog')
    fireEvent.click(button)

    const div = component.container.querySelector('.hiddenContent')

    expect(div).toHaveStyle('display: block')
  })

  test('clicking the button call event like handle', () => {
    const mockHandler = jest.fn()

    component = render(
      <Blog blog={blog} user={user} handleClickLike={mockHandler} />,
    )

    const buttonShow = component.getByText('show blog')
    const buttonLike = component.getByText('like')

    fireEvent.click(buttonShow)

    fireEvent.click(buttonLike)
    fireEvent.click(buttonLike)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})
