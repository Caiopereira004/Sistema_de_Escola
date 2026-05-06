import conexao from "../config/db.js";

export async function buscarUsuarioPorEmail(email){

const conn = await conexao.getConnection();

    try{

        const [rows] = await conn.query("SELECT * FROM usuarios WHERE email = ?", [email]);
            return rows;
        
    }finally{
        conn.release();
    }
}

export async function criarUsuario({nome, email, senha, perfil}){
    const conn = await conexao.getConnection();

    try {
        await conn.query("INSERT INTO usuarios (nome, email, senha, perfil) VALUES (?, ?, ?, ?)", [nome, email, senhaCriptografada, perfil || "admin"]);

    }finally {
        conn.release();
    }
}