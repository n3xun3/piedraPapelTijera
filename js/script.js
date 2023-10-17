let inputName,
    botonJugar,
    buttonSelected,
    inputNamePlayer,
    inputResponse,
    inputResult,
    inputPointer,
    selectPlayer,
    player,
    ordenador,
    identificador,
    caja,
    inputResolution,
    solucion,
    opciones,
	parentId = "",
	rutas = ["imagenes/piedra.png", "imagenes/papel.png","imagenes/tijeras.png", "imagenes/lagarto.png", "imagenes/spock.png"];

//1º Al cargar la pantalla queremos que que se cargen todas las imagenes, botones e inputs (parte visual)
//2º Al introducir el nombre y click boton jugar se deberián de desbloquear las imagenes y poder jugar y pintar el nombre del player en pantalla.✅
//3ª Al clicar en el dibujo se debe marcar, pintar en resultado y al mismo tiempo lanzar random del PC y pintar lo que salgas
//4º Pintar el resultado de esa ronda GANADO, EMPATE, PERDIDO
//5º cada vicrtoria se debe sumar en un contador para controlar el resultado ( se peude poner un máximo y al llegar Poner VICTORIA y resetear auto(opcional))
//6º Boton reset reseteara todos los inputs

function inicializarVariables(){
	inputName = document.getElementById("inputName");
	buttonSelected = document.getElementsByClassName("botonJugador");
	inputNamePlayer = document.getElementById("inputNamePlayer");
	selectPlayer = document.getElementById("select");
	inputResult = document.getElementById("inputResult");
	inputResponse = document.getElementById("inputResponse");
	inputPointer = document.getElementById("inputPointer");
	player = document.getElementById("player");
	inputNameCenter = document.getElementById("inputNameCenter");
	inputResolution = document.getElementById("resolucion");
}
// Escribimos nombre del Jugador en centro de la pantalla
function writeName(){
	inputNameCenter.value = inputName.value;
}
// Listeners que queremos cargar al cargar la pagina
function setListeners(){
	playButton = document.getElementById("playButton");
	playButton.addEventListener("click", writeName);
}
// Resetamos imagen para volver hacer click en otra y seguir jugando
function resetImage(imagenDiv){
	imagenDiv.innerHTML = '';
}

// Input donde introducimos el nombre del player
window.addEventListener("input", ()=>{
	inputName = document.getElementById("inputName");
	console.log()
	if(inputName.value.length > 0){
		playButton.disabled = false;
	} else {
		playButton.disabled = true;
	}
});
// Al cargar la pagina
window.addEventListener("load",()=>{
	// inicializarVariables();
	setListeners();
	
	playButton.disabled = true;
});

window.addEventListener("click", (e)=> {
	const ButtonSelectPlayer = document.getElementById(e.target.id);
	const imagenDiv = document.getElementById('cajaIzquierda');
	// Obtiene la imagen del botón
    const imagen = ButtonSelectPlayer.querySelector('img');

    // Crea una copia de la imagen
    const imagenCopia = imagen.cloneNode(true);

    // Limpia el contenido actual del segundo div
    imagenDiv.innerHTML = '';

    // Agrega la copia de la imagen al segundo div
    imagenDiv.appendChild(imagenCopia);
	setTimeout(() => {
		resetImage(imagenDiv);
	}, 5000);
	
});