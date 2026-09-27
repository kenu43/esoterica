import { create } from 'zustand'

interface AssistantState {
  isOpen: boolean
  /** Mensaje pendiente de enviar apenas se abra el chat (ej.: pedido de lectura de tarot). */
  pendingMessage: string | null
  setOpen: (open: boolean) => void
  /** Abre el asesor y envía este mensaje como si el cliente lo hubiera escrito. */
  askWithMessage: (text: string) => void
  clearPendingMessage: () => void
}

export const useAssistantStore = create<AssistantState>((set) => ({
  isOpen: false,
  pendingMessage: null,
  setOpen: (isOpen) => set({ isOpen }),
  askWithMessage: (text) => set({ isOpen: true, pendingMessage: text }),
  clearPendingMessage: () => set({ pendingMessage: null }),
}))
