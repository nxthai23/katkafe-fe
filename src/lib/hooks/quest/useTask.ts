import { getTasks } from "@/requests/quest/task";
import { useTaskStore } from "@/stores/quest/taskStore";

export const useFetchTasks = () => {
  const [setTasks] = useTaskStore((state) => [state.setTasks]);

  const fetchTasks = async () => {
    try {
      const response = await getTasks();
      setTasks(response);
    } catch (error) {
      console.error("Error fetching", error);
    }
  };

  return {
    fetchTasks,
  };
};
