import { Router } from "express";
import { registrar, login } from "../controllers/authController.js";

const router = Router();

router.post("/registrar", registrar);
router.post("/auth/login", login);

export default router;