function validateCedula() {
    const cedula = document.getElementById('cedula').value;
    const resultDiv = document.getElementById('result');

    if (!cedula) {
        resultDiv.textContent = "Por favor, ingrese una cédula.";
        return;
    }

    // Cambia https:// a http://
    fetch(`https://api-validar-cedula.onrender.com/api/validate?cedula=${cedula}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la red');
            }
            return response.json();
        })
        .then(data => {
            if (data.isValid) {
                resultDiv.textContent = `La cédula ${data.cedula} es válida.`;
            } else {
                resultDiv.textContent = `La cédula ${data.cedula} no es válida.`;
            }
        })
        .catch(error => {
            console.error('Error:', error);
            resultDiv.textContent = "Ocurrió un error al validar la cédula.";
        });
}
