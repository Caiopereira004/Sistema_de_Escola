import { listarProfessoresDB, registrarProfessorDB, atualizarProfessorDB, deletarProfessorDB } from "../models/professorModel";

export const listarProfessores = async (req,res) =>{
    try {
        const professores = await listarProfessoresDB();

        return res.json(professores)

    } catch (error) {
        console.log(error);

        return res.status(500).json({msg: "Erro ao listar professores"});
    }
}

export const registrarProfessor = async (req,res) =>{
    const {nome, email, telefone, especialidade} = req.body;

    try{
        if(!nome || !email || !telefone || !especialidade){
            return res.status(400).json({msg: "Nome, email, telefone e especialidade são obrigatório!"});
        }

        await registarProfessorDB();

        return res.status(201).json({msg: "Professor(a) registrado(a) com sucesso!"});

    } catch(error){
        return res.status(500).json({msg: "Erro ao registrar professor(a)", erro: error.message});
    }
}

export const atualizarProfessor = async (req, res) =>{
    const {id} = req.params;
    const {nome, email, telefone, especialidade} = req.body;

    try {
        if(!nome || !email || !telefone || !especialidade){
            return res.status(400).json({msg: "Nome, email, telefone e especialidade são obrigatórios!"});
        }

        const professor = await atualizarProfessorDB();

        if (professor.affectedRows === 0) {
            return res.status(404).json({ msg: "Professor não encontrado!" });
}

        return professor;

        return res.status(201).json({msg: "Professor atualizado com sucesso!"});

    } catch (error) {
        return res.status(500).json({msg: "Erro ao atualizar professor(a)"});
    }
}

export const deletarProfessor = async (req,res) =>{
    try{
    const {id} = req.params;

    const resultado = await deletarProfessorDB(id);

    if(resultado.affectedRows === 0){
        return res.status(404).json({msg: "Usuário não encontrado!"});
    }

    res.status(200).json({msg:"Usuário deletado com sucesso!"});
    
    }catch(error){
        return res.status(500).json({msg: "Erro ao deletar usuário!"});
    }
}
