import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div className="content-page">
      <h1>Страница не найдена</h1>
      <p>Указанный адрес не относится к страницам проекта.</p>
      <Link to="/">На главную</Link>
    </div>
  )
}
