import Button from "@/components/ui/Button";
import { useFetchGuilds } from "@/lib/hooks/useGuild";
import { useGuildStore } from "@/stores/guildStore";
import { useLayoutStore } from "@/stores/layoutStore";
import React, { useEffect } from "react";
import Image from "next/image";
import { LogOut } from "lucide-react";

type Props = {};

function Guild({}: Props) {
  const [setShowGuildPanel, setShowFindGuildPanel] = useLayoutStore((state) => [
    state.setShowGuildPanel,
    state.setShowFindGuildPanel,
  ]);
  const [guilds, setCurrentGuild] = useGuildStore((state) => [
    state.guilds,
    state.setCurrentGuild,
  ]);
  const { fetchGuilds } = useFetchGuilds();

  const handleClose = () => {
    setShowGuildPanel(false);
  };

  const handleClick = () => {
    setShowFindGuildPanel(true);
  };

  useEffect(() => {
    fetchGuilds();
  }, []);

  return (
    <div className="bg-[#2e2e2e] w-full h-full absolute z-10 p-4 top-0">
      <div className="rounded-3xl border-solid border-[#5e5745] border-4 h-[calc(100%-16px)] mt-4">
        <div className="rounded-[21px] border-solid border-[#ffedbb] border-4 bg-[#ffedbb] h-full relative">
          <div className="absolute -right-[15px] -top-[13px] bg-[#fffde9] rounded-full border-[#ededed] cursor-pointer">
            <img
              className="w-6 h-6"
              src="/images/btn-close.png"
              alt=""
              onClick={handleClose}
            />
          </div>
          <>
            <div className="flex">
              <div className="absolute cursor-pointer left-1/2 -translate-x-1/2 border-2 px-6 py-1 border-[#5e5745] bg-[#fffeec] -translate-y-[20px] rounded-t-xl text-[#5e5745]">
                Guild
              </div>
            </div>
            <span className="flex justify-between gap-2 absolute top-[14px] w-[90%] left-1/2 -translate-x-1/2">
              <p className="bg-[#e3b695] h-[2px] w-[13%]"></p>
              <p className="bg-[#e3b695] h-[2px] w-[70%]"></p>
              <p className="bg-[#e3b695] h-[2px] w-[13%]"></p>
            </span>
            <div className="w-full bg-[#fff8de] rounded-b-[20px] flex flex-col rounded-t border border-[#b5b5b5] absolute z-10 h-[calc(100%-32px)] p-2 overflow-hidden mt-8">
              <div className="flex justify-center mt-14 mb-4">
                <Image
                  src="/images/bg-deploy.png"
                  alt="cat pic"
                  width={200}
                  height={200}
                  className=""
                />
              </div>
              <div className="text-center max-w-[260px] mx-auto">
                You havent are join any guild yet. Join one to gain more benefit
              </div>
              <div className="mt-8">
                <div className="flex gap-2 justify-center">
                  <div className="w-[156px] h-[39px]" onClick={handleClick}>
                    <Button>Find a Guild</Button>
                  </div>
                  <div className="w-[156px] h-[39px]">
                    <Button>Create a Guild</Button>
                  </div>
                </div>
              </div>
            </div>
          </>
          {/* @TODO: nếu user đã join Guild  */}
          {/* <>
            <div className="flex">
              <div className="absolute cursor-pointer left-1/2 -translate-x-1/2 border-2 px-6 py-1 border-[#5e5745] bg-[#fffeec] -translate-y-[20px] rounded-t-xl text-[#5e5745]">
                Guild
              </div>
            </div>
            <span className="flex justify-between gap-2 absolute top-[14px] w-[90%] left-1/2 -translate-x-1/2">
              <p className="bg-[#e3b695] h-[2px] w-[13%]"></p>
              <p className="bg-[#e3b695] h-[2px] w-[70%]"></p>
              <p className="bg-[#e3b695] h-[2px] w-[13%]"></p>
            </span>
            <div className="bg-[#fff8de] rounded-b-[20px] flex flex-col rounded-t border border-[#b5b5b5] absolute z-10 h-[calc(100%-32px)] p-2 overflow-hidden mt-8">
              <div className="flex items-center gap-1 text-[#A61D47]">
                <LogOut size={18} className="text-[#A61D47]" />
                <span>Leave Guild</span>
              </div>
              <div>
                <Image
                  src=""
                  alt="cat pic"
                  width={120}
                  height={120}
                  className=""
                />
              </div>
              <div className="text-center max-w-[231px] mx-auto">
                You havent are join any guild yet. Join one to gain more benefit
              </div>
              <div className="mt-8">
                <div className="flex gap-2 justify-center">
                  {["Find a Guild", "Create a Guild"].map((item, index) => (
                    <div key={index} className="w-[156px] h-[39px]">
                      <Button>{item}</Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </> */}
        </div>
      </div>
    </div>
  );
}

export default Guild;
