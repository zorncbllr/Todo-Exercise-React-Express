import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import Todo, { Completed, Data } from "../interfaces/Todo";
import { createTodo, deleteTodo, updateTodoState, updateTodo } from "./api";

export const useCreateTodo = () => {
  const client = useQueryClient();

  return useMutation({
    mutationFn: (data: Todo) => createTodo(data),
    onSettled: async (err) => {
      if (err) console.log(err);

      await client.invalidateQueries({ queryKey: ["todos"] });
    },
  });
};

export const useCompletedState = () => {
  const client = useQueryClient();

  return useMutation({
    mutationFn: (state: Completed) => updateTodoState(state),
    onSettled: async (err) => {
      if (err) console.log(err);

      client.invalidateQueries({ queryKey: ["todos"] });
    },
  });
};

export const useEditTodo = () => {
  const client = useQueryClient();

  return useMutation({
    mutationFn: (data: Data) => updateTodo(data),
    onSettled: (err) => {
      if (err) console.log(err);

      client.invalidateQueries({ queryKey: ["todos"] });
    },
  });
};

export const useDeleteTodo = () => {
  const client = useQueryClient();

  return useMutation({
    mutationFn: (target: Todo) => deleteTodo(target),
    onSettled: (err) => {
      if (err) console.log(err);

      client.invalidateQueries({ queryKey: ["todos"] });
    },
  });
};
