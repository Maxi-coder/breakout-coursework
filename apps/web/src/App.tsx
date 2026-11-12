import { Route, Routes } from 'react-router-dom'
import AppShell from './components/AppShell'
import GamePage from './pages/GamePage'
import HomePage from './pages/HomePage'
import LevelPage from './pages/LevelPage'
import NotFoundPage from './pages/NotFoundPage'

export default function App() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route index element={<HomePage />} />
        <Route path="game" element={<GamePage />} />
        <Route path="levels/:levelId" element={<LevelPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}
