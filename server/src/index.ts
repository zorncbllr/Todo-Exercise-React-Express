import express from "express";
import root from "./routes/root";
import state from "./routes/state";
import cors from "cors";
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "PATCH", "POST", "DELETE"],
  })
);

app.use("/api/todos", root);
app.use("/api/todos/state", state);

app.listen(PORT, () => console.log(`app running on port ${PORT}`));
