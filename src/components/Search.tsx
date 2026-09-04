import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Loading } from "../components/Loading";
import { useLoading } from "../contexts/LoadingContext";
import { useCurrentUser } from "../contexts/CurrentUserContext";

import x from "../assets/x.png";
import X from "../assets/X.png";

import { getUser } from "../services/user.service";

export function Search() {
  const [search, setSearch] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const { isLoading, setLoadingState } = useLoading();
  const { setCurrentUser } = useCurrentUser();
  const navigate = useNavigate();

  const searchUser = async () => {
    setLoadingState(true);
    const response = await getUser({ user: search });
    setError(false);
    if (response == undefined) {
      setError(true);
    }
    setCurrentUser(search);
    setSearch("");
    setLoadingState(false);
    if (response != undefined) {
      navigate("/user");
    }
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="flex flex-col items-center justify-center min-w-79.5">
          <div className="flex justify-center">
            {error ? (
              <div className="relative w-86.75 h-21 rounded-[22px] bg-[#FC8621]">
                <button
                  type="button"
                  onClick={() => setError(false)}
                  className="absolute top-4.25 right-4.5 cursor-pointer transition-all duration-200 ease-linear hover:transform-[scale(1.1)] active:transform-[scale(1)]"
                >
                  <img src={x} alt="X" className="w-2 h-2" />
                </button>
                <span className="absolute left-21.5 top-3.5 text-white font-bold text-[20px]">
                  Ops!
                </span>
                <span className="absolute left-21.5 bottom-4.5 text-white text-[12px]">
                  Não conseguimos identificar sua conta.
                </span>
                <div className="flex items-center justify-center absolute bottom-14.75 left-5.25 w-12.5 h-12.5 bg-[#C24914] rounded-4xl">
                  <img src={X} alt="X" className="w-3 h-3" />
                </div>
                <div className="absolute left-2 top-10 w-1.5 h-1.5 bg-[#C24914] rounded-4xl" />
                <div className="absolute left-5.25 bottom-3.25 w-2.5 h-2.5 bg-[#C24914] rounded-4xl" />
                <div className="absolute left-10 bottom-7 w-5 h-5 bg-[#C24914] rounded-4xl" />
              </div>
            ) : (
              <h3 className="font-bold text-5xl text-[#303030]">Entrar</h3>
            )}
          </div>
          <div className="flex flex-col">
            <span className="self-start text-[15px] mt-9.75">Usuário</span>
            <input
              type="text"
              placeholder="Digite aqui seu usuário do Github"
              value={search}
              onChange={(searchInput) => setSearch(searchInput.target.value)}
              className="w-79.5 h-10.25 pl-3.5 pr-3.5 mt-2.25 mb-10 border border-[#B5B5B5] rounded-[3px] outline-none"
            />
          </div>
          <button
            type="button"
            onClick={searchUser}
            className="w-79.5 h-10.25 bg-[#05478A] text-[15px] font-bold text-white rounded-[5px] cursor-pointer transition-all duration-100 ease-linear hover:transform-[scale(1.05)] active:transform-[scale(1)]"
          >
            Entrar
          </button>
        </div>
      )}
    </>
  );
}
