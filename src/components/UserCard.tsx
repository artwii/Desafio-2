interface UserCardProps {
  userData:
    | {
        name: string | null;
        login: string;
        avatar_url: string;
        bio: string | null;
      }
    | undefined;
}

export function UserCard({ userData }: UserCardProps) {
  return (
    <>
      <div className="flex w-158.75 h-44.5 pt-6.5 pl-7.5 pb-6.5 pr-9.25 gap-10.75 border border-[#E3E7EB] rounded-[18px]">
        <img
          src={userData?.avatar_url}
          alt="Avatar"
          className="w-31.25 h-31.25 rounded-[11px]"
        />
        <div className="flex flex-col items-start justify-start pt-0.75">
          <span className="pb-0.75 text-[12px] text-[#6A6F73]">Nome</span>
          <span className="pb-2.5 text-[13px] text-[#2D2D2D] font-bold">
            {userData?.name ? userData?.name : userData?.login}
          </span>
          <span className="pb-0.75 text-[12px] text-[#6A6F73]">Bio</span>
          {userData?.bio ? (
            <span className="text-[13px] text-[#2D2D2D]">{userData?.bio}</span>
          ) : (
            <span className="text-[13px] text-[#2D2D2D]">
              {userData?.name
                ? `${userData?.name} não tem bio!`
                : `${userData?.login} não tem bio!`}
            </span>
          )}
        </div>
      </div>
    </>
  );
}
