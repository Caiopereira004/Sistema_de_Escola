import request from "supertest";
import app from "../src/app.js";
import conexao from "../src/config/db.js";
import jwt from "jsonwebtoken";
import { jwtConfig } from "../src/config/jwt.js";

describe("Usuários - integração", () => {

    let token;
    let usuarioId;

    const usuarioTeste = {
        nome: "Usuário Teste",
        email: "usuario@email.com",
        senha: "123456",
        perfil: "admin"
    };

    beforeAll(async () => {
        token = jwt.sign(
            { id: 1, email: "teste@email.com" },
            jwtConfig.secret
        );

        const conn = await conexao.getConnection();

        await conn.query("DELETE FROM usuarios WHERE email = ?", [usuarioTeste.email]);

        conn.release();
    });

    afterAll(async () => {
        const conn = await conexao.getConnection();

        await conn.query("DELETE FROM usuarios WHERE email = ?", [usuarioTeste.email]);

        conn.release();
    });

    test("deve listar usuários", async () => {
        const res = await request(app)
            .get("/usuarios")
            .set("Authorization", `Bearer ${token}`);

        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    test("deve criar usuário", async () => {
        const res = await request(app)
            .post("/usuarios")
            .set("Authorization", `Bearer ${token}`)
            .send(usuarioTeste);

        expect(res.statusCode).toBe(201);
        expect(res.body.msg).toBe("Usuário criado com sucesso!");
    });

    test("deve falhar se faltar dados", async () => {
        const res = await request(app)
            .post("/usuarios")
            .set("Authorization", `Bearer ${token}`)
            .send({});

        expect(res.statusCode).toBe(400);
    });

    test("pegar id do usuário", async () => {
        const res = await request(app)
            .get("/usuarios")
            .set("Authorization", `Bearer ${token}`);

        const usuario = res.body.find(u => u.email === usuarioTeste.email);
        usuarioId = usuario.id;

        expect(usuarioId).toBeDefined();
    });

    test("deve atualizar usuário", async () => {
        const res = await request(app)
            .put(`/${usuarioId}`)
            .set("Authorization", `Bearer ${token}`)
            .send({
                nome: "Atualizado",
                email: usuarioTeste.email,
                perfil: "admin"
            });

        expect(res.statusCode).toBe(200);
    });

    test("deve retornar 404 ao atualizar inexistente", async () => {
        const res = await request(app)
            .put("/999999")
            .set("Authorization", `Bearer ${token}`)
            .send({
                nome: "X",
                email: "x@email.com",
                perfil: "admin"
            });

        expect(res.statusCode).toBe(404);
    });

    test("deve deletar usuário", async () => {
        const res = await request(app)
            .delete(`/${usuarioId}`)
            .set("Authorization", `Bearer ${token}`);

        expect(res.statusCode).toBe(200);
    });

});