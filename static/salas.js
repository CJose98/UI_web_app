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

/****************************************************************************************** */

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





/* MOSTRAR MENSAJES    ******************************************************************/

function Mostrar_mensajes(id_canal) {
    const url = `/auth/show_msg/${id_canal}`;  /*`/auth/show_canal/${id}`   -- `http://127.0.0.1:5000/auth/show_canal/${id}` --    `http://127.0.0.1:5000/auth/servidor/${idServidor}/canales`; */
  
    fetch(url, {
        method: 'GET',
        credentials: 'include'
    })
    .then(response => {
        if (response.status === 200) {
            // Parsear la respuesta como JSON   
            return response.json();
        } 
        if (response.status === 200 && response.message === "Usuario no tiene mensajes") {
            return document.getElementById("message").innerHTML = "Usuario no tiene canales";
  
        } else {
            return response.json().then(data => {
                throw new Error("Response status not 200");
            });
        }
    })
    .then(data => {
        console.log("Datos del formulario de mensajes :", data);


        const ingresar_Datos_Pantalla = document.getElementById('pantalla_Chat');   /* obtenemos el id = donde se guardara el mensajo */ 
  
        ingresar_Datos_Pantalla.innerHTML = "";
  
        // Itera sobre las propiedades del objeto data (mensaje1, mensaje2, etc.)
        for (const key in data) {                      //  id_mensaje ,descripcion_mensaje, fecha_hora, canal_id, creador_id
            if (data.hasOwnProperty(key)) {
                const mensaje = data[key]; // Obtén el mensaje actual

                const mensajeDIV = document.createElement('div');                  /* creamos un elemento DIV */ 
                mensajeDIV.classList.add('message');                              /* agregamos un id message en el div */
            
                

                // Crea elementos separados para el nombre, la descripción y la fecha/hora
                const nombreElement = document.createElement('span');
                nombreElement.classList.add('nombre');
                nombreElement.textContent = mensaje.nombre;

                const descripcionElement = document.createElement('span');
                descripcionElement.classList.add('descripcion');
                descripcionElement.textContent = mensaje.descripcion_mensaje;

                const fechaHoraElement = document.createElement('span');
                fechaHoraElement.classList.add('fecha-hora');
                fechaHoraElement.textContent = mensaje.fecha_hora;

                // Agrega estos elementos al mensajeDIV
                mensajeDIV.appendChild(nombreElement);
                mensajeDIV.appendChild(descripcionElement);
                mensajeDIV.appendChild(fechaHoraElement);
                


                // Agrega mensajeDIV al contenedor de chat
                ingresar_Datos_Pantalla.appendChild(mensajeDIV);     
            
                // limpia el imput una vez mandado el mensaje
                ingresar_mensaje.value = '';
            
                // Desplaza hacia abajo para mostrar el mensaje mas reciente
                ingresar_Datos_Pantalla.scrollTop = ingresar_Datos_Pantalla.scrollHeight; /* Nos ayuda con el desplasamiento en pantalla para mostrar los mensajes*/


                // Agregar el evento click al mensaje
                mensajeDIV.addEventListener('click', function () {
                    const id_mensaje = mensaje.id_mensaje;
                    const nombre = mensaje.nombre;

                    console.log("datos a operar:", id_mensaje, nombre);

                    localStorage.setItem('id_mensaje', id_mensaje);
                    localStorage.setItem('nombre', nombre);

 
                    /*eliminarMensaje(id_mensaje);*/
                    mostrarModalEliminar();
                    
                    Mostrar_mensajes(id_canal);
                });

              }
        };
    })
    .catch(error => {
        console.error("Error en la solicitud:", error);
        document.getElementById("message").innerHTML = "An error occurred.";
    });
  }



/********************************************************************************************************** */
function mostrarModalEliminar() {
    const modal = document.getElementById("modalEliminar");
    modal.style.display = "block";
}
function ocultarModalEliminar() {
    const modal = document.getElementById("modalEliminar");
    modal.style.display = "none";
}
// Función para confirmar la eliminación
function confirmarEliminar() {
    // Obtener el id del mensaje
    const id_mensaje =  localStorage.getItem('id_mensaje');
    const nombre =  localStorage.getItem('nombre');

    eliminarMensaje(id_mensaje, nombre);

    ocultarModalEliminar();

    // Después de eliminar el mensaje actualizar la lista de mensajes
    //Mostrar_mensajes(id_canal);
}
// Cancelar la eliminación
function cancelarEliminar() {
    ocultarModalEliminar();
}





/************************************************************************************************ */
/*  _________ELIMINAR MENSAJE ________ */

