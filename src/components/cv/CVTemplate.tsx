import { cvText, formatDateRange } from '../../cv/locale'
import { getRenderableCV, splitDescription } from '../../cv/presentation'
import type { CVData } from '../../cv/types'

interface CVTemplateProps {
  cv: CVData
}

interface ContactItem {
  label: string
  href?: string
}

interface DescriptionListProps {
  value: string
}

const externalHref = (value: string) =>
  /^https?:\/\//i.test(value) ? value : `https://${value}`

const displayUrl = (value: string) =>
  value.replace(/^https?:\/\//i, '').replace(/\/$/, '')

function DescriptionList({ value }: DescriptionListProps) {
  const lines = splitDescription(value)

  if (lines.length === 0) return null

  return (
    <ul className="cv-description mt-1 list-disc space-y-0.5 pl-4 text-[0.72rem] leading-[1.35] text-neutral-900">
      {lines.map((line, index) => (
        <li key={`${line}-${index}`} className="pl-0.5 text-justify">
          {line}
        </li>
      ))}
    </ul>
  )
}

export function CVTemplate({ cv }: CVTemplateProps) {
  const { personal } = cv
  const text = cvText[cv.locale]
  const { experiences, education, skills, projects } = getRenderableCV(cv)
  const contacts: ContactItem[] = [
    personal.location ? { label: personal.location } : null,
    personal.phone
      ? { label: personal.phone, href: `tel:${personal.phone.replace(/\s/g, '')}` }
      : null,
    personal.email
      ? { label: personal.email, href: `mailto:${personal.email}` }
      : null,
    personal.website
      ? { label: displayUrl(personal.website), href: externalHref(personal.website) }
      : null,
    personal.linkedin
      ? {
          label: displayUrl(personal.linkedin),
          href: externalHref(personal.linkedin),
        }
      : null,
    personal.github
      ? { label: displayUrl(personal.github), href: externalHref(personal.github) }
      : null,
  ].filter((contact): contact is ContactItem => contact !== null)
  const hasContent = Boolean(
    Object.values(personal).some(Boolean) ||
      cv.summary ||
      experiences.length ||
      education.length ||
      skills.length ||
      projects.length,
  )

  return (
    <article
      id="cv-document"
      lang={cv.locale}
      className="cv-paper mx-auto bg-white px-[clamp(1.5rem,5vw,4.5rem)] py-[clamp(2rem,5vw,3.75rem)] text-neutral-950 shadow-sm"
      aria-label="Preview CV"
    >
      {!hasContent ? (
        <div className="preview-empty-state flex h-full min-h-64 items-center justify-center text-center font-sans">
          <p className="max-w-xs text-sm leading-6 text-neutral-500">{text.emptyPreview}</p>
        </div>
      ) : (
        <>
          <header className="text-center">
            {personal.fullName && (
              <h1 className="text-lg leading-tight font-bold tracking-[0.02em] break-words uppercase">
                {personal.fullName}
              </h1>
            )}
            {personal.professionalTitle && (
              <p className="mt-1 text-[0.76rem] leading-[1.35] font-bold uppercase">
                {personal.professionalTitle}
              </p>
            )}
            {contacts.length > 0 && (
              <address className="mt-1.5 flex flex-wrap justify-center text-[0.68rem] leading-[1.4] not-italic text-neutral-900">
                {contacts.map((contact, index) => (
                  <span key={`${contact.label}-${index}`} className="min-w-0">
                    {index > 0 && <span aria-hidden="true"> | </span>}
                    {contact.href ? (
                      <a className="break-all hover:underline" href={contact.href}>
                        {contact.label}
                      </a>
                    ) : (
                      contact.label
                    )}
                  </span>
                ))}
              </address>
            )}
          </header>

          {cv.summary && (
            <section className="cv-section mt-3 break-words">
              <h2 className="border-b border-neutral-500 pb-0.5 text-[0.72rem] leading-tight font-bold uppercase">
                {text.professionalSummary}
              </h2>
              <p className="mt-1.5 whitespace-pre-line  text-justify text-[0.72rem] leading-[1.4]">
                {cv.summary}
              </p>
            </section>
          )}

          {skills.length > 0 && (
            <section className="cv-section mt-3 break-words">
              <h2 className="border-b border-neutral-500 pb-0.5 text-[0.72rem] leading-tight font-bold uppercase">
                {text.technicalSkills}
              </h2>
              <p className="mt-1.5 text-justify text-[0.72rem] leading-[1.4]">
                {skills.join(', ')}
              </p>
            </section>
          )}

          {experiences.length > 0 && (
            <section className="cv-section break-words mt-3">
              <h2 className="border-b border-neutral-500 pb-0.5 text-[0.72rem] leading-tight font-bold uppercase">
                {text.professionalExperience}
              </h2>
              <div className="mt-1.5 space-y-2.5">
                {experiences.map((experience) => {
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

                  return (
                    <div key={experience.id} className="cv-entry">
                      {heading && (
                        <h3 className="text-[0.72rem] leading-[1.35] font-bold">{heading}</h3>
                      )}
                      <DescriptionList value={experience.description} />
                    </div>
                  )
                })}
              </div>
            </section>
          )}

          {projects.length > 0 && (
            <section className="cv-section mt-3 break-words">
              <h2 className="border-b border-neutral-500 pb-0.5 text-[0.72rem] leading-tight font-bold uppercase">
                {text.projects}
              </h2>
              <div className="mt-1.5 space-y-2.5">
                {projects.map((project) => {
                  const heading = [project.name, project.url && displayUrl(project.url)]
                    .filter(Boolean)
                    .join(' | ')

                  return (
                    <div key={project.id} className="cv-entry">
                      {heading && (
                        <h3 className="text-[0.72rem] leading-[1.35] font-bold">
                          {project.url ? (
                            <>
                              {project.name}
                              {project.name && ' | '}
                              <a href={externalHref(project.url)} className="break-all hover:underline">
                                {displayUrl(project.url)}
                              </a>
                            </>
                          ) : (
                            heading
                          )}
                        </h3>
                      )}
                      <DescriptionList value={project.description} />
                      {project.technologies && (
                        <p className="mt-1 text-[0.72rem] leading-[1.35]">
                          <span className="font-bold">{text.technologies}:</span>{' '}
                          {project.technologies}
                        </p>
                      )}
                    </div>
                  )
                })}
              </div>
            </section>
          )}

          {education.length > 0 && (
            <section className="cv-section mt-3 break-words">
              <h2 className="border-b border-neutral-500 pb-0.5 text-[0.72rem] leading-tight font-bold uppercase">
                {text.education}
              </h2>
              <div className="mt-1.5 space-y-2.5">
                {education.map((item) => {
                  const dateRange = formatDateRange(
                    item.startDate,
                    item.endDate,
                    false,
                    cv.locale,
                  )
                  const study = [item.degree, item.fieldOfStudy].filter(Boolean).join(' ')
                  const heading = [study, item.institution, dateRange].filter(Boolean).join(' | ')

                  return (
                    <div key={item.id} className="cv-entry">
                      {heading && (
                        <h3 className="text-[0.72rem] leading-[1.35] font-bold">{heading}</h3>
                      )}
                      {item.description && (
                        <p className="mt-1 whitespace-pre-line text-justify text-[0.72rem] leading-[1.4]">
                          {item.description}
                        </p>
                      )}
                    </div>
                  )
                })}
              </div>
            </section>
          )}
        </>
      )}
    </article>
  )
}
