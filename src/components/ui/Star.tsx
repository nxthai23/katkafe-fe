import React from "react";

type StarProps = {
    numberStar: number;
    customClass: string;
};

const Star: React.FC<StarProps> = ({ numberStar, customClass }) => {
    return (
        <div className={customClass}>
            <div className="bg-[url('/images/Star.png')] w-full h-full bg-no-repeat bg-cover"></div>
        </div>
    );
};

export default Star;
