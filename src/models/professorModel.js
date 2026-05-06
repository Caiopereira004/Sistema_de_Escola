import conexao from "../config/db.js";

export async function listarProfessoresDB(){
    const conn = await conexao.getConnection();

    try {
        const [resultado] = await conn.query("SELECT id, nome, email, telefone, especialidade FROM professores");

        return resultado;

    } finally{
        conn.release();
    }
};

export async function registrarProfessorDB(nome, email, telefone, especialidade){
    const conn = await conexao.getConnection();

    try{
        const [resultado] = await conn.query("INSERT INTO professores(nome, email, telefone, especialidade) VALUES (?, ?, ?, ?)", [nome, email, telefone, especialidade]);

        return resultado;

    }finally{
        conn.release();
    }
}

export async function atualizarProfessorDB(nome, email, telefone, especialidade, id){
    const conn = await conexao.getConnection();

    try{
        const [resultado] = await conn.query("UPDATE professores SET nome = ?, email = ?, telefone = ?, especialidade = ? WHERE id = ?", [nome, email, telefone, especialidade, id]);
    
        return resultado;
        
    }finally{
        conn.release();
    }
}

export async function deletarProfessorDB(id){
    const conn = await conexao.getConnection();

    try{
        const [resultado] = await conn.query("DELETE FROM professores WHERE id = ?", [id]);

        return resultado;

    }finally{
        conn.release();
    }
}