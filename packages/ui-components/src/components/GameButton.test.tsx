import { fireEvent, render, screen } from '@testing-library/react'
import { jest } from '@jest/globals'
import { GameButton } from './GameButton'

describe('GameButton', () => {
  it('отображает кнопку основного действия и передаёт нажатие', () => {
    const onClick = jest.fn()
    render(<GameButton onClick={onClick}>Начать игру</GameButton>)
    const button = screen.getByRole('button', { name: 'Начать игру' })

    expect(button).toHaveClass('game-button--primary')
    fireEvent.click(button)
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('поддерживает вторичный вариант и отключённое состояние', () => {
    render(<GameButton disabled variant="secondary">Недоступно</GameButton>)
    expect(screen.getByRole('button', { name: 'Недоступно' })).toBeDisabled()
    expect(screen.getByRole('button', { name: 'Недоступно' })).toHaveClass('game-button--secondary')
  })

  it('может отображаться ссылкой', () => {
    render(<GameButton href="/game">К игре</GameButton>)
    expect(screen.getByRole('link', { name: 'К игре' })).toHaveAttribute('href', '/game')
  })
})
