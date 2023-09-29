
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
                
                /*const chatt = document.getElementById('.contenedor-chat');
                chatt.style.display = 'block';*/
            
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

