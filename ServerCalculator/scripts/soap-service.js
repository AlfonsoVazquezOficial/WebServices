const soap = require("soap");
const http = require("http");

// Define the service
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
    },
  },
};

// Create the SOAP server
const xml = require("fs").readFileSync("calculator.wsdl", "utf8");
const server = http.createServer((request, response) => {
  response.end("404: Not Found");
});

server.listen(8000);
soap.listen(server, "/calculator", service, xml);
console.log("SOAP service listening on http://localhost:8000/calculator?wsdl");
