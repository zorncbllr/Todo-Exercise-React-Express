import { Router } from "express";
import {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} from "../controllers/todo.con";
const router = Router();

router
  .route("/")
  .get(getTodos)
  .post(createTodo)
  .patch(updateTodo)
  .delete(deleteTodo);

export default router;
