import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { jwtConfig } from "../config/jwt.js";
import { buscarUsuarioPorEmail, criarUsuario } from "../models/authModel.js";

export const registrar = async (req,res)=>{
    try{
        const {nome, email, senha, perfil} = req.body;

        if(!nome || !email || !senha)
            return res.status(400).json({msg: "Nome, email e senha são obrigatórios"})

        const usuarioExistente = await buscarUsuarioPorEmail(email);

        if(usuarioExistente.length > 0){
            return res.status(400).json({msg: "Email já cadastrado!"})
        }

        const senhaCriptografada = await bcrypt.hash(senha, 10);

        await criarUsuario ({nome, email, senha: senhaCriptografada, perfil: perfil || "admin"});

        return res.status(201).json({msg: "Usuário criado com sucesso!"});

    } catch (error){
        return res.status(500).json({msg: "Erro ao registrar!", erro: error.message});
  }
};

export const login = async (req, res) => {
  try {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).json({ mensagem: "Email e senha são obrigatórios" });
    }

    const rows = await buscarUsuarioPorEmail(email);

    if (rows.length === 0) {
      return res.status(404).json({ mensagem: "Usuário não encontrado" });
    }

    const usuario = rows[0];

    if (!usuario.senha) {
      return res.status(500).json({ mensagem: "Senha do usuário não encontrada no banco" });
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha);

    if (!senhaValida) {
      return res.status(401).json({ mensagem: "Senha inválida" });
    }

    const token = jwt.sign(
      {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        perfil: usuario.perfil
      },
      jwtConfig.secret,
      { expiresIn: "8h" }
    );

    res.json({mensagem: "Login realizado com sucesso", token});
  } catch (error) {
    res.status(500).json({mensagem: "Erro no login", erro: error.message});
  }
};