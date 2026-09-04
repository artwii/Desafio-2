import { Search } from "./Search";

import wtech from "../assets/wtech-logo.png";

export function Main() {
  return (
    <main className="grid grid-cols-[50%_50%] lg:grid-cols-[65%_35%] h-full w-full">
      <div className="flex items-center justify-center bg-[#05478A]">
        <img src={wtech} alt="Logo WTECH" className="w-89.25" />
      </div>
      <div className="flex items-center justify-center bg-[#f5f5f5]">
        <Search />
      </div>
    </main>
  );
}
