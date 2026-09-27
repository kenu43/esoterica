import { BRANCHES } from './branches.data'
import type { BranchChoiceId, BranchId } from './types'

/**
 * Las sedes cambian muy poco, por eso se sirven de forma síncrona.
 * Si en el futuro vienen de Firestore, basta con convertir este módulo
 * en un repositorio + useQuery como en `entities/product`.
 */
export const useBranches = () => BRANCHES

export const getBranch = (id: BranchId) => BRANCHES.find((b) => b.id === id)

export const ANY_BRANCH_ID = 'cualquiera' as const

/** Tienda preseleccionada en los selectores (también recibe los mensajes de "cualquiera"). */
export const DEFAULT_BRANCH_ID: BranchId = 'la-colonia'

/** Las tres sedes más "La que tenga disponibilidad", siempre en ese orden. */
export const BRANCH_CHOICES: { id: BranchChoiceId; name: string; specialty: string }[] = [
  ...BRANCHES.map(({ id, name, specialty }) => ({ id, name, specialty })),
  { id: ANY_BRANCH_ID, name: 'La que tenga disponibilidad', specialty: 'Te responde la primera que tenga el producto' },
]

/** Sede a la que se envía el mensaje: "cualquiera" se atiende por La Colonia. */
export const resolveBranch = (id: BranchChoiceId) =>
  (id === ANY_BRANCH_ID ? undefined : getBranch(id)) ?? getBranch(DEFAULT_BRANCH_ID)!
