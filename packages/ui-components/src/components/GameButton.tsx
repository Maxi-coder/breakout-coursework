import type { ButtonHTMLAttributes, MouseEventHandler, ReactNode } from 'react'

export type GameButtonVariant = 'primary' | 'secondary'

export type GameButtonProps = {
  children: ReactNode
  variant?: GameButtonVariant
  className?: string
  disabled?: boolean
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type']
  onClick?: MouseEventHandler<HTMLButtonElement>
  href?: string
}

export function GameButton({
  children,
  variant = 'primary',
  className = '',
  disabled = false,
  type = 'button',
  onClick,
  href,
}: GameButtonProps) {
  const classNames = ['game-button', `game-button--${variant}`, className]
    .filter(Boolean)
    .join(' ')

  if (href) {
    return <a className={classNames} href={href}>{children}</a>
  }

  return (
    <button className={classNames} disabled={disabled} onClick={onClick} type={type}>
      {children}
    </button>
  )
}
