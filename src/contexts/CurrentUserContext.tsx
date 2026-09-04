/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";

interface ICurrentUserContext {
  currentUser: string;
  setCurrentUser(user: string): void;
}

interface ICurrentUserContextProvider {
  children: React.ReactNode;
}

export const CurrentUserContext = createContext<ICurrentUserContext>(
  {} as ICurrentUserContext,
);

export const CurrentUserContextProvider = ({
  children,
}: ICurrentUserContextProvider) => {
  const [currentUser, setUser] = useState<string>("");

  const setCurrentUser = (user: string) => {
    setUser(user);
  };

  return (
    <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </CurrentUserContext.Provider>
  );
};

export function useCurrentUser(): ICurrentUserContext {
  const context = useContext(CurrentUserContext);
  return context;
}
