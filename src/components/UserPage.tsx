import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  type IUserData,
  type IRepo,
  getUser,
  getRepos,
} from "../services/user.service";
import { UserCard } from "./UserCard";
import { RepoCard } from "./RepoCard";
import { Modal } from "./Modal";
import { Loading } from "../components/Loading";
import { useLoading } from "../contexts/LoadingContext";
import { useCurrentUser } from "../contexts/CurrentUserContext";
import { useOpenModal } from "../contexts/OpenModalContext";

import wtechBlue from "../assets/wtech-logo-blue.png";
import grayedLeftArrow from "../assets/grayed-left-arrow.png";
import leftArrow from "../assets/left-arrow.png";
import grayedRightArrow from "../assets/grayed-right-arrow.png";
import rightArrow from "../assets/right-arrow.png";

export function UserPage() {
  const navigate = useNavigate();
  const { currentUser } = useCurrentUser();
  const { isLoading, setLoadingState } = useLoading();
  const { openModal } = useOpenModal();
  const [userData, setUserData] = useState<IUserData>();
  const [userRepos, setUserRepos] = useState<IRepo[]>([]);
  const [reposLength, setReposLength] = useState<number>(0);
  const [currentRepos, setCurrentRepos] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    async function loadUser() {
      if (currentUser) {
        try {
          setLoadingState(true);
          const user = await getUser({ user: currentUser });
          const repos = await getRepos({ user: currentUser });
          setUserData(user);
          if (repos) {
            setUserRepos(repos);
            setReposLength(repos.length);
          }
        } finally {
          setLoadingState(false);
        }
      }
    }
    loadUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const resize = () => {
      setWidth(window.innerWidth);
      setCurrentPage(1);
      setCurrentRepos(0);
    };
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  const countPages = () => {
    if (width < 1536) {
      return Math.ceil(reposLength / 2);
    } else {
      return Math.ceil(reposLength / 3);
    }
  };

  const nextPage = () => {
    if (width < 1536) {
      if (userRepos[currentRepos + 2]) {
        setCurrentRepos(currentRepos + 2);
        setCurrentPage(currentPage + 1);
      }
    } else if (userRepos[currentRepos + 3]) {
      setCurrentRepos(currentRepos + 3);
      setCurrentPage(currentPage + 1);
    }
  };
  const previousPage = () => {
    if (width < 1536) {
      if (userRepos[currentRepos - 2]) {
        setCurrentRepos(currentRepos - 2);
        setCurrentPage(currentPage - 1);
      }
    } else if (userRepos[currentRepos - 3]) {
      setCurrentRepos(currentRepos - 3);
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <>
      <main className="w-full h-full">
        <header className="fixed h-22 w-full pl-16 pt-7.75 bg-white shadow">
          <button
            onClick={() => navigate("/")}
            className="cursor-pointer transition-all duration-200 ease-linear hover:transform-[scale(1.1)] active:transform-[scale(1)]"
          >
            <img src={wtechBlue} alt="Logo WTECH" className="h-6.75 " />
          </button>
        </header>
        {!currentUser ? (
          <div className="flex flex-col items-center justify-center w-full h-full pt-22 bg-[#f5f5f5]">
            <div className="flex flex-col gap-30 justify-center items-center w-[95%] h-[90%] pl-13.75 pt-14.75 rounded-[9px] bg-white shadow-[0_0_16px_rgba(180,180,180,1)]">
              <span className="text-[30px] font-bold">
                Esta página não pode ser acessada diretamente, retorne ao
                início!
              </span>
              <button
                onClick={() => navigate("/")}
                className="w-79.5 h-10.25 bg-[#05478A] text-[15px] font-bold text-white rounded-[5px] cursor-pointer transition-all duration-100 ease-linear hover:transform-[scale(1.05)] active:transform-[scale(1)]"
              >
                Retornar ao início
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center w-full h-full min-h-240 pt-22 bg-[#f5f5f5]">
            {(() => {
              if (isLoading) {
                return (
                  <div className="flex flex-col justify-center items-center w-[95%] h-[93%] pl-13.75 pt-14.75 rounded-[9px] bg-white shadow-[0_0_16px_rgba(180,180,180,1)]">
                    <Loading />
                  </div>
                );
              } else if (openModal) {
                return (
                  <div className="flex flex-col justify-start items-left w-[95%] h-[93%] pl-13.75 pr-13.75 pt-14.75 rounded-[9px] bg-white shadow-[0_0_16px_rgba(180,180,180,1)]">
                    <Modal />
                  </div>
                );
              } else {
                return (
                  <div className="flex flex-col justify-start items-left w-[95%] h-[93%] pl-13.75 pr-13.75 pt-14.75 rounded-[9px] bg-white shadow-[0_0_16px_rgba(180,180,180,1)]">
                    <span className="pb-8 text-[30px] text-[#333333] font-bold">
                      Informações do Perfil
                    </span>
                    <UserCard userData={userData} />
                    <span className="pt-15.5 pb-3.75 text-[30px] text-[#333333] font-bold">
                      Repositórios
                    </span>
                    {userRepos?.at(0) ? (
                      <>
                        <div className="flex self-end gap-1.5 pb-4.25">
                          <span className="pr-3.75 text-[12px] text-[#6A6F73]">
                            {currentPage} de {countPages()}
                          </span>
                          <button
                            onClick={() => previousPage()}
                            className="cursor-pointer transition-all duration-100 ease-linear hover:transform-[scale(1.1)] active:transform-[scale(1)]"
                          >
                            {currentPage == 1 ? (
                              <img
                                src={grayedLeftArrow}
                                alt="Seta"
                                className="w-6.5 h-6.5"
                              />
                            ) : (
                              <img
                                src={leftArrow}
                                alt="Seta"
                                className="w-6.5 h-6.5"
                              />
                            )}
                          </button>
                          <button
                            onClick={() => nextPage()}
                            className="cursor-pointer transition-all duration-100 ease-linear hover:transform-[scale(1.1)] active:transform-[scale(1)]"
                          >
                            {currentPage == countPages() ? (
                              <img
                                src={grayedRightArrow}
                                alt="Seta"
                                className="w-6.5 h-6.5"
                              />
                            ) : (
                              <img
                                src={rightArrow}
                                alt="Seta"
                                className="w-6.5 h-6.5"
                              />
                            )}
                          </button>
                        </div>
                        <div className="grid grid-cols-2 2xl:grid-cols-3 gap-10 place-items-center self-center h-73.25">
                          <RepoCard repoData={userRepos[currentRepos]} />
                          {userRepos[currentRepos + 1] ? (
                            <RepoCard repoData={userRepos[currentRepos + 1]} />
                          ) : (
                            <div className="w-91.25"></div>
                          )}
                          {width < 1536 ? (
                            <></>
                          ) : (
                            <>
                              {userRepos?.at(currentRepos + 2) ? (
                                <RepoCard
                                  repoData={userRepos[currentRepos + 2]}
                                />
                              ) : (
                                <div className="w-91.25"></div>
                              )}
                            </>
                          )}
                        </div>
                      </>
                    ) : (
                      <span className="self-center pt-15 text-[30px]">
                        O usuário não tem repositórios!
                      </span>
                    )}
                  </div>
                );
              }
            })()}
          </div>
        )}
      </main>
    </>
  );
}
