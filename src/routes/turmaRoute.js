/**
 * @swagger
 * tags:
 *   name: Turmas
 *   description: Endpoints para gerenciamento de turmas
 */

import { Router } from 'express';
import {
  listarTurma,
  registrarTurma,
  atualizarTurma,
  deletarTurma
} from '../controllers/turmaController';

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
 * /turmas:
 *   get:
 *     summary: Lista todas as turmas
 *     tags: [Turmas]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de turmas retornada com sucesso
 *       401:
 *         description: Token inválido ou não fornecido
 *       500:
 *         description: Erro interno do servidor
 */
router.get("/", verificarToken, listarTurma);

/**
 * @swagger
 * /turmas:
 *   post:
 *     summary: Registra uma nova turma
 *     tags: [Turmas]
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
 *               - ano
 *             properties:
 *               nome:
 *                 type: string
 *                 example: Turma A
 *               ano:
 *                 type: integer
 *                 example: 2026
 *     responses:
 *       201:
 *         description: Turma registrada com sucesso
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Token inválido ou não fornecido
 *       500:
 *         description: Erro interno do servidor
 */
router.post("/", verificarToken, registrarTurma);

/**
 * @swagger
 * /{id}:
 *   put:
 *     summary: Atualiza uma turma
 *     tags: [Turmas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da turma
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 example: Turma B
 *               ano:
 *                 type: integer
 *                 example: 2027
 *     responses:
 *       200:
 *         description: Turma atualizada com sucesso
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Token inválido ou não fornecido
 *       404:
 *         description: Turma não encontrada
 *       500:
 *         description: Erro interno do servidor
 */
router.put("/:id", verificarToken, atualizarTurma);

/**
 * @swagger
 * /{id}:
 *   delete:
 *     summary: Remove uma turma
 *     tags: [Turmas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da turma
 *     responses:
 *       200:
 *         description: Turma removida com sucesso
 *       401:
 *         description: Token inválido ou não fornecido
 *       404:
 *         description: Turma não encontrada
 *       500:
 *         description: Erro interno do servidor
 */
router.delete("/:id", verificarToken, deletarTurma);

export default router;