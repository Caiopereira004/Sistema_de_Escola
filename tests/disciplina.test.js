import request from "supertest";
import app from "../src/app.js";
import conexao from "../src/config/db.js";
import jwt from "jsonwebtoken";
import { jwtConfig } from "../src/config/jwt.js";

describe("Disciplinas - integração", () => {

    let token;
    let disciplinaId;

    const disciplinaTeste = {
        nome: "Matemática",
        carga_horaria: 80
    };

    beforeAll(async () => {
        token = jwt.sign(
            { id: 1, email: "teste@email.com" },
            jwtConfig.secret
        );

        const conn = await conexao.getConnection();

        await conn.query("DELETE FROM disciplinas WHERE nome = ?", [disciplinaTeste.nome]);

        conn.release();
    });

    afterAll(async () => {
        const conn = await conexao.getConnection();

        await conn.query("DELETE FROM disciplinas WHERE nome = ?", [disciplinaTeste.nome]);

        conn.release();
    });

    test("deve listar disciplinas", async () => {
        const res = await request(app)
            .get("/disciplinas")
            .set("Authorization", `Bearer ${token}`);

        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    test("deve registrar disciplina", async () => {
        const res = await request(app)
            .post("/disciplinas")
            .set("Authorization", `Bearer ${token}`)
            .send(disciplinaTeste);

        expect(res.statusCode).toBe(201);
        expect(res.body.msg).toBe("Disciplina registrada com sucesso!");
    });

    test("deve falhar se faltar dados", async () => {
        const res = await request(app)
            .post("/disciplinas")
            .set("Authorization", `Bearer ${token}`)
            .send({});

        expect(res.statusCode).toBe(400);
    });

    test("pegar id da disciplina", async () => {
        const res = await request(app)
            .get("/")
            .set("Authorization", `Bearer ${token}`);

        const disciplina = res.body.find(d => d.nome === disciplinaTeste.nome);
        disciplinaId = disciplina.id;

        expect(disciplinaId).toBeDefined();
    });

    test("deve atualizar disciplina", async () => {
        const res = await request(app)
            .put(`/${disciplinaId}`)
            .set("Authorization", `Bearer ${token}`)
            .send({
                nome: "Matemática Atualizada",
                carga_horaria: 100
            });

        expect(res.statusCode).toBe(200);
    });

    test("deve deletar disciplina", async () => {
        const res = await request(app)
            .delete(`/${disciplinaId}`)
            .set("Authorization", `Bearer ${token}`);

        expect(res.statusCode).toBe(200);
    });

    test("deve retornar 404 ao deletar inexistente", async () => {
        const res = await request(app)
            .delete("/999999")
            .set("Authorization", `Bearer ${token}`);

        expect(res.statusCode).toBe(404);
    });

});