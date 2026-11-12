export type Level = {
  id: number
  name: string
  description: string
  difficulty: string
  brickRows: number
}

export const levels: Level[] = [
  {
    id: 1,
    name: 'Первый контакт',
    description: 'Прямые ряды блоков помогают освоить управление платформой.',
    difficulty: 'Начальный',
    brickRows: 3,
  },
  {
    id: 2,
    name: 'Сдвиг',
    description: 'Смещённые ряды требуют точнее выбирать направление удара.',
    difficulty: 'Средний',
    brickRows: 4,
  },
  {
    id: 3,
    name: 'Финальный ряд',
    description: 'Плотная раскладка блоков завершает короткую серию уровней.',
    difficulty: 'Продвинутый',
    brickRows: 5,
  },
]

export function getLevel(id: string | undefined): Level | undefined {
  const numericId = Number(id)
  return levels.find((level) => level.id === numericId)
}
