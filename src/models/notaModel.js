import conexao from '../config/db.js';

export async function listarNotasDB(){
    const conn = await conexao.getConnection();

    try{
        const [notas] = await conn.query(`SELECT 
            id, 
            aluno_id,
            disciplina_id,
            nota, 
            bimestre, 
            observacao
            FROM notas`);

        return notas;

    }finally{
        conn.release();
    };
}

export async function registrarNotaDB(aluno_id, disciplina_id, nota, bimestre, observacao){
    const conn = await conexao.getConnection();

    try{
        const [resultado] = await conn.query("INSERT INTO notas(aluno_id, disciplina_id, nota, bimestre, observacao) VALUES (?, ?, ?, ?, ?)", [aluno_id, disciplina_id, nota, bimestre, observacao]);

        return resultado;

    }finally{
        conn.release();
    }
}

export async function atualizarNotaDB(id, aluno_id, disciplina_id, nota, bimestre, observacao){
    const conn = await conexao.getConnection();

    try{
        await conn.query("UPDATE notas SET aluno_id = ?, disciplina_id = ?, nota = ?, bimestre = ?, observacao = ? WHERE id = ?", [aluno_id, disciplina_id, nota, bimestre, observacao, id]);

    }finally{
        conn.release();
    }
}

export async function deletarNotaDB(id){
    const conn = await conexao.getConnection();

    try{
        const [resultado] = await conn.query("DELETE FROM notas WHERE id = ?", [id]);

        return resultado;
    }finally{
        conn.release();
    }
}