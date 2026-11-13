import { Link, useParams } from 'react-router-dom'

import GameBoardPreview from '../components/GameBoardPreview'
import { getLevel } from '../data/levels'

export default function LevelPage() {
  const { levelId } = useParams()
  const level = getLevel(levelId)

  if (!level) {
    return (
      <div className="content-page">
        <h1>Уровень не найден</h1>
        <p>Проверьте номер уровня или вернитесь на главную страницу.</p>
        <Link to="/">На главную</Link>
      </div>
    )
  }

  return (
    <div className="content-page">
      <div className="level-detail">
        <section className="level-detail__info">
          <p className="eyebrow">{level.difficulty}</p>
          <h1>{level.name}</h1>
          <p>{level.description}</p>
          <Link className="game-button" to="/game">Перейти к странице игры</Link>
        </section>
        <section className="level-preview" aria-labelledby="level-preview-title">
          <h2 id="level-preview-title">Схема блоков</h2>
          <GameBoardPreview pattern={level.pattern} label={`Схема блоков: ${level.name}`} />
        </section>
      </div>
    </div>
  )
}
