import React, { useEffect } from "react";
import { useFetchStaffs } from "@/lib/hooks/useStaff";
import { useStaffStore } from "@/stores/staffStore";
import { useLayoutStore } from "@/stores/layoutStore";

const StaffList: React.FC = () => {
  const { fetchStaffs } = useFetchStaffs();
  const [staffs, setCurrentStaff] = useStaffStore((state) => [
    state.staffs,
    state.setCurrentStaff,
  ]);
  const [setShowInviteInfoPanel] = useLayoutStore((state) => [
    state.setShowInviteInfoPanel,
  ]);

  const handleClose = () => {
    setShowInviteInfoPanel(false);
  };

  useEffect(() => {
    fetchStaffs();
  }, [fetchStaffs]);

  return (
    <div className="list-panel bg-[#2e2e2e] w-full h-full absolute z-10 p-4 top-0">
      <div className="rounded-3xl border-solid border-[#5e5745] border-4 h-[calc(100%-16px)] mt-4">
        <div className="rounded-[21px] border-solid border-[#ffedbb] border-4 bg-[#ffedbb] h-full relative">
          <div className="absolute -left-[15px] -top-[13px] bg-[#fffde9] rounded-full border-[#ededed] cursor-pointer">
            <img
              className="w-6 h-6"
              src="/images/back.png"
              alt=""
              onClick={handleClose}
            />
          </div>
          <div className="absolute left-1/2 -translate-x-1/2 -translate-y-[28px] border-2 px-6 py-2 border-[#5e5745] bg-[#fffeec] rounded-t-xl text-[#5e5745]">
            Invite info
          </div>

          <span className="flex justify-between gap-2 absolute top-[14px] w-[90%] left-1/2 -translate-x-1/2">
            <p className="bg-[#e3b695] h-[2px] w-[13%]"></p>
            <p className="bg-[#e3b695] h-[2px] w-[70%]"></p>
            <p className="bg-[#e3b695] h-[2px] w-[13%]"></p>
          </span>
          <div className="bg-[#fffeec] rounded-b-[20px] flex flex-col items-center justify-center rounded-t border border-[#b5b5b5] w-full overflow-y-auto h-[calc(100%-32px)] p-2 mt-8">
            <div className="w-full">
              <div className="text-center">Invite friend to get bonus</div>
              <div className="flex justify-between items-center border-[#eeedd8] border rounded-lg p-2 mb-1">
                <div className="flex flex-col gap-1">
                  <div>Invite Regular user</div>
                  <div className="flex items-center gap-1">
                    <img src="/images/coin.png" alt="" />
                    <span>+3 For you and your Friend</span>
                  </div>
                </div>
                <div>
                  <img src="/images/sliver.png" alt="" />
                </div>
              </div>
              <div className="flex justify-between items-center border-[#eeedd8] border rounded-lg p-2">
                <div className="flex flex-col gap-1">
                  <div>Invite Regular user</div>
                  <div className="flex items-center gap-1">
                    <img src="/images/coin.png" alt="" />
                    <span>+3 For you and your Friend</span>
                  </div>
                </div>
                <div>
                  <img src="/images/gold.png" alt="" className="w-10" />
                </div>
              </div>
            </div>
            <div>
              <div className="text-center">Friend level up bonus</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffList;
