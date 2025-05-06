import { create } from "zustand";

const useTimerStore = create((set) => ({
  pointModal: false,
  timeoutId: null, // 단일 timeout ID를 저장

  handlePointModal: () => set((state) => ({ pointModal: !state.pointModal })),

  resetTimeout: () => {
    set((state) => {
      if (state.timeoutId) clearTimeout(state.timeoutId); // 기존 timeout이 있으면 초기화

      const id = setTimeout(() => {
        set({ pointModal: true }); // 3분 후 모달 열기
      }, 180000); // 3분 (180000ms)
      // const id = setTimeout(() => {
      //   set({ pointModal: true }); // 1시간 후 모달 열기
      // }, 3600000); // 1시간 (3600000ms)

      return { timeoutId: id };
    });
  },

  stopTimeout: () => {
    set((state) => {
      if (state.timeoutId) clearTimeout(state.timeoutId); // timeout 초기화
      return { timeoutId: null };
    });
  },
}));

export default useTimerStore;
