import { GraduationCap, Plus, Trash2 } from 'lucide-react'
import { useCV } from '../../context/cv-context'
import { EditorSection } from './EditorSection'
import { InputField, TextAreaField } from './Fields'

export function EducationSection() {
  const { cv, addEducation, updateEducation, removeEducation } = useCV()

  return (
    <EditorSection
      title="Pendidikan"
      description="Tambahkan riwayat pendidikan yang paling relevan."
      icon={GraduationCap}
      action={
        <button
          type="button"
          onClick={addEducation}
          className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-line bg-surface px-3 py-2 text-xs font-semibold text-ink transition-colors duration-200 hover:border-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
        >
          <Plus className="size-3.5" strokeWidth={2} aria-hidden="true" />
          Tambah
        </button>
      }
    >
      {cv.education.length === 0 ? (
        <p className="rounded-lg border border-dashed border-line px-4 py-6 text-center text-sm text-muted">
          Belum ada pendidikan.
        </p>
      ) : (
        <div className="space-y-4">
          {cv.education.map((education, index) => (
            <div key={education.id} className="rounded-lg border border-line bg-surface p-4">
              <div className="mb-4 flex items-center justify-between gap-4">
                <h3 className="text-sm font-semibold text-ink">
                  Pendidikan {index + 1}
                </h3>
                <button
                  type="button"
                  onClick={() => removeEducation(education.id)}
                  className="inline-flex items-center gap-1 rounded-sm text-xs font-semibold text-error underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-error"
                  aria-label={`Hapus pendidikan ${index + 1}`}
                >
                  <Trash2 className="size-3.5" strokeWidth={1.8} aria-hidden="true" />
                  Hapus
                </button>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <InputField
                  id={`education-institution-${education.id}`}
                  label="Institusi"
                  value={education.institution}
                  onChange={(institution) =>
                    updateEducation(education.id, { institution })
                  }
                  placeholder="Nama sekolah atau universitas"
                />
                <InputField
                  id={`education-degree-${education.id}`}
                  label="Jenjang / gelar"
                  value={education.degree}
                  onChange={(degree) => updateEducation(education.id, { degree })}
                  placeholder="Contoh: S1"
                />
                <InputField
                  id={`education-field-${education.id}`}
                  label="Bidang studi"
                  value={education.fieldOfStudy}
                  onChange={(fieldOfStudy) =>
                    updateEducation(education.id, { fieldOfStudy })
                  }
                  placeholder="Contoh: Informatika"
                />
                <div className="hidden sm:block" aria-hidden="true" />
                <InputField
                  id={`education-start-${education.id}`}
                  label="Mulai"
                  type="month"
                  value={education.startDate}
                  onChange={(startDate) =>
                    updateEducation(education.id, { startDate })
                  }
                />
                <InputField
                  id={`education-end-${education.id}`}
                  label="Selesai"
                  type="month"
                  value={education.endDate}
                  onChange={(endDate) =>
                    updateEducation(education.id, { endDate })
                  }
                />
                <div className="sm:col-span-2">
                  <TextAreaField
                    id={`education-description-${education.id}`}
                    label="Deskripsi"
                    value={education.description}
                    onChange={(description) =>
                      updateEducation(education.id, { description })
                    }
                    placeholder="Prestasi, organisasi, atau informasi relevan lainnya."
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </EditorSection>
  )
}
