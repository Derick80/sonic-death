import { useEffect, useState } from 'react'

export interface FormFieldProps extends React.HTMLAttributes<HTMLInputElement> {
  htmlFor: string
  label: string
  type?: string
  value: any
  name?: string
  placeHolder?: string
  onChange: (...args: any[]) => void
  onClick?: (...args: any) => unknown
  checked?: boolean
  error?: string
  className?: string
  labelClass?: string
  autocomplete?: string
}

export default function FormField({
  htmlFor,
  label,
  type,
  value,
  placeHolder,
  className = 'form-field-primary',
  checked,
  onClick = () => {},
  onChange = () => {},
  error = '',
  labelClass,
  autocomplete
}: FormFieldProps) {
  const [errorText, setErrorText] = useState(error)
  useEffect(() => {
    setErrorText(error)
  }, [error])
  return (
    <>
      <label htmlFor={htmlFor} className={labelClass}>
        {label}
      </label>
      <input
        className={`form-field-primary ${className}`}
        onChange={(event) => {
          onChange(event)
          setErrorText('')
        }}
        type={type}
        checked={checked}
        id={htmlFor}
        name={htmlFor}
        value={value}
        placeholder={placeHolder}
        autoComplete={autocomplete}
      />
      <div>{errorText || ''}</div>
    </>
  )
}
