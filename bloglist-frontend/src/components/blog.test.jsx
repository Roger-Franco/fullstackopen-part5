import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'


test('renders content', () => {
  const blog = {
    title: 'Component testing is important for application development',
    url: 'https://frank.org',
    likes: 0,
    author: 'Roger Frank'
  }

  render(<Blog blog={blog} />)
  // screen.debug()

  // const element = screen.getByText('Component testing is important for application development')
  // expect(element).toBeDefined()

  const { container } = render(<Blog blog={blog} />)

  const div = container.querySelector('.blog')
  // screen.debug(div)
  expect(div).toHaveTextContent(
    'Component testing is important for application development'
  )
  expect(div).toHaveTextContent(
    'Roger Frank'
  )
  expect(div).not.toHaveTextContent(
    'https://frank.org'
  )
  expect(div).not.toHaveTextContent(
    '0'
  )
})