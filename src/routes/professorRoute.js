/**
 * @swagger
 * tags:
 *   name: Professores
 *   description: Endpoints para gerenciamento de professores
 */

import { Router } from 'express';
import {
  listarProfessores,
  registrarProfessor,
  atualizarProfessor,
  deletarProfessor
} from '../controllers/professorController';

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
 * /professores:
 *   get:
 *     summary: Lista todos os professores
 *     tags: [Professores]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de professores retornada com sucesso
 *       401:
 *         description: Token inválido ou não fornecido
 *       500:
 *         description: Erro interno do servidor
 */
router.get("/", verificarToken, listarProfessores);

/**
 * @swagger
 * /professores:
 *   post:
 *     summary: Registra um novo professor
 *     tags: [Professores]
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
 *               - email
 *               - disciplinaId
 *             properties:
 *               nome:
 *                 type: string
 *                 example: Carlos Silva
 *               email:
 *                 type: string
 *                 format: email
 *                 example: carlos@email.com
 *               disciplinaId:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Professor registrado com sucesso
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Token inválido ou não fornecido
 *       500:
 *         description: Erro interno do servidor
 */
router.post("/", verificarToken, registrarProfessor);

/**
 * @swagger
 * /{id}:
 *   put:
 *     summary: Atualiza um professor
 *     tags: [Professores]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do professor
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 example: Ana Souza
 *               email:
 *                 type: string
 *                 format: email
 *                 example: ana@email.com
 *               disciplinaId:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       200:
 *         description: Professor atualizado com sucesso
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Token inválido ou não fornecido
 *       404:
 *         description: Professor não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.put("/:id", verificarToken, atualizarProfessor);

/**
 * @swagger
 * /{id}:
 *   delete:
 *     summary: Remove um professor
 *     tags: [Professores]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do professor
 *     responses:
 *       200:
 *         description: Professor removido com sucesso
 *       401:
 *         description: Token inválido ou não fornecido
 *       404:
 *         description: Professor não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.delete("/:id", verificarToken, deletarProfessor);

export default router;