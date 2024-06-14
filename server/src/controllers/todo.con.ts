import { Request, Response } from "express";
import todos from "../todo";
import { Todo } from "../interfaces/TodoInterface";

export const getTodos = (req: Request, res: Response) => {
  res.json(todos);
};

export const createTodo = (req: Request, res: Response) => {
  let { title, description, completed }: Todo = req.body;

  if (!description) {
    return res.json({ msg: "please provide a description" });
  }

  if (!title) {
    const choped = description.split(" ");
    for (let i = 0; i < 5; i++) {
      title += choped[i].concat(i < 4 ? " " : "...");
    }
  }

  const new_todo: Todo = {
    id: todos.length + 1,
    title,
    description,
    created: new Date().toISOString(),
    completed,
  };

  todos.push(new_todo);

  res.json({ msg: "new todo created!", new_todo });
};

export const updateTodo = (req: Request, res: Response) => {
  const { title, description, id }: Todo = req.body;

  const todo = todos.find((t) => t.id === id)!;

  if (title === todo.title && description === todo.description)
    return res.json({ msg: "update failed" });

  const updated_todo = {
    id: todo?.id,
    title: title !== todo.title ? title : todo.title,
    description: description ? description : todo?.description,
    created: new Date().toISOString(),
  };

  const index = todos.indexOf(todo);

  todos[index] = { ...todo, ...updated_todo };

  console.log(updated_todo);

  res.json({ msg: "todo updated", updated_todo });
};

export const deleteTodo = (req: Request, res: Response) => {
  const { id } = req.body;

  const index = todos.findIndex((t) => t.id === id);

  todos.splice(index, 1);

  todos.forEach((t, i) => (t.id = i + 1));

  res.json({ msg: "todo successfully deleted" });
};

export const updateState = (req: Request, res: Response) => {
  const { id, newState } = req.body;

  const index = todos.findIndex((t) => t.id === id);

  todos[index] = { ...todos[index], completed: newState };

  console.log(todos[index]);
  return res.json({ msg: "todo successfully mark" });
};
