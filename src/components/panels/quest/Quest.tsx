import CardTask from "@/components/ui/CardTask";
import { useFetchAchievements } from "@/lib/hooks/quest/useAchievement";
import { useFetchTasks } from "@/lib/hooks/quest/useTask";
import { useLayoutStore } from "@/stores/layoutStore";
import { useAchievementStore } from "@/stores/quest/achievementStore";
import { useTaskStore } from "@/stores/quest/taskStore";
import React, { useEffect, useState } from "react";

type Props = {};

function Task({}: Props) {
  const [activeTab, setActiveTab] = useState("Task");
  const [setShowQuestPanel] = useLayoutStore((state) => [
    state.setShowQuestPanel,
  ]);
  const [tasks] = useTaskStore((state) => [state.tasks]);
  const [achievements] = useAchievementStore((state) => [state.achievements]);
  const isActive = "!py-2 !-translate-y-[28px] !border-[#5e5745] !bg-[#fffeec]";

  const { fetchTasks } = useFetchTasks();
  const { fetchAchievements } = useFetchAchievements();

  const handleTaskTabClick = () => {
    setActiveTab("Task");
  };

  const handleAchievementTabClick = () => {
    setActiveTab("Achievement");
  };

  const handleClose = (e: any) => {
    e.stopPropagation();
    setShowQuestPanel(false);
  };
  useEffect(() => {
    fetchTasks();
    fetchAchievements();
  }, [fetchAchievements, fetchTasks]);

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
          <div className="flex">
            <div
              onClick={handleTaskTabClick}
              className={`absolute cursor-pointer border-b-0 left-1/2 -translate-x-[125px] border-2 px-6 py-1 bg-[#edc6a9] border-[#edc6a9] -translate-y-[20px] rounded-t-xl text-[#5e5745] ${
                activeTab === "Task" ? isActive : ""
              }`}
            >
              Task
            </div>
            <div
              onClick={handleAchievementTabClick}
              className={`absolute cursor-pointer border-b-0 left-1/2 -translate-x-[20px] border-2 px-6 py-1 bg-[#edc6a9] border-[#edc6a9] -translate-y-[20px] rounded-t-xl text-[#5e5745] ${
                activeTab === "Achievement" ? isActive : ""
              }`}
            >
              Achievement
            </div>
          </div>
          <span className="flex justify-between gap-2 absolute top-[14px] w-[90%] left-1/2 -translate-x-1/2">
            <p className="bg-[#e3b695] h-[2px] w-[13%]"></p>
            <p className="bg-[#e3b695] h-[2px] w-[70%]"></p>
            <p className="bg-[#e3b695] h-[2px] w-[13%]"></p>
          </span>
          <div className="bg-[#fff8de] w-full rounded-b-[20px] flex flex-col justify-between rounded-t border border-[#b5b5b5] absolute z-10 h-[calc(100%-32px)] p-2 overflow-hidden mt-8">
            {activeTab === "Task" && (
              <div className="w-full flex flex-wrap gap-1 justify-start overflow-y-auto">
                <div>Telegram task</div>
                {tasks.map((task) => (
                  <div
                    key={task.id}
                    className="w-full flex flex-col items-center"
                  >
                    <CardTask
                      type="task"
                      content={task.title}
                      img={{
                        url: task.imageUrl,
                        width: 24,
                        height: 24,
                      }}
                      reward={{
                        type: "token",
                        quantity: task.claim,
                      }}
                      button={{ text: "Go" }}
                    />
                  </div>
                ))}
              </div>
            )}
            {activeTab === "Achievement" && (
              <div className="w-full flex flex-wrap gap-1 justify-start overflow-y-auto">
                <div>Cumulative Invitations</div>
                {achievements.map((achievement) => (
                  <div
                    key={achievement.id}
                    className="w-full flex flex-col items-center"
                  >
                    <CardTask
                      type="achievement"
                      content={achievement.title}
                      img={{
                        url: achievement.imageUrl,
                        width: 24,
                        height: 24,
                      }}
                      reward={{
                        type: "token",
                        quantity: achievement.claim,
                      }}
                      button={{ text: "Claim" }}
                      progress={{
                        current: 5,
                        total: achievement.totalAchievement,
                      }}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Task;
