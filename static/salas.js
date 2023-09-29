
/******  ELIMINAR             ******************************************************************** */

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

        // Llamar a una función para enviar el mensaje al servidor 
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

