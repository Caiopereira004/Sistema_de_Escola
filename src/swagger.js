// swagger.js
import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Escolar",
      version: "1.0.0",
      description: "Documentação da API escolar",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },

  apis: ["./routes/*.js"], // caminho das rotas
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;