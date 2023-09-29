function sendMessage() {
    const ingresar_mensaje = document.getElementById('ingresar_mensaje');         /* ingresa un mensaje input ( mensaje ) */
    const mensaje = ingresar_mensaje.value;                                     /* obtenemos el mensaje ingresado en VALUE */       
  
    const ingresar_Datos_Pantalla = document.getElementById('pantalla_Chat'); /* obtenemos el id = donde se guardara el mensajo */  
  
  
    if (mensaje.trim() !== '') {                                         /* Si el mensaje es distinto de bacio */
      const mensajeDIV = document.createElement('div');                 /* creamos un elemento DIV */
      mensajeDIV.classList.add('message');                             /* agregamos un message en el div */
      mensajeDIV.textContent = mensaje;                               /* dentro de ese message guardamos el mensaje ingresado por soncola */
      ingresar_Datos_Pantalla.appendChild(mensajeDIV);               /* mostramos el mensaje en pantalla */
  
      // limpia el imput una vez mandado el mensaje
      ingresar_mensaje.value = '';
  
      // Desplaza hacia abajo para mostrar el mensaje mas reciente
      ingresar_Datos_Pantalla.scrollTop = ingresar_Datos_Pantalla.scrollHeight; /* Nos ayuda con el desplasamiento en pantalla para mostrar los mensajes*/
    }
}






/***************************************************************************************************************** */

function sendMessage() {
  // Obtiene el nombre de usuario desde localStorage
  const nombre = localStorage.getItem('nombre');

  const ingresar_mensaje = document.getElementById('ingresar_mensaje');         /* ingresa un mensaje input ( mensaje ) */
  const mensaje = ingresar_mensaje.value;                                     /* obtenemos el mensaje ingresado en VALUE */       

  const ingresar_Datos_Pantalla = document.getElementById('pantalla_Chat'); /* obtenemos el id = donde se guardara el mensajo */  


  if (mensaje.trim() !== '') {                                         /* Si el mensaje es distinto de bacio */
    const mensajeDIV = document.createElement('div');                 /* creamos un elemento DIV */
    mensajeDIV.classList.add('message');                             /* agregamos un message en el div */
    mensajeDIV.textContent = mensaje;                               /* dentro de ese message guardamos el mensaje ingresado por soncola */


    
    
    // Verifica si se encontró el nombre de usuario en localStorage
    if (nombre) {
      const nombreUsuarioElement = document.createElement('span');
      nombreUsuarioElement.classList.add('nombre-usuario');
      nombreUsuarioElement.textContent = nombre;

      mensajeDIV.appendChild(nombreUsuarioElement);
    }



    ingresar_Datos_Pantalla.appendChild(mensajeDIV);               /* mostramos el mensaje en pantalla */

    // limpia el imput una vez mandado el mensaje
    ingresar_mensaje.value = '';

    // Desplaza hacia abajo para mostrar el mensaje mas reciente
    ingresar_Datos_Pantalla.scrollTop = ingresar_Datos_Pantalla.scrollHeight; /* Nos ayuda con el desplasamiento en pantalla para mostrar los mensajes*/
  }
}






























/****************************************************************************************************************** */

function sendMessage() {
  const mensaje = document.getElementById('mensaje').value; // Obtiene el contenido del mensaje
  const ingresar_Datos_Pantalla = document.getElementById('pantalla_Chat'); // Obtén el contenedor de chat
  //const infoUsuario = document.getElementById('info-usuario'); // Obtén el elemento para mostrar la información del usuario

  if (mensaje.trim() !== '') {
      
      const nombreUsuario = data.nombre;   // Obtener el nombre de usuario

      const mensajeObjeto = {
          nombre: nombreUsuario,
          descripcion_mensaje: mensaje,
          fecha_hora: new Date().toLocaleString() // Obten la fecha y hora actual
      };

      // Crea un elemento específico para mostrar el nuevo mensaje
      const nuevoMensajeDIV = document.createElement('div');
      nuevoMensajeDIV.classList.add('message');

      // Crea elementos separados para el nombre, el mensaje, la fecha y hora
      const nombreElement = document.createElement('span');
      nombreElement.classList.add('nombre');
      nombreElement.textContent = mensajeObjeto.nombre;

      const descripcionElement = document.createElement('span');
      descripcionElement.classList.add('descripcion');
      descripcionElement.textContent = mensajeObjeto.descripcion_mensaje;

      const fechaHoraElement = document.createElement('span');
      fechaHoraElement.classList.add('fecha-hora');
      fechaHoraElement.textContent = mensajeObjeto.fecha_hora;



      // Agrega estos elementos al nuevoMensajeDIV
      nuevoMensajeDIV.appendChild(nombreElement);
      nuevoMensajeDIV.appendChild(descripcionElement);
      nuevoMensajeDIV.appendChild(fechaHoraElement);

      // Agrega el nuevo mensaje al contenedor de chat
      ingresar_Datos_Pantalla.appendChild(nuevoMensajeDIV);

      // Limpia el campo de mensaje después de enviarlo
      document.getElementById('mensaje').value = '';

      // Actualiza la información del usuario
     // infoUsuario.textContent = `${nombreUsuario} quiere crear un mensaje:`;

      // Desplaza hacia abajo para mostrar el nuevo mensaje
      ingresar_Datos_Pantalla.scrollTop = ingresar_Datos_Pantalla.scrollHeight;
  }
}



/** FUNCIONA   ******************************************* */
function sendMessage() {
  const ingresar_mensaje = document.getElementById('ingresar_mensaje');
  const mensaje = ingresar_mensaje.value;

  const ingresar_Datos_Pantalla = document.getElementById('pantalla_Chat');

  if (mensaje.trim() !== '') {
      const mensajeDIV = document.createElement('div');
      mensajeDIV.classList.add('message');
      
      // Obtén la fecha y hora actual
      const fechaHora = new Date();
      const fechaHoraString = `${fechaHora.toLocaleDateString()} ${fechaHora.toLocaleTimeString()}`;

      // Combina el mensaje, el nombre de usuario y la fecha/hora en un solo mensaje
      const nombreUsuario = localStorage.getItem('nombre');
      const mensajeCompleto = `${nombreUsuario}: ${mensaje} - ${fechaHoraString}`;
      
      mensajeDIV.textContent = mensajeCompleto;
      ingresar_Datos_Pantalla.appendChild(mensajeDIV);

      // Limpia el input una vez enviado el mensaje
      ingresar_mensaje.value = '';

      // Desplaza hacia abajo para mostrar el mensaje más reciente
      ingresar_Datos_Pantalla.scrollTop = ingresar_Datos_Pantalla.scrollHeight;
  }
}



    // URL de la API en tu servidor que manejará la solicitud POST
    const url = 'https://tu-servidor.com/api/guardar-mensaje';

    // Datos del mensaje a enviar
    const datosMensaje = {
        mensaje: mensaje,
        usuario: localStorage.getItem('nombre'), // Nombre del usuario
        fechaHora: new Date().toISOString() // Fecha y hora en formato ISO
    };