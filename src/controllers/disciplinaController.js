import { listarDisciplinasDB, registrarDisciplinaDB, atualizarDisciplinaDB, deletarDisciplinaDB} from "../models/disciplinaModel";

export const listarDisciplinas = async (req,res) =>{
    try{
        const disciplinas = await listarDisciplinasDB();
            res.json (disciplinas);

    }catch(error){
        return res.status(500).json({msg: "Erro ao listar as disciplinas", erro: error.message});
    }
}

export const registrarDisciplina = async (req,res) =>{
const {nome, carga_horaria} = req.body;

    try{
        if(!nome || !carga_horaria){
            return res.status(400).json({msg: "Nome e carga horária são obrigatórios!"})
        }

        await registrarDisciplinaDB(nome, carga_horaria);

        return res.status(201).json({msg: "Disciplina registrada com sucesso!"});

    }catch(error){
        return res.status(500).json({msg: "Erro ao registrar disciplina!"});
    }
}

export const atualizarDisciplina = async (req,res) =>{
    const {id} = req.params;
    const {nome, carga_horaria} = req.body;

    try{
        if(!nome || !carga_horaria){
            return res.status(400).json({msg: "Nome e carga horária são obrigatórios!"});
        }

        await atualizarDisciplinaDB(id, nome, carga_horaria);

        return res.status(200).json({msg: "Disciplina atualizada com sucesso!"});

    }catch(error){
        return res.status(500).json({msg: "Erro ao atualizar disciplina!", erro: error.message});
    }
}

export const deletarDisciplina = async (req,res) =>{
    const {id} = req.params;

    try{
        const resultado = await deletarDisciplinaDB(id);

        if(resultado.affectedRows === 0){
            return res.status(404).json({msg: "Disciplina não encontrada!"});
        }
        return res.status(200).json({msg: "Disciplina deletada com sucesso!"});

    }catch(error){
        return res.status(500).json({msg: "Erro ao deletar disciplina", error: error.message});
    }
}