import type {
  CVData,
  CVLocale,
  Education,
  Experience,
  PersonalInfo,
  Project,
} from './types'

export const CV_STORAGE_KEY = 'cv-beres-data'

const createId = () => crypto.randomUUID()

export const createEmptyExperience = (): Experience => ({
  id: createId(),
  company: '',
  position: '',
  location: '',
  startDate: '',
  endDate: '',
  current: false,
  description: '',
})

export const createEmptyEducation = (): Education => ({
  id: createId(),
  institution: '',
  degree: '',
  fieldOfStudy: '',
  startDate: '',
  endDate: '',
  description: '',
})

export const createEmptyProject = (): Project => ({
  id: createId(),
  name: '',
  description: '',
  technologies: '',
  url: '',
})

export const createEmptyCV = (): CVData => ({
  locale: 'id',
  personal: {
    fullName: '',
    professionalTitle: '',
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    github: '',
    website: '',
  },
  summary: '',
  experiences: [],
  education: [],
  skills: [],
  projects: [],
})

const asRecord = (value: unknown): Record<string, unknown> | null =>
  typeof value === 'object' && value !== null
    ? (value as Record<string, unknown>)
    : null

const asString = (value: unknown) => (typeof value === 'string' ? value : '')

const asId = (value: unknown) => {
  const id = asString(value)
  return id || createId()
}

const hydrateExperience = (value: unknown): Experience | null => {
  const entry = asRecord(value)
  if (!entry) return null

  return {
    id: asId(entry.id),
    company: asString(entry.company),
    position: asString(entry.position),
    location: asString(entry.location),
    startDate: asString(entry.startDate),
    endDate: asString(entry.endDate),
    current: typeof entry.current === 'boolean' ? entry.current : false,
    description: asString(entry.description),
  }
}

const hydrateEducation = (value: unknown): Education | null => {
  const entry = asRecord(value)
  if (!entry) return null

  return {
    id: asId(entry.id),
    institution: asString(entry.institution),
    degree: asString(entry.degree),
    fieldOfStudy: asString(entry.fieldOfStudy),
    startDate: asString(entry.startDate),
    endDate: asString(entry.endDate),
    description: asString(entry.description),
  }
}

const hydrateProject = (value: unknown): Project | null => {
  const entry = asRecord(value)
  if (!entry) return null

  return {
    id: asId(entry.id),
    name: asString(entry.name),
    description: asString(entry.description),
    technologies: asString(entry.technologies),
    url: asString(entry.url),
  }
}

export const hydrateCV = (value: unknown): CVData => {
  const data = asRecord(value)
  if (!data) return createEmptyCV()

  const personal = asRecord(data.personal)
  const experiences = Array.isArray(data.experiences)
    ? data.experiences.map(hydrateExperience).filter((entry) => entry !== null)
    : []
  const education = Array.isArray(data.education)
    ? data.education.map(hydrateEducation).filter((entry) => entry !== null)
    : []
  const skills = Array.isArray(data.skills)
    ? data.skills.map(asString).filter(Boolean)
    : []
  const projects = Array.isArray(data.projects)
    ? data.projects.map(hydrateProject).filter((entry) => entry !== null)
    : []

  return {
    locale: data.locale === 'en' ? 'en' : 'id',
    personal: {
      fullName: asString(personal?.fullName),
      professionalTitle: asString(personal?.professionalTitle),
      email: asString(personal?.email),
      phone: asString(personal?.phone),
      location: asString(personal?.location),
      linkedin: asString(personal?.linkedin),
      github: asString(personal?.github),
      website: asString(personal?.website),
    },
    summary: asString(data.summary),
    experiences,
    education,
    skills,
    projects,
  }
}

export type CVAction =
  | { type: 'language/update'; locale: CVLocale }
  | { type: 'personal/update'; changes: Partial<PersonalInfo> }
  | { type: 'summary/update'; value: string }
  | { type: 'experience/add'; entry: Experience }
  | { type: 'experience/update'; id: string; changes: Partial<Experience> }
  | { type: 'experience/remove'; id: string }
  | { type: 'education/add'; entry: Education }
  | { type: 'education/update'; id: string; changes: Partial<Education> }
  | { type: 'education/remove'; id: string }
  | { type: 'skill/add'; value: string }
  | { type: 'skill/remove'; index: number }
  | { type: 'project/add'; entry: Project }
  | { type: 'project/update'; id: string; changes: Partial<Project> }
  | { type: 'project/remove'; id: string }
  | { type: 'cv/clear' }

export const cvReducer = (state: CVData, action: CVAction): CVData => {
  switch (action.type) {
    case 'language/update':
      return { ...state, locale: action.locale }
    case 'personal/update':
      return {
        ...state,
        personal: { ...state.personal, ...action.changes },
      }
    case 'summary/update':
      return { ...state, summary: action.value }
    case 'experience/add':
      return { ...state, experiences: [...state.experiences, action.entry] }
    case 'experience/update':
      return {
        ...state,
        experiences: state.experiences.map((entry) =>
          entry.id === action.id ? { ...entry, ...action.changes } : entry,
        ),
      }
    case 'experience/remove':
      return {
        ...state,
        experiences: state.experiences.filter((entry) => entry.id !== action.id),
      }
    case 'education/add':
      return { ...state, education: [...state.education, action.entry] }
    case 'education/update':
      return {
        ...state,
        education: state.education.map((entry) =>
          entry.id === action.id ? { ...entry, ...action.changes } : entry,
        ),
      }
    case 'education/remove':
      return {
        ...state,
        education: state.education.filter((entry) => entry.id !== action.id),
      }
    case 'skill/add':
      return { ...state, skills: [...state.skills, action.value] }
    case 'skill/remove':
      return {
        ...state,
        skills: state.skills.filter((_, index) => index !== action.index),
      }
    case 'project/add':
      return { ...state, projects: [...state.projects, action.entry] }
    case 'project/update':
      return {
        ...state,
        projects: state.projects.map((entry) =>
          entry.id === action.id ? { ...entry, ...action.changes } : entry,
        ),
      }
    case 'project/remove':
      return {
        ...state,
        projects: state.projects.filter((entry) => entry.id !== action.id),
      }
    case 'cv/clear':
      return createEmptyCV()
  }
}
