import { Router } from 'express';
import { listarNotas, registrarNota, atualizarNota, deletarNota } from '../controllers/notaController';
import { verificarToken } from '../middlewares/authmiddlewares';

const router = Router();

router.get("/", verificarToken, listarNotas);
router.post("/", verificarToken, registrarNota);
router.put("/:id", verificarToken, atualizarNota);
router.delete("/:id", verificarToken, deletarNota);

export default router;