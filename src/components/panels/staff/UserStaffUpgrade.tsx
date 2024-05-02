import React, { useEffect, useMemo, useState } from "react";
import CatCard from "../../ui/CatCard";
import Select from "react-dropdown-select";
import { useFetchStaffs } from "@/lib/hooks/useStaff";
import Button from "@/components/ui/Button";
import { useStaffStore } from "@/stores/staffStore";
import { Staff } from "@/types/common-types";

type Props = {
  showStaffUpgradePanel: React.Dispatch<React.SetStateAction<boolean>>;
};

const StaffUpgrade: React.FC<Props> = ({ showStaffUpgradePanel }) => {
  const [activeSelect, setActiveSelect] = useState("All");
  const [activeStarFilter, setActiveStarFilter] = useState<string>("All");
  const [selectedCards, setSelectedCards] = useState<Staff[]>([]);
  const [staffs, setCurrentStaff] = useStaffStore((state) => [
    state.staffs,
    state.setCurrentStaff,
  ]);

  const customClass =
    "border border-[#5d5d5d] w-6 h-6 opacity-50 rounded-md text-[#fc9b53] text-xs flex items-center justify-center";
  const boxShadowStyle = {
    boxShadow: "0px -2px 0px 0px #BC9D9B inset",
  };
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
  const { fetchStaffs } = useFetchStaffs();

  const handleBack = () => {
    showStaffUpgradePanel(false);
  };
  const handleSelectClick = (selectName: string) => {
    setActiveSelect(selectName);
    setActiveStarFilter(selectName);
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
    [staffs, activeStarFilter]
  );

  const handleChooseClick = (staff: any) => {
    if (selectedCards.includes(staff)) {
      setSelectedCards(selectedCards.filter((id) => id !== staff));
    } else {
      setSelectedCards([...selectedCards, staff]);
    }
  };
  const handleClickAssign = () => {
    showStaffUpgradePanel(false);
  };
  useEffect(() => {
    fetchStaffs();
  }, [fetchStaffs]);

  return (
    <div className="grade-panel bg-[#2e2e2e] w-full h-full absolute z-50 p-4">
      <div className="rounded-3xl border-solid border-[#5e5745] border-4 h-[calc(100%-16px)] mt-4">
        <div className="rounded-[21px] border-solid border-[#ffedbb] border-4 bg-[#ffedbb] h-full relative">
          <div className="absolute -top-4 -left-3 bg-[#fffde9] rounded-full border-[#ededed] cursor-pointer">
            <img
              className="w-8 h-8"
              src="/images/back.png"
              alt=""
              onClick={handleBack}
            />
          </div>
          <div className="absolute left-1/2 -translate-x-1/2 -translate-y-[28px] border-2 px-6 py-2 border-[#5e5745] bg-[#fffeec] rounded-t-xl text-[#5e5745]">
            Staff Upgrade
          </div>
          <span className="flex justify-between gap-2 absolute top-[14px] w-[90%] left-1/2 -translate-x-1/2">
            <p className="bg-[#e3b695] h-[2px] w-[13%]"></p>
            <p className="bg-[#e3b695] h-[2px] w-[70%]"></p>
            <p className="bg-[#e3b695] h-[2px] w-[13%]"></p>
          </span>

          <div className="w-full bg-[#fff8de] rounded-b-[20px] rounded-t border border-[#b5b5b5] absolute z-10 h-[calc(100%-32px)] p-1 overflow-hidden mt-8">
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
              className="mt-2 gap-[6px] flex flex-wrap max-h-[383px] overflow-y-auto"
              style={{
                scrollbarWidth: "thin",
                scrollbarColor: "#666666 #ffe",
              }}
            >
              {filteredStaffs.map((staff) => (
                <div
                  key={staff.id}
                  className="w-[100px] h-[130px] cursor-pointer"
                >
                  <CatCard
                    cat={staff}
                    active={selectedCards.includes(staff)}
                    onClick={() => handleChooseClick(staff.id)}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className=" absolute z-40 left-1/2 -translate-x-1/2 bottom-[12px]">
            <hr className="w-[330px] border-[#e8ddbd] mb-2" />
            <div
              className="flex flex-wrap gap-2 justify-center"
              onClick={handleClickAssign}
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

export default StaffUpgrade;
