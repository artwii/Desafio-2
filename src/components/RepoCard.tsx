import { useCurrentRepo } from "../contexts/CurrentRepoContext";
import { useOpenModal } from "../contexts/OpenModalContext";
import { type IRepo } from "../services/user.service";

interface RepoCardProps {
  repoData: IRepo | undefined;
}

export function RepoCard({ repoData }: RepoCardProps) {
  const { setCurrentRepo } = useCurrentRepo();
  const { setOpenModal } = useOpenModal();

  return (
    <>
      <div
        onClick={() => {
          setCurrentRepo(repoData);
          setOpenModal(true);
        }}
        className="flex flex-col items-center justify-start w-80 2xl:w-91.25 h-73.25 rounded-[10px] shadow-[0_0_16px_rgba(180,180,180,1)] cursor-pointer transition-all duration-200 ease-linear hover:transform-[scale(1.05)] active:transform-[scale(1)]"
        key={repoData?.id}
      >
        <span className="self-start pl-12.25 pt-8 pb-7 text-[15px] text-[#202E49] font-bold">
          {repoData?.name}
        </span>
        <hr className="w-full border border-[#0070E0] " />
        <div className="flex flex-col items-start justify-between w-70.25 h-15 mt-8.25 pl-4.5 pt-2.75 pb-2.75 bg-[#F7F7F7] rounded-[11px]">
          <span className="text-[12px] text-[#6A6F73]">Link</span>
          <span className="inline-block max-w-full overflow-hidden text-ellipsis whitespace-nowrap text[14px] text-[#202E49] font-medium">
            {repoData?.html_url}
          </span>
        </div>
        <div className="flex flex-col items-start justify-between w-70.25 h-15 mt-5.5 pl-4.5 pt-2.75 pb-2.75 bg-[#F7F7F7] rounded-[11px]">
          <span className="text-[12px] text-[#6A6F73]">Descrição</span>
          {repoData?.description ? (
            <span className="inline-block max-w-full overflow-hidden text-ellipsis whitespace-nowrap text[14px] text-[#202E49] font-medium">
              {repoData?.description}
            </span>
          ) : (
            <span className="inline-block max-w-full overflow-hidden text-ellipsis whitespace-nowrap text[14px] text-[#202E49] font-medium">
              Não há descrição.
            </span>
          )}
        </div>
      </div>
    </>
  );
}
