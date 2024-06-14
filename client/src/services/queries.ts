import { useQuery } from "@tanstack/react-query";
import { getTodoById, getTodos } from "./api";

export const useTodos = () => {
  return useQuery({
    queryKey: ["todos"],
    queryFn: getTodos,
  });
};


