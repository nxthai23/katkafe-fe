import CardGuild from "@/components/ui/CardGuild";
import { useFetchGuilds } from "@/lib/hooks/useGuild";
import { useGuildStore } from "@/stores/guildStore";
import { useLayoutStore } from "@/stores/layoutStore";
import React, { useEffect } from "react";
import Image from "next/image";
import { Guild } from "@/types/guild";

type Props = {};

function FindGuild({}: Props) {
  const [setShowFindGuildPanel] = useLayoutStore((state) => [
    state.setShowFindGuildPanel,
  ]);
  const [showGuildDetailPanel, setShowGuildDetailPanel, setShowGuildPanel] =
    useLayoutStore((state) => [
      state.showGuildDetailPanel,
      state.setShowGuildDetailPanel,
      state.setShowGuildPanel,
    ]);
  const [guilds, setCurrentGuild] = useGuildStore((state) => [
    state.guilds,
    state.setCurrentGuild,
  ]);
  const { fetchGuilds } = useFetchGuilds();

  const handleClose = () => {
    setShowGuildPanel(false);
    setShowFindGuildPanel(false);
  };
  const handleChooseClick = (guild: Guild) => {
    setCurrentGuild(guild);
    setShowGuildDetailPanel(!showGuildDetailPanel);
  };
  const handleBack = () => {
    setShowFindGuildPanel(false);
  };

  useEffect(() => {
    fetchGuilds();
  }, [fetchGuilds]);

  return (
    <div className="bg-[#2e2e2e] w-full h-full absolute z-10 p-4 top-0">
      <div className="rounded-3xl border-solid border-[#5e5745] border-4 h-[calc(100%-16px)] mt-4">
        <div className="rounded-[21px] border-solid border-[#ffedbb] border-4 bg-[#ffedbb] h-full relative">
          <div className="absolute -top-4 -left-3 bg-[#fffde9] rounded-full border-[#ededed] cursor-pointer">
            <Image
              src="/images/back.png"
              alt="cat pic"
              width={32}
              height={32}
              onClick={handleBack}
            />
          </div>
          <div className="absolute -right-[15px] -top-[13px] bg-[#fffde9] rounded-full border-[#ededed] cursor-pointer">
            <Image
              src="/images/btn-close.png"
              alt="cat pic"
              width={24}
              height={24}
              onClick={handleClose}
            />
          </div>
          <div className="flex">
            <div className="absolute cursor-pointer left-1/2 -translate-x-1/2 border-2 px-6 py-1 border-[#5e5745] bg-[#fffeec] -translate-y-[20px] rounded-t-xl text-[#5e5745]">
              Find Guild
            </div>
          </div>
          <span className="flex justify-between gap-2 absolute top-[14px] w-[90%] left-1/2 -translate-x-1/2">
            <p className="bg-[#e3b695] h-[2px] w-[13%]"></p>
            <p className="bg-[#e3b695] h-[2px] w-[70%]"></p>
            <p className="bg-[#e3b695] h-[2px] w-[13%]"></p>
          </span>
          <div className="bg-[#fff8de] w-full rounded-b-[20px] flex flex-col justify-between rounded-t border border-[#b5b5b5] absolute z-10 h-[calc(100%-32px)] p-2 overflow-hidden mt-8">
            <div className="flex justify-center mt-3">
              <Image
                src="/images/bg-deploy.png"
                alt="cat pic"
                width={200}
                height={84}
              />
            </div>
            <div className="text-center my-4">These guilds are hiring</div>

            <div className="overflow-y-auto">
              {guilds.map((guild) => (
                <div key={guild.id}>
                  <div
                    className="w-full"
                    onClick={() => handleChooseClick(guild)}
                  >
                    <CardGuild guild={guild} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FindGuild;
