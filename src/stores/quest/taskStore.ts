import { Task } from "@/types/quest";
import { create } from "zustand";

type States = {
  tasks: Task[];
  currentTask: Task | null;
};

type Actions = {
  setTasks: (tasks: Task[]) => void;
  setCurrentTask: (task: Task) => void;
};

const defaultStates = {
  currentTask: null,
  tasks: [],
};

export const useTaskStore = create<States & Actions>((set, get) => ({
  ...defaultStates,
  setTasks: (tasks: Task[]) => {
    set({
      tasks,
    });
  },
  setCurrentTask: (task: Task) => {
    set({
      currentTask: task,
    });
  },
}));
