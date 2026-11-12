import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div className="content-page not-found-page">
      <p className="eyebrow">ОШИБКА 404</p>
      <h1>Похоже, мяч улетел за экран</h1>
      <p>Такого адреса в прототипе нет. Вернитесь на главную и продолжите путь.</p>
      <Link className="text-link" to="/">На главную <span aria-hidden="true">→</span></Link>
    </div>
  )
}
