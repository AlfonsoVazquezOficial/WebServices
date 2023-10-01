const soap = require('soap');

// Specify the URL of the WSDL file for your SOAP service
const url = 'http://localhost:8000/calculator?wsdl';

// Create a SOAP client
soap.createClient(url, (err, client) => {
    if (err) {
        console.error('Error creating SOAP client:', err);
        return;
    }

    // Call the add method of the SOAP service
    const addArgs = {
        num1: 10,
        num2: 5,
    };

    client.add(addArgs, (err, result) => {
        if (err) {
            console.error('Error calling add:', err);
            return;
        }

        console.log('Add Result:', result);
    });

    // Call the subtract method of the SOAP service
    const subtractArgs = {
        num1: 10,
        num2: 5,
    };

    client.subtract(subtractArgs, (err, result) => {
        if (err) {
            console.error('Error calling subtract:', err);
            return;
        }

        console.log('Subtract Result:', result);
    });
    


});