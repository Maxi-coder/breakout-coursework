import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

import App from './App'

function renderAt(path: string) {
  window.history.pushState({}, '', path)

  return render(<MemoryRouter initialEntries={[path]}><App /></MemoryRouter>)
}

describe('маршруты приложения', () => {
  it('показывает обзор и открывает игровой макет по ссылке', () => {
    renderAt('/')
    expect(screen.getByRole('heading', { name: 'Разработка игры «Брейкаут»' })).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'Открыть страницу игры' }))
    expect(screen.getByRole('heading', { name: 'Страница игры' })).toBeInTheDocument()
  })

  it('показывает существующий уровень и неизвестный маршрут', () => {
    const { unmount } = renderAt('/levels/2')
    expect(screen.getByRole('heading', { name: 'Уровень 2' })).toBeInTheDocument()
    unmount()
    const unknownLevel = renderAt('/levels/9')
    expect(screen.getByRole('heading', { name: 'Уровень не найден' })).toBeInTheDocument()
    unknownLevel.unmount()
    renderAt('/missing')
    expect(screen.getByRole('heading', { name: 'Страница не найдена' })).toBeInTheDocument()
  })
})
