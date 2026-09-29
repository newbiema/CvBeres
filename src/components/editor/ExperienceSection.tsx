import { BriefcaseBusiness, Plus, Trash2 } from 'lucide-react'
import { useCV } from '../../context/cv-context'
import { EditorSection } from './EditorSection'
import { InputField, TextAreaField } from './Fields'

const addButtonClassName =
  'inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-line bg-surface px-3 py-2 text-xs font-semibold text-ink transition-colors duration-200 hover:border-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink'

export function ExperienceSection() {
  const {
    cv,
    addExperience,
    updateExperience,
    removeExperience,
  } = useCV()

  return (
    <EditorSection
      title="Pengalaman"
      description="Tambahkan pengalaman kerja, magang, organisasi, atau freelance."
      icon={BriefcaseBusiness}
      action={
        <button type="button" onClick={addExperience} className={addButtonClassName}>
          <Plus className="size-3.5" strokeWidth={2} aria-hidden="true" />
          Tambah
        </button>
      }
    >
      {cv.experiences.length === 0 ? (
        <p className="rounded-lg border border-dashed border-line px-4 py-6 text-center text-sm text-muted">
          Belum ada pengalaman.
        </p>
      ) : (
        <div className="space-y-4">
          {cv.experiences.map((experience, index) => (
            <div key={experience.id} className="rounded-lg border border-line bg-surface p-4">
              <div className="mb-4 flex items-center justify-between gap-4">
                <h3 className="text-sm font-semibold text-ink">
                  Pengalaman {index + 1}
                </h3>
                <button
                  type="button"
                  onClick={() => removeExperience(experience.id)}
                  className="inline-flex items-center gap-1 rounded-sm text-xs font-semibold text-error underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-error"
                  aria-label={`Hapus pengalaman ${index + 1}`}
                >
                  <Trash2 className="size-3.5" strokeWidth={1.8} aria-hidden="true" />
                  Hapus
                </button>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <InputField
                  id={`experience-position-${experience.id}`}
                  label="Posisi"
                  value={experience.position}
                  onChange={(position) =>
                    updateExperience(experience.id, { position })
                  }
                  placeholder="Contoh: Staf Administrasi"
                />
                <InputField
                  id={`experience-company-${experience.id}`}
                  label="Perusahaan / organisasi"
                  value={experience.company}
                  onChange={(company) =>
                    updateExperience(experience.id, { company })
                  }
                  placeholder="Nama perusahaan"
                />
                <InputField
                  id={`experience-location-${experience.id}`}
                  label="Lokasi"
                  value={experience.location}
                  onChange={(location) =>
                    updateExperience(experience.id, { location })
                  }
                  placeholder="Kota atau remote"
                />
                <div className="hidden sm:block" aria-hidden="true" />
                <InputField
                  id={`experience-start-${experience.id}`}
                  label="Mulai"
                  type="month"
                  value={experience.startDate}
                  onChange={(startDate) =>
                    updateExperience(experience.id, { startDate })
                  }
                />
                <InputField
                  id={`experience-end-${experience.id}`}
                  label="Selesai"
                  type="month"
                  value={experience.endDate}
                  onChange={(endDate) =>
                    updateExperience(experience.id, { endDate })
                  }
                  disabled={experience.current}
                />
                <label className="flex items-center gap-2 text-sm text-ink sm:col-span-2">
                  <input
                    type="checkbox"
                    checked={experience.current}
                    onChange={(event) =>
                      updateExperience(experience.id, {
                        current: event.target.checked,
                        ...(event.target.checked ? { endDate: '' } : {}),
                      })
                    }
                    className="size-4 rounded border-line accent-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
                  />
                  Saya masih bekerja di sini
                </label>
                <div className="sm:col-span-2">
                  <TextAreaField
                    id={`experience-description-${experience.id}`}
                    label="Deskripsi"
                    value={experience.description}
                    onChange={(description) =>
                      updateExperience(experience.id, { description })
                    }
                    placeholder="Jelaskan tanggung jawab dan pencapaian utama."
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
