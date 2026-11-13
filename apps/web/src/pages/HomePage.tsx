import { GameButton } from '@breakout/ui-components'
import { Link, useNavigate } from 'react-router-dom'

import GameBoardPreview from '../components/GameBoardPreview'
import { levels } from '../data/levels'

export default function HomePage() {
  const navigate = useNavigate()

  return (
    <div className="home-page">
      <section className="home-hero">
        <div className="home-hero__copy">
          <p className="eyebrow">Курсовой проект · JavaScript</p>
          <h1>Разработка игры «Брейкаут»</h1>
          <p className="home-intro">
            Браузерная аркада с ракеткой, мячом и уровнями разной сложности.
          </p>
          <div className="home-actions">
            <GameButton onClick={() => navigate('/game')}>Открыть страницу игры</GameButton>
            <Link to="/levels/1">Выбрать уровень</Link>
          </div>
        </div>
        <section className="featured-level" aria-labelledby="featured-level-title">
          <div className="featured-level__heading">
            <div>
              <p className="eyebrow">Первый раунд</p>
              <h2 id="featured-level-title">{levels[0].name}</h2>
            </div>
            <span className="difficulty-tag">{levels[0].difficulty}</span>
          </div>
          <GameBoardPreview pattern={levels[0].pattern} label="Схема блоков первого уровня" />
        </section>
      </section>
      <section aria-labelledby="levels-title">
        <h2 id="levels-title">Уровни</h2>
        <ul className="level-list">
          {levels.map((level) => (
            <li key={level.id}>
              <Link to={`/levels/${level.id}`}>
                <span className="level-list__heading">
                  <strong>{level.name}</strong>
                  <span className="difficulty-tag">{level.difficulty}</span>
                </span>
                <span className="level-list__description">{level.description}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
