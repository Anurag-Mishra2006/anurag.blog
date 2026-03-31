import { createContext, useState } from "react";

type User = {
  username: string;
  userId: string;
} | null;

type UserContextType = {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
};

export const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => { }
});

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}