import type { Level } from '../data/levels'

export const BOARD_WIDTH = 800
export const BOARD_HEIGHT = 480
export const PADDLE_WIDTH = 104
export const PADDLE_HEIGHT = 12
export const PADDLE_Y = 448
export const BALL_RADIUS = 8

export type GameStatus = 'ready' | 'running' | 'paused' | 'level-complete' | 'won' | 'lost'

export type Ball = {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
}

export type Paddle = {
  x: number
}

export type Brick = {
  id: string
  x: number
  y: number
  width: number
  height: number
  row: number
  active: boolean
}

export type GameState = {
  levelId: number
  levelIndex: number
  ball: Ball
  paddle: Paddle
  bricks: Brick[]
  score: number
  lives: number
  roundScore: number
  roundLives: number
  status: GameStatus
}

const brickWidth = 68
const brickHeight = 16
const brickGap = 8
const paddleSpeed = 36
const initialLives = 3

function createBall(x: number): Ball {
  return { x, y: 430, vx: 0, vy: 0, radius: BALL_RADIUS }
}

function createBricks(pattern: string[]): Brick[] {
  return pattern.flatMap((row, rowIndex) =>
    row.split('').flatMap((cell, columnIndex) => {
      if (cell !== '1') return []
      return [{
        id: `${rowIndex}-${columnIndex}`,
        x: 24 + columnIndex * (brickWidth + brickGap),
        y: 36 + rowIndex * (brickHeight + brickGap),
        width: brickWidth,
        height: brickHeight,
        row: rowIndex,
        active: true,
      }]
    }),
  )
}

export function createGameState(
  level: Pick<Level, 'id' | 'pattern'>,
  levelIndex: number,
  score = 0,
  lives = initialLives,
): GameState {
  return {
    levelId: level.id,
    levelIndex,
    ball: createBall(BOARD_WIDTH / 2),
    paddle: { x: BOARD_WIDTH / 2 },
    bricks: createBricks(level.pattern),
    score,
    lives,
    roundScore: score,
    roundLives: lives,
    status: 'ready',
  }
}

export function movePaddle(state: GameState, x: number): GameState {
  if (state.status === 'paused' || state.status === 'lost' || state.status === 'won' || state.status === 'level-complete') return state
  const halfWidth = PADDLE_WIDTH / 2
  const paddleX = Math.max(halfWidth, Math.min(BOARD_WIDTH - halfWidth, x))
  return {
    ...state,
    paddle: { x: paddleX },
    ball: state.status === 'ready' ? { ...state.ball, x: paddleX } : state.ball,
  }
}

export function movePaddleBy(state: GameState, direction: -1 | 1): GameState {
  return movePaddle(state, state.paddle.x + direction * paddleSpeed)
}

export function launchGame(state: GameState): GameState {
  if (state.status === 'ready') {
    return {
      ...state,
      status: 'running',
      ball: { ...state.ball, vx: 3.2, vy: -4.2 },
    }
  }
  if (state.status === 'paused') return { ...state, status: 'running' }
  return state
}

export function togglePause(state: GameState): GameState {
  if (state.status === 'running') return { ...state, status: 'paused' }
  if (state.status === 'paused') return { ...state, status: 'running' }
  return state
}

function overlapsBrick(ball: Ball, brick: Brick): boolean {
  const nearestX = Math.max(brick.x, Math.min(ball.x, brick.x + brick.width))
  const nearestY = Math.max(brick.y, Math.min(ball.y, brick.y + brick.height))
  const dx = ball.x - nearestX
  const dy = ball.y - nearestY
  return dx * dx + dy * dy <= ball.radius * ball.radius
}

export function advanceGame(state: GameState, totalLevels = 3): GameState {
  if (state.status !== 'running') return state

  let ball = { ...state.ball, x: state.ball.x + state.ball.vx, y: state.ball.y + state.ball.vy }
  if (ball.x - ball.radius <= 0) ball = { ...ball, x: ball.radius, vx: Math.abs(ball.vx) }
  if (ball.x + ball.radius >= BOARD_WIDTH) {
    ball = { ...ball, x: BOARD_WIDTH - ball.radius, vx: -Math.abs(ball.vx) }
  }
  if (ball.y - ball.radius <= 0) ball = { ...ball, y: ball.radius, vy: Math.abs(ball.vy) }

  if (ball.y - ball.radius > BOARD_HEIGHT) {
    const lives = Math.max(0, state.lives - 1)
    return {
      ...state,
      ball: createBall(state.paddle.x),
      lives,
      status: lives === 0 ? 'lost' : 'ready',
    }
  }

  const paddleLeft = state.paddle.x - PADDLE_WIDTH / 2
  const paddleRight = state.paddle.x + PADDLE_WIDTH / 2
  if (
    ball.vy > 0
    && ball.y + ball.radius >= PADDLE_Y
    && ball.y - ball.radius <= PADDLE_Y + PADDLE_HEIGHT
    && ball.x >= paddleLeft - ball.radius
    && ball.x <= paddleRight + ball.radius
  ) {
    const offset = (ball.x - state.paddle.x) / (PADDLE_WIDTH / 2)
    ball = {
      ...ball,
      y: PADDLE_Y - ball.radius,
      vx: offset * 4.5,
      vy: -Math.abs(ball.vy),
    }
  }

  const hitIndex = state.bricks.findIndex((brick) => brick.active && overlapsBrick(ball, brick))
  let bricks = state.bricks
  let score = state.score
  if (hitIndex >= 0) {
    const hitBrick = state.bricks[hitIndex]
    const hitFromSide = state.ball.x + state.ball.radius <= hitBrick.x
      || state.ball.x - state.ball.radius >= hitBrick.x + hitBrick.width
    ball = hitFromSide
      ? { ...ball, vx: -ball.vx }
      : { ...ball, vy: -ball.vy }
    bricks = state.bricks.map((brick, index) => index === hitIndex ? { ...brick, active: false } : brick)
    score += 10
  }

  const remainingBricks = bricks.some((brick) => brick.active)
  const status: GameStatus = !remainingBricks
    ? state.levelIndex >= totalLevels - 1 ? 'won' : 'level-complete'
    : 'running'

  return { ...state, ball, bricks, score, status }
}

export function restartRound(state: GameState, level: Pick<Level, 'id' | 'pattern'>): GameState {
  return createGameState(level, state.levelIndex, state.roundScore, state.roundLives)
}
