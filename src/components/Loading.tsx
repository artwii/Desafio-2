import loading from "../assets/loading.png";

export function Loading() {
  return (
    <>
      <div role="status" className="flex flex-col items-center justify-center">
        <div>
          <img
            className="h-20 w-20 animate-spin mb-10.75"
            src={loading}
            alt="Loading..."
          />
        </div>
        <span className="font-bold text-[30px] text-[#303030]">
          Carregando...
        </span>
      </div>
    </>
  );
}
