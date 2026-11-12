import { NavLink, Outlet } from 'react-router-dom'

export default function AppShell() {
  return (
    <div className="site-shell">
      <header className="site-header">
        <div className="site-header__inner">
          <NavLink className="brand" to="/">Брейкаут</NavLink>
          <nav className="main-nav" aria-label="Основная навигация">
            <NavLink end to="/">Главная</NavLink>
            <NavLink to="/game">Игра</NavLink>
            <NavLink to="/levels/1">Уровни</NavLink>
          </nav>
        </div>
      </header>
      <main className="page-content"><Outlet /></main>
      <footer className="site-footer">Курсовой проект по JavaScript</footer>
    </div>
  )
}
