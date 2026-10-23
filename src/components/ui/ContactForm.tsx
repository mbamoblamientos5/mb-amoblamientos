import { useId, useState, type FormEvent } from 'react'
import { Button } from '@/components/ui/Button'
import { buildWhatsAppUrl } from '@/data'
import type { ContactFormContent } from '@/interfaces/pages'

type FormValues = Record<'name' | 'phone' | 'email' | 'projectType' | 'message', string>

const fieldClass =
  'min-h-11.5 w-full min-w-0 rounded-lg border border-field-line bg-field p-3.25 text-[13px] text-ink placeholder:text-muted'

function fill(template: string, values: FormValues): string {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => values[key as keyof FormValues] ?? '')
}

/** Arma la consulta y la abre en WhatsApp: el usuario revisa y decide cuándo enviarla. */
export function ContactForm({ form }: { form: ContactFormContent }) {
  const [status, setStatus] = useState('')
  const id = useId()
  const { fields, messageTemplate } = form

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const element = event.currentTarget
    if (!element.reportValidity()) return

    const data = new FormData(element)
    const read = (name: keyof FormValues) => String(data.get(name) ?? '').trim()
    const values: FormValues = {
      name: read('name'),
      phone: read('phone'),
      email: read('email'),
      projectType: read('projectType'),
      message: read('message'),
    }
    const lines = [
      fill(messageTemplate.greeting, values),
      fill(messageTemplate.projectType, values),
      fill(messageTemplate.email, values),
      ...(values.phone ? [fill(messageTemplate.phone, values)] : []),
    ]

    setStatus(form.status)
    window.location.href = buildWhatsAppUrl(`${lines.join('\n')}\n\n${values.message}`)
  }

  return (
    <form
      onSubmit={handleSubmit}
      aria-labelledby={`${id}-title`}
      className="flex flex-col gap-5.5 rounded-2xl bg-panel px-5 py-6.25 md:p-8.75"
    >
      <div className="flex flex-col gap-2.5">
        <h2 id={`${id}-title`} className="text-[22px] font-medium tracking-[-0.8px]">
          {form.title}
        </h2>
        <p className="text-xs leading-[1.7] text-muted">{form.description}</p>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <div className="flex flex-col gap-2.25">
          <label htmlFor={`${id}-name`} className="text-[11px] font-semibold">
            {fields.name.label}
          </label>
          <input id={`${id}-name`} name="name" autoComplete="name" required maxLength={fields.name.maxLength} className={fieldClass} />
        </div>
        <div className="flex flex-col gap-2.25">
          <label htmlFor={`${id}-phone`} className="text-[11px] font-semibold">
            {fields.phone.label}
          </label>
          <input id={`${id}-phone`} name="phone" type="tel" autoComplete="tel" maxLength={fields.phone.maxLength} className={fieldClass} />
        </div>
        <div className="flex flex-col gap-2.25 md:col-span-2">
          <label htmlFor={`${id}-email`} className="text-[11px] font-semibold">
            {fields.email.label}
          </label>
          <input id={`${id}-email`} name="email" type="email" autoComplete="email" required maxLength={fields.email.maxLength} className={fieldClass} />
        </div>
        <div className="flex flex-col gap-2.25 md:col-span-2">
          <label htmlFor={`${id}-projectType`} className="text-[11px] font-semibold">
            {fields.projectType.label}
          </label>
          <select id={`${id}-projectType`} name="projectType" required defaultValue="" className={fieldClass}>
            <option value="">{fields.projectType.placeholder}</option>
            {form.projectTypes.map((type) => (
              <option key={type}>{type}</option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-2.25 md:col-span-2">
          <label htmlFor={`${id}-message`} className="text-[11px] font-semibold">
            {fields.message.label}
          </label>
          <textarea
            id={`${id}-message`}
            name="message"
            required
            maxLength={fields.message.maxLength}
            placeholder={fields.message.placeholder}
            className={`${fieldClass} min-h-27.5 resize-y`}
          />
        </div>
      </div>

      <div className="flex flex-col gap-3.75">
        <Button type="submit" variant="strong" className="w-full">
          {form.submit}
        </Button>
        <p role="status" className="text-xs leading-[1.7] empty:hidden">
          {status}
        </p>
        <noscript>
          <p className="text-xs leading-[1.7]">{form.noscript}</p>
        </noscript>
      </div>
    </form>
  )
}
