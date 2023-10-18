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
	rutas = ["imagenes/piedra.png", "imagenes/papel.png","imagenes/tijeras.png", "imagenes/lagarto.png", "imagenes/spock.png"];
// Obtiene las selecciones del usuario y del sistema
const usuario = "";
const sistema = "";
let resultUsuario = 0;
let resultSitema = 0;
const contadorPlayer = document.getElementById("contadorPlayer");
const contadorComputer = document.getElementById("contadorComputer");


// Definir un objeto que mapea las combinaciones y resultados
const resultados = {
  piedra: {
    piedraC: "EMPATE",
    papelC: "PERDISTE",
    tijerasC: "GANASTE",
    lagartoC: "GANASTE",
    spockC: "PERDISTE",
  },
  papel: {
    piedraC: "GANASTE",
    papelC: "EMPATE",
    tijerasC: "PERDISTE",
    lagartoC: "PERDISTE",
    spock: "GANASTE",
  },
  tijeras: {
    piedraC: "PERDISTE",
    papelC: "GANASTE",
    tijerasC: "EMPATE",
    lagartoC: "GANASTE",
    spockC: "PERDISTE",
  },
  lagarto: {
    piedraC: "PERDISTE",
    papelC: "GANASTE",
    tijerasC: "PERDISTE",
    lagartoC: "EMPATE",
    spockC: "GANASTE",
  },
  spock: {
    piedraC: "GANASTE",
    papelC: "PERDISTE",
    tijerasC: "GANASTE",
    lagartoC: "PERDISTE",
    spockC: "EMPATE",
  },
};

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
	resetPlay = document.getElementById("resetPlay");
	
	player = document.getElementById("column1");
	result = document.getElementById("column2");
	computer = document.getElementById("column3");
}

// Escribimos nombre del Jugador en centro de la pantalla
function writeName(){
	labelName.textContent  = inputName.value;
	player.classList.remove("bloqueado");
	result.classList.remove("bloqueado");
	// computer.classList.remove("bloqueado");
	playButton.style.display = "none";
	resetPlay.style.display = "block";
}

// Listeners que queremos cargar al cargar la pagina
function setListeners(){
	playButton = document.getElementById("playButton");
	playButton.addEventListener("click", writeName);
}

function getComputerChoice() {
    const choices = ['piedraC', 'papelC', 'tijeraC', 'lagartoC', 'spockC'];
    const randomIndex = Math.floor(Math.random() * 5);
    return choices[randomIndex];
}

// Resetamos imagen para volver hacer click en otra y seguir jugando
function resetImage(imagenDiv, imagenDivD, sistema, usuario){
	// Obtener el resultado y mostrarlo en el elemento "resolucion"
	const resultado = resultados[sistema][usuario];
	const solucion = document.getElementById("resolucion");
	solucion.innerText = resultado;
	limpiarresultado(solucion,imagenDiv,imagenDivD);
	contador(resultado);

}

function limpiarresultado(solucion,imagenDiv,imagenDivD){
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

// Input donde introducimos el nombre del player
window.addEventListener("input", ()=>{
	inputName = document.getElementById("inputName");
	if(inputName.value.length > 0){
		playButton.disabled = false;
	} else {
		playButton.disabled = true;
	}
});

// Al cargar la pagina
window.addEventListener("load",()=>{
	inicializarVariables();
	setListeners();
	player.classList.add("bloqueado");
	result.classList.add("bloqueado");
	computer.classList.add("bloqueado");
	playButton.disabled = true;
	resetPlay.style.display = "none";
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
			imagenCopia = imagen.cloneNode(true);
			imagenCopiaC = imagenC.cloneNode(true);
			// Limpia el contenido actual del segundo div
			imagenDiv.innerHTML = '';
			imagenDivD.innerHTML = '';
	
			// Agrega la copia de la imagen al segundo div
			imagenDiv.appendChild(imagenCopia);
			imagenDivD.appendChild(imagenCopiaC);
			
			setTimeout(() => {
				resetImage(imagenDiv, imagenDivD, e.target.id,selectComputer);
			}, 500);
		}
	
	}

	if(e.target.id === "resetPlay"){
		// reset pagina y volvermos al inicio
		location.reload();
	}

	
});
