import { Link, useParams } from 'react-router-dom'
import GameBoardPreview from '../components/GameBoardPreview'
import { getLevel } from '../data/levels'

export default function LevelPage() {
  const { levelId } = useParams()
  const level = getLevel(levelId)

  if (!level) {
    return (
      <div className="content-page not-found-page">
        <p className="eyebrow">УРОВЕНЬ НЕ НАЙДЕН</p>
        <h1>Такого поля пока нет</h1>
        <p>Доступны три уровня, включённые в план MVP.</p>
        <Link className="text-link" to="/">Вернуться к обзору <span aria-hidden="true">→</span></Link>
      </div>
    )
  }

  return (
    <div className="content-page level-page">
      <div className="page-heading">
        <div><p className="eyebrow">УРОВЕНЬ 0{level.id} · {level.difficulty.toUpperCase()}</p><h1>{level.name}</h1></div>
        <Link className="text-link" to="/">← Все уровни</Link>
      </div>
      <div className="level-detail">
        <div className="level-detail-copy">
          <p>{level.description}</p>
          <dl className="level-facts">
            <div><dt>Ряды блоков</dt><dd>{level.brickRows}</dd></div>
            <div><dt>Тип поля</dt><dd>Классический</dd></div>
            <div><dt>Статус</dt><dd>В разработке</dd></div>
          </dl>
          <Link className="text-link" to="/game">Перейти к игровому макету <span aria-hidden="true">→</span></Link>
        </div>
        <GameBoardPreview compact rows={level.brickRows} />
      </div>
    </div>
  )
}
