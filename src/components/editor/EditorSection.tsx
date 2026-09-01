import type { ReactNode } from 'react'
import type { LucideIcon } from 'lucide-react'

interface EditorSectionProps {
  title: string
  description: string
  icon?: LucideIcon
  action?: ReactNode
  children: ReactNode
}

export function EditorSection({
  title,
  description,
  icon: Icon,
  action,
  children,
}: EditorSectionProps) {
  return (
    <section className="border-t border-line py-8 first:border-t-0 first:pt-0">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <h2 className="flex items-center gap-2 text-lg font-semibold tracking-tight text-ink">
            {Icon && <Icon className="size-4.5" strokeWidth={1.8} aria-hidden="true" />}
            {title}
          </h2>
          <p className="mt-1 text-sm leading-6 text-muted">{description}</p>
        </div>
        {action}
      </div>
      {children}
    </section>
  )
}
