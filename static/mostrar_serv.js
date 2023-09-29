/* ******************************       MOSTRAR SERVIDORES Y SALAS ******************************************** */ 
window.addEventListener('load', function () {
    getSala();
});

function getSala() {
    const url = "http://127.0.0.1:5000/auth/sala";

    fetch(url, {
        method: 'GET',
        credentials: 'include'
    })
    .then(response => {
        if (response.status === 200) {
            let contenido = document.getElementById('contenido');
            contenido.style.display = 'none';

            // Parsear la respuesta como JSON
            return response.json();
        } 
        if (response.status === 200 && response.message === "Usuario no tiene servidores") {
            return document.getElementById("message").innerHTML = "Usuario no tiene servidores";

        } else {
            return response.json().then(data => {
                throw new Error("Response status not 200");
            });
        }
    })
    .then(data => {
        console.log("Datos del formulario_1:", data);
        const tabla = document.getElementById("tabla");
        
        for (const key in data) {
            if (data.hasOwnProperty(key)) { 
                const fila = tabla.insertRow();          
                const servidor = data[key]; 

                const nombreCelda = fila.insertCell(0); 
                nombreCelda.textContent = servidor.nombre_servidor;

                fila.addEventListener('click', function () {
                    const id = servidor.id_servidor;
                    localStorage.setItem('id_servidor', id);

                    // Agregar código para mostrar los canales aquí
                     mostrarCanales(id);

                });
        }};
    })
    .catch(error => {
        console.error("Error en la solicitud:", error);
        document.getElementById("message").innerHTML = "An error occurred.";
    });
}