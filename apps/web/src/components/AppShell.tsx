import { NavLink, Outlet } from 'react-router-dom'

export default function AppShell() {
  return (
    <div className="site-shell">
      <header className="site-header">
        <NavLink className="brand" to="/" aria-label="Брейкаут — на главную">
          <span className="brand-mark" aria-hidden="true">Б</span>
          <span className="brand-name">Брейкаут</span>
        </NavLink>
        <nav className="main-nav" aria-label="Основная навигация">
          <NavLink end to="/">Обзор</NavLink>
          <NavLink to="/game">Игра</NavLink>
          <NavLink to="/levels/1">Уровни</NavLink>
        </nav>
        <span className="header-note"><span /> Учебный прототип</span>
      </header>
      <main className="page-content"><Outlet /></main>
      <footer className="site-footer">
        <span>Курсовой проект · JavaScript</span>
        <span>Версия интерфейса 0.1</span>
      </footer>
    </div>
  )
}
