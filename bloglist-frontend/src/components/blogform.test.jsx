import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('<BlogForm /> updates parent state and calls onSubmit', async () => {
  const createBlog = jest.fn()
  const user = userEvent.setup()
  console.log(createBlog, 'createBlog')
  console.log(BlogForm, 'BlogForm')

  render(<BlogForm createBlog={createBlog} />)


  // const inputs = screen.getAllByRole('textbox')
  const input = screen.getByPlaceholderText('write title here')
  console.log(input, 'input')
  const sendButton = screen.getByText('save')

  await user.type(input, 'testing a form...')
  await user.click(sendButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].content).toBe('testing a form...')
})