//iconos de jugadores
let iconoJugador1 = document.getElementById("1")
let iconoJugador2 = document.getElementById("2")
let iconoJugador3 = document.getElementById("3")
let iconoJugador4 = document.getElementById("4")


//jugadores seleccionados
let elementoJugadores = document.querySelector("#selectplayers")
let numeroJugadores = elementoJugadores.value

// cambiar la visibilidad de los contenedores de los jugadores
function cambiarVisibilidad(numeroJugadores){
    document.getElementById("1").style.display = numeroJugadores >= 1 ? "inline" : "none";
    document.getElementById("2").style.display = numeroJugadores >= 2 ? "inline" : "none";
    document.getElementById("3").style.display = numeroJugadores >= 3 ? "inline" : "none";
    document.getElementById("4").style.display = numeroJugadores >= 4 ? "inline" : "none";
}

//evento cambiar opcion de jugadores
elementoJugadores.addEventListener("change", ()=>{
    numeroJugadores = elementoJugadores.value
    cambiarVisibilidad(numeroJugadores)
    console.log(numeroJugadores);
})


// manejo de turnos
let elementoTiempo = document.getElementById("tiempo");
let elementoLetra = document.getElementById("letra")
let tiempo = 60
let turno = 0
let contador

// elemento que mostrara el ganador del juego
let elementoGanador = document.getElementById("ganador")
let ganador = `jugador ${turno}`

// input con la palabra
let elementoPalabra = document.getElementById("inputPalabra")

// contenedor de las palabras ingresadas por el usuario
let contenedorPalabras = document.getElementById("containerPalabras")

////array con las palabras ingresadas
let listaPalabras = []

//cronometro de 60 segundos para los 4 turnos
function contadorTiempo(numeroJugadores) {
    document.querySelector(".containerLogo").style.display = "none";
    document.querySelector("main").style.display = "flex";
    cambiarVisibilidad(numeroJugadores)
    if (turno >= numeroJugadores) {  
        clearInterval(contador); 
        obtenerGanador();
        return;
    }

    elementoLetra.textContent = generarLetra();
    listaPalabras = [];
    turno++;
    turnos(turno);
    tiempo = 60;

    contador = setInterval(() => {
        elementoTiempo.textContent = `${tiempo} segundos`;
        tiempo--;

        if (tiempo < 0) {
            clearInterval(contador);
            obtenerGanador();
            contenedorPalabras.innerHTML = "";

            if (turno < numeroJugadores) {
                contadorTiempo(numeroJugadores);
            }
        }
    }, 1000);  
}

//general letra aleatoria

function generarLetra() {
    return String.fromCharCode(97 + Math.floor(Math.random() * 26));
}

// cambiar estado de icono del jugador
function turnos(turno) {
    // Restauramos el color de fondo de todos los jugadores
    let iconosJugadores = document.querySelectorAll(".iconoJugador");
    iconosJugadores.forEach(icono => icono.style.backgroundColor = "#c5d4f0");

    // Resaltamos el jugador actual con un color más llamativo
    let jugadorActivo = document.getElementById(turno);
    if (jugadorActivo) {
        jugadorActivo.style.backgroundColor = "#25b864"; // Verde para indicar turno activo
    }
}


// obtener las palabras ingresadas filtrando las palabras que sean ! == null
function obtenerPalabra() {
    let palabra = elementoPalabra.value
    palabra = palabra.toLowerCase();
    elementoPalabra.value = ""
    if(palabra.startsWith(elementoLetra.textContent)){
        listaPalabras.push(palabra)
    }
    listaPalabras = listaPalabras.filter(item => item !== "");
    listaPalabras = [...new Set(listaPalabras)];
    console.log(listaPalabras);
    mostrarPalabras()
}

// montrar las palabras ingresadas por el usuario
function mostrarPalabras() {
    contenedorPalabras.innerHTML = ""; 

    listaPalabras.forEach(palabra => {
        let parrafo = document.createElement("p");
        parrafo.textContent = palabra;
        contenedorPalabras.appendChild(parrafo);
    });
}


let palabrasMax=0

// obtener el ganador del juego validadndo el tamaño del array
function obtenerGanador() {
    let palabrasIngresadas =listaPalabras.length
    if(turno>=1){
        alert(palabrasIngresadas+` palabras en el turno ${turno}`);
    }    
    if (palabrasIngresadas>palabrasMax) {
        palabrasMax=palabrasIngresadas
        ganador=`jugador ${turno}`
    }
    if (turno >= numeroJugadores) {  
        console.log("hola fin");
        elementoGanador.textContent = ganador
    }
}