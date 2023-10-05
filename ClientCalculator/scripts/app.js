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

// Función para crear un cliente SOAP y realizar una llamada SOAP
async function useSoapClient(method, numA, numB) {
  return new Promise((resolve, reject) => {
    soap.createClient(url, (err, client) => {
      if (err) {
        console.error("Error creating SOAP client:", err);
        reject(err);
        return;
      }

      // Call the add method of the SOAP service
      const addArgs = {
        num1: numA,
        num2: numB,
      };

      switch (method) {
        case "sum":
          client.add(addArgs, (err, result) => {
            if (err) {
              console.error("Error calling add:", err);
              reject(err);
              return;
            }
            console.log("Add Result:", result.result);
            resolve(result);
          });
          break;
        case "subtract":
          client.subtract(addArgs, (err, result) => {
            if (err) {
              console.error("Error calling sub:", err);
              reject(err);
              return;
            }
            console.log("Sub Result:", result.result);
            resolve(result);
          });
          break;
        case "multiplication":
          client.multiplication(addArgs, (err, result) => {
            if (err) {
              console.error("Error calling mult:", err);
              reject(err);
              return;
            }
            console.log("Multi Result:", result.result);
            resolve(result);
          });
          break;
          case "division":
            client.division(addArgs, (err, result) => {
              if (err) {
                console.error("Error calling div:", err);
                reject(err);
                return;
              }
              console.log("Div Result:", result.result);
              resolve(result);
            });
            break;  
        default:
          reject(new Error("Método SOAP no válido"));
      }
    });
  });
}

// Ruta para peticiones
app.get("/soap", async (req, res) => {
  // Obtén los parámetros de consulta de la URL
  const method = req.query.method;
  const numA = req.query.numA;
  const numB = req.query.numB;

  // Realiza acciones con las variables
  // Por ejemplo, imprime las variables en la consola
  console.log("Method:", method);
  console.log("NumA:", numA);
  console.log("NumB:", numB);

  try {
    const result = await useSoapClient(method, numA, numB);
    console.log("Result:", result.result);

    // Envía la respuesta al cliente
    res.redirect("/?result=" + result.result);
  } catch (error) {
    console.error("Error en la llamada SOAP:", error);

    // Envía una respuesta de error al cliente
    res.status(500).send("Error en la llamada SOAP");
  }
});