function eliminarMensaje(id_mensaje, nombre) {
    const data = {
        id_mensaje: id_mensaje,
        nombre: nombre
    };

    console.log("Datos del formulario:", data); /*ayuda en consola */

    fetch("http://127.0.0.1:5000/auth/eliminar_msg", {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            
        },
        body: JSON.stringify(data),
        credentials: 'include'
    })
    .then(response => {
        console.log("Respuesta del mensaje:", response);

        if (response.status === 200) {
            console.log("Respuesta del mensaje:", response);
            const act =  localStorage.getItem('id_canal');
            Mostrar_mensajes(act)

        } else {
            return response.json().then(data => {
                document.getElementById("message").innerHTML = data.message;
            });
        }
    })
    .catch(error => {
        console.error("Error en la solicitud:", error);
        document.getElementById("message").innerHTML = "An error occurred.";
    });
}











  /**************************************************************************************** */
  /*__________ CREAR MENSAJES ______________________*/

  function sendMessage() {
    const ingresar_mensaje = document.getElementById('ingresar_mensaje');
    const mensaje = ingresar_mensaje.value;

    const ingresar_Datos_Pantalla = document.getElementById('pantalla_Chat');

    if (mensaje.trim() !== '') {
        // Guarda el mensaje en una variable
        const mensajeTexto = mensaje;

        
        // Crea un elemento DIV para el mensaje completo
        const mensajeDIV = document.createElement('div');
        mensajeDIV.classList.add('message', 'sent'); // Aplica clases CSS para dar estilo al mensaje enviado
        
        // Crea un elemento SPAN para el nombre de usuario
        const nombreElement = document.createElement('span');
        nombreElement.classList.add('nombre'); // Aplica clases CSS para dar estilo al nombre
        nombreElement.textContent = localStorage.getItem('nombre'); // Obtiene el nombre del usuario

        // Crea un elemento SPAN para el mensaje
        const mensajeElement = document.createElement('span');
        mensajeElement.classList.add('descripcion'); // Aplica clases CSS para dar estilo al mensaje
        mensajeElement.textContent = mensaje; // El texto del mensaje

        // Crea un elemento SPAN para la fecha/hora
        const fechaHoraElement = document.createElement('span');
        fechaHoraElement.classList.add('fecha-hora'); // Aplica clases CSS para dar estilo a la fecha/hora
        const fechaHora = new Date();
        fechaHoraElement.textContent = `${fechaHora.toLocaleDateString()} ${fechaHora.toLocaleTimeString()}`; // Fecha y hora actual

        // Agrega estos elementos al mensajeDIV
        mensajeDIV.appendChild(nombreElement);
        mensajeDIV.appendChild(mensajeElement);
        mensajeDIV.appendChild(fechaHoraElement);

        // Agrega mensajeDIV al contenedor de chat
        ingresar_Datos_Pantalla.appendChild(mensajeDIV);

        // Llamar a una función para enviar el mensaje al servidor (o hacer lo que desees con él)
        enviarMensaje(mensajeTexto);

        // Limpia el input una vez enviado el mensaje
        ingresar_mensaje.value = '';

        // Desplaza hacia abajo para mostrar el mensaje más reciente
        ingresar_Datos_Pantalla.scrollTop = ingresar_Datos_Pantalla.scrollHeight;
    }
}







/******************************************************************************************************************* */
/* _________ LOCALIZAR EL ID __________*/

function enviarMensaje(mensaje) {
    /***  ID SERVIDOR  ****/
    const id_canal = localStorage.getItem('id_canal');
    if (id_canal) {

        console.log("ID del servidor:", id_canal);
        
        Crear_msg(id_canal, mensaje);
    } else {
        console.error("ID del servidor no encontrado");
    }
}




/***************************************************************************************************************** */
/*______________ CREAR MENSAJE EN LA BASE DE DATOS  _________________________________ */

function Crear_msg(id_canal, mensaje) {
    const data = {
        descripcion_mensaje: mensaje,
        id_canal: id_canal
    };

    console.log("Datos del formulario:", data); /*ayuda en consola */

    fetch("http://127.0.0.1:5000/auth/guar_msg", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            
        },
        body: JSON.stringify(data),
        credentials: 'include'
    })
    .then(response => {
        console.log("Respuesta del mensaje:", response);

        if (response.status === 200) {
            console.log("Respuesta del mensaje:", response);
            Mostrar_mensajes(id_canal)

        } else {
            return response.json().then(data => {
                document.getElementById("message").innerHTML = data.message;
            });
        }
    })
    .catch(error => {
        console.error("Error en la solicitud:", error);
        document.getElementById("message").innerHTML = "An error occurred.";
    });
}











