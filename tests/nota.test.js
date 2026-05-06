import request from "supertest";
import app from "../src/app.js";
import conexao from "../src/config/db.js";
import jwt from "jsonwebtoken";
import { jwtConfig } from "../src/config/jwt.js";

describe("Notas - integração", () => {

    let token;
    let notaId;

    const notaTeste = {
        aluno_id: 1,
        disciplina_id: 1,
        nota: 9.5,
        bimestre: 1,
        observacao: "Teste"
    };

    beforeAll(async () => {
        token = jwt.sign(
            { id: 1, email: "teste@email.com" },
            jwtConfig.secret
        );

        const conn = await conexao.getConnection();

        await conn.query("DELETE FROM notas WHERE observacao = ?", [notaTeste.observacao]);

        conn.release();
    });

    afterAll(async () => {
        const conn = await conexao.getConnection();

        await conn.query("DELETE FROM notas WHERE observacao = ?", [notaTeste.observacao]);

        conn.release();
    });

    test("deve listar notas", async () => {
        const res = await request(app)
            .get("/notas")
            .set("Authorization", `Bearer ${token}`);

        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    test("deve registrar nota", async () => {
        const res = await request(app)
            .post("/notas")
            .set("Authorization", `Bearer ${token}`)
            .send(notaTeste);

        expect(res.statusCode).toBe(201);
        expect(res.body.msg).toBe("Nota registrada com sucesso!");
    });

    test("deve falhar se faltar dados", async () => {
        const res = await request(app)
            .post("/notas")
            .set("Authorization", `Bearer ${token}`)
            .send({});

        expect(res.statusCode).toBe(400);
    });

    test("pegar id da nota", async () => {
        const res = await request(app)
            .get("/notas")
            .set("Authorization", `Bearer ${token}`);

        const nota = res.body.find(n => n.observacao === notaTeste.observacao);
        notaId = nota.id;

        expect(notaId).toBeDefined();
    });

    test("deve atualizar nota", async () => {
        const res = await request(app)
            .put(`/${notaId}`)
            .set("Authorization", `Bearer ${token}`)
            .send({
                aluno_id: 1,
                disciplina_id: 1,
                nota: 10,
                bimestre: 2,
                observacao: "Atualizada"
            });

        expect(res.statusCode).toBe(200);
    });

    test("deve deletar nota", async () => {
        const res = await request(app)
            .delete(`/${notaId}`)
            .set("Authorization", `Bearer ${token}`);

        expect(res.statusCode).toBe(200);
    });

});