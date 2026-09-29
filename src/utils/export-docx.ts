import { cvText, formatDateRange } from '../cv/locale'
import {
  createCVFileName,
  getRenderableCV,
  splitDescription,
} from '../cv/presentation'
import type { CVData } from '../cv/types'
import type { IRunOptions } from 'docx'

type RunOverrides = Omit<IRunOptions, 'text' | 'children'>

export async function createCVDocxBlob(cv: CVData) {
  const {
    AlignmentType,
    BorderStyle,
    Document,
    Packer,
    PageOrientation,
    Paragraph,
    TextRun,
  } = await import('docx')
  const font = 'Times New Roman'
  const text = cvText[cv.locale]
  const { experiences, education, skills, projects } = getRenderableCV(cv)
  const paragraphs: InstanceType<typeof Paragraph>[] = []
  const bodyRun = (value: string, overrides: RunOverrides = {}) =>
    new TextRun({
      text: value,
      font,
      size: 20,
      color: '000000',
      ...overrides,
    })
  const addSectionHeading = (value: string) => {
    paragraphs.push(
      new Paragraph({
        children: [bodyRun(value, { bold: true, size: 22 })],
        spacing: { before: 140, after: 60, line: 240 },
        border: {
          bottom: {
            style: BorderStyle.SINGLE,
            size: 6,
            space: 1,
            color: '808080',
          },
        },
        keepNext: true,
      }),
    )
  }
  const addBulletLines = (value: string) => {
    splitDescription(value).forEach((line) => {
      paragraphs.push(
        new Paragraph({
          children: [bodyRun(line)],
          bullet: { level: 0 },
          alignment: AlignmentType.JUSTIFIED,
          spacing: { after: 30, line: 240 },
          indent: { left: 360, hanging: 180 },
        }),
      )
    })
  }

  if (cv.personal.fullName) {
    paragraphs.push(
      new Paragraph({
        children: [
          bodyRun(cv.personal.fullName.toUpperCase(), {
            bold: true,
            size: 28,
          }),
        ],
        alignment: AlignmentType.CENTER,
        spacing: { after: 20, line: 240 },
      }),
    )
  }

  if (cv.personal.professionalTitle) {
    paragraphs.push(
      new Paragraph({
        children: [
          bodyRun(cv.personal.professionalTitle.toUpperCase(), {
            bold: true,
            size: 22,
          }),
        ],
        alignment: AlignmentType.CENTER,
        spacing: { after: 20, line: 240 },
      }),
    )
  }

  const contactLine = [
    cv.personal.location,
    cv.personal.phone,
    cv.personal.email,
    cv.personal.website,
    cv.personal.linkedin,
    cv.personal.github,
  ]
    .filter(Boolean)
    .join(' | ')

  if (contactLine) {
    paragraphs.push(
      new Paragraph({
        children: [bodyRun(contactLine, { size: 18 })],
        alignment: AlignmentType.CENTER,
        spacing: { after: 100, line: 220 },
      }),
    )
  }

  if (cv.summary) {
    addSectionHeading(text.professionalSummary)
    paragraphs.push(
      new Paragraph({
        children: [bodyRun(cv.summary)],
        alignment: AlignmentType.JUSTIFIED,
        spacing: { after: 50, line: 240 },
      }),
    )
  }

  if (skills.length > 0) {
    addSectionHeading(text.technicalSkills)
    skills.forEach((skill) => {
      paragraphs.push(
        new Paragraph({
          children: [bodyRun(skill)],
          bullet: { level: 0 },
          spacing: { after: 30, line: 240 },
          indent: { left: 360, hanging: 180 },
        }),
      )
    })
  }

  if (experiences.length > 0) {
    addSectionHeading(text.professionalExperience)
    experiences.forEach((experience) => {
      const dateRange = formatDateRange(
        experience.startDate,
        experience.endDate,
        experience.current,
        cv.locale,
      )
      const heading = [
        experience.position,
        experience.company,
        experience.location,
        dateRange,
      ]
        .filter(Boolean)
        .join(' | ')

      if (heading) {
        paragraphs.push(
          new Paragraph({
            children: [bodyRun(heading, { bold: true })],
            spacing: { before: 40, after: 20, line: 240 },
            keepNext: true,
          }),
        )
      }
      addBulletLines(experience.description)
    })
  }

  if (projects.length > 0) {
    addSectionHeading(text.projects)
    projects.forEach((project) => {
      const heading = [project.name, project.url].filter(Boolean).join(' | ')

      if (heading) {
        paragraphs.push(
          new Paragraph({
            children: [bodyRun(heading, { bold: true })],
            spacing: { before: 40, after: 20, line: 240 },
            keepNext: true,
          }),
        )
      }
      addBulletLines(project.description)
      if (project.technologies) {
        paragraphs.push(
          new Paragraph({
            children: [
              bodyRun(`${text.technologies}: `, { bold: true }),
              bodyRun(project.technologies),
            ],
            spacing: { after: 30, line: 240 },
          }),
        )
      }
    })
  }

  if (education.length > 0) {
    addSectionHeading(text.education)
    education.forEach((item) => {
      const dateRange = formatDateRange(
        item.startDate,
        item.endDate,
        false,
        cv.locale,
      )
      const study = [item.degree, item.fieldOfStudy].filter(Boolean).join(' ')
      const heading = [study, item.institution, dateRange].filter(Boolean).join(' | ')

      if (heading) {
        paragraphs.push(
          new Paragraph({
            children: [bodyRun(heading, { bold: true })],
            spacing: { before: 40, after: 20, line: 240 },
            keepNext: Boolean(item.description),
          }),
        )
      }
      if (item.description) {
        paragraphs.push(
          new Paragraph({
            children: [bodyRun(item.description)],
            alignment: AlignmentType.JUSTIFIED,
            spacing: { after: 40, line: 240 },
          }),
        )
      }
    })
  }

  const wordDocument = new Document({
    creator: 'CV Beres',
    title: createCVFileName(cv, 'docx').replace(/\.docx$/, ''),
    description: 'ATS-friendly CV generated locally with CV Beres.',
    sections: [
      {
        properties: {
          page: {
            size: {
              width: 11906,
              height: 16838,
              orientation: PageOrientation.PORTRAIT,
            },
            margin: {
              top: 792,
              right: 1008,
              bottom: 792,
              left: 1008,
              header: 720,
              footer: 720,
            },
          },
        },
        children: paragraphs,
      },
    ],
  })
  return Packer.toBlob(wordDocument)
}

export async function exportCVToDocx(cv: CVData) {
  const blob = await createCVDocxBlob(cv)
  const downloadUrl = URL.createObjectURL(blob)
  const anchor = globalThis.document.createElement('a')

  anchor.href = downloadUrl
  anchor.download = createCVFileName(cv, 'docx')
  globalThis.document.body.appendChild(anchor)
  anchor.click()
  anchor.remove()
  globalThis.setTimeout(() => URL.revokeObjectURL(downloadUrl), 1000)
}
