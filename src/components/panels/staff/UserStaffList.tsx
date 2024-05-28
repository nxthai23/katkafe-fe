import React, { useEffect, useState } from "react";
import CatCard from "../../ui/CatCard";
import Select from "react-dropdown-select";
import { useFetchStaffs } from "@/lib/hooks/cat/useStaff";
import CardInfo from "@/components/ui/CardInfo";
import { useStaffStore } from "@/stores/staffStore";
import { Staff } from "@/types/common-types";
import { useLayoutStore } from "@/stores/layoutStore";

const StaffList: React.FC = () => {
  const [showCardInfo, setShowCardInfo] = useState(false);
  const [activeStarFilter, setActiveStarFilter] = useState<string>("All");
  const [activeSelect, setActiveSelect] = useState("All");
  const [showStaffList, setShowStaffList] = useState(true);
  const [isActive, setIsActive] = useState<number | null>(null);

  const { fetchStaffs } = useFetchStaffs();
  const [staffs, setCurrentStaff] = useStaffStore((state) => [
    state.staffs,
    state.setCurrentStaff,
  ]);
  const [setShowStaffPanel] = useLayoutStore((state) => [
    state.setShowStaffPanel,
  ]);

  const options = [
    {
      value: "All",
      label: "All",
    },
    {
      value: "LevelAsc",
      label: "Level Asc",
    },
  ];

  const customClass =
    "border border-[#5d5d5d] w-6 h-6 opacity-50 rounded-md text-[#fc9b53] text-xs flex items-center justify-center";
  const boxShadowStyle = {
    boxShadow: "0px -2px 0px 0px #BC9D9B inset",
  };

  const getFilteredStaffs = () => {
    let filtered = staffs;

    if (activeStarFilter !== "All") {
      filtered = filtered.filter((staff) => {
        if (activeStarFilter === "OneStar") return staff.numberStar === 1;
        if (activeStarFilter === "TwoStar") return staff.numberStar === 2;
        if (activeStarFilter === "ThreeStar") return staff.numberStar === 3;
        return true;
      });
    }

    if (activeSelect === "LevelAsc") {
      filtered = filtered.slice().sort((a, b) => a.level - b.level);
    }

    return filtered;
  };

  const handleChooseClick = (staff: Staff) => {
    setCurrentStaff(staff);

    if (Number(staff._id) === isActive) {
      setIsActive(null);
    } else {
      setIsActive(Number(staff._id));
    }
    setShowCardInfo(!showCardInfo);
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setActiveSelect(event.target.value);
  };

  const handleStarFilterClick = (filterName: string) => {
    setActiveStarFilter(filterName);
  };

  const handleClose = () => {
    setShowStaffPanel(false);
  };
  const handleCloseDetail = () => {
    setShowCardInfo(false);
  };

  useEffect(() => {
    fetchStaffs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="list-panel bg-[#2e2e2e] w-full h-full absolute z-10 p-4 top-0">
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
            <p className="bg-[#e3b695] h-[2px] w-[13%]"></p>
            <p className="bg-[#e3b695] h-[2px] w-[70%]"></p>
            <p className="bg-[#e3b695] h-[2px] w-[13%]"></p>
          </span>

          <div className="w-full bg-[#fff8de] rounded-b-[20px] rounded-t border border-gray-20 absolute z-10 h-[calc(100%-32px)] p-1 overflow-hidden mt-8">
            {showStaffList && (
              <div className="flex mt-2 items-center justify-between cursor-pointer">
                <select
                  className="z-20 h-7 !border-[#5d5d5d] !border !rounded-md bg-[#FFFDE9] px-1 uppercase"
                  style={boxShadowStyle}
                  onChange={handleSelectChange}
                  value={activeSelect}
                >
                  {options.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <div className="flex items-center gap-1">
                  <span
                    onClick={() => handleStarFilterClick("All")}
                    className={`${customClass} ${
                      activeStarFilter === "All" ? "!opacity-100" : ""
                    }`}
                    style={boxShadowStyle}
                  >
                    All
                  </span>
                  <span
                    onClick={() => handleStarFilterClick("OneStar")}
                    className={`${customClass} ${
                      activeStarFilter === "OneStar" ? "!opacity-100" : ""
                    }`}
                    style={boxShadowStyle}
                  >
                    <img src="/images/OneStar.png" alt="" />
                  </span>
                  <span
                    onClick={() => handleStarFilterClick("TwoStar")}
                    className={`${customClass} ${
                      activeStarFilter === "TwoStar" ? "!opacity-100" : ""
                    }`}
                    style={boxShadowStyle}
                  >
                    <img src="/images/TwoStar.png" alt="" />
                  </span>
                  <span
                    onClick={() => handleStarFilterClick("ThreeStar")}
                    className={`${customClass} ${
                      activeStarFilter === "ThreeStar" ? "!opacity-100" : ""
                    }`}
                    style={boxShadowStyle}
                  >
                    <img src="/images/ThreeStar.png" alt="" />
                  </span>
                </div>
              </div>
            )}
            <div
              className="mt-2 gap-[6px] flex flex-wrap max-h-[440px] overflow-y-auto"
              style={{
                scrollbarWidth: "thin",
                scrollbarColor: "#666666 #ffe",
              }}
            >
              {getFilteredStaffs().map((staff) => (
                <div
                  key={staff._id}
                  className="w-[100px] h-[130px] cursor-pointer"
                  onClick={() => handleChooseClick(staff)}
                >
                  <CatCard cat={staff} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {showCardInfo && <CardInfo onClose={handleCloseDetail} />}
    </div>
  );
};

export default StaffList;
