let nombreJugador = "";
let nivelActual = 1;
let aciertosEnNivel = 0;
let intentosTotales = 0;
const tiempoPorNivel = 60;
let tiempoRestante = tiempoPorNivel;

let idReloj = null;
let cartasVolteadas = [];
let bloqueoTablero = false;
let avisoDiezSegundos = false;

 const imagenesReZero = [
    'img/rezero/1.jpg',
    'img/rezero/2.jpg',
    'img/rezero/3.jpg',
    'img/rezero/4.jpg',
    'img/rezero/5.jpg',
    'img/rezero/6.jpg',
]
const imagenesJJK = [
    'img/jjk/1.jpg',
    'img/jjk/2.jpg',
    'img/jjk/3.jpg',
    'img/jjk/4.jpg',
    'img/jjk/5.jpg',
    'img/jjk/6.jpg',
]

const imagenesBB= [
    'img/bb/1.jpg',
    'img/bb/2.jpg',
    'img/bb/3.jpg',
    'img/bb/4.jpg',
    'img/bb/5.jpg',
    'img/bb/6.jpg',
]

const imagenesBleach= [
    'img/bleach/1.jpg',
    'img/bleach/2.jpg',
    'img/bleach/3.jpg',
    'img/bleach/4.jpg',
    'img/bleach/5.png',
    'img/bleach/6.jpg',
]

const imagenesBTR= [
    'img/btr/1.png',
    'img/btr/2.jpg',
    'img/btr/3.jpg',
    'img/btr/4.png',
    'img/btr/5.jpg',
    'img/btr/6.jpg',
]

const imagenesGenshin= [
    'img/genshin/1.jpg',
    'img/genshin/2.jpg',
    'img/genshin/3.jpg',
    'img/genshin/4.jpg',
    'img/genshin/5.jpg',
    'img/genshin/6.jpg',
]

const imagenesGoToubun= [
    'img/gotoubun/1.jpg',
    'img/gotoubun/2.jpg',
    'img/gotoubun/3.jpg',
    'img/gotoubun/4.png',
    'img/gotoubun/5.jpg',
    'img/gotoubun/6.png',
]

const imagenesHSR= [
    'img/hsr/1.png',
    'img/hsr/2.jpg',
    'img/hsr/3.jpg',
    'img/hsr/4.jpg',
    'img/hsr/5.jpg',
    'img/hsr/6.jpg',
]

const imagenesUma= [
    'img/uma/1.jpg',
    'img/uma/2.jpg',
    'img/uma/3.png',
    'img/uma/4.png',
    'img/uma/5.png',
    'img/uma/6.png',
]

const imagenesZZZ= [
    'img/zzz/1.jpg',
    'img/zzz/2.jpg',
    'img/zzz/3.png',
    'img/zzz/4.jpg',
    'img/zzz/5.jpeg',
    'img/zzz/6.jpeg',
]


const nivelesImagenes = [imagenesReZero, imagenesJJK, imagenesBB, imagenesBleach, imagenesBTR, imagenesGenshin, imagenesGoToubun, imagenesHSR, imagenesUma, imagenesZZZ];


const elTablero        =document.getElementById('tablero');
const elBtnComenzar    =document.getElementById('btnComenzar');
const elDatoJugador    =document.getElementById('datoJugador');
const elDatoNivel      =document.getElementById('datoNivel');
const elDatoAciertos   =document.getElementById('datoAciertos');
const elDatoIntentos   =document.getElementById('datoIntentos');
const elDatoTiempo     =document.getElementById('datoTiempo');
const elTablaJugadores =document.getElementById('tablaJugadores');


const audioClickMp3   = document.getElementById('audioClickMp3');
const audioCorrerMp3  = document.getElementById('audioCorrerMp3');
const audioDerrotaMp3 = document.getElementById('audioDerrotaMp3');
const audioErrorMp3   = document.getElementById('audioErrorMp3');
const audioJugarMp3   = document.getElementById('audioJugarMp3');
const audioSuccessMp3 = document.getElementById('audioSuccessMp3');
const audioTriunfoMp3 = document.getElementById('audioTriunfoMp3');


elBtnComenzar.addEventListener('click', iniciarJuego);
 
function iniciarJuego(){
const nombre = prompt('ingresa tu nombre');
if(!nombre) return;

nombreJugador = nombre.trim();
nivelActual = 1;
aciertosEnNivel = 0;
intentosTotales = 0;
tiempoRestante = tiempoPorNivel;
avisoDiezSegundos = false;

try{
  audioJugarMp3.volume = 1;
  audioJugarMp3.play();
  reproducirMusicaFondo();


}
catch(e){}
actualizarPanel();
crearTableroParaNivel(nivelActual);
iniciarReloj();


}
 function actualizarPanel(){
elDatoJugador.textContent = "Jugador: " + (nombreJugador || "-");
elDatoNivel.textContent  = "Nivel: " + nivelActual;
elDatoAciertos.textContent  = "Aciertos: " + aciertosEnNivel;
elDatoIntentos.textContent = "Intentos: " + intentosTotales;
elDatoTiempo.textContent = "Tiempo: " + tiempoRestante;

  }
function crearTableroParaNivel(nivel){

elTablero.innerHTML = "";
cartasVolteadas = [];
bloqueoTablero = false;
avisoDiezSegundos = false;

const lista = nivelesImagenes[nivel-1].slice();
const cartas = mezclar([...lista, ...lista]);

document.body.style.backgroundImage = (nivel === 1) ? "url('img/fondo.jpg')" : "url('img/fondo.jpg')";

cartas.forEach((ruta,i)=>{
const carta = document.createElement('div');
carta.className = "carta";
carta.dataset.ruta = ruta;
carta.dataset.index = i;

const cara = document.createElement('div');
cara.className = "cara";

const img =  document.createElement('img');
img.src = ruta;
cara.appendChild(img);

const reverso = document.createElement('div')
reverso.className = 'reverso';
carta.appendChild(cara);
carta.appendChild(reverso);
carta.addEventListener('click',()=>voltearCarta(carta));
elTablero.appendChild(carta);

    });

  }

  function voltearCarta(carta){
  if (bloqueoTablero) return;                    
  if (carta.classList.contains('volteada')) return; 
  if (carta.classList.contains('acertada')) return; 


  try { audioClickMp3.currentTime = 0; audioClickMp3.play(); } catch(e){}

  carta.classList.add('volteada');
  cartasVolteadas.push(carta);

 
  if (cartasVolteadas.length === 2) {
    bloqueoTablero = true;       
    intentosTotales++;          
    actualizarPanel();
    compararPareja();
  }
}

function compararPareja(){
  const [c1, c2] = cartasVolteadas;
  const sonIguales = c1.dataset.ruta === c2.dataset.ruta;

  if (sonIguales) {
  
    aciertosEnNivel++;
    try { audioSuccessMp3.currentTime = 0; audioSuccessMp3.play(); } catch(e){}
    c1.classList.add('acertada'); c2.classList.add('acertada');


    cartasVolteadas = [];
    bloqueoTablero = false;

    actualizarPanel();
    revisarFinDeNivel();   
  } else {

    try { audioErrorMp3.currentTime = 0; audioErrorMp3.play(); } catch(e){}
    setTimeout(()=>{
      c1.classList.remove('volteada');
      c2.classList.remove('volteada');
      cartasVolteadas = [];
      bloqueoTablero = false;
    }, 700);
  }
}

function revisarFinDeNivel(){
  if (aciertosEnNivel === 6) {
    detenerReloj();
    detenerSonidoCorrer();


    const nivelCompletado = nivelActual;
    setTimeout(()=>alert('¡Nivel ' + nivelCompletado + ' completado!'), 120);


    if (nivelActual < nivelesImagenes.length) {

      nivelActual++;
      aciertosEnNivel = 0;
      intentosTotales = 0;
      tiempoRestante = tiempoPorNivel;

      actualizarPanel();
      crearTableroParaNivel(nivelActual);
      iniciarReloj();
    } else {

      registrarJugador();
      try { audioTriunfoMp3.currentTime = 0; audioTriunfoMp3.play(); } catch(e){}
      setTimeout(()=>alert('¡Has completado todos los niveles!'), 150);
    }
  }
}


function iniciarReloj(){
  detenerReloj(); 
  elDatoTiempo.textContent = 'Tiempo: ' + tiempoRestante;

  idReloj = setInterval(()=>{
    tiempoRestante--;
    elDatoTiempo.textContent = 'Tiempo: ' + tiempoRestante;


    if (!avisoDiezSegundos && tiempoRestante <= 10) {
      avisoDiezSegundos = true;
      try {
        audioCorrerMp3.loop = true;
        audioCorrerMp3.volume = 0.85;
        audioCorrerMp3.currentTime = 0;
        audioCorrerMp3.play();
      } catch(e){}
    }


    if (tiempoRestante <= 0) {
      detenerReloj();
      detenerSonidoCorrer();
      try { audioDerrotaMp3.currentTime = 0; audioDerrotaMp3.play(); } catch(e){}
      alert('¡Tiempo agotado!');
      registrarJugador();
      bloqueoTablero = true;
    }
  }, 1000);
}

function voltearCarta(carta){
  if (bloqueoTablero) return;                    
  if (carta.classList.contains('volteada')) return; 
  if (carta.classList.contains('acertada')) return; 


  try { audioClickMp3.currentTime = 0; audioClickMp3.play(); } catch(e){}

  carta.classList.add('volteada');
  cartasVolteadas.push(carta);


  if (cartasVolteadas.length === 2) {
    bloqueoTablero = true;       
    intentosTotales++;           
    actualizarPanel();
    compararPareja();
  }
}


function compararPareja(){
  const [c1, c2] = cartasVolteadas;
  const sonIguales = c1.dataset.ruta === c2.dataset.ruta;

  if (sonIguales) {

    aciertosEnNivel++;
    try { audioSuccessMp3.currentTime = 0; audioSuccessMp3.play(); } catch(e){}
    c1.classList.add('acertada'); c2.classList.add('acertada');


    cartasVolteadas = [];
    bloqueoTablero = false;

    actualizarPanel();
    revisarFinDeNivel();   
  } else {

    try { audioErrorMp3.currentTime = 0; audioErrorMp3.play(); } catch(e){}
    setTimeout(()=>{
      c1.classList.remove('volteada');
      c2.classList.remove('volteada');
      cartasVolteadas = [];
      bloqueoTablero = false;
    }, 700);
  }
}


function revisarFinDeNivel(){
  if (aciertosEnNivel === 6) {
    detenerReloj();
    detenerSonidoCorrer();


    const nivelCompletado = nivelActual;
    setTimeout(()=>alert(' ¡Nivel ' + nivelCompletado + ' completado!'), 120);


    if (nivelActual < nivelesImagenes.length) {

      nivelActual++;
      aciertosEnNivel = 0;
      intentosTotales = 0;
      tiempoRestante = tiempoPorNivel;

      actualizarPanel();
      crearTableroParaNivel(nivelActual);
      iniciarReloj();
    } else {
 
      registrarJugador();
      try { audioTriunfoMp3.currentTime = 0; audioTriunfoMp3.play(); } catch(e){}
      setTimeout(()=>alert('¡Has completado todos los niveles!'), 150);
    }
  }
}


function iniciarReloj(){
  detenerReloj(); 
  elDatoTiempo.textContent = 'Tiempo: ' + tiempoRestante;

  idReloj = setInterval(()=>{
    tiempoRestante--;
    elDatoTiempo.textContent = 'Tiempo: ' + tiempoRestante;


    if (!avisoDiezSegundos && tiempoRestante <= 10) {
      avisoDiezSegundos = true;
      try {
        audioCorrerMp3.loop = true;
        audioCorrerMp3.volume = 0.85;
        audioCorrerMp3.currentTime = 0;
        audioCorrerMp3.play();
      } catch(e){}
    }


    if (tiempoRestante <= 0) {
      detenerReloj();
      detenerSonidoCorrer();
      try { audioDerrotaMp3.currentTime = 0; audioDerrotaMp3.play(); } catch(e){}
      alert('¡Tiempo agotado!');
      registrarJugador();
      bloqueoTablero = true; 
    }
  }, 1000);
}

function detenerReloj(){ if (idReloj) clearInterval(idReloj); idReloj = null; }

function detenerSonidoCorrer(){
  try { audioCorrerMp3.pause(); audioCorrerMp3.currentTime = 0; } catch(e){}
}

function actualizarPanel(){
  elDatoJugador.textContent  = 'Jugador: ' + (nombreJugador || '—');
  elDatoNivel.textContent    = 'Nivel: ' + nivelActual;
  elDatoAciertos.textContent = 'Aciertos: ' + aciertosEnNivel;
  elDatoIntentos.textContent = 'Intentos: ' + intentosTotales;
  elDatoTiempo.textContent   = 'Tiempo: ' + tiempoRestante;
}

function registrarJugador(){
  const fila = document.createElement('tr');
  const numero = elTablaJugadores.children.length + 1;
  fila.innerHTML = `
    <td>${numero}</td>
    <td>${esc(nombreJugador)}</td>
    <td>${nivelActual}</td>
    <td>${intentosTotales}</td>
    <td>${aciertosEnNivel}</td>
    <td>${tiempoRestante} seg.</td>
  `;
  elTablaJugadores.appendChild(fila);
}

const audioStage = document.getElementById('audiofondo');

function reproducirMusicaFondo() {
  setTimeout(() => {
    audioStage.currentTime = 0; 
    audioStage.volume = 0.4;     
    audioStage.play().catch(()=>{});


    setTimeout(() => {
      
    }, 45000); 
  }, 4000);   
}





  function mezclar(arr){ return arr.sort(()=>Math.random() - 0.5);}




function esc(t){ return (t+'').replace(/[&<>"']/g, s=>({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[s])); }

