import { useEffect } from 'react'
import { ArrowRight, FileCheck2 } from 'lucide-react'
import { Link } from 'react-router-dom'

function HomePage() {
  useEffect(() => {
    document.title = 'Bikin CV Gratis Online — CV Beres'
  }, [])

  return (
    <div className="flex min-h-[100dvh] flex-col bg-canvas text-ink">
      <header className="mx-auto flex w-full max-w-7xl items-center px-6 py-6">
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-sm text-lg font-semibold tracking-tight focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
        >
          <FileCheck2 className="size-5" strokeWidth={1.8} aria-hidden="true" />
          CV Beres
        </Link>
      </header>

      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col items-center justify-center px-6 py-16 text-center">
        <p className="mb-5 text-sm font-semibold tracking-[0.16em] text-muted uppercase">
          CV profesional, tanpa ribet
        </p>
        <h1 className="max-w-2xl text-[clamp(2.5rem,5vw,4rem)] leading-[1.05] font-bold tracking-[-0.04em]">
          Bikin CV. Beres.
        </h1>
        <p className="mt-6 max-w-xl text-base leading-7 text-muted sm:text-lg">
          Buat CV profesional dan ramah ATS secara gratis. Tanpa login,
          langsung isi dan download PDF.
        </p>
        <Link
          to="/builder"
          className="mt-8 inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-ink px-5 py-3 text-sm font-semibold text-white transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink motion-reduce:transform-none"
        >
          Bikin CV
          <ArrowRight className="size-4" strokeWidth={2} aria-hidden="true" />
        </Link>
        <p className="mt-6 text-sm text-muted">
          Gratis <span aria-hidden="true">·</span> Tanpa login{' '}
          <span aria-hidden="true">·</span> Siap PDF
        </p>
      </main>
    </div>
  )
}

export default HomePage
