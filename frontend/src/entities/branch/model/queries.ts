import { BRANCHES } from './branches.data'
import type { BranchId } from './types'

/**
 * Las sedes cambian muy poco, por eso se sirven de forma síncrona.
 * Si en el futuro vienen de Firestore, basta con convertir este módulo
 * en un repositorio + useQuery como en `entities/product`.
 */
export const useBranches = () => BRANCHES

export const getBranch = (id: BranchId) => BRANCHES.find((b) => b.id === id)
