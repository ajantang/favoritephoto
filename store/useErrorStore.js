import { create } from 'zustand';

export const useErrorStore = create((set) => ({
  error: null,
  success: null,
  redirectPath: null,
  signinError: null,
  setError: (message, path) => set({ error: message, redirectPath: path }),
  setSuccess: (message, path) => set({ success: message, redirectPath: path }),
  setSigninError: (message) => set({ signinError: message }),
}));
