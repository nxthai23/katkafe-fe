import React, { useEffect, useMemo, useState } from "react";
import Select from "react-dropdown-select";
import { useFetchStaffs } from "@/lib/hooks/cat/useStaff";
import Button from "@/components/ui/Button";
import StaffCardAssign from "@/components/ui/StaffCardAssign";
import { useStaffStore } from "@/stores/staffStore";

type Props = {
  showStaffPanel: React.Dispatch<React.SetStateAction<boolean>>;
};

const StaffAssign: React.FC<Props> = ({ showStaffPanel }) => {
  const [isActive, setIsActive] = useState<number | null>(null);
  const [activeSelect, setActiveSelect] = useState("All");
  const [activeStarFilter, setActiveStarFilter] = useState<string>("All");

  const { fetchStaffs } = useFetchStaffs();
  const [staffs] = useStaffStore((state) => [state.staffs]);

  const options = [
    {
      value: 1,
      label: "All",
    },
    {
      value: 2,
      label: "Level",
    },
    {
      value: 3,
      label: "Star",
    },
  ];
  const customClass =
    "border border-[#5d5d5d] w-6 h-6 opacity-50 rounded-md text-[#fc9b53] text-xs flex items-center justify-center";
  const boxShadowStyle = {
    boxShadow: "0px -2px 0px 0px #BC9D9B inset",
  };

  const filteredStaffs = useMemo(
    () =>
      staffs.filter((staff) => {
        if (activeStarFilter === "All") {
          return true;
        } else if (activeStarFilter === "OneStar") {
          return staff.numberStar === 1;
        } else if (activeStarFilter === "TwoStar") {
          return staff.numberStar === 2;
        } else if (activeStarFilter === "ThreeStar") {
          return staff.numberStar === 3;
        }
        return false;
      }),
    [activeStarFilter, staffs]
  );

  const handleClose = () => {
    showStaffPanel(false);
  };

  const handleSelectClick = (selectName: string) => {
    setActiveSelect(selectName);
    setActiveStarFilter(selectName);
  };

  const handleChooseClick = (staffId: number) => {
    if (staffId === isActive) {
      setIsActive(null);
    } else {
      setIsActive(staffId);
    }
  };
  const handleAssign = () => {
    showStaffPanel(false);
  };

  useEffect(() => {
    fetchStaffs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="Game-panel bg-[#2e2e2e] w-full h-full absolute z-10 p-4">
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
          <div className="absolute left-1/2 -translate-x-1/2 -translate-y-[28px] border-2 px-6 py-2 border-orange-90 bg-orange-10 rounded-t-xl text-orange-90">
            Staff List
          </div>
          <span className="flex justify-between gap-2 absolute top-[14px] w-[90%] left-1/2 -translate-x-1/2">
            <p className="bg-red-10 h-[2px] w-[13%]"></p>
            <p className="bg-red-10 h-[2px] w-[70%]"></p>
            <p className="bg-red-10 h-[2px] w-[13%]"></p>
          </span>

          <div className="w-full bg-[#fff8de] rounded-b-[20px] rounded-t border border-gray-20 absolute z-10 h-[calc(100%-32px)] p-[3px] overflow-hidden mt-8">
            <div className="flex mt-2 items-center justify-between cursor-pointer">
              <Select
                options={options}
                onChange={(values: any) => console.log(values)}
                values={[{ value: 1, label: "All" }]}
                className="z-20 !w-[86px] h-6 !border-[#5d5d5d] !border !rounded-md"
                placeholder=""
                style={boxShadowStyle}
              />
              <div className="flex items-center gap-1">
                <span
                  onClick={() => handleSelectClick("All")}
                  className={`${customClass} ${
                    activeSelect === "All" ? "!opacity-100" : ""
                  }`}
                  style={boxShadowStyle}
                >
                  All
                </span>
                <span
                  onClick={() => handleSelectClick("OneStar")}
                  className={`${customClass} ${
                    activeSelect === "OneStar" ? "!opacity-100" : ""
                  }`}
                  style={boxShadowStyle}
                >
                  <img src="/images/OneStar.png" alt="" />
                </span>
                <span
                  onClick={() => handleSelectClick("TwoStar")}
                  className={`${customClass} ${
                    activeSelect === "TwoStar" ? "!opacity-100" : ""
                  }`}
                  style={boxShadowStyle}
                >
                  <img src="/images/TwoStar.png" alt="" />
                </span>
                <span
                  onClick={() => handleSelectClick("ThreeStar")}
                  className={`${customClass} ${
                    activeSelect === "ThreeStar" ? "!opacity-100" : ""
                  }`}
                  style={boxShadowStyle}
                >
                  <img src="/images/ThreeStar.png" alt="" />
                </span>
              </div>
            </div>
            <div
              className="mt-2 gap-2 flex flex-wrap max-h-[383px] overflow-y-auto"
              style={{
                scrollbarWidth: "thin",
                scrollbarColor: "#666666 #ffe",
              }}
            >
              {filteredStaffs.map((staff) => (
                <div
                  key={staff.id}
                  className="w-[100px] h-[130px]"
                  onClick={() => handleChooseClick(staff.id)}
                >
                  <StaffCardAssign cat={staff} active={isActive === staff.id} />
                </div>
              ))}
            </div>
          </div>
          <div className=" absolute z-40 left-1/2 -translate-x-1/2 bottom-[12px]">
            <hr className="w-[330px] border-[#e8ddbd] mb-2" />
            <div
              className="flex flex-wrap gap-2 justify-center"
              onClick={handleAssign}
            >
              {["Assign"].map((item, index) => (
                <div key={index} className="w-[172px] h-[39px] -mb-[3px]">
                  <Button>{item}</Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffAssign;
