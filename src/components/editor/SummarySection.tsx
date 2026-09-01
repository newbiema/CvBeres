import { AlignLeft } from 'lucide-react'
import { useCV } from '../../context/cv-context'
import { EditorSection } from './EditorSection'
import { TextAreaField } from './Fields'

export function SummarySection() {
  const { cv, updateSummary } = useCV()

  return (
    <EditorSection
      title="Ringkasan profesional"
      description="Tulis profil singkat, kekuatan utama, dan tujuan profesionalmu."
      icon={AlignLeft}
    >
      <TextAreaField
        id="professional-summary"
        label="Ringkasan"
        value={cv.summary}
        onChange={updateSummary}
        placeholder="Ceritakan pengalaman dan keahlian utama secara ringkas."
        rows={5}
      />
    </EditorSection>
  )
}
