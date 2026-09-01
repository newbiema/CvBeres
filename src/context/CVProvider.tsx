import { useEffect, useReducer, type ReactNode } from 'react'
import {
  CV_STORAGE_KEY,
  createEmptyCV,
  createEmptyEducation,
  createEmptyExperience,
  createEmptyProject,
  cvReducer,
  hydrateCV,
} from '../cv/cv-state'
import { CVContext, type CVContextValue } from './cv-context'

interface CVProviderProps {
  children: ReactNode
}

const loadCV = () => {
  try {
    const savedCV = localStorage.getItem(CV_STORAGE_KEY)
    return savedCV ? hydrateCV(JSON.parse(savedCV)) : createEmptyCV()
  } catch {
    return createEmptyCV()
  }
}

export function CVProvider({ children }: CVProviderProps) {
  const [cv, dispatch] = useReducer(cvReducer, undefined, loadCV)

  useEffect(() => {
    try {
      localStorage.setItem(CV_STORAGE_KEY, JSON.stringify(cv))
    } catch {
      // The editor still works if browser storage is unavailable.
    }
  }, [cv])

  const value: CVContextValue = {
    cv,
    setLanguage: (locale) => dispatch({ type: 'language/update', locale }),
    updatePersonal: (changes) => dispatch({ type: 'personal/update', changes }),
    updateSummary: (value) => dispatch({ type: 'summary/update', value }),
    addExperience: () =>
      dispatch({ type: 'experience/add', entry: createEmptyExperience() }),
    updateExperience: (id, changes) =>
      dispatch({ type: 'experience/update', id, changes }),
    removeExperience: (id) => dispatch({ type: 'experience/remove', id }),
    addEducation: () =>
      dispatch({ type: 'education/add', entry: createEmptyEducation() }),
    updateEducation: (id, changes) =>
      dispatch({ type: 'education/update', id, changes }),
    removeEducation: (id) => dispatch({ type: 'education/remove', id }),
    addSkill: (value) => dispatch({ type: 'skill/add', value }),
    removeSkill: (index) => dispatch({ type: 'skill/remove', index }),
    addProject: () => dispatch({ type: 'project/add', entry: createEmptyProject() }),
    updateProject: (id, changes) =>
      dispatch({ type: 'project/update', id, changes }),
    removeProject: (id) => dispatch({ type: 'project/remove', id }),
    clearCV: () => {
      const confirmed = window.confirm(
        'Yakin ingin menghapus seluruh isi CV? Tindakan ini tidak dapat dibatalkan.',
      )

      if (confirmed) dispatch({ type: 'cv/clear' })
    },
  }

  return <CVContext.Provider value={value}>{children}</CVContext.Provider>
}
