/* CREAR SERVIDOR */
let sala_nueva=document.getElementById('sala_nueva');  //http://127.0.0.1:5000/auth/login
sala_nueva.addEventListener('click', function(){

    window.location.href = "/auth/crear_servidor";     // "registro.html"; // "/auth/user_logeado";

});   


/* CREAR CANAL */
let canal_nuevo=document.getElementById('c_canal');  //http://127.0.0.1:5000/auth/login
canal_nuevo.addEventListener('click', function(){

    window.location.href = "/auth/crear_canal";     // "registro.html"; // "/auth/user_logeado";

});  

/* MOSTRAR GRID */
let todo_sala=document.getElementById('todo_sala');
todo_sala.addEventListener('click', function(){
    window.location.href = "/auth/grid";     
}); 