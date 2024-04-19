import React, { useState } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import Button from "../../ui/Button";
import CatCard from "../../ui/CatCard";

type Props = {
    showGamePanel: React.Dispatch<React.SetStateAction<boolean>>;
};

const Game: React.FC<Props> = ({ showGamePanel }) => {
    const handleClose = () => {
        showGamePanel(false);
    };

    const data = {
        header: "Minigame",
        imageUrl: "/images/Cat.png",
        title: "Select the name of the food",
        correct: "Correct answer: 1/10",
        level: "100",
        name: "NAGAMOTO",
        description: "He doesn't like fish",
        numberStar: 3,
        backgroundUrl: "/images/background-cat.png",
    };

    return (
        <div className="Game-panel bg-[#633e22] w-full h-full absolute z-10 p-4">
            <div className="rounded-3xl border-solid border-[#5e5745] border-4 h-[calc(100%-16px)] mt-4">
                <div className="rounded-[21px] border-solid border-[#ffedbb] border-4 bg-[#ffedbb] h-full relative">
                    <div className="absolute -right-[15px] -top-[13px] bg-[#fffde9] rounded-full border-[#ededed] cursor-pointer">
                        <IoIosCloseCircleOutline
                            size="28"
                            onClick={handleClose}
                        />
                    </div>
                    <div className="absolute left-1/2 -translate-x-1/2 -translate-y-[28px] border-2 px-6 py-2 border-[#5e5745] bg-[#fffeec] rounded-t-xl text-[#5e5745]">
                        {data.header}
                    </div>
                    <span className="flex justify-between gap-2 absolute top-[14px] w-[90%] left-1/2 -translate-x-1/2">
                        <p className="bg-[#e3b695] h-[2px] w-[13%]"></p>
                        <p className="bg-[#e3b695] h-[2px] w-[70%]"></p>
                        <p className="bg-[#e3b695] h-[2px] w-[13%]"></p>
                    </span>
                    <div className="text-center flex flex-col items-center rounded-[18px] border-solid border-[#b5b5b5] border h-[calc(100%-32px)] bg-[#fffeec] mt-8">
                        <div className="font-medium mt-8 text-xl">
                            {data.title}
                        </div>
                        <div className="font-normal text-base">
                            {data.correct}
                        </div>
                        <div className="w-[160px] h-[208px] mt-8 mb-14">
                            {/* <CatCard {...data} /> */}
                        </div>
                        <div className="flex flex-wrap gap-2 justify-center">
                            {["Burger", "Pizza", "Pho", "Sushi"].map(
                                (item, index) => (
                                    <div key={index}>
                                        <Button>{item}</Button>
                                    </div>
                                )
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Game;
