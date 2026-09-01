export type CVLocale = 'id' | 'en'

export interface PersonalInfo {
  fullName: string
  professionalTitle: string
  email: string
  phone: string
  location: string
  linkedin: string
  github: string
  website: string
}

export interface Experience {
  id: string
  company: string
  position: string
  location: string
  startDate: string
  endDate: string
  current: boolean
  description: string
}

export interface Education {
  id: string
  institution: string
  degree: string
  fieldOfStudy: string
  startDate: string
  endDate: string
  description: string
}

export interface Project {
  id: string
  name: string
  description: string
  technologies: string
  url: string
}

export interface CVData {
  locale: CVLocale
  personal: PersonalInfo
  summary: string
  experiences: Experience[]
  education: Education[]
  skills: string[]
  projects: Project[]
}
