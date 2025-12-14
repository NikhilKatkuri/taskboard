import type { taskData } from "@schemas/task/Task";
import { API_ENDPOINTS } from "@config/constants";

interface TaskHandlerResponse {
  ok: boolean;
  status: number;
}

export const usehandleTask = (token: string) => {
  const createTask = async (data: taskData): Promise<TaskHandlerResponse> => {
    const URI = API_ENDPOINTS.TASKS.CREATE;
    const res = await fetch(URI, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    await res.json();
    return { ok: res.ok, status: res.status };
  };

  const updateTask = async (
    data: taskData,
    id: string
  ): Promise<TaskHandlerResponse | undefined> => {
    if (!id) return undefined;
    const URI = API_ENDPOINTS.TASKS.UPDATE(id);

    const res = await fetch(URI, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    await res.json();
    return { ok: res.ok, status: res.status };
  };

  const deleteTask = async (
    id: string
  ): Promise<TaskHandlerResponse | undefined> => {
    if (!id) return undefined;
    const URI = API_ENDPOINTS.TASKS.DELETE(id);

    const res = await fetch(URI, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    await res.json();
    return { ok: res.ok, status: res.status };
  };

  return { createTask, updateTask, deleteTask };
};
