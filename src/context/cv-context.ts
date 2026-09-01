import { createContext, useContext } from 'react'
import type {
  CVData,
  CVLocale,
  Education,
  Experience,
  PersonalInfo,
  Project,
} from '../cv/types'

export interface CVContextValue {
  cv: CVData
  setLanguage: (locale: CVLocale) => void
  updatePersonal: (changes: Partial<PersonalInfo>) => void
  updateSummary: (value: string) => void
  addExperience: () => void
  updateExperience: (id: string, changes: Partial<Experience>) => void
  removeExperience: (id: string) => void
  addEducation: () => void
  updateEducation: (id: string, changes: Partial<Education>) => void
  removeEducation: (id: string) => void
  addSkill: (value: string) => void
  removeSkill: (index: number) => void
  addProject: () => void
  updateProject: (id: string, changes: Partial<Project>) => void
  removeProject: (id: string) => void
  clearCV: () => void
}

export const CVContext = createContext<CVContextValue | null>(null)

export const useCV = () => {
  const context = useContext(CVContext)

  if (!context) {
    throw new Error('useCV must be used within CVProvider')
  }

  return context
}
