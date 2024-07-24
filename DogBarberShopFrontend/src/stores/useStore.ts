
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface State {
  user: string | null;
  session: boolean;
  clientId: string | null;
  setUser: (user: string | null) => void;
  setSession: (session: boolean) => void;
  setClientId: (clientId: string | null) => void;  
}

const useStore = create(
  persist<State>(
    (set) => ({
      user: null,
      session: false,
      clientId: null,
      setUser: (user) => set({ user }),
      setSession: (session) => set({ session }),
      setClientId: (clientId) => set({ clientId }),
    }),
    {
      name: 'auth-storage', // name of the item in the storage (must be unique)
    }
  )
);

export default useStore;