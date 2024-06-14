import axios from "axios";
import Todo, { Completed, Data } from "../interfaces/Todo";

const baseURL = "http://localhost:3000";
const axiosInstance = axios.create({ baseURL });

export const getTodos = async () => {
  return (await axiosInstance.get<Todo[]>("/api/todos")).data;
};

export const createTodo = async (data: Todo) => {
  await axiosInstance.post("/api/todos", data);
};

export const getTodoById = async (id: number) => {
  return (await axiosInstance.get<Todo>(`/api/todos/${id}`)).data;
};

export const updateTodoState = async (state: Completed) => {
  await axiosInstance.patch<Completed>("/api/todos/state", state);
};

export const updateTodo = async (data: Data) => {
  await axiosInstance.patch<Data>("/api/todos", data);
};

export const deleteTodo = async (target: Todo) => {
  await axiosInstance.delete<Todo>("api/todos", {
    data: target,
  });
};
