type GameBoardPreviewProps = {
  pattern: string[]
  label: string
}

export default function GameBoardPreview({ pattern, label }: GameBoardPreviewProps) {
  return (
    <div className="board-preview" role="img" aria-label={label}>
      <div className="board-preview__bricks" aria-hidden="true">
        {pattern.map((row, rowIndex) => (
          <div className="board-preview__row" key={rowIndex}>
            {row.split('').map((brick, brickIndex) => (
              <span
                className={`board-preview__brick${brick === '1' ? ' board-preview__brick--visible' : ''}`}
                key={brickIndex}
              />
            ))}
          </div>
        ))}
      </div>
      <div className="board-preview__play-area" aria-hidden="true">
        <span className="board-preview__ball" />
        <span className="board-preview__paddle" />
      </div>
    </div>
  )
}
