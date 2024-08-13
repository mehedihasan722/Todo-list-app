import { create } from "zustand";

interface TypeDialogProps {
  isOpen: boolean;
  onOpenChange: () => void;
}

export const useDialog = create<TypeDialogProps>((set) => ({
  isOpen: false,
  onOpenChange: () => set((state) => ({ isOpen: !state.isOpen })),
}));

export const updateDialog = create<TypeDialogProps>((set) => ({
  isOpen: false,
  onOpenChange: () => set((state) => ({ isOpen: !state.isOpen })),
}));
