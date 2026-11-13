import type { PointerEvent } from 'react'
import {
  BALL_RADIUS,
  BOARD_HEIGHT,
  BOARD_WIDTH,
  PADDLE_HEIGHT,
  PADDLE_WIDTH,
  PADDLE_Y,
  type GameState,
} from '../game/gameEngine'

type GameBoardProps = {
  state: GameState
  onMovePaddle: (x: number) => void
}

const statusMessages: Record<GameState['status'], string> = {
  ready: 'Нажмите «Запустить мяч»',
  running: '',
  paused: 'Игра на паузе',
  'level-complete': 'Уровень пройден',
  won: 'Вы прошли все уровни',
  lost: 'Попытки закончились',
}

export default function GameBoard({ state, onMovePaddle }: GameBoardProps) {
  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    const bounds = event.currentTarget.getBoundingClientRect()
    if (bounds.width === 0) return
    const x = ((event.clientX - bounds.left) / bounds.width) * BOARD_WIDTH
    onMovePaddle(x)
  }

  return (
    <div
      aria-label="Игровое поле. Перемещайте платформу мышью или стрелками."
      className="game-board"
      onPointerMove={handlePointerMove}
      role="application"
    >
      <svg aria-hidden="true" className="game-board__svg" viewBox={`0 0 ${BOARD_WIDTH} ${BOARD_HEIGHT}`}>
        <rect className="game-board__background" height={BOARD_HEIGHT} width={BOARD_WIDTH} />
        {state.bricks.filter((brick) => brick.active).map((brick) => (
          <rect
            className={`game-board__brick game-board__brick--${brick.row % 3}`}
            height={brick.height}
            key={brick.id}
            rx="2"
            width={brick.width}
            x={brick.x}
            y={brick.y}
          />
        ))}
        <circle className="game-board__ball" cx={state.ball.x} cy={state.ball.y} r={BALL_RADIUS} />
        <rect
          className="game-board__paddle"
          height={PADDLE_HEIGHT}
          rx="3"
          width={PADDLE_WIDTH}
          x={state.paddle.x - PADDLE_WIDTH / 2}
          y={PADDLE_Y}
        />
      </svg>
      {statusMessages[state.status] && (
        <div aria-live="polite" className="game-board__message">
          {statusMessages[state.status]}
        </div>
      )}
    </div>
  )
}
