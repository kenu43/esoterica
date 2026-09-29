import { create } from 'zustand'

interface AssistantState {
  isOpen: boolean
  pendingMessage: string | null
  setOpen: (open: boolean) => void
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
