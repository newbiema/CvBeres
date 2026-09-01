import { EducationSection } from './EducationSection'
import { ExperienceSection } from './ExperienceSection'
import { PersonalSection } from './PersonalSection'
import { ProjectsSection } from './ProjectsSection'
import { SkillsSection } from './SkillsSection'
import { SummarySection } from './SummarySection'

export function CVEditor() {
  return (
    <div>
      <PersonalSection />
      <SummarySection />
      <ExperienceSection />
      <EducationSection />
      <SkillsSection />
      <ProjectsSection />
    </div>
  )
}
