/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";
import { type IRepo } from "../services/user.service";


interface ICurrentRepoContext {
  currentRepo: IRepo | undefined;
  setCurrentRepo(repo: IRepo | undefined): void;
}

interface ICurrentRepoContextProvider {
  children: React.ReactNode;
}

export const CurrentRepoContext = createContext<ICurrentRepoContext>(
  {} as ICurrentRepoContext,
);

export const CurrentRepoContextProvider = ({
  children,
}: ICurrentRepoContextProvider) => {
  const [currentRepo, setRepo] = useState<IRepo>();

  const setCurrentRepo = (repo: IRepo) => {
    setRepo(repo);
  };

  return (
    <CurrentRepoContext.Provider value={{ currentRepo, setCurrentRepo }}>
      {children}
    </CurrentRepoContext.Provider>
  );
};

export function useCurrentRepo(): ICurrentRepoContext {
  const context = useContext(CurrentRepoContext);
  return context;
}