/**
 * @swagger
 * tags:
 *   name: Disciplinas
 *   description: Endpoints para gerenciamento de disciplinas
 */

import { Router } from 'express';
import {
  listarDisciplinas,
  registrarDisciplina,
  atualizarDisciplina,
  deletarDisciplina
} from "../controllers/disciplinaController";

import { verificarToken } from '../middlewares/authmiddlewares';

const router = Router();

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * /disciplinas:
 *   get:
 *     summary: Lista todas as disciplinas
 *     tags: [Disciplinas]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de disciplinas retornada com sucesso
 *       401:
 *         description: Token não fornecido ou inválido
 *       500:
 *         description: Erro interno do servidor
 */
router.get("/", verificarToken, listarDisciplinas);

/**
 * @swagger
 * /disciplinas:
 *   post:
 *     summary: Registra uma nova disciplina
 *     tags: [Disciplinas]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *               - cargaHoraria
 *             properties:
 *               nome:
 *                 type: string
 *                 example: Matemática
 *               cargaHoraria:
 *                 type: integer
 *                 example: 80
 *     responses:
 *       201:
 *         description: Disciplina registrada com sucesso
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Token inválido ou não fornecido
 *       500:
 *         description: Erro interno do servidor
 */
router.post("/", verificarToken, registrarDisciplina);

/**
 * @swagger
 * /{id}:
 *   put:
 *     summary: Atualiza uma disciplina
 *     tags: [Disciplinas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da disciplina
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 example: Física
 *               cargaHoraria:
 *                 type: integer
 *                 example: 60
 *     responses:
 *       200:
 *         description: Disciplina atualizada com sucesso
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Token inválido ou não fornecido
 *       404:
 *         description: Disciplina não encontrada
 *       500:
 *         description: Erro interno do servidor
 */
router.put("/:id", verificarToken, atualizarDisciplina);

/**
 * @swagger
 * /{id}:
 *   delete:
 *     summary: Remove uma disciplina
 *     tags: [Disciplinas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da disciplina
 *     responses:
 *       200:
 *         description: Disciplina removida com sucesso
 *       401:
 *         description: Token inválido ou não fornecido
 *       404:
 *         description: Disciplina não encontrada
 *       500:
 *         description: Erro interno do servidor
 */
router.delete("/:id", verificarToken, deletarDisciplina);

export default router;