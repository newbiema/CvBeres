import { useEffect, useState } from 'react'
import {
  ArrowRight,
  Coffee,
  FileCheck2,
  Copy,
  Share2,
  Check,
} from 'lucide-react'
import { Link } from 'react-router-dom'

function HomePage() {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    document.title = 'Bikin CV Gratis Online — CV Beres'
  }, [])

  return (
    <div className="flex min-h-[100dvh] flex-col bg-canvas text-ink">
      <header className="mx-auto flex w-full max-w-7xl items-center px-6 py-6">
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-sm text-xs text-muted font-sans tracking-tight focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
        >
          <FileCheck2 className="size-5" strokeWidth={1.8} aria-hidden="true" />
          cvberes.site
        </Link>
      </header>

      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col items-center justify-center px-6 py-16 text-center">
        <p className="mb-5 text-sm font-semibold tracking-[0.16em] text-muted uppercase">
          CV profesional, tanpa ribet
        </p>
        <h1 className="max-w-2xl text-6xl font-bold font-sans tracking-[-0.04em]">
          cvberes.site
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

        <div className="mt-3 flex items-center justify-center gap-2">
          <button
            type="button"
            onClick={async () => {
              try {
                await navigator.clipboard.writeText(window.location.href)
                setCopied(true)

                setTimeout(() => {
                  setCopied(false)
                }, 2000)
              } catch (error) {
                console.error('Gagal menyalin link:', error)
              }
            }}
            className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium text-ink transition-all hover:bg-ink/5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
          >
            {copied ? (
              <>
                <Check className="size-4" strokeWidth={2} aria-hidden="true" />
                Tersalin!
              </>
            ) : (
              <>
                <Copy className="size-4" strokeWidth={1.8} aria-hidden="true" />
                Salin Link
              </>
            )}
          </button>

          <button
            type="button"
            onClick={async () => {
              if (navigator.share) {
                try {
                  await navigator.share({
                    title: 'CV Beres',
                    text: 'Bikin CV profesional dan ramah ATS secara gratis di CV Beres.',
                    url: window.location.href,
                  })
                } catch (error) {
                  // PERBAIKAN DI SINI: Memastikan error adalah instance dari Error
                  if (error instanceof Error) {
                    if (error.name !== 'AbortError') {
                      console.error('Gagal membagikan link:', error)
                    }
                  } else {
                    console.error('Gagal membagikan link:', error)
                  }
                }
              } else {
                try {
                  await navigator.clipboard.writeText(window.location.href)
                  setCopied(true)

                  setTimeout(() => {
                    setCopied(false)
                  }, 2000)
                } catch (error) {
                  console.error('Gagal menyalin link:', error)
                }
              }
            }}
            className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium text-ink transition-all hover:bg-ink/5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
          >
            <Share2 className="size-4" strokeWidth={1.8} aria-hidden="true" />
            Bagikan
          </button>
        </div>

        <p className="mt-6 text-sm text-muted">
          Gratis <span aria-hidden="true">·</span> Tanpa login{' '}
          <span aria-hidden="true">·</span> Siap PDF
        </p>
      </main>

      <footer className="px-6 py-6 text-center text-sm text-muted">
        <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
          <span>Created by</span>

          <a
            href="https://github.com/newbiema"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
          >
            @evan
          </a>

          <span aria-hidden="true">·</span>

          <a
            href="https://sociabuzz.com/evaan19"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-semibold underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
          >
            <Coffee className="size-4" strokeWidth={1.8} aria-hidden="true" />
            Traktir kopi
          </a>
        </div>
      </footer>
    </div>
  )
}

export default HomePage