import type { CVLocale } from './types'

export const cvText = {
  id: {
    professionalSummary: 'RINGKASAN PROFESIONAL',
    technicalSkills: 'KEAHLIAN TEKNIS',
    professionalExperience: 'PENGALAMAN PROFESIONAL',
    education: 'PENDIDIKAN',
    projects: 'PROYEK',
    technologies: 'Teknologi',
    present: 'Sekarang',
    emptyPreview: 'Preview CV akan muncul di sini saat kamu mulai mengisi data.',
  },
  en: {
    professionalSummary: 'PROFESSIONAL SUMMARY',
    technicalSkills: 'TECHNICAL SKILLS',
    professionalExperience: 'PROFESSIONAL EXPERIENCE',
    education: 'EDUCATION',
    projects: 'PROJECTS',
    technologies: 'Technologies',
    present: 'Present',
    emptyPreview: 'Your CV preview will appear here when you start entering data.',
  },
} as const

const monthNames: Record<CVLocale, readonly string[]> = {
  id: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'],
  en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
}

export const formatMonth = (value: string, locale: CVLocale) => {
  const [year, month] = value.split('-')
  const monthIndex = Number(month) - 1

  if (!year || monthIndex < 0 || monthIndex > 11) return value
  return `${monthNames[locale][monthIndex]} ${year}`
}

export const formatDateRange = (
  startDate: string,
  endDate: string,
  current: boolean,
  locale: CVLocale,
) => {
  const start = startDate ? formatMonth(startDate, locale) : ''
  const end = current
    ? cvText[locale].present
    : endDate
      ? formatMonth(endDate, locale)
      : ''

  if (start && end) return `${start} – ${end}`
  return start || end
}
