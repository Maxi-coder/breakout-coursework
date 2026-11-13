import { levels } from '../data/levels'
import {
  advanceGame,
  BALL_RADIUS,
  BOARD_HEIGHT,
  BOARD_WIDTH,
  createGameState,
  launchGame,
  movePaddle,
  movePaddleBy,
  PADDLE_Y,
  restartRound,
  togglePause,
  type GameState,
} from './gameEngine'

function withBall(state: GameState, x: number, y: number, vx: number, vy: number): GameState {
  return { ...state, status: 'running', ball: { ...state.ball, x, y, vx, vy } }
}

describe('игровая логика', () => {
  it('создаёт поле по схеме уровня и сохраняет начальный счёт и попытки', () => {
    const state = createGameState({ id: 4, pattern: ['101', '010'] }, 0, 20, 2)

    expect(state.bricks).toHaveLength(3)
    expect(state.bricks.every((brick) => brick.active)).toBe(true)
    expect(state.score).toBe(20)
    expect(state.lives).toBe(2)
    expect(state.ball.x).toBe(BOARD_WIDTH / 2)
  })

  it('ограничивает платформу границами и двигает мяч вместе с ней до запуска', () => {
    const state = createGameState(levels[0], 0)
    const left = movePaddle(state, -20)
    const right = movePaddle(state, BOARD_WIDTH + 20)

    expect(left.paddle.x).toBe(52)
    expect(left.ball.x).toBe(52)
    expect(right.paddle.x).toBe(BOARD_WIDTH - 52)
    expect(movePaddleBy(state, 1).paddle.x).toBe(436)
    expect(movePaddleBy(state, -1).paddle.x).toBe(364)
  })

  it('запускает мяч, возобновляет паузу и не меняет неподходящие состояния', () => {
    const ready = createGameState(levels[0], 0)
    const running = launchGame(ready)
    const paused = togglePause(running)

    expect(running.status).toBe('running')
    expect(running.ball.vy).toBeLessThan(0)
    expect(launchGame(paused).status).toBe('running')
    expect(togglePause(paused).status).toBe('running')
    expect(togglePause(ready)).toBe(ready)
    expect(launchGame(running)).toBe(running)
  })

  it('отражает мяч от боковых и верхней стенок', () => {
    const base = createGameState({ id: 1, pattern: [] }, 0)
    const left = advanceGame(withBall(base, BALL_RADIUS + 1, 200, -3, 0))
    const right = advanceGame(withBall(base, BOARD_WIDTH - BALL_RADIUS - 1, 200, 3, 0))
    const top = advanceGame(withBall(base, 300, BALL_RADIUS + 1, 0, -3))

    expect(left.ball.vx).toBeGreaterThan(0)
    expect(right.ball.vx).toBeLessThan(0)
    expect(top.ball.vy).toBeGreaterThan(0)
  })

  it('отбивает мяч от платформы с направлением по месту попадания', () => {
    const state = withBall(createGameState({ id: 1, pattern: [] }, 0), 420, PADDLE_Y - BALL_RADIUS - 4, 0, 4)
    const next = advanceGame(state)

    expect(next.ball.vy).toBeLessThan(0)
    expect(next.ball.vx).toBeGreaterThan(0)
  })

  it('ломает блок, начисляет очки и открывает следующий уровень', () => {
    const initial = createGameState({ id: 1, pattern: ['1'] }, 0)
    const state = withBall(initial, 50, 36 - BALL_RADIUS - 3, 0, 3)
    const next = advanceGame(state)

    expect(next.score).toBe(10)
    expect(next.bricks[0].active).toBe(false)
    expect(next.status).toBe('level-complete')
    expect(next.ball.vy).toBeLessThan(0)
  })

  it('показывает победу после очистки последнего уровня', () => {
    const initial = createGameState({ id: 3, pattern: ['1'] }, 2)
    const next = advanceGame(withBall(initial, 50, 36 - BALL_RADIUS - 3, 0, 3))

    expect(next.status).toBe('won')
  })

  it('снимает попытку и возвращает мяч к платформе', () => {
    const initial = createGameState({ id: 1, pattern: [] }, 0)
    const next = advanceGame(withBall(initial, 400, BOARD_HEIGHT + 8, 0, 2))

    expect(next.lives).toBe(2)
    expect(next.status).toBe('ready')
    expect(next.ball.vx).toBe(0)
    expect(next.ball.x).toBe(next.paddle.x)
  })

  it('завершает раунд поражением после последней попытки', () => {
    const initial = createGameState({ id: 1, pattern: [] }, 0, 50, 1)
    const next = advanceGame(withBall(initial, 400, BOARD_HEIGHT + 8, 0, 2))

    expect(next.lives).toBe(0)
    expect(next.status).toBe('lost')
  })

  it('не двигает мяч вне игры и блокирует платформу после завершения', () => {
    const ready = createGameState(levels[0], 0)
    const lost = { ...ready, status: 'lost' as const }
    const paused = togglePause(launchGame(ready))

    expect(advanceGame(ready)).toBe(ready)
    expect(movePaddle(lost, 200)).toBe(lost)
    expect(movePaddle(paused, 200)).toBe(paused)
  })

  it('перезапускает уровень с его исходным счётом и числом попыток', () => {
    const started = createGameState(levels[1], 1, 70, 2)
    const changed = { ...started, score: 100, lives: 1, status: 'running' as const }
    const restarted = restartRound(changed, levels[1])

    expect(restarted.status).toBe('ready')
    expect(restarted.score).toBe(70)
    expect(restarted.lives).toBe(2)
    expect(restarted.bricks.every((brick) => brick.active)).toBe(true)
  })
})
