import { FolderKanban, Plus, Trash2 } from 'lucide-react'
import { useCV } from '../../context/cv-context'
import { EditorSection } from './EditorSection'
import { InputField, TextAreaField } from './Fields'

export function ProjectsSection() {
  const { cv, addProject, updateProject, removeProject } = useCV()

  return (
    <EditorSection
      title="Proyek"
      description="Tampilkan proyek yang mendukung pengalaman dan keahlianmu."
      icon={FolderKanban}
      action={
        <button
          type="button"
          onClick={addProject}
          className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-line bg-surface px-3 py-2 text-xs font-semibold text-ink transition-colors duration-200 hover:border-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
        >
          <Plus className="size-3.5" strokeWidth={2} aria-hidden="true" />
          Tambah
        </button>
      }
    >
      {cv.projects.length === 0 ? (
        <p className="rounded-lg border border-dashed border-line px-4 py-6 text-center text-sm text-muted">
          Belum ada proyek.
        </p>
      ) : (
        <div className="space-y-4">
          {cv.projects.map((project, index) => (
            <div key={project.id} className="rounded-lg border border-line bg-surface p-4">
              <div className="mb-4 flex items-center justify-between gap-4">
                <h3 className="text-sm font-semibold text-ink">Proyek {index + 1}</h3>
                <button
                  type="button"
                  onClick={() => removeProject(project.id)}
                  className="inline-flex items-center gap-1 rounded-sm text-xs font-semibold text-error underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-error"
                  aria-label={`Hapus proyek ${index + 1}`}
                >
                  <Trash2 className="size-3.5" strokeWidth={1.8} aria-hidden="true" />
                  Hapus
                </button>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <InputField
                  id={`project-name-${project.id}`}
                  label="Nama proyek"
                  value={project.name}
                  onChange={(name) => updateProject(project.id, { name })}
                  placeholder="Nama proyek"
                />
                <InputField
                  id={`project-url-${project.id}`}
                  label="URL"
                  value={project.url}
                  onChange={(url) => updateProject(project.id, { url })}
                  placeholder="project.com"
                />
                <div className="sm:col-span-2">
                  <InputField
                    id={`project-technologies-${project.id}`}
                    label="Teknologi"
                    value={project.technologies}
                    onChange={(technologies) =>
                      updateProject(project.id, { technologies })
                    }
                    placeholder="Contoh: React, TypeScript, Tailwind CSS"
                  />
                </div>
                <div className="sm:col-span-2">
                  <TextAreaField
                    id={`project-description-${project.id}`}
                    label="Deskripsi"
                    value={project.description}
                    onChange={(description) =>
                      updateProject(project.id, { description })
                    }
                    placeholder="Jelaskan tujuan, kontribusi, dan hasil proyek."
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
