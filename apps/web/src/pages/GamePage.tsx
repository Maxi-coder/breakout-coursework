import { Link } from 'react-router-dom'
import { StatusStat } from '@breakout/ui-components'
import GameBoardPreview from '../components/GameBoardPreview'

export default function GamePage() {
  return (
    <div className="content-page game-page">
      <div className="page-heading">
        <div><p className="eyebrow">ДЕМОНСТРАЦИОННЫЙ РЕЖИМ</p><h1>Игровое поле</h1></div>
        <Link className="text-link" to="/">← На главную</Link>
      </div>
      <div className="game-layout">
        <section className="game-stage" aria-label="Макет игры">
          <GameBoardPreview rows={4} />
          <p className="stage-note">Статичный макет · игровая физика появится в следующей версии</p>
        </section>
        <aside className="game-info">
          <p className="eyebrow">ТЕКУЩИЙ РАУНД</p>
          <div className="stats-grid">
            <StatusStat label="Счёт" value="0000" />
            <StatusStat label="Уровень" value="01 / 03" />
            <StatusStat label="Попытки" value="03" />
          </div>
          <div className="controls-note">
            <span className="controls-icon" aria-hidden="true">⌖</span>
            <div><strong>Управление платформой</strong><p>Клавиши ← → или движение мышью. Управление подключим вместе с игровой симуляцией.</p></div>
          </div>
          <Link className="text-link" to="/levels/1">Открыть описание уровня <span aria-hidden="true">→</span></Link>
        </aside>
      </div>
    </div>
  )
}
