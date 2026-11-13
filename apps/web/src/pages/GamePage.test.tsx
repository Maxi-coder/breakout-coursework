import { fireEvent, render, screen } from '@testing-library/react'
import { jest } from '@jest/globals'
import { MemoryRouter } from 'react-router-dom'
import GamePage from './GamePage'

let requestFrameDescriptor: PropertyDescriptor | undefined
let cancelFrameDescriptor: PropertyDescriptor | undefined

beforeEach(() => {
  requestFrameDescriptor = Object.getOwnPropertyDescriptor(window, 'requestAnimationFrame')
  cancelFrameDescriptor = Object.getOwnPropertyDescriptor(window, 'cancelAnimationFrame')
  Object.defineProperty(window, 'requestAnimationFrame', {
    configurable: true,
    value: () => 1,
  })
  Object.defineProperty(window, 'cancelAnimationFrame', {
    configurable: true,
    value: () => undefined,
  })
})

afterEach(() => {
  if (requestFrameDescriptor) Object.defineProperty(window, 'requestAnimationFrame', requestFrameDescriptor)
  else delete (window as { requestAnimationFrame?: typeof window.requestAnimationFrame }).requestAnimationFrame
  if (cancelFrameDescriptor) Object.defineProperty(window, 'cancelAnimationFrame', cancelFrameDescriptor)
  else delete (window as { cancelAnimationFrame?: typeof window.cancelAnimationFrame }).cancelAnimationFrame
})

describe('экран игры', () => {
  it('запускает игру, ставит на паузу и продолжает раунд', () => {
    render(<MemoryRouter><GamePage /></MemoryRouter>)

    fireEvent.click(screen.getByRole('button', { name: 'Запустить мяч' }))
    expect(screen.getByRole('button', { name: 'Пауза' })).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'Пауза' }))
    expect(screen.getByText('Игра на паузе')).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'Продолжить' }))
    expect(screen.getByRole('button', { name: 'Пауза' })).toBeInTheDocument()
  })

  it('выбирает уровень из адреса и двигает платформу мышью и клавиатурой', () => {
    render(<MemoryRouter initialEntries={['/game?levelId=2']}><GamePage /></MemoryRouter>)
    expect(screen.getByRole('heading', { name: 'Уровень 2' })).toBeInTheDocument()

    const board = screen.getByRole('application')
    jest.spyOn(board, 'getBoundingClientRect').mockReturnValue({
      x: 0,
      y: 0,
      left: 0,
      top: 0,
      right: 800,
      bottom: 480,
      width: 800,
      height: 480,
      toJSON: () => ({}),
    })
    fireEvent(board, new MouseEvent('pointermove', { bubbles: true, clientX: 600, clientY: 200 }))
    expect(board.querySelector('.game-board__paddle')).toHaveAttribute('x', '548')
    fireEvent.keyDown(window, { key: 'ArrowLeft' })
    expect(board.querySelector('.game-board__paddle')).toHaveAttribute('x', '512')
    fireEvent.keyDown(window, { key: 'r' })
    expect(board.querySelector('.game-board__paddle')).toHaveAttribute('x', '348')
    expect(screen.getByRole('button', { name: 'Запустить мяч' })).toBeInTheDocument()
  })
})
