function mostrarCanales(id) {
    const url = `/auth/show_canal/${id}`;  /*`/auth/show_canal/${id}`   -- `http://127.0.0.1:5000/auth/show_canal/${id}` --    `http://127.0.0.1:5000/auth/servidor/${idServidor}/canales`; */

    fetch(url, {
        method: 'GET',
        credentials: 'include'
    })
    .then(response => {
        if (response.status === 200) {
            // Parsear la respuesta como JSON
            return response.json();
        } 
        if (response.status === 200 && response.message === "Usuario no tiene canales") {
            return document.getElementById("message").innerHTML = "Usuario no tiene canales";

        } else {
            return response.json().then(data => {
                throw new Error("Response status not 200");
            });
        }
    })
    .then(data => {
        console.log("Datos del formulario_1:", data);

        let contenedor2 = document.getElementById('contenedor2');
        contenedor2.style.display = 'block';

        const tabla = document.getElementById("tabla_canal");
        tabla.innerHTML = "";
        
        for (const key in data) {
            if (data.hasOwnProperty(key)) { 
                const fila = tabla.insertRow();          
                const canales = data[key]; 

                const nombreCelda = fila.insertCell(0); 
                nombreCelda.textContent = canales.nombre_canal;

                fila.addEventListener('click', function () {  /*canales.id_canal, canales.nombre_canal, canales.servidor_id, canales.creador_id */
                    const id_canal = canales.id_canal;
                    localStorage.setItem('id_canal', id);  // LO UTILIZAREMOS PARA CREAR UN MENSAJE



                    mostrarChat()
                    
                    Mostrar_mensajes(id_canal)

                    const contenedorChat = document.querySelector('.contenedor-chat');
                    contenedorChat.style.display = 'block';

                });
                let salir = document.getElementById('salir');
                
                salir.addEventListener('click', function () {
                    tabla.innerHTML = "";
                    contenedor2.style.display = 'none';

                });

        }};
    })
    .catch(error => {
        console.error("Error en la solicitud:", error);
        document.getElementById("message").innerHTML = "An error occurred.";
    });
}