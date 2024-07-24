import React, { createContext, useState, useContext, ReactNode } from 'react';
import { useSessionStorage } from 'usehooks-ts';
interface SessionContextType {
    session: boolean;
    setSession: (session: boolean) => void;
    user: string | null;
    setUser: (user: string | null) => void;
}

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export function SessionProvider({ children }: { children: ReactNode }) {
    const [session, setSession] = useSessionStorage<boolean>('session', false);
    const [user, setUser] = useSessionStorage<string | null>('user', null);
    
  return (
    <SessionContext.Provider value={{ session, setSession, user, setUser }}>
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  const context = useContext(SessionContext);
  if (context === undefined) {
    throw new Error('useSession must be used within a SessionProvider');
  }
  return context;
}