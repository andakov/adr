/** Public-folder asset path with Vite `base` (e.g. GitHub Pages `/adr/`). */
export function assetUrl(path: string): string {
  const normalized = path.startsWith('/') ? path.slice(1) : path
  return `${import.meta.env.BASE_URL}${normalized}`
}
