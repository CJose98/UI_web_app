/*UNIRSE A UN SERVIDOR*/
/*const servidor1 = document.getElementById("u_1");
const servidor2 = document.getElementById("u_2");
const servidor3 = document.getElementById("u_3");
const servidor4 = document.getElementById("u_4");
const servidor5 = document.getElementById("u_5");
const servidor6 = document.getElementById("u_6");
const servidor7 = document.getElementById("u_7");

servidor1.addEventListener("click", mostrarConfirmar);
servidor2.addEventListener("click", mostrarConfirmar);
servidor1.addEventListener("click", mostrarConfirmar);
servidor3.addEventListener("click", mostrarConfirmar);
servidor4.addEventListener("click", mostrarConfirmar);
servidor5.addEventListener("click", mostrarConfirmar);
servidor6.addEventListener("click", mostrarConfirmar);
servidor7.addEventListener("click", mostrarConfirmar);
*/

const servidores = document.querySelectorAll(".item-grid");

servidores.forEach((servidor) => {
  servidor.addEventListener("click", mostrarConfirmar);
});
/********************************************************************************************************** */
function mostrarConfirmar(event) {
        const servidorSeleccionado = event.currentTarget.getAttribute("data-numero");
        localStorage.setItem('servidorSeleccionado', servidorSeleccionado);
        console.log("Servidor Seleccionado: ", servidorSeleccionado);


        const modal = document.getElementById("modalUnir");
        modal.style.display = "block";
}
function ocultarConfirmar() {
        const modal = document.getElementById("modalUnir");
        modal.style.display = "none";
}
function confirmarUnion() {
        const servidorSeleccionado = localStorage.getItem('servidorSeleccionado');
        unirsealservisor(servidorSeleccionado);
        
        ocultarConfirmar();
        /*window.location.href = "/auth/grid"; */
    }
function cancelarUnion() {
        ocultarConfirmar();
}





/************************************************************************************************************/
/*  
INSERT INTO Discor.user_servi (usuario_id, servidor_id) VALUES
(4,1); 
/************************************************************************************************************/

function unirsealservisor(servidor_id) {
    const data = {
        servidor_id: servidor_id
    };

    console.log("Datos del formulario:", data); /*ayuda en consola */

    fetch("http://127.0.0.1:5000/auth/unir_servi", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            
        },
        body: JSON.stringify(data),
        credentials: 'include'
    })
    .then(response => {
        console.log("Respuesta del servidor:", response);

        if (response.status === 200) {
                document.getElementById("message").innerHTML = data.message;

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