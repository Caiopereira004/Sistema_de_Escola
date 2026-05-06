import { Router } from "express";
import { atualizarUsuario, deletarUsuario, listarUsuarios, criarUsuario } from "../controllers/usuarioController.js";
import { verificarToken } from "../middlewares/authmiddlewares.js";

const router = Router();

router.get("/", verificarToken, listarUsuarios);
router.post("/", verificarToken,  criarUsuario);
router.put("/:id", verificarToken, atualizarUsuario);
router.delete("/:id", verificarToken, deletarUsuario);

export default router;