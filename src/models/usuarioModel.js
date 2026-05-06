import conexao from "../config/db.js";

export async function listarUsuariosDB(){
    const conn = await conexao.getConnection();

    try{
        const [usuarios] = await conn.query(`
            SELECT id, nome, email, perfil, criado_em FROM usuarios`);

            return usuarios;

    }finally{
        conn.release();
    }
}

export async function criarUsuarioDB(nome, email, perfil, senha){
    const conn = await conexao.getConnection();

    try{
        const [resultado] = await conn.query("INSERT INTO usuarios(nome, email, perfil, senha) VALUES (?, ?, ?, ?)", [nome, email, perfil, senhaCriptografada]);
        
        return resultado;

    }finally{
        conn.release()
    }
}

export async function atualizarUsuarioDB(id, nome, email, perfil){
    const conn = await conexao.getConnection();

    try{
        await conn.query("UPDATE usuarios SET nome = ?, email = ?, perfil = ? WHERE id = ?", [nome, email, perfil, id]);
    } finally{
        conn.release();
    }
}

export async function deletarUsuarioDB(id){
    const conn = await conexao.getConnection();

    try{
        const [resultado] = await conn.query("DELETE FROM usuarios WHERE id = ?", [id]);

        return resultado;

    }finally{
        conn.release();
    }
}