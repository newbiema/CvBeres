import type { InputHTMLAttributes, TextareaHTMLAttributes } from 'react'

interface InputFieldProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  label: string
  onChange: (value: string) => void
}

interface TextAreaFieldProps
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'onChange'> {
  label: string
  onChange: (value: string) => void
}

const fieldClassName =
  'mt-2 w-full rounded-lg border border-line bg-surface px-3 py-2.5 text-sm text-ink outline-none transition-colors duration-200 placeholder:text-muted/70 focus:border-ink focus:ring-2 focus:ring-ink/10 disabled:cursor-not-allowed disabled:bg-canvas disabled:text-muted'

export function InputField({
  id,
  label,
  required,
  onChange,
  ...props
}: InputFieldProps) {
  return (
    <label htmlFor={id} className="block text-xs font-semibold text-ink">
      {label}
      {required && (
        <span className="ml-1 text-error" aria-hidden="true">
          *
        </span>
      )}
      <input
        {...props}
        id={id}
        required={required}
        onChange={(event) => onChange(event.target.value)}
        className={fieldClassName}
      />
    </label>
  )
}

export function TextAreaField({
  id,
  label,
  onChange,
  rows = 4,
  ...props
}: TextAreaFieldProps) {
  return (
    <label htmlFor={id} className="block text-xs font-semibold text-ink">
      {label}
      <textarea
        {...props}
        id={id}
        rows={rows}
        onChange={(event) => onChange(event.target.value)}
        className={`${fieldClassName} resize-y leading-6`}
      />
    </label>
  )
}
