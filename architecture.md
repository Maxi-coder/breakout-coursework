# Архитектура приложения

## Назначение

Проект представляет браузерный каркас игры «Брейкаут». Он разделён на приложение и библиотеку общих компонентов. Приложение отвечает за страницы, навигацию и игровое состояние будущей игры. Библиотека содержит повторно используемые элементы интерфейса. Игровой цикл, физика и сохранение рекордов в каркас пока не входят.

## Состав проектов

### Приложение `apps/web`

Назначение: демонстрация экранов будущей игры и навигации между ними.

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
    screenshots/
      home.png
      game.png
  src/
    main.tsx
    App.tsx
    vite-env.d.ts
    styles/
      app.css
    data/
      levels.ts
    components/
      AppShell.tsx
      GameBoardPreview.tsx
    pages/
      HomePage.tsx
      GamePage.tsx
      LevelPage.tsx
      NotFoundPage.tsx
    App.test.tsx
    setupTests.ts
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

## Библиотеки

Версии указаны в `package.json` соответствующих проектов. `npm install` фиксирует фактически установленные версии в корневом `package-lock.json`.

| Библиотека | Версия | Назначение |
| --- | --- | --- |
| React | 19.3.1 | Компонентный интерфейс приложения и UI-библиотеки |
| React DOM | 19.3.1 | Вывод React-приложения в браузер |
| React Router DOM | 7.18.5 | Маршруты и переходы между страницами |
| TypeScript | 5.9.3 | Типизация компонентов и конфигурации |
| Vite | 7.3.8 | Сервер разработки и сборка приложения и библиотеки |
| Jest | 30.5.2 | Запуск модульных тестов |
| ts-jest | 29.4.15 | Трансформация TypeScript в тестах Jest |
| React Testing Library | 16.3.3 | Проверка интерфейса через пользовательские роли и действия |
| ESLint | 9.39.5 | Проверка TypeScript и React-кода |

## Компоненты и страницы

Компоненты приложения:

- `AppShell` — общая шапка, навигация, область страницы и подвал.
- `GameBoardPreview` — статическое представление игрового поля, мяча, платформы и блоков до подключения физики.

Страницы приложения:

- `HomePage` — краткий обзор и ссылки на игру и уровни.
- `GamePage` — игровой экран с демонстрационным полем и показателями состояния.
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
| `/game` | `GamePage` | Демонстрационный экран игры |
| `/levels/:levelId` | `LevelPage` | Информация об одном уровне |
| `*` | `NotFoundPage` | Обработка неизвестного адреса |

Защищённые маршруты не предусмотрены: в одиночной игре нет учётных записей и приватных данных.

## Использование библиотеки

`apps/web` объявляет локальную зависимость `@breakout/ui-components` на `packages/ui-components`. `GamePage` и `HomePage` импортируют `GameButton` и `StatusStat`, а таблица CSS библиотеки подключается в `App.tsx`. При сборке приложения сначала формируется пакет `dist` библиотеки, затем Vite собирает приложение.
