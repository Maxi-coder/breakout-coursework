type GameBoardPreviewProps = {
  compact?: boolean
  rows?: number
}

const columns = 7

export default function GameBoardPreview({ compact = false, rows = 4 }: GameBoardPreviewProps) {
  const bricks = Array.from({ length: rows * columns }, (_, index) => index)

  return (
    <div
      className={`game-board${compact ? ' game-board--compact' : ''}`}
      aria-label="Макет игрового поля Брейкаут"
      role="img"
    >
      <div className="board-topline"><span>СЧЁТ 0000</span><span>ПОПЫТКИ ● ● ●</span></div>
      <div className="brick-grid" aria-hidden="true">
        {bricks.map((brick) => <span className={`brick brick--${brick % 4}`} key={brick} />)}
      </div>
      <span className="game-ball" aria-hidden="true" />
      <span className="game-paddle" aria-hidden="true" />
      <div className="board-caption"><span>01</span><span>ПОЛЕ ДЛЯ ИГРЫ</span><span>●</span></div>
    </div>
  )
}
