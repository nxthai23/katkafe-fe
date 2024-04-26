import React from "react";
import Image from "next/image";
import { get } from "lodash";
import { Task } from "@/types/quest";
import Button from "./Button";

type Props = {
  task: Task;
};

const CardTask = ({ task }: Props) => {
  const id = get(task, "id", "");
  const imageUrl = get(task, "imageUrl", "");
  const title = get(task, "title", "");
  const totalTask = get(task, "totalTask", 0);
  const claim = get(task, "claim", 0);

  return (
    <div className="bg-[#fffeec] border-[#e8ddbd] border rounded-lg w-full h-full p-2">
      <div className="flex gap-8 items-start justify-between">
        <div className="flex flex-col">
          <div className="rounded-full w-6 h-6">
            <Image src={imageUrl} alt="cat pic" width={24} height={24} />
          </div>
          <div>{title}</div>
        </div>
        <div className="flex items-center gap-1">
          <div>{claim}</div>
          <div>
            <img src="/images/coin.png" alt="" />
          </div>
        </div>
      </div>
      <div className="w-full flex justify-center mt-2">
        <div className="w-[76px] h-[28px] flex justify-center">
          <Button>Go</Button>
        </div>
      </div>
    </div>
  );
};

export default CardTask;
