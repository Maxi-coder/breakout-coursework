import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { GameButton, StatusStat } from '@breakout/ui-components'
import GameBoard from '../components/GameBoard'
import { getLevel, levels } from '../data/levels'
import {
  advanceGame,
  createGameState,
  launchGame,
  movePaddle,
  movePaddleBy,
  restartRound,
  togglePause,
  type GameState,
} from '../game/gameEngine'

export default function GamePage() {
  const [searchParams] = useSearchParams()
  const requestedLevel = getLevel(searchParams.get('levelId') ?? undefined) ?? levels[0]
  const requestedIndex = Math.max(0, levels.findIndex((level) => level.id === requestedLevel.id))
  const [game, setGame] = useState<GameState>(() => createGameState(requestedLevel, requestedIndex))
  const activeLevel = levels[game.levelIndex] ?? levels[0]
  const isRunning = game.status === 'running'

  useEffect(() => {
    if (!isRunning) return

    let frameId = 0
    const tick = () => {
      setGame((current) => advanceGame(current, levels.length))
      frameId = window.requestAnimationFrame(tick)
    }

    frameId = window.requestAnimationFrame(tick)
    return () => window.cancelAnimationFrame(frameId)
  }, [isRunning])

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'ArrowLeft' || event.key.toLowerCase() === 'a') {
        event.preventDefault()
        setGame((current) => movePaddleBy(current, -1))
      } else if (event.key === 'ArrowRight' || event.key.toLowerCase() === 'd') {
        event.preventDefault()
        setGame((current) => movePaddleBy(current, 1))
      } else if (event.key === ' ' || event.key === 'Spacebar') {
        event.preventDefault()
        setGame((current) => current.status === 'ready' ? launchGame(current) : togglePause(current))
      } else if (event.key.toLowerCase() === 'r') {
        setGame((current) => restartRound(current, levels[current.levelIndex] ?? levels[0]))
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  function startNextLevel() {
    setGame((current) => {
      const nextLevel = levels[current.levelIndex + 1]
      if (!nextLevel) return current
      return createGameState(nextLevel, current.levelIndex + 1, current.score, current.lives)
    })
  }

  function restartCurrentLevel() {
    setGame((current) => restartRound(current, levels[current.levelIndex] ?? levels[0]))
  }

  return (
    <div className="content-page">
      <h1>Игра «Брейкаут»</h1>
      <div className="game-layout">
        <section aria-labelledby="game-level-title" className="game-panel">
          <div className="game-panel__heading">
            <div>
              <p className="eyebrow">{activeLevel.difficulty}</p>
              <h2 id="game-level-title">{activeLevel.name}</h2>
            </div>
            <span className="round-label">Раунд {String(game.levelIndex + 1).padStart(2, '0')}</span>
          </div>
          <GameBoard onMovePaddle={(x) => setGame((current) => movePaddle(current, x))} state={game} />
          <p className="game-controls-hint">Управление: мышь или стрелки. Пробел ставит игру на паузу, R начинает уровень заново.</p>
          <div aria-label="Управление игрой" className="game-actions">
            {game.status === 'ready' && <GameButton onClick={() => setGame(launchGame)}>Запустить мяч</GameButton>}
            {game.status === 'running' && <GameButton onClick={() => setGame(togglePause)}>Пауза</GameButton>}
            {game.status === 'paused' && <GameButton onClick={() => setGame(launchGame)}>Продолжить</GameButton>}
            {game.status === 'level-complete' && <GameButton onClick={startNextLevel}>Следующий уровень</GameButton>}
            {game.status === 'won' && <GameButton href="/">На главную</GameButton>}
            {game.status === 'lost' && <GameButton onClick={restartCurrentLevel}>Повторить уровень</GameButton>}
            {game.status !== 'won' && game.status !== 'lost' && (
              <GameButton onClick={restartCurrentLevel} variant="secondary">Начать уровень заново</GameButton>
            )}
          </div>
        </section>
        <aside aria-label="Информация об уровне" className="game-sidebar">
          <h2>Результат</h2>
          <section aria-label="Показатели игры" className="stats-grid">
            <StatusStat label="Счёт" value={String(game.score).padStart(3, '0')} />
            <StatusStat label="Попытки" value={String(game.lives).padStart(2, '0')} />
            <StatusStat label="Уровень" value={`${game.levelIndex + 1} / ${levels.length}`} />
          </section>
          <p className="game-sidebar__description">{activeLevel.description}</p>
          <Link to={`/levels/${activeLevel.id}`}>Об уровне</Link>
        </aside>
      </div>
    </div>
  )
}
