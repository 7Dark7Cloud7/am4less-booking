import type { ReactNode } from 'react'

interface BaseFieldProps {
  id: string
  label: string
  required?: boolean
  hint?: string
  error?: string
  className?: string
}

interface FieldShellProps extends BaseFieldProps {
  children: ReactNode
}

function FieldShell({ id, label, required, hint, error, children, className = '' }: FieldShellProps) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <label htmlFor={id} className="text-sm font-semibold text-ink">
        {label}
        {required && <span className="ms-1 text-danger">*</span>}
      </label>
      {children}
      {hint && !error && <p className="text-xs text-ink-faint">{hint}</p>}
      {error && (
        <p id={`${id}-error`} role="alert" className="text-xs font-semibold text-danger">
          {error}
        </p>
      )}
    </div>
  )
}

interface TextFieldProps extends BaseFieldProps {
  value: string
  onChange: (value: string) => void
  type?: 'text' | 'tel' | 'email' | 'date' | 'number'
  placeholder?: string
  inputMode?: 'text' | 'tel' | 'email' | 'numeric'
  min?: number | string
  max?: number | string
  maxLength?: number
  autoComplete?: string
}

export function TextField({
  id,
  label,
  required,
  hint,
  error,
  value,
  onChange,
  type = 'text',
  placeholder,
  inputMode,
  min,
  max,
  maxLength,
  autoComplete,
  className
}: TextFieldProps) {
  return (
    <FieldShell id={id} label={label} required={required} hint={hint} error={error} className={className}>
      <input
        id={id}
        name={id}
        type={type}
        className="field-control"
        value={value}
        placeholder={placeholder}
        inputMode={inputMode}
        min={min}
        max={max}
        maxLength={maxLength}
        autoComplete={autoComplete}
        aria-required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
        onChange={(event) => onChange(event.target.value)}
      />
    </FieldShell>
  )
}

interface TextAreaProps extends BaseFieldProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  rows?: number
}

export function TextArea({ id, label, required, hint, error, value, onChange, placeholder, rows = 4 }: TextAreaProps) {
  return (
    <FieldShell id={id} label={label} required={required} hint={hint} error={error}>
      <textarea
        id={id}
        name={id}
        rows={rows}
        className="field-control min-h-[7rem] resize-y"
        value={value}
        placeholder={placeholder}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        onChange={(event) => onChange(event.target.value)}
      />
    </FieldShell>
  )
}

interface SelectProps extends BaseFieldProps {
  value: string
  onChange: (value: string) => void
  options: { value: string; label: string }[]
}

export function SelectField({ id, label, required, hint, error, value, onChange, options }: SelectProps) {
  return (
    <FieldShell id={id} label={label} required={required} hint={hint} error={error}>
      <select
        id={id}
        name={id}
        className="field-control appearance-none bg-[length:1.1rem] bg-[right_0.9rem_center] bg-no-repeat pe-11"
        value={value}
        aria-invalid={error ? true : undefined}
        onChange={(event) => onChange(event.target.value)}
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' stroke='%236b7a8f' stroke-width='2' stroke-linecap='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E\")"
        }}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </FieldShell>
  )
}

export function ChoiceCard({
  checked,
  onChange,
  title,
  subtitle,
  icon,
  disabled
}: {
  checked: boolean
  onChange: () => void
  title: string
  subtitle?: string
  icon?: ReactNode
  disabled?: boolean
}) {
  return (
    <label
      className={`flex min-h-[3.25rem] cursor-pointer items-center gap-3 rounded-[var(--radius-field)] border p-3.5 transition-colors ${
        checked
          ? 'border-am4-blue bg-am4-red/10 dark:bg-am4-red/25 ring-1 ring-am4-blue/30'
          : 'border-line-strong bg-surface hover:border-brand-300 hover:bg-surface-muted'
      } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      <input
        type="checkbox"
        className="size-5 shrink-0 accent-am4-blue"
        checked={checked}
        disabled={disabled}
        onChange={onChange}
      />
      {icon && <span className="text-brand-600 dark:text-brand-300">{icon}</span>}
      <span className="min-w-0 wrap-anywhere">
        <span className="block text-sm font-semibold leading-snug">{title}</span>
        {subtitle && <span className="block text-xs leading-snug text-ink-soft">{subtitle}</span>}
      </span>
    </label>
  )
}
