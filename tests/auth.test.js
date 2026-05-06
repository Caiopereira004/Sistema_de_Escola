import request from "supertest";
import app from "../src/app.js";
import conexao from "../src/config/db.js";

describe("Auth - integração (sem mock)", () => {

    const usuarioTeste = {
        nome: "Teste",
        email: "teste@email.com",
        senha: "123456",
        perfil: "admin"
    };

    beforeAll(async () => {
        const conn = await conexao.getConnection();

        await conn.query("DELETE FROM usuarios WHERE email = ?", [usuarioTeste.email]);

        conn.release();
    });

    afterAll(async () => {
        const conn = await conexao.getConnection();

        await conn.query("DELETE FROM usuarios WHERE email = ?", [usuarioTeste.email]);

        conn.release();
    });

    test("deve registrar usuário", async () => {
        const res = await request(app)
            .post("/registrar")
            .send(usuarioTeste);

        expect(res.statusCode).toBe(201);
        expect(res.body.msg).toBe("Usuário criado com sucesso!");
    });

    test("não deve permitir email duplicado", async () => {
        const res = await request(app)
            .post("/registrar")
            .send(usuarioTeste);

        expect(res.statusCode).toBe(400);
    });

    test("deve retornar erro se faltar dados", async () => {
        const res = await request(app)
            .post("/registrar")
            .send({});

        expect(res.statusCode).toBe(400);
    });

    test("deve fazer login com sucesso", async () => {
        const res = await request(app)
            .post("/login")
            .send({
                email: usuarioTeste.email,
                senha: usuarioTeste.senha
            });

        expect(res.statusCode).toBe(200);
        expect(res.body.token).toBeDefined();
    });

    test("deve falhar com senha inválida", async () => {
        const res = await request(app)
            .post("/login")
            .send({
                email: usuarioTeste.email,
                senha: "errada"
            });

        expect(res.statusCode).toBe(401);
    });

    test("deve falhar se usuário não existir", async () => {
        const res = await request(app)
            .post("/login")
            .send({
                email: "naoexiste@email.com",
                senha: "123"
            });

        expect(res.statusCode).toBe(404);
    });
});