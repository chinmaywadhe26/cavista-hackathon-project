import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create(
  persist(
    (set) => ({
      email: null,
      role: null, 
      login: (email, role) => set({ email, role }), 
      logout: () => set({ email: null, role: null }),
    }),
    { name: "auth-storage" }
  )
);

export default useAuthStore;
