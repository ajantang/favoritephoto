import { create } from 'zustand';

export const useSelectedStore = create((set) => ({
  selectedCard: null,
  setSelectedCard: (card) => set({ selectedCard: card }),
  clearSelectedCard: () => set({ selectedCard: null }),
}));

export default useSelectedStore;
