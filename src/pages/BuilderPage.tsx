import { useEffect, useState } from "react";
import {
  Download,
  FileCheck2,
  FileText,
  Languages,
  LoaderCircle,
  Printer,
  Save,
  Trash2,
} from "lucide-react";
import { Link } from "react-router-dom";
import { CVTemplate } from "../components/cv/CVTemplate";
import { CVEditor } from "../components/editor/CVEditor";
import { CVProvider } from "../context/CVProvider";
import { useCV } from "../context/cv-context";
import { createCVFileName } from "../cv/presentation";
import type { CVLocale } from "../cv/types";
import { exportCVToDocx } from "../utils/export-docx";

function BuilderContent() {
  const { cv, setLanguage, clearCV } = useCV();
  const [isExportingWord, setIsExportingWord] = useState(false);
  const [exportError, setExportError] = useState("");

  useEffect(() => {
    document.title = "Buat CV — CV Beres";
  }, []);

  const handlePrint = () => {
    const previousTitle = document.title;
    document.title = createCVFileName(cv, "pdf").replace(/\.pdf$/, "");
    window.addEventListener(
      "afterprint",
      () => {
        document.title = previousTitle;
      },
      { once: true },
    );
    window.print();
    document.title = previousTitle;
  };

  const handleWordExport = async () => {
    setExportError("");
    setIsExportingWord(true);

    try {
      await exportCVToDocx(cv);
    } catch {
      setExportError("Dokumen Word belum berhasil dibuat. Silakan coba lagi.");
    } finally {
      setIsExportingWord(false);
    }
  };

  return (
    <div className="builder-shell min-h-[100dvh] bg-canvas text-ink">
      <header className="builder-header border-b border-line bg-surface">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-stretch justify-between gap-4 px-6 py-4 sm:flex-row sm:items-center">
          <div>
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-sm text-xs text-muted font-sans tracking-tight focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
            >
              <FileCheck2
                className="size-5"
                strokeWidth={1.8}
                aria-hidden="true"
              />
              cvberes.site
            </Link>
            <p className="mt-1 flex items-center gap-1.5 text-xs text-muted">
              <Save className="size-3" strokeWidth={1.8} aria-hidden="true" />
              Tersimpan otomatis di browser
            </p>
          </div>
          <div className="grid w-full min-w-0 grid-cols-2 gap-2 sm:flex sm:w-auto sm:flex-wrap sm:items-end sm:justify-end">
            <label className="col-span-2 min-w-0 text-xs font-semibold text-ink sm:w-auto">
              <span className="flex items-center gap-1.5">
                <Languages
                  className="size-3.5"
                  strokeWidth={1.8}
                  aria-hidden="true"
                />
                Bahasa CV
              </span>
              <select
                value={cv.locale}
                onChange={(event) =>
                  setLanguage(event.target.value as CVLocale)
                }
                className="mt-1 block w-full rounded-lg border border-line bg-surface px-3 py-2 text-sm font-medium text-ink outline-none transition-colors duration-200 focus:border-ink focus:ring-2 focus:ring-ink/10 sm:w-auto"
              >
                <option value="id">Indonesia</option>
                <option value="en">English</option>
              </select>
            </label>
            <button
              type="button"
              onClick={clearCV}
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-line bg-surface px-3 py-2 text-sm font-semibold text-ink transition-colors duration-200 hover:border-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink sm:w-auto"
            >
              <Trash2 className="size-4" strokeWidth={1.8} aria-hidden="true" />
              Hapus CV
            </button>
            <button
              type="button"
              onClick={handleWordExport}
              disabled={isExportingWord}
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-line bg-surface px-3 py-2 text-sm font-semibold text-ink transition-colors duration-200 hover:border-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink disabled:cursor-wait disabled:text-muted sm:w-auto"
            >
              {isExportingWord ? (
                <LoaderCircle
                  className="size-4 animate-spin motion-reduce:animate-none"
                  strokeWidth={1.8}
                  aria-hidden="true"
                />
              ) : (
                <FileText
                  className="size-4"
                  strokeWidth={1.8}
                  aria-hidden="true"
                />
              )}
              {isExportingWord ? "Menyiapkan Word…" : "Download Word"}
            </button>
            <button
              type="button"
              onClick={handlePrint}
              className="col-span-2 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-ink px-4 py-2 text-sm font-semibold text-white transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink motion-reduce:transform-none sm:w-auto"
            >
              <Download
                className="size-4"
                strokeWidth={1.8}
                aria-hidden="true"
              />
              Download PDF
            </button>
            {exportError && (
              <p
                className="col-span-2 w-full text-right text-xs text-error"
                role="status"
              >
                {exportError}
              </p>
            )}
          </div>
        </div>
      </header>

      <main className="builder-main mx-auto w-full max-w-7xl px-6 py-6 md:py-8">
        <div className="builder-workspace grid min-w-0 gap-6 md:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] md:items-start">
          <section
            className="editor-panel min-w-0 rounded-lg border border-line bg-surface p-5 sm:p-6"
            aria-labelledby="editor-title"
          >
            <div className="mb-8">
              <p className="text-xs font-semibold tracking-[0.14em] text-muted uppercase">
                Editor
              </p>
              <h1
                id="editor-title"
                className="mt-2 text-2xl font-bold tracking-tight text-ink"
              >
                Isi data CV
              </h1>
              <p className="mt-2 text-sm leading-6 text-muted">
                Isi yang relevan saja. Preview akan berubah secara langsung.
              </p>
              <p className="mt-1 text-xs leading-5 text-muted">
                Bahasa CV mengubah judul bagian dan tanggal. Isi teks tetap
                mengikuti yang kamu tulis.
              </p>
            </div>
            <CVEditor />
          </section>

          <section
            className="preview-panel min-w-0 rounded-lg border border-line bg-warm p-3 sm:p-6 md:sticky md:top-6"
            aria-labelledby="preview-title"
          >
            <div className="preview-title mb-4 flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold tracking-[0.14em] text-muted uppercase">
                  Preview
                </p>
                <h2
                  id="preview-title"
                  className="mt-1 text-base font-semibold text-ink"
                >
                  Dokumen A4
                </h2>
              </div>
              <p className="flex items-center gap-1.5 text-xs text-muted">
                <Printer
                  className="size-3.5"
                  strokeWidth={1.8}
                  aria-hidden="true"
                />
                Siap cetak
              </p>
            </div>
            <CVTemplate cv={cv} />
          </section>
        </div>
      </main>
    </div>
  );
}

function BuilderPage() {
  return (
    <CVProvider>
      <BuilderContent />
    </CVProvider>
  );
}

export default BuilderPage;
