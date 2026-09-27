import type { ContactRequest, Mailer } from '../domain/request.js'

const escape = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!)

/** Plantilla HTML sencilla y legible en Gmail/Outlook (tablas + estilos en línea). */
function renderHtml(r: ContactRequest) {
  const rows = Object.entries(r.fields)
    .filter(([, v]) => v)
    .map(
      ([k, v]) => `<tr>
        <td style="padding:10px 12px;border-bottom:1px solid #eee;color:#6b5b86;font-size:13px;width:160px;vertical-align:top">${escape(k)}</td>
        <td style="padding:10px 12px;border-bottom:1px solid #eee;color:#1f1830;font-size:14px;white-space:pre-wrap">${escape(v)}</td>
      </tr>`,
    )
    .join('')
  const title = r.kind === 'encargo' ? 'Nuevo encargo desde la web' : 'Nuevo mensaje de contacto'
  return `<!doctype html><html><body style="margin:0;background:#f5f1ea;font-family:Arial,sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:24px 12px"><tr><td align="center">
    <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;background:#fff;border-radius:12px;overflow:hidden">
      <tr><td style="background:#1b1233;padding:20px 24px;color:#e9c46a;font-size:18px;font-weight:bold">Universo Esotérico · ${title}</td></tr>
      <tr><td style="padding:8px 12px"><table width="100%" cellpadding="0" cellspacing="0">${rows}</table></td></tr>
      <tr><td style="padding:16px 24px;color:#888;font-size:12px">Responde este correo para escribirle directamente a ${escape(r.fromName)} (${escape(r.replyTo)}).</td></tr>
    </table>
  </td></tr></table></body></html>`
}

/** Adaptador de Resend usando su API REST (sin SDK = menos dependencias). */
export class ResendMailer implements Mailer {
  constructor(
    private readonly apiKey: string,
    private readonly from: string,
    private readonly to: string[],
  ) {}

  async send(r: ContactRequest) {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${this.apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: this.from,
        to: this.to,
        reply_to: r.replyTo,
        subject: r.subject,
        html: renderHtml(r),
        text: Object.entries(r.fields)
          .map(([k, v]) => `${k}: ${v}`)
          .join('\n'),
        tags: [{ name: 'kind', value: r.kind }],
      }),
    })
    if (!res.ok) throw new Error(`Resend ${res.status}: ${await res.text()}`)
  }
}
