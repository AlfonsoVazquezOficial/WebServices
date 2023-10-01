const express = require("express");
const path = require("path");
const soap = require("soap");

// Specify the URL of the WSDL file for your SOAP service
const url = "http://localhost:8000/calculator?wsdl";

const app = express();
const PORT = process.env.PORT || 3000;

// Configura la carpeta de archivos estáticos
app.use(express.static(path.join(__dirname, "public")));

// Ruta para la página principal
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Inicia el servidor
app.listen(PORT, () => {
  console.log(`Servidor Node.js escuchando en el puerto ${PORT}`);
});

// Create a SOAP client
soap.createClient(url, (err, client) => {
  if (err) {
    console.error("Error creating SOAP client:", err);
    return;
  }

  // Call the add method of the SOAP service
  const addArgs = {
    num1: 10,
    num2: 5,
  };

  client.add(addArgs, (err, result) => {
    if (err) {
      console.error("Error calling add:", err);
      return;
    }

    console.log("Add Result:", result);
  });

  // Call the subtract method of the SOAP service
  const subtractArgs = {
    num1: 10,
    num2: 5,
  };

  client.subtract(subtractArgs, (err, result) => {
    if (err) {
      console.error("Error calling subtract:", err);
      return;
    }

    console.log("Subtract Result:", result);
  });

  // Ruta para peticiones
  app.get("/soap", (req, res) => {
    // Obtén los parámetros de consulta de la URL
    const variable1 = req.query.variable1;

    // Realiza acciones con las variables
    // Por ejemplo, imprime las variables en la consola
    console.log("Variable 1:", variable1);
    // Envía la respuesta al cliente
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });
});
