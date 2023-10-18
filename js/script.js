let inputName,
    buttonSelected,
    inputNamePlayer,
    inputResponse,
    inputResult,
    inputPointer,
    selectPlayer,
    player,
    computer,
    inputResolution,
	rutas = ["imagenes/piedra.png", "imagenes/papel.png","imagenes/tijera.png", "imagenes/lagarto.png", "imagenes/spock.png"];
// Obtiene las selecciones del usuario y del sistema
let divSeleccionado = null; // Almacena el div seleccionado
const usuario = "";
const sistema = "";
let resultUsuario = 0;
let resultSitema = 0;
const contadorPlayer = document.getElementById("contadorPlayer");
const contadorComputer = document.getElementById("contadorComputer");
const miAudio = document.getElementById("miAudio");
const error = document.getElementById("error");
const empate = document.getElementById("empate");
const solucion = document.getElementById("resolucion");
const imgElement = document.createElement("img"); 
// Definir un objeto que mapea las combinaciones y resultados
const resultados = {
		piedra: {
			piedraC: "EMPATE",
			papelC: "PERDISTE",
			tijeraC: "GANASTE",
			lagartoC: "GANASTE",
			spockC: "PERDISTE",
		},
		papel: {
			piedraC: "GANASTE",
			papelC: "EMPATE",
			tijeraC: "PERDISTE",
			lagartoC: "PERDISTE",
			spockC: "GANASTE",
		},
		tijera: {
			piedraC: "PERDISTE",
			papelC: "GANASTE",
			tijeraC: "EMPATE",
			lagartoC: "GANASTE",
			spockC: "PERDISTE",
		},
		lagarto: {
			piedraC: "PERDISTE",
			papelC: "GANASTE",
			tijeraC: "PERDISTE",
			lagartoC: "EMPATE",
			spockC: "GANASTE",
		},
		spock: {
			piedraC: "GANASTE",
			papelC: "PERDISTE",
			tijeraC: "GANASTE",
			lagartoC: "PERDISTE",
			spockC: "EMPATE",
		},
};

// Al cargar la pagina
window.addEventListener("load",()=>{
	inicializarVariables(); // Inicializamos variables
	setListeners(); // Inicializamos los listeners que utilizaremos en la app
	blockWindow();
});

function inicializarVariables(){
	inputName = document.getElementById("inputName");
	buttonSelected = document.getElementsByClassName("botonJugador");
	inputNamePlayer = document.getElementById("inputNamePlayer");
	selectPlayer = document.getElementById("select");
	inputResult = document.getElementById("inputResult");
	inputResponse = document.getElementById("inputResponse");
	inputPointer = document.getElementById("inputPointer");
	labelName = document.getElementById("labelName");
	inputResolution = document.getElementById("resolucion");
	
	player = document.getElementById("column1");
	result = document.getElementById("column2");
	computer = document.getElementById("column3");
}

// Listeners que queremos cargar al cargar la pagina
function setListeners(){
	playButton = document.getElementById("playButton");
	playButton.addEventListener("click", writeName);
	
	window.addEventListener("input", ()=>{
		inputName = document.getElementById("inputName");
		if(inputName.value.length > 0){
			playButton.disabled = false;
		} else {
			playButton.disabled = true;
		}
	});


	window.addEventListener("click", (e)=> {
		let imagenCopia;
		
		if(e.target.localName === "img"){
			const selectComputer = getComputerChoice();
			const ButtonSelectPlayer = document.getElementById(e.target.id);
			const ButtonSelectComputer = document.getElementById(selectComputer);
			const imagenDiv = document.getElementById('humano');
			const imagenDivD = document.getElementById('ordenadorOpcion');
			// Obtiene la imagen del botón
			const imagen = ButtonSelectPlayer;
			const imagenC = ButtonSelectComputer;
			// Crea una copia de la imagen
			if(imagen && imagenC){
				ButtonSelectComputer.style.background = "#F9F9F9";
				imagenCopia = imagen.cloneNode(true);
				imagenCopiaC = imagenC.cloneNode(true);
				// Limpia el contenido actual del segundo div
				imagenDiv.innerHTML = '';
				imagenDivD.innerHTML = '';
				
				// Agrega la copia de la imagen al segundo div
				imagenDiv.appendChild(imagenCopia);
				imagenDivD.appendChild(imagenCopiaC);
				setTimeout(() => {
					resetImage(imagenDiv, imagenDivD, e.target.id, selectComputer);
					ButtonSelectComputer.style.background = "#808080";
				}, 800);
			}
		
		}
		
	});
}

function blockWindow(){
	player.classList.add("bloqueado");
	result.classList.add("bloqueado");
	computer.classList.add("bloqueado");
}

// Escribimos nombre del Jugador en centro de la pantalla
function writeName(){
	if(inputName.value !== ""){
		resultUsuario = 0;
		contadorPlayer.textContent = 0;
		resultSitema = 0;
		contadorComputer.textContent = 0;	
		labelName.textContent  = inputName.value;
		player.classList.remove("bloqueado");
		result.classList.remove("bloqueado");
		inputName.value = "";
	} else {
		alert("Debe introducir un bombre para poder jugar!!!!.");
	}
}

function getComputerChoice() {
    const choices = ['piedraC', 'papelC', 'tijeraC', 'lagartoC', 'spockC'];
    const randomIndex = Math.floor(Math.random() * 5);
    return choices[randomIndex];
}

// Resetamos imagen para volver hacer click en otra y seguir jugando
// Método para obtener el resultado de manera asincrónica
function resetImage(imagenDiv, imagenDivD, sistema, usuario) {
	const resultado = obtenerResultado(sistema, usuario);

	if (resultado !== undefined) {
	  solucion.classList.add("titulosResultado");	
	  solucion.innerText = resultado;
	  if(resultado === "GANASTE"){
			lanzarConfeti(100);
			miAudio.currentTime = 6;
			miAudio.play();
		} else if(resultado === "PERDISTE"){
			error.play();
		}else{
			empate.play();
		}
	  limpiarResultado(solucion, imagenDiv, imagenDivD);
	  contador(resultado);
	} else {
	  console.error("Resultado no encontrado");
	}
}
  // Método que verificara si las claves sistema y usuario existen antesd e intentar acceder a ellas.
function obtenerResultado(sistema, usuario) {
	if (resultados.hasOwnProperty(sistema) && resultados[sistema].hasOwnProperty(usuario)) {
	  return resultados[sistema][usuario];
	}
	return undefined;
}
  
function limpiarResultado(solucion, imagenDiv, imagenDivD) {
	setTimeout(() => {
	  solucion.innerText = "";
	  imagenDiv.innerHTML = '';
	  imagenDivD.innerHTML = '';
	}, 2000);
}

function contador(resultado){
	if(resultado === 'GANASTE'){
		resultUsuario = resultUsuario + 1;
	}
	if(resultado === 'PERDISTE'){
		resultSitema= resultSitema + 1;
	}
	contadorPlayer.textContent = resultUsuario;
	contadorComputer.textContent = resultSitema;
}

function lanzarConfeti(cantidad) {
    const container = document.body;
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < cantidad; i++) {
        const confeti = document.createElement("div");
        confeti.className = "confeti";
        fragment.appendChild(confeti);
    }

    container.appendChild(fragment);

    const confetiElements = document.querySelectorAll(".confeti");

    confetiElements.forEach((confeti, index) => {
        const delay = Math.random() * 5;
        confeti.style.animation = `confeti-fall 4s linear ${delay}s infinite`;

        confeti.style.left = `${Math.random() * 100}vw`;
        confeti.style.opacity = Math.random();
		confeti.style.display = "block";
        // Después de un tiempo, eliminar el confeti
        setTimeout(() => {
            container.removeChild(confeti);
        }, 4000); // Cambia el valor (en milisegundos) según lo que consideres apropiado
    });
}
