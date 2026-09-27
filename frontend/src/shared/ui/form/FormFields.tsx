import { ComboBox, Description, FieldError, Input, Label, ListBox, Select, TextArea, TextField } from '@heroui/react'
import { Controller, type Control, type FieldPath, type FieldValues } from 'react-hook-form'

interface BaseProps<T extends FieldValues> {
  control: Control<T>
  name: FieldPath<T>
  label: string
  description?: string
  isRequired?: boolean
  className?: string
}

interface FormTextFieldProps<T extends FieldValues> extends BaseProps<T> {
  type?: 'text' | 'email' | 'tel'
  placeholder?: string
  multiline?: boolean
  rows?: number
  autoComplete?: string
}

/**
 * Campo de texto HeroUI conectado a React Hook Form.
 * Centraliza label, error y accesibilidad para todos los formularios.
 */
export function FormTextField<T extends FieldValues>({
  control,
  name,
  label,
  description,
  isRequired,
  className,
  type = 'text',
  placeholder,
  multiline,
  rows = 4,
  autoComplete,
}: FormTextFieldProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <TextField
          fullWidth
          className={className}
          name={field.name}
          type={type}
          value={field.value ?? ''}
          onChange={field.onChange}
          onBlur={field.onBlur}
          isRequired={isRequired}
          isInvalid={fieldState.invalid}
          validationBehavior="aria"
        >
          <Label>{label}</Label>
          {multiline ? (
            <TextArea ref={field.ref} rows={rows} placeholder={placeholder} />
          ) : (
            <Input ref={field.ref} placeholder={placeholder} autoComplete={autoComplete} />
          )}
          {description && !fieldState.error && <Description>{description}</Description>}
          <FieldError>{fieldState.error?.message}</FieldError>
        </TextField>
      )}
    />
  )
}

interface FormSelectProps<T extends FieldValues> extends BaseProps<T> {
  placeholder?: string
  options: { value: string; label: string }[]
}

export function FormSelect<T extends FieldValues>({
  control,
  name,
  label,
  description,
  isRequired,
  className,
  placeholder = 'Selecciona una opción',
  options,
}: FormSelectProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <Select
          fullWidth
          className={className}
          name={field.name}
          placeholder={placeholder}
          value={field.value || null}
          onChange={(key) => field.onChange(key ?? '')}
          onBlur={field.onBlur}
          isRequired={isRequired}
          isInvalid={fieldState.invalid}
          validationBehavior="aria"
        >
          <Label>{label}</Label>
          <Select.Trigger ref={field.ref}>
            <Select.Value />
            <Select.Indicator />
          </Select.Trigger>
          {description && !fieldState.error && <Description>{description}</Description>}
          <FieldError>{fieldState.error?.message}</FieldError>
          <Select.Popover>
            <ListBox>
              {options.map((o) => (
                <ListBox.Item key={o.value} id={o.value} textValue={o.label}>
                  {o.label}
                  <ListBox.ItemIndicator />
                </ListBox.Item>
              ))}
            </ListBox>
          </Select.Popover>
        </Select>
      )}
    />
  )
}

interface FormComboBoxProps<T extends FieldValues> extends BaseProps<T> {
  placeholder?: string
  options: string[]
}

/** Selector con búsqueda (ideal para listas largas como ciudades). */
export function FormComboBox<T extends FieldValues>({
  control,
  name,
  label,
  description,
  isRequired,
  className,
  placeholder = 'Escribe para buscar…',
  options,
}: FormComboBoxProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <ComboBox
          fullWidth
          className={className}
          name={field.name}
          selectedKey={field.value || null}
          onSelectionChange={(key) => field.onChange(key ? String(key) : '')}
          onBlur={field.onBlur}
          isRequired={isRequired}
          isInvalid={fieldState.invalid}
          validationBehavior="aria"
          menuTrigger="focus"
        >
          <Label>{label}</Label>
          <ComboBox.InputGroup>
            <Input ref={field.ref} placeholder={placeholder} />
            <ComboBox.Trigger />
          </ComboBox.InputGroup>
          {description && !fieldState.error && <Description>{description}</Description>}
          <FieldError>{fieldState.error?.message}</FieldError>
          <ComboBox.Popover>
            <ListBox className="max-h-72 overflow-y-auto">
              {options.map((o) => (
                <ListBox.Item key={o} id={o} textValue={o}>
                  {o}
                  <ListBox.ItemIndicator />
                </ListBox.Item>
              ))}
            </ListBox>
          </ComboBox.Popover>
        </ComboBox>
      )}
    />
  )
}
