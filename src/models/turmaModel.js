import conexao from '../config/db.js';

export async function listarTurmasDB(){
    const conn = await conexao.getConnection();

    try{
        const [turmas] = await conn.query(`SELECT 
                turmas.id, 
                turmas.nome, 
                turmas.ano_letivo
            FROM turmas
            JOIN professores
                ON turmas.professor_id = professores.id`);

        return turmas;

    }finally{
        conn.release();
    }
}

export async function registrarTurmaDB(nome, ano_letivo, professor_id){
    const conn = await conexao.getConnection();

    try{
        const [resultado] = await conn.query("INSERT INTO turmas(nome, ano_letivo, professor_id) VALUES (?, ?, ?)", [nome, ano_letivo, professor_id]);

        return resultado;

    }finally{
        conn.release();
    }
}

export async function atualizarTurmaDB(id, nome, ano_letivo, professor_id){
    const conn = await conexao.getConnection();

    try{
        await conn.query("UPDATE turmas SET nome = ?, ano_letivo = ?, professor_id = ? WHERE id = ?", [nome, ano_letivo, professor_id, id]);
    }finally{
        conn.release();
    }
}

export async function deletarTurmaDB(id){
    const conn = await conexao.getConnection();

    try{
        const [resultado] = await conn.query("DELETE FROM turmas WHERE id = ?", [id]);

        return resultado;

    }finally{
        conn.release();
    }
}