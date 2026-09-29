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

export const DEFAULT_BRANCH_ID: BranchId = 'la-colonia'

export const BRANCH_CHOICES: { id: BranchChoiceId; name: string; specialty: string }[] = [
  ...BRANCHES.map(({ id, name, specialty }) => ({ id, name, specialty })),
  { id: ANY_BRANCH_ID, name: 'La que tenga disponibilidad', specialty: 'Te responde la primera que tenga el producto' },
]

export const resolveBranch = (id: BranchChoiceId) =>
  (id === ANY_BRANCH_ID ? undefined : getBranch(id)) ?? getBranch(DEFAULT_BRANCH_ID)!
