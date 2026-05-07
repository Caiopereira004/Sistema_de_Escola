/**
 * @swagger
 * tags:
 *   name: Notas
 *   description: Endpoints para gerenciamento de notas
 */

import { Router } from 'express';
import {
  listarNotas,
  registrarNota,
  atualizarNota,
  deletarNota
} from '../controllers/notaController';

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
 * /notas:
 *   get:
 *     summary: Lista todas as notas
 *     tags: [Notas]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de notas retornada com sucesso
 *       401:
 *         description: Token inválido ou não fornecido
 *       500:
 *         description: Erro interno do servidor
 */
router.get("/", verificarToken, listarNotas);

/**
 * @swagger
 * /notas:
 *   post:
 *     summary: Registra uma nova nota
 *     tags: [Notas]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - alunoId
 *               - disciplinaId
 *               - valor
 *             properties:
 *               alunoId:
 *                 type: integer
 *                 example: 1
 *               disciplinaId:
 *                 type: integer
 *                 example: 2
 *               valor:
 *                 type: number
 *                 format: float
 *                 example: 8.5
 *     responses:
 *       201:
 *         description: Nota registrada com sucesso
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Token inválido ou não fornecido
 *       500:
 *         description: Erro interno do servidor
 */
router.post("/", verificarToken, registrarNota);

/**
 * @swagger
 * /{id}:
 *   put:
 *     summary: Atualiza uma nota
 *     tags: [Notas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da nota
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               alunoId:
 *                 type: integer
 *                 example: 1
 *               disciplinaId:
 *                 type: integer
 *                 example: 2
 *               valor:
 *                 type: number
 *                 format: float
 *                 example: 9.0
 *     responses:
 *       200:
 *         description: Nota atualizada com sucesso
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Token inválido ou não fornecido
 *       404:
 *         description: Nota não encontrada
 *       500:
 *         description: Erro interno do servidor
 */
router.put("/:id", verificarToken, atualizarNota);

/**
 * @swagger
 * /{id}:
 *   delete:
 *     summary: Remove uma nota
 *     tags: [Notas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da nota
 *     responses:
 *       200:
 *         description: Nota removida com sucesso
 *       401:
 *         description: Token inválido ou não fornecido
 *       404:
 *         description: Nota não encontrada
 *       500:
 *         description: Erro interno do servidor
 */
router.delete("/:id", verificarToken, deletarNota);

export default router;