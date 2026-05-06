import { listarNotasDB, registrarNotaDB, atualizarNotaDB, deletarNotaDB } from "../models/notaModel.js";

export const listarNotas = async (req, res) =>{
    try{
        const notas = await listarNotasDB();

        return res.json(notas);

    }catch(error){
        return res.status(500).json({msg: "Erro ao listar notas!", erro: error.message});
    }
} 

export const registrarNota = async (req, res) =>{
    const {aluno_id, disciplina_id, nota, bimestre, observacao} = req.body;

    try{
        if(!aluno_id || !disciplina_id || !nota || !bimestre || !observacao){
            return res.status(400).json({msg: "Id do aluno, Id da disciplina, nota, bimestre e observação são obrigatórios!"});
        }

        await registrarNotaDB(aluno_id, disciplina_id, nota, bimestre, observacao);

        return res.status(201).json({msg: "Nota registrada com sucesso!"});

    }catch(error){
        return res.status(500).json({msg: "Erro ao registrar nota!", erro: error.message});
    }
}

export const atualizarNota = async (req,res) =>{
    const {id} = req.params;
    const {aluno_id, disciplina_id, nota, bimestre, observacao} = req.body;

    try{
        if(!aluno_id || !disciplina_id || !nota || !bimestre || !observacao){
            return res.status(400).json({msg: "Todos os campos são obrigatórios!"});
        }

        await atualizarNotaDB(id, aluno_id, disciplina_id, nota, bimestre, observacao);

        return res.status(200).json({msg: "Nota atualizada com sucesso!"});

    }catch(error){
        return res.status(500).json({msg: "Erro ao atualizar nota!", erro: error.message});
    }
}

export const deletarNota = async (req,res) =>{
    const {id} = req.params;

    try{
        await deletarNotaDB(id);

        return res.status(200).json({msg: "Nota deletada com sucesso!"});

    }catch(error){
        return res.status(500).json({msg: "Erro ao deletar nota!", erro: error.message});
    }
}