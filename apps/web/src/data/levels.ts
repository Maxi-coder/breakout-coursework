export type Level = {
  id: number
  name: string
  description: string
  difficulty: string
  pattern: string[]
}

export const levels: Level[] = [
  {
    id: 1,
    name: 'Уровень 1',
    description: 'Три ряда блоков и свободная зона в центре для первого раунда.',
    difficulty: 'Начальный',
    pattern: ['1111111111', '1111111111', '0111111110'],
  },
  {
    id: 2,
    name: 'Уровень 2',
    description: 'Четыре ряда блоков с разрывами в верхней части схемы.',
    difficulty: 'Средний',
    pattern: ['1100110011', '1111111111', '0011111100', '1111111111'],
  },
  {
    id: 3,
    name: 'Уровень 3',
    description: 'Схема сужается к центру и оставляет свободные углы поля.',
    difficulty: 'Продвинутый',
    pattern: ['0001111000', '0011111100', '0111111110', '1111111111'],
  },
]

export function getLevel(id: string | undefined): Level | undefined {
  const numericId = Number(id)

  return levels.find((level) => level.id === numericId)
}
