import { Router } from 'express';
import { listarDisciplinas, registrarDisciplina, atualizarDisciplina, deletarDisciplina } from "../controllers/disciplinaController";
import { verificarToken } from '../middlewares/authmiddlewares';

const router = Router();

router.get("/", verificarToken, listarDisciplinas);
router.post("/", verificarToken, registrarDisciplina);
router.put("/:id", verificarToken, atualizarDisciplina);
router.delete("/:id", verificarToken, deletarDisciplina);

export default router;