import request from "supertest";
import app from "../src/app.js";
import conexao from "../src/config/db.js";
import jwt from "jsonwebtoken";
import { jwtConfig } from "../src/config/jwt.js";

describe("Turmas - integração", () => {

    let token;
    let turmaId;

    const turmaTeste = {
        nome: "Turma A",
        ano_letivo: 2025,
        professor_id: 1
    };

    beforeAll(async () => {
        token = jwt.sign(
            { id: 1, email: "teste@email.com" },
            jwtConfig.secret
        );

        const conn = await conexao.getConnection();

        await conn.query("DELETE FROM turmas WHERE nome = ?", [turmaTeste.nome]);

        conn.release();
    });

    afterAll(async () => {
        const conn = await conexao.getConnection();

        await conn.query("DELETE FROM turmas WHERE nome = ?", [turmaTeste.nome]);

        conn.release();
    });

    test("deve listar turmas", async () => {
        const res = await request(app)
            .get("/turmas")
            .set("Authorization", `Bearer ${token}`);

        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    // ✅ REGISTRAR
    test("deve registrar turma", async () => {
        const res = await request(app)
            .post("/turmas")
            .set("Authorization", `Bearer ${token}`)
            .send(turmaTeste);

        expect(res.statusCode).toBe(201);
        expect(res.body.msg).toBe("Turma registrada com sucesso!");
    });

    // ❌ CAMPOS FALTANDO
    test("deve falhar se faltar dados", async () => {
        const res = await request(app)
            .post("/turmas")
            .set("Authorization", `Bearer ${token}`)
            .send({});

        expect(res.statusCode).toBe(400);
    });

    // 🔎 PEGAR ID
    test("pegar id da turma", async () => {
        const res = await request(app)
            .get("/turmas")
            .set("Authorization", `Bearer ${token}`);

        const turma = res.body.find(t => t.nome === turmaTeste.nome);
        turmaId = turma.id;

        expect(turmaId).toBeDefined();
    });

    // ✅ ATUALIZAR
    test("deve atualizar turma", async () => {
        const res = await request(app)
            .put(`/${turmaId}`)
            .set("Authorization", `Bearer ${token}`)
            .send({
                nome: "Turma Atualizada",
                ano_letivo: 2026,
                professor_id: 1
            });

        expect(res.statusCode).toBe(200);
    });

    // ✅ DELETAR
    test("deve deletar turma", async () => {
        const res = await request(app)
            .delete(`/${turmaId}`)
            .set("Authorization", `Bearer ${token}`);

        expect(res.statusCode).toBe(200);
    });

});