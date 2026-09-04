/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";

interface IOpenModalContext {
  openModal: boolean;
  setOpenModal(state: boolean): void;
}

interface IOpenModalContextProvider {
  children: React.ReactNode;
}

export const OpenModalContext = createContext<IOpenModalContext>(
  {} as IOpenModalContext,
);

export const OpenModalContextProvider = ({
  children,
}: IOpenModalContextProvider) => {
  const [openModal, setOpen] = useState<boolean>(false);

  const setOpenModal = (state: boolean) => {
    setOpen(state);
  };

  return (
    <OpenModalContext.Provider value={{ openModal, setOpenModal }}>
      {children}
    </OpenModalContext.Provider>
  );
};

export function useOpenModal(): IOpenModalContext {
  const context = useContext(OpenModalContext);
  return context;
}