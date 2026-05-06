import { listarTurmasDB, registrarTurmaDB, atualizarTurmaDB, deletarTurmaDB } from "../models/turmaModel.js";

export const listarTurma = async (req, res) => {
    try {
        const turmas = await listarTurmasDB();
        return res.json(turmas);

    } catch (error) {
        return res.status(500).json({msg: "Erro ao listar turmas!", erro: error.message});
    }
};

export const registrarTurma = async (req, res) => {
    const { nome, ano_letivo, professor_id } = req.body;

    try {
        if (!nome || !ano_letivo || !professor_id) {
            return res.status(400).json({msg: "Nome, ano letivo e id do professor são obrigatórios!"});
        }

        await registrarTurmaDB(nome, ano_letivo, professor_id);

        return res.status(201).json({msg: "Turma registrada com sucesso!"});

    } catch (error) {
        return res.status(500).json({msg: "Erro ao registrar turma!", erro: error.message});
    }
};

export const atualizarTurma = async (req, res) => {
    const { id } = req.params;
    const { nome, ano_letivo, professor_id } = req.body;

    try {
        if (!nome || !ano_letivo || !professor_id) {
            return res.status(400).json({msg: "Nome, ano letivo e professor_id são obrigatórios!"});
        }

        await atualizarTurmaDB(id, nome, ano_letivo, professor_id);

        return res.status(200).json({msg: "Turma atualizada com sucesso!"});

    } catch (error) {
        return res.status(500).json({msg: "Erro ao atualizar turma!", erro: error.message});
    }
};

export const deletarTurma = async (req, res) => {
    const { id } = req.params;

    try {
        await deletarTurmaDB(id);

        return res.status(200).json({msg: "Turma deletada com sucesso!"});

    } catch (error) {
        return res.status(500).json({msg: "Erro ao deletar turma!", erro: error.message});
    }
};