import { Router } from "express";
import { updateState } from "../controllers/todo.con";
const router = Router();

router.patch("/", updateState);

export default router;
