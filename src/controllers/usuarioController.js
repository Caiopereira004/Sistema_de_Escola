import bcrypt from "bcryptjs";
import { listarUsuariosDB, criarUsuarioDB, atualizarUsuarioDB, deletarUsuarioDB } from "../models/usuarioModel.js";

export const listarUsuarios = async (req,res) =>{

    try{
        const usuarios = await listarUsuariosDB();
            res.json(usuarios);

    } catch (error){
        res.status(500).json({msg: "Erro ao listar usuários", erro: error.message})
    }
};

export const criarUsuario = async (req,res) =>{
    const {nome, email, perfil, senha} = req.body;

    try{
    if(!nome || !email || !senha){
        return res.status(400).json({msg: "Nome, email e senha são obrigatórios"})
    }

    const senhaCriptografada = await bcrypt.hash(senha, 10);

    await criarUsuarioDB ({nome, email, perfil: perfil || "admin", senha: senhaCriptografada})

    return res.status(201).json("Usuário criado com sucesso!")

    }catch(error){
        return res.status(500).json({msg: "Erro ao criar", erro: error.message});
    }
};

export const atualizarUsuario = async (req,res) =>{
    
    const {id} = req.params;
    const {nome, email, perfil} = req.body;

    try{
    if(!nome || !email || !perfil){
        return res.status(400).json({msg: "Nome, email e perfil são obrigatórios!"});
    }

        await atualizarUsuarioDB(id, nome, email, perfil);
    
        return res.status(200).json({msg: "Usuário atualizado com sucesso!"});
        
    } catch(error){
        return res.status(500).json({msg: "Erro ao atualizar usuário!", erro: error.message});
    }
}

export const deletarUsuario = async (req,res) =>{

    try{
        const { id } = req.params;

        const resultado = await deletarUsuarioDB(id);

        if(resultado.affectedRows === 0){
        return res.status(404).json({msg: "Usuário não encontrado!"});
    }

    return res.status(200).json({msg:"Usuário deletado!"});

} catch(error){
    console.log(error);
    return res.status(500).json({msg: "Erro ao deletar usuário!", erro: error.message});
}
}