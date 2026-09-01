import { useState, type FormEvent } from 'react'
import { Plus, Wrench, X } from 'lucide-react'
import { useCV } from '../../context/cv-context'
import { EditorSection } from './EditorSection'

export function SkillsSection() {
  const { cv, addSkill, removeSkill } = useCV()
  const [skill, setSkill] = useState('')

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const value = skill.trim()
    const alreadyExists = cv.skills.some(
      (currentSkill) => currentSkill.toLocaleLowerCase() === value.toLocaleLowerCase(),
    )

    if (!value || alreadyExists) return

    addSkill(value)
    setSkill('')
  }

  return (
    <EditorSection
      title="Keahlian"
      description="Tambahkan keahlian teknis atau profesional satu per satu."
      icon={Wrench}
    >
      <form onSubmit={handleSubmit} className="flex items-end gap-2">
        <label htmlFor="new-skill" className="block flex-1 text-xs font-semibold text-ink">
          Keahlian
          <input
            id="new-skill"
            value={skill}
            onChange={(event) => setSkill(event.target.value)}
            placeholder="Contoh: TypeScript"
            className="mt-2 w-full rounded-lg border border-line bg-surface px-3 py-2.5 text-sm text-ink outline-none transition-colors duration-200 placeholder:text-muted/70 focus:border-ink focus:ring-2 focus:ring-ink/10"
          />
        </label>
        <button
          type="submit"
          className="inline-flex min-h-10 items-center gap-1.5 rounded-lg border border-line bg-surface px-4 py-2.5 text-sm font-semibold text-ink transition-colors duration-200 hover:border-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
        >
          <Plus className="size-4" strokeWidth={2} aria-hidden="true" />
          Tambah
        </button>
      </form>

      {cv.skills.length > 0 && (
        <ul className="mt-4 flex flex-wrap gap-2" aria-label="Daftar keahlian">
          {cv.skills.map((currentSkill, index) => (
            <li
              key={`${currentSkill}-${index}`}
              className="flex items-center gap-2 rounded-lg border border-line bg-surface px-3 py-2 text-sm text-ink"
            >
              <span>{currentSkill}</span>
              <button
                type="button"
                onClick={() => removeSkill(index)}
                className="inline-flex size-5 items-center justify-center rounded-sm text-muted hover:text-error focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
                aria-label={`Hapus keahlian ${currentSkill}`}
              >
                <X className="size-3.5" strokeWidth={2} aria-hidden="true" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </EditorSection>
  )
}
