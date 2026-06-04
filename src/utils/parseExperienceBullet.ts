export type BulletSegment =
  | { type: 'text'; text: string }
  | { type: 'link'; text: string; href: string }

const BACKTICK_CHUNK = /`([^`]+)`/g

/** Host/path after optional scheme — letters, digits, hyphen, dot, slash, percent */
function looksLikeWebAddress(inner: string): boolean {
  const s = inner.trim()
  if (!s) return false
  if (/^https?:\/\//i.test(s)) return true
  return /^[a-z0-9]([a-z0-9.-]*\.)+[a-z]{2,}(\/[\w./%-]*)?$/i.test(s)
}

function toHref(inner: string): string | null {
  const s = inner.trim()
  if (!s) return null
  if (/^https?:\/\//i.test(s)) return s
  if (looksLikeWebAddress(s)) return `https://${s}`
  return null
}

/** Turns `example.kz/path` in copy into link segments; unknown backtick content stays plain text. */
export function parseExperienceBullet(input: string): BulletSegment[] {
  const segments: BulletSegment[] = []
  let last = 0
  const re = new RegExp(BACKTICK_CHUNK.source, 'g')
  let m: RegExpExecArray | null
  while ((m = re.exec(input)) !== null) {
    if (m.index > last) segments.push({ type: 'text', text: input.slice(last, m.index) })
    const inner = m[1]
    const href = toHref(inner)
    if (href) segments.push({ type: 'link', text: inner, href })
    else segments.push({ type: 'text', text: m[0] })
    last = m.index + m[0].length
  }
  if (last < input.length) segments.push({ type: 'text', text: input.slice(last) })
  return segments.length ? segments : [{ type: 'text', text: input }]
}
