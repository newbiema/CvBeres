import type { CVData, Education, Experience, Project } from './types'

const hasExperienceContent = (entry: Experience) =>
  Boolean(
    entry.company ||
      entry.position ||
      entry.location ||
      entry.startDate ||
      entry.endDate ||
      entry.description,
  )

const hasEducationContent = (entry: Education) =>
  Boolean(
    entry.institution ||
      entry.degree ||
      entry.fieldOfStudy ||
      entry.startDate ||
      entry.endDate ||
      entry.description,
  )

const hasProjectContent = (entry: Project) =>
  Boolean(entry.name || entry.description || entry.technologies || entry.url)

export const getRenderableCV = (cv: CVData) => ({
  experiences: cv.experiences.filter(hasExperienceContent),
  education: cv.education.filter(hasEducationContent),
  skills: cv.skills.filter(Boolean),
  projects: cv.projects.filter(hasProjectContent),
})

export const splitDescription = (value: string) =>
  value
    .split(/\r?\n/)
    .map((line) => line.replace(/^[-•]\s*/, '').trim())
    .filter(Boolean)

export const createCVFileName = (cv: CVData, extension: 'docx' | 'pdf') => {
  const safeName = cv.personal.fullName
    .trim()
    .replace(/[^a-zA-Z0-9\s_-]/g, '')
    .replace(/\s+/g, '_')

  return `CV_${safeName || 'Beres'}_${cv.locale.toUpperCase()}.${extension}`
}
