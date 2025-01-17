import React, { useEffect, useState } from "react";
import Button from "../../ui/Button";
import { useLayoutStore } from "@/stores/layoutStore";
import { useFriendStore } from "@/stores/friend/friendStore";
import { useFetchFriends } from "@/lib/hooks/friend/useFriend";
import CardBarista from "@/components/ui/CardBarista";
import { useBaristaStore } from "@/stores/friend/baristaStore";
import { useFetchBaristas } from "@/lib/hooks/friend/useBarista";
import InviteInfo from "../invite/InviteInfo";
import { useFetchUser } from "@/lib/hooks/useUser";
import { useUserStore } from "@/stores/userStore";

const Friend: React.FC = () => {
  const [setShowFriendPanel] = useLayoutStore((state) => [
    state.setShowFriendPanel,
  ]);
  const handleClose = () => {
    setShowFriendPanel(false);
  };
  const [activeTab, setActiveTab] = useState("Friend");
  const [friends, setCurrentFriend] = useFriendStore((state) => [
    state.friends,
    state.setCurrentFriend,
  ]);
  const [baristas, setCurrentBarista] = useBaristaStore((state) => [
    state.baristas,
    state.setCurrentBarista,
  ]);
  const user = useUserStore((state) => state.user);
  const [setShowInviteInfoPanel] = useLayoutStore((state) => [
    state.setShowInviteInfoPanel,
  ]);
  // const [showInviteInfoPanel, setShowInviteInfoPanel] = useState(false);

  const isActive = "!py-2 !-translate-y-[28px] !border-orange-90 !bg-orange-10";
  const handleFriendTabClick = () => {
    setActiveTab("Friend");
  };

  const handleLeaderTabClick = () => {
    setActiveTab("Leader");
  };
  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    setShowInviteInfoPanel(true);
  };

  const { fetchBaristas } = useFetchBaristas();
  const { fetchFriends } = useFetchFriends();
  const { fetchUser } = useFetchUser();

  useEffect(() => {
    fetchFriends();
    fetchBaristas();
    fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="bg-[#2e2e2e] w-full h-full absolute z-10 p-4 top-0">
      <div className="rounded-3xl border-solid border-orange-90 border-4 h-[calc(100%-16px)] mt-4">
        <div className="rounded-[21px] border-solid border-orange-30 border-4 bg-orange-30 h-full relative">
          <div className="absolute -right-[15px] -top-[13px] bg-[#fffde9] rounded-full border-[#ededed] cursor-pointer">
            <img
              className="w-6 h-6"
              src="/images/btn-close.png"
              alt=""
              onClick={handleClose}
            />
          </div>
          <div className="flex">
            <div
              onClick={handleFriendTabClick}
              className={`absolute cursor-pointer left-1/2 -translate-x-[145px] border-2 border-b-0 px-6 py-1 bg-[#edc6a9] border-[#edc6a9] -translate-y-[20px] rounded-t-xl text-orange-90 ${
                activeTab === "Friend" ? isActive : ""
              }`}
            >
              Friendzone
            </div>
            <div
              onClick={handleLeaderTabClick}
              className={`absolute cursor-pointer left-1/2 translate-x-[0px] border-2 border-b-0 px-6 py-1 bg-[#edc6a9] border-[#edc6a9] -translate-y-[20px] rounded-t-xl text-orange-90 ${
                activeTab === "Leader" ? isActive : ""
              }`}
            >
              Top barista
            </div>
          </div>
          <span className="flex justify-between gap-2 absolute top-[14px] w-[90%] left-1/2 -translate-x-1/2">
            <p className="bg-red-10 h-[2px] w-[13%]"></p>
            <p className="bg-red-10 h-[2px] w-[70%]"></p>
            <p className="bg-red-10 h-[2px] w-[13%]"></p>
          </span>
          {activeTab === "Friend" && (
            <>
              <div
                className="bg-orange-10 rounded-b-[20px] rounded-t border border-gray-20 absolute z-10 h-[calc(100%-32px)] p-2 mt-8 w-full flex flex-col justify-between"
                style={{
                  scrollbarWidth: "thin",
                  scrollbarColor: "#666666 #ffe",
                }}
              >
                <div className="w-[320px] h-[164px] relative">
                  <div className="flex justify-between mb-4 mt-2">
                    <div className="flex items-center gap-2 bg-[#EEEDD8] border-[#DDDCC9] border w-fit rounded pr-4">
                      <img className="w-6 h-6" src="/images/kbuck.png" alt="" />
                      <div>{user.balance}M</div>
                    </div>
                    <img
                      className="w-8 h-8 pointer-events-auto cursor-pointer"
                      src="/images/btn-invite.png"
                      alt=""
                      onClick={handleClick}
                    />
                  </div>
                  <div className="flex flex-col justify-between items-center border-orange-20 border rounded-lg p-2 mb-1">
                    <div className="flex justify-between items-center w-full mb-1">
                      <div className="flex flex-col gap-1">
                        <div>Invite Regular user</div>
                        <div className="flex items-center gap-1">
                          <div className="w-4 h-4">
                            <img src="/images/kbuck.png" alt="" />
                          </div>
                          <span className="text-[#6F6F6F]">
                            +3 For you and your Friend
                          </span>
                        </div>
                      </div>
                      <div>
                        <img src="/images/info-1.png" alt="" className="w-10" />
                      </div>
                    </div>
                    <div className="flex justify-between items-center w-full">
                      <div className="flex flex-col gap-1">
                        <div>Invite Regular user</div>
                        <div className="flex items-center gap-1">
                          <div className="w-4 h-4">
                            <img src="/images/kbuck.png" alt="" />
                          </div>
                          <span className="text-[#6F6F6F]">
                            +3 For you and your Friend
                          </span>
                        </div>
                      </div>
                      <div>
                        <img src="/images/info-2.png" alt="" className="w-10" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-center mt-8 mb-2 text-xl">Friend list</div>
                <div className="overflow-y-auto">
                  <div className="flex flex-col bg-orange-10 border-[#e8ddbd] border rounded-lg">
                    {friends.map((friend) => (
                      <div
                        key={friend.id}
                        className="w-full h-full cursor-pointer bg-[#f7f5dc] border-[#e8ddbd] border-b first:rounded-t-lg last:border-b-0 last:rounded-b-lg"
                      >
                        <CardBarista
                          type={"friendzone"}
                          id={friend.id}
                          img={{
                            url: friend.imageUrl,
                            width: 24,
                            height: 24,
                          }}
                          balance={friend.balance}
                          name={friend.name}
                          totalBonus={friend.totalFriend}
                          totalFriend={friend.totalFriend}
                        />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mt-3 justify-center flex">
                  <div className="w-[172px] h-[39px]">
                    <Button>Invite Friend</Button>
                  </div>
                </div>
              </div>
            </>
          )}
          {activeTab === "Leader" && (
            <div className="bg-orange-10 rounded-b-[20px] flex flex-col items-center justify-center rounded-t border border-gray-20 w-full overflow-y-auto h-[calc(100%-32px)] p-2 mt-8">
              <div className="mt-4 w-[120px] h-[120px]">
                <img src="/images/barista.png" alt="" />
              </div>
              <div className="text-xl mt-2">TOP BARISTA</div>
              <div className="text-sm mb-6">
                Invite more friend to get to the top
              </div>
              <div className="overflow-y-auto w-full">
                <div className="flex flex-col bg-orange-10 border-[#e8ddbd] border rounded-lg">
                  {baristas.map((barista) => (
                    <div
                      key={barista.id}
                      className="w-full h-full cursor-pointer bg-[#f7f5dc] border-[#e8ddbd] border-b first:rounded-t-lg last:border-b-0 last:rounded-b-lg"
                    >
                      <CardBarista
                        type={"barista"}
                        id={barista.id}
                        img={{
                          url: barista.imageUrl,
                          width: 24,
                          height: 24,
                        }}
                        balance={0}
                        name={barista.name}
                        totalBonus={barista.totalBonus}
                        totalFriend={barista.totalFriend}
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-3 justify-center flex">
                <div className="w-[172px] h-[39px]">
                  <Button>Invite Friend</Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* {showInviteInfoPanel && <InviteInfo />} */}
    </div>
  );
};

export default Friend;
