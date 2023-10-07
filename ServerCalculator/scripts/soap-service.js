const soap = require("soap");
const http = require("http");
const express = require("express"); // Importa Express para el middleware de CORS

// Define la instancia de Express
const app = express();

// Middleware de CORS para permitir solicitudes desde un dominio específico (en este caso, http://localhost:3000)
app.use((req, res, next) => {
  const allowedOrigins = [
    "http://192.168.228.185:3000/soap",
    "http://localhost:3000/soap", // Agrega otros dominios aquí
    "http://anotherdomain.com",
  ];

  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }

  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  next();
});

// Define el servicio SOAP
const service = {
  CalculatorService: {
    CalculatorPort: {
      add: (args) => {
        const result = args.num1 + args.num2;
        return { result };
      },
      subtract: (args) => {
        const result = args.num1 - args.num2;
        return { result };
      },
      multiplication: (args) => {
        const result = args.num1 * args.num2;
        return { result };
      },
      division: (args) => {
        const result = args.num1 / args.num2;
        return { result };
      },
    },
  },
};

// Crea el servidor HTTP
const xml = require("fs").readFileSync("calculator.wsdl", "utf8");
const server = http.createServer(app); // Usa Express en lugar de http

server.listen(8000);
soap.listen(server, "/calculator", service, xml);
console.log("SOAP service listening on http://localhost:8000/calculator?wsdl");
