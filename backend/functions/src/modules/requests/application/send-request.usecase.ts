import { requestSchema, type Mailer } from '../domain/request.js'

/** Caso de uso: valida la solicitud y la envía por correo al equipo. */
export class SendRequestUseCase {
  constructor(private readonly mailer: Mailer) {}

  async execute(raw: unknown) {
    const request = requestSchema.parse(raw)
    await this.mailer.send(request)
  }
}
