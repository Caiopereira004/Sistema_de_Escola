import express from "express";
import authRoute from "./routes/authRoute.js";
import disciplinaRoute from "./routes/disciplinaRoute.js";
import notaRoute from "./routes/notaRoute.js";
import professorRoute from "./routes/professorRoute.js";
import turmaRoute from "./routes/turmaRoute.js";
import usuarioRoute from "./routes/usuarioRoute.js";

const app = express();

app.use(express.json());
app.use("/auth", authRoute);
app.use("/usuarios", usuarioRoute);
app.use("/disciplinas", disciplinaRoute);
app.use("/notas", notaRoute);
app.use("/professores", professorRoute);
app.use("/turmas", turmaRoute);

export default app;