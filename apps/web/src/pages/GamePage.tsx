import { StatusStat } from '@breakout/ui-components'
import { Link } from 'react-router-dom'

import GameBoardPreview from '../components/GameBoardPreview'
import { levels } from '../data/levels'

export default function GamePage() {
  const level = levels[0]

  return (
    <div className="content-page">
      <h1>Страница игры</h1>
      <div className="game-layout">
        <section className="game-panel" aria-labelledby="game-level-title">
          <div className="game-panel__heading">
            <div>
              <p className="eyebrow">{level.difficulty}</p>
              <h2 id="game-level-title">{level.name}</h2>
            </div>
            <span className="round-label">Раунд 01</span>
          </div>
          <GameBoardPreview pattern={level.pattern} label="Схема игрового поля первого уровня" />
        </section>
        <aside className="game-sidebar" aria-label="Информация об уровне">
          <h2>Результат</h2>
          <section className="stats-grid" aria-label="Показатели игры">
            <StatusStat label="Счёт" value="000" />
            <StatusStat label="Попытки" value="03" />
          </section>
          <p className="game-sidebar__description">{level.description}</p>
          <Link to={`/levels/${level.id}`}>Об уровне</Link>
        </aside>
      </div>
    </div>
  )
}
