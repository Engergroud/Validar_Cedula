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
            resultDiv.textContent = data.message;
        } else {
            // Mostrar el mensaje de error específico si está disponible
            const errorMessage = data.error || 'La cédula no es válida.';
            resultDiv.textContent = `La cédula ${data.cedula} no es válida. ${errorMessage}`;
        }
        })
        .catch(error => {
            console.error('Error:', error);
            resultDiv.textContent = "Ocurrió un error al validar la cédula.";
        });
}
