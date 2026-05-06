import { Router } from 'express';
import { listarTurma, registrarTurma, atualizarTurma, deletarTurma } from '../controllers/turmaController';
import { verificarToken } from '../middlewares/authmiddlewares';

const router = Router();

router.get("/", verificarToken, listarTurma);
router.post("/", verificarToken, registrarTurma);
router.put("/:id", verificarToken, atualizarTurma);
router.delete("/:id", verificarToken, deletarTurma);

export default router;