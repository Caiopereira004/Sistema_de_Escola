import request from "supertest";
import app from "../src/app.js";
import conexao from "../src/config/db.js";
import jwt from "jsonwebtoken";
import { jwtConfig } from "../src/config/jwt.js";

describe("Professores - integração", () => {

    let token;
    let professorId;

    const professorTeste = {
        nome: "Professor Teste",
        email: "professor@email.com",
        telefone: "11999999999",
        especialidade: "Matemática"
    };

    beforeAll(async () => {
        token = jwt.sign(
            { id: 1, email: "teste@email.com" },
            jwtConfig.secret
        );

        const conn = await conexao.getConnection();

        await conn.query(
            "DELETE FROM professores WHERE email = ?",
            [professorTeste.email]
        );

        conn.release();
    });

    afterAll(async () => {
        const conn = await conexao.getConnection();

        await conn.query(
            "DELETE FROM professores WHERE email = ?",
            [professorTeste.email]
        );

        conn.release();
    });

    test("deve listar professores", async () => {
        const res = await request(app)
            .get("/professores")
            .set("Authorization", `Bearer ${token}`);

        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    test("deve registrar professor", async () => {
        const res = await request(app)
            .post("/professores")
            .set("Authorization", `Bearer ${token}`)
            .send(professorTeste);

        expect(res.statusCode).toBe(201);
        expect(res.body.msg).toBe("Professor(a) registrado(a) com sucesso!");
    });

    test("deve falhar se faltar dados", async () => {
        const res = await request(app)
            .post("/professores")
            .set("Authorization", `Bearer ${token}`)
            .send({});

        expect(res.statusCode).toBe(400);
    });

    test("pegar id do professor", async () => {
        const res = await request(app)
            .get("/professores")
            .set("Authorization", `Bearer ${token}`);

        const prof = res.body.find(p => p.email === professorTeste.email);
        professorId = prof.id;

        expect(professorId).toBeDefined();
    });

    test("deve atualizar professor", async () => {
        const res = await request(app)
            .put(`/${professorId}`)
            .set("Authorization", `Bearer ${token}`)
            .send({
                nome: "Professor Atualizado",
                email: "professor@email.com",
                telefone: "11888888888",
                especialidade: "Física"
            });

        expect(res.statusCode).toBe(200);
        expect(res.body.msg).toBe("Professor atualizado com sucesso!");
    });

    test("deve retornar 404 ao atualizar inexistente", async () => {
        const res = await request(app)
            .put("/999999")
            .set("Authorization", `Bearer ${token}`)
            .send(professorTeste);

        expect(res.statusCode).toBe(404);
    });

    test("deve deletar professor", async () => {
        const res = await request(app)
            .delete(`/${professorId}`)
            .set("Authorization", `Bearer ${token}`);

        expect(res.statusCode).toBe(200);
        expect(res.body.msg).toBe("Professor deletado com sucesso!");
    });

    test("deve retornar 404 ao deletar inexistente", async () => {
        const res = await request(app)
            .delete("/999999")
            .set("Authorization", `Bearer ${token}`);

        expect(res.statusCode).toBe(404);
    });

});