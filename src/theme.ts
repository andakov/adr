export type Theme = 'light' | 'dark'

const STORAGE_KEY = 'adr.theme'

function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme
}

function getSystemTheme(): Theme {
  return window.matchMedia?.('(prefers-color-scheme: dark)')?.matches ? 'dark' : 'light'
}

export function getInitialTheme(): Theme {
  const saved = localStorage.getItem(STORAGE_KEY)
  if (saved === 'light' || saved === 'dark') return saved
  return getSystemTheme()
}

function prefersReducedMotion(): boolean {
  return window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches ?? false
}

function getMaxRadiusFromPoint(x: number, y: number): number {
  const w = window.innerWidth
  const h = window.innerHeight
  const dx = Math.max(x, w - x)
  const dy = Math.max(y, h - y)
  return Math.hypot(dx, dy)
}

export function setTheme(theme: Theme, opts?: { x?: number; y?: number }) {
  localStorage.setItem(STORAGE_KEY, theme)

  const x = opts?.x
  const y = opts?.y
  const canTransition =
    typeof (document as any).startViewTransition === 'function' &&
    !prefersReducedMotion() &&
    typeof x === 'number' &&
    typeof y === 'number'

  if (!canTransition) {
    applyTheme(theme)
    return
  }

  const root = document.documentElement
  root.style.setProperty('--vt-x', `${x}px`)
  root.style.setProperty('--vt-y', `${y}px`)
  root.style.setProperty('--vt-r', `${getMaxRadiusFromPoint(x, y)}px`)
  root.classList.add('theme-vt')

  const vt = (document as any).startViewTransition(() => {
    applyTheme(theme)
  })

  vt?.finished?.finally(() => {
    root.classList.remove('theme-vt')
  })
}

export function toggleTheme() {
  const current = (document.documentElement.dataset.theme as Theme | undefined) ?? getInitialTheme()
  setTheme(current === 'dark' ? 'light' : 'dark')
}

export function initTheme() {
  applyTheme(getInitialTheme())
}

