# Архитектура приложения

## Назначение

Проект представляет браузерную игру «Брейкаут». Он разделён на приложение, модуль игровой логики и библиотеку общих компонентов. Приложение отвечает за страницы и навигацию, игровая логика — за состояние раунда и отскоки, библиотека — за повторно используемые элементы интерфейса.

## Состав проектов

### Приложение `apps/web`

Назначение: игровое приложение с домашней страницей, тремя уровнями и экраном раунда.

```text
apps/web/
  index.html
  package.json
  vite.config.ts
  tsconfig.json
  tsconfig.app.json
  tsconfig.node.json
  tsconfig.test.json
  jest.config.js
  eslint.config.js
  public/
    favicon.svg
  src/
    main.tsx
    App.tsx
    styles/
      app.css
    data/
      levels.ts
    components/
      AppShell.tsx
      GameBoardPreview.tsx
      GameBoard.tsx
    game/
      gameEngine.ts
      gameEngine.test.ts
    pages/
      HomePage.tsx
      GamePage.tsx
      GamePage.test.tsx
      LevelPage.tsx
      NotFoundPage.tsx
    App.test.tsx
    setupTests.ts
```

### Примеры экранов

```text
docs/
  screenshots/
    home.png
    game.png
```

### Библиотека `packages/ui-components`

Назначение: общие кнопки и показатели состояния, используемые игровым приложением.

```text
packages/ui-components/
  package.json
  vite.config.ts
  tsconfig.json
  tsconfig.build.json
  jest.config.js
  eslint.config.js
  src/
    index.ts
    styles.css
    setupTests.ts
    components/
      GameButton.tsx
      GameButton.test.tsx
      StatusStat.tsx
      StatusStat.test.tsx
```

## Библиотеки и средства разработки

В таблице указаны фактически установленные версии из корневого `package-lock.json`.

| Библиотека | Версия | Назначение |
| --- | --- | --- |
| React | 19.3.1 | Компонентный интерфейс приложения и UI-библиотеки |
| React DOM | 19.3.1 | Вывод React-приложения в браузер |
| React Router DOM | 7.18.5 | Маршруты и переходы между страницами |
| TypeScript | 5.9.3 | Типизация компонентов и конфигурации |
| Vite | 7.3.8 | Сервер разработки и сборка приложения и библиотеки |
| `@vitejs/plugin-react` | 5.2.0 | Подключение поддержки React в Vite |
| Jest | 30.5.2 | Запуск модульных тестов |
| ts-jest | 29.4.15 | Трансформация TypeScript в тестах Jest |
| `jest-environment-jsdom` | 30.5.2 | DOM-окружение для тестов |
| `@testing-library/react` | 16.3.3 | Проверка React-интерфейса по ролям и действиям |
| `@testing-library/jest-dom` | 7.0.1 | Дополнительные проверки DOM в тестах |
| `identity-obj-proxy` | 3.0.0 | Подмена CSS-импортов в Jest |
| ESLint | 9.39.5 | Проверка TypeScript и React-кода |
| `@eslint/js` | 9.39.5 | Базовые правила ESLint |
| `typescript-eslint` | 8.72.2 | Правила ESLint для TypeScript |
| `eslint-plugin-react-hooks` | 7.1.1 | Проверка правил React Hooks |
| `globals` | 17.14.0 | Описание глобальных имён браузера и Node.js для ESLint |
| `@types/jest` | 30.0.0 | Типы для Jest-тестов |
| `@types/node` | 26.6.6 | Типы Node.js для конфигурации сборки |
| `@types/react` | 19.3.0 | Типы React-компонентов |
| `@types/react-dom` | 19.3.0 | Типы React DOM |

## Компоненты и страницы

Компоненты приложения:

- `AppShell` — общая шапка, навигация, область страницы и подвал.
- `GameBoardPreview` — схематичное отображение уровня на главной странице и странице уровня.
- `GameBoard` — игровое поле с блоками, мячом и платформой; мышь перемещает платформу.
- `gameEngine` — состояние раунда, движение мяча, отскоки, попытки, очки и завершение уровней.

Страницы приложения:

- `HomePage` — краткий обзор и ссылки на игру и уровни.
- `GamePage` — экран игры со статичным полем и показателями раунда.
- `LevelPage` — описание уровня, выбранного по параметру маршрута.
- `NotFoundPage` — сообщение для неизвестного маршрута и ссылка на главную.

Компоненты библиотеки `@breakout/ui-components`:

- `GameButton` — типизированная кнопка с вариантами оформления и нативными атрибутами доступности.
- `StatusStat` — подпись и значение счёта, уровня или числа попыток.

## Маршрутизация

Маршруты вложены в `AppShell`. Параметр `:levelId` используется страницей `LevelPage`.

| Маршрут | Страница | Назначение |
| --- | --- | --- |
| `/` | `HomePage` | Обзор и навигация |
| `/game` | `GamePage` | Игровой раунд; необязательный параметр `?levelId=2` задаёт уровень |
| `/levels/:levelId` | `LevelPage` | Информация об одном уровне |
| `*` | `NotFoundPage` | Обработка неизвестного адреса |

Защищённые маршруты не предусмотрены: в одиночной игре нет учётных записей и приватных данных.

## Использование библиотеки

`apps/web` объявляет локальную зависимость `@breakout/ui-components` на `packages/ui-components`. `HomePage` и `GamePage` импортируют `GameButton`, `GamePage` импортирует `StatusStat`, а CSS библиотеки подключается в `main.tsx`. При сборке приложения сначала формируется пакет `dist` библиотеки, затем Vite собирает приложение.

## Игровой раунд

Поле использует SVG с фиксированными внутренними размерами `800 × 480` и масштабируется под ширину страницы. `gameEngine` остаётся независимым от React и обновляет игровое состояние при каждом кадре. Старт, пауза, потеря мяча, перезапуск и переход на следующий уровень управляются страницей `GamePage`. Управление доступно мышью, стрелками и клавишами `A`/`D`; пробел запускает мяч или переключает паузу, `R` перезапускает уровень.
