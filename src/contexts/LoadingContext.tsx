/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";

interface ILoadingContext {
  isLoading: boolean;
  setLoadingState(state: boolean): void;
}

interface ILoadingContextProvider {
  children: React.ReactNode;
}

export const LoadingContext = createContext<ILoadingContext>(
  {} as ILoadingContext,
);

export const LoadingContextProvider = ({
  children,
}: ILoadingContextProvider) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const setLoadingState = (state: boolean) => {
    setIsLoading(state);
  };

  return (
    <LoadingContext.Provider value={{ isLoading, setLoadingState }}>
      {children}
    </LoadingContext.Provider>
  );
};

export function useLoading(): ILoadingContext {
  const context = useContext(LoadingContext);
  return context;
}
