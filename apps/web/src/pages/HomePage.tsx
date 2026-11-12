import { Link, useNavigate } from 'react-router-dom'
import { GameButton } from '@breakout/ui-components'
import GameBoardPreview from '../components/GameBoardPreview'
import { levels } from '../data/levels'

export default function HomePage() {
  const navigate = useNavigate()

  return (
    <div className="home-page">
      <section className="home-hero">
        <div className="hero-copy">
          <p className="eyebrow"><span className="eyebrow-line" /> АРКАДА · ВЕРСИЯ 0.1</p>
          <h1>Разбей всё.<br /><span>Не урони мяч.</span></h1>
          <p className="hero-description">
            Классическая аркада с уровнями и простой физикой мяча. Сейчас здесь собран каркас экранов и навигации.
          </p>
          <div className="hero-actions">
            <GameButton onClick={() => navigate('/game')} variant="primary">Открыть прототип <span aria-hidden="true">↗</span></GameButton>
            <Link className="text-link" to="/levels/1">Посмотреть уровни <span aria-hidden="true">→</span></Link>
          </div>
          <div className="hero-meta">
            <div><strong>03</strong><span>уровня в плане</span></div>
            <div><strong>01</strong><span>игрок</span></div>
            <div><strong>∞</strong><span>попыток на старте</span></div>
          </div>
        </div>
        <div className="hero-board-wrap">
          <div className="board-stamp"><span>Б</span><small>РАЗРУШЬ<br />ПОРЯДОК</small></div>
          <GameBoardPreview />
          <span className="board-index">ИГРОВОЙ ЭКРАН / 001</span>
        </div>
      </section>

      <section className="levels-section" aria-labelledby="levels-title">
        <div className="section-heading">
          <div><p className="eyebrow">МАРШРУТ ИГРОКА</p><h2 id="levels-title">Три шага к финалу</h2></div>
          <span className="section-count">01 — 03</span>
        </div>
        <div className="level-list">
          {levels.map((level) => (
            <Link className="level-row" key={level.id} to={`/levels/${level.id}`}>
              <span className="level-number">0{level.id}</span>
              <span className="level-name">{level.name}</span>
              <span className="level-difficulty">{level.difficulty}</span>
              <span className="level-arrow" aria-hidden="true">↗</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
