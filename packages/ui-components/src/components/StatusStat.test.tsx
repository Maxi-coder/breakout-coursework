import { render, screen } from '@testing-library/react'

import { StatusStat } from './StatusStat'

describe('StatusStat', () => {
  it('показывает подпись и текстовое значение', () => {
    render(<StatusStat label="Уровень" value="01 / 03" />)
    expect(screen.getByText('Уровень')).toBeInTheDocument()
    expect(screen.getByText('01 / 03')).toBeInTheDocument()
  })

  it('показывает числовое значение', () => {
    render(<StatusStat label="Попытки" value={3} />)
    expect(screen.getByText('3')).toBeInTheDocument()
  })
})
