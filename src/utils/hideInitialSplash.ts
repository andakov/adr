const SPLASH_ID = 'app-splash'
const MIN_VISIBLE_MS = 950
const EXIT_FALLBACK_MS = 1400

/**
 * Hides the static HTML splash (see index.html) after fonts settle and a short minimum display time.
 */
export async function hideInitialSplash(): Promise<void> {
  const el = document.getElementById(SPLASH_ID)
  if (!el) return

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const started = performance.now()
  try {
    await document.fonts.ready
  } catch {
    /* ignore */
  }

  if (!reduced) {
    const remaining = MIN_VISIBLE_MS - (performance.now() - started)
    if (remaining > 0) {
      await new Promise<void>((r) => setTimeout(r, remaining))
    }
  }

  el.classList.add('splash--out')

  await new Promise<void>((resolve) => {
    let done = false
    const finish = () => {
      if (done) return
      done = true
      el.removeEventListener('transitionend', onEnd)
      el.remove()
      resolve()
    }

    const onEnd = (e: TransitionEvent) => {
      if (e.target !== el) return
      finish()
    }

    el.addEventListener('transitionend', onEnd)
    setTimeout(finish, reduced ? 280 : EXIT_FALLBACK_MS)
  })
}
