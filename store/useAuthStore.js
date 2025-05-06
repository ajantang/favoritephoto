import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

const useAuthStore = create(
  persist(
    (set) => ({
      user: null, // 로그인한 사용자 정보
      login: (userData) => set({ user: userData }), // 로그인 시 실행
      logout: () => set({ user: null }), // 로그아웃 시 실행
      updatePoints: (newPoints) =>
        set((prev) => ({
          user: {
            ...prev.user, // 기존 user 객체 유지
            data: { 
              ...prev.user.data, // data 객체 내의 나머지 속성 유지
              point: newPoints, // point 속성만 업데이트
            },
          },
        })), // 포인트 업데이트 시 실행
    }),
    {
      name: 'userData',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export default useAuthStore;
