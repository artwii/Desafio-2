import { useCurrentRepo } from "../contexts/CurrentRepoContext";

import grayedX from "../assets/grayed-x.png";
import { useOpenModal } from "../contexts/OpenModalContext";

export function Modal() {
  const { currentRepo } = useCurrentRepo();
  const { setOpenModal } = useOpenModal();

  return (
    <>
      <span className="text-[30px] text-[#333333] font-bold">
        Especificações
      </span>
      <div className="flex flex-col items-center justify-start self-center justify-self-center w-172.5 h-137.5 mt-15 pl-8 pr-8 bg-white rounded-[10px] shadow-[0_0_16px_rgba(180,180,180,1)]">
        <div className="flex justify-between w-full pl-4 pt-10 pb-5">
          <span className="text-[15px] text-[#202E49] font-bold">
            {currentRepo?.name}
          </span>
          <button onClick={() => setOpenModal(false)} className="w-3 h-3 cursor-pointer transition-all duration-100 ease-linear hover:transform-[scale(1.5)] active:transform-[scale(1)]">
            <img src={grayedX} alt="X" />
          </button>
        </div>
        <hr className="w-full border border-[#BDBDBD]" />
        <div className="flex flex-col items-start justify-between w-143.75 h-15 mt-6.25 pl-4.5 pt-2.75 pb-2.75 bg-[#F7F7F7] rounded-[11px]">
          <span className="text-[12px] text-[#6A6F73]">Link</span>
          <a
            href={currentRepo?.html_url}
            className="inline-block max-w-full overflow-hidden text-ellipsis whitespace-nowrap text[14px] text-[#202E49] font-medium"
          >
            {currentRepo?.html_url}
          </a>
        </div>
        <div className="flex flex-col items-start justify-between w-143.75 h-15 mt-6.25 pl-4.5 pt-2.75 pb-2.75 bg-[#F7F7F7] rounded-[11px]">
          <span className="text-[12px] text-[#6A6F73]">Privacidade</span>
          <span className="text[14px] text-[#202E49] font-medium">
            {currentRepo?.visibility == "private" ? "Privado" : ""}
            {currentRepo?.visibility == "public" ? "Público" : ""}
            {currentRepo?.visibility == "internal" ? "Interno" : ""}
          </span>
        </div>
        <div className="flex flex-col items-start justify-between w-143.75 h-15 mt-6.25 pl-4.5 pt-2.75 pb-2.75 bg-[#F7F7F7] rounded-[11px]">
          <span className="text-[12px] text-[#6A6F73]">Linguagem</span>
          <span className="text[14px] text-[#202E49] font-medium">
            {currentRepo?.language ? currentRepo?.language : "O repositório não tem uma linguagem definida"}
          </span>
        </div>
        <div className="flex flex-col items-start justify-start w-143.75 min-h-15 max-h-41 mt-6.25 pl-4.5 pt-2.75 pb-2.75 bg-[#F7F7F7] rounded-[11px]">
          <span className="text-[12px] text-[#6A6F73]">Descrição</span>
          {currentRepo?.description ? (
            <span className="inline-block max-w-full text[14px] text-[#202E49] font-medium line-clamp-5">
              {currentRepo?.description}
            </span>
          ) : (
            <span className="text[14px] text-[#202E49] font-medium">{currentRepo?.name} não tem descrição</span>
          )}
        </div>
      </div>
    </>
  );
}
