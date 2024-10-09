// Variables globales
let tableroJuego = ['', '', '', '', '', '', '', '', ''];
let jugadorActual = 'X';
let juegoTerminado = false;

const celdas = document.querySelectorAll('.cell');
const mensajeResultado = document.getElementById('mensaje-resultado');

function actualizarTablero() {
  celdas.forEach((celda, indice) => {
    celda.textContent = tableroJuego[indice];
    if (tableroJuego[indice] === 'X') {
      celda.style.backgroundColor = 'green'; // ACA CAMBIAMOS CUANDO SE TOCA EL LUGAR AL COLOR QUE SELECCIONAMOS OSEA EL VERDE
    } else if (tableroJuego[indice] === 'O') {
      celda.style.backgroundColor = 'red'; 
    } else {
      celda.style.backgroundColor = ''; 
    }
  });
}

function mostrarMensaje(mensaje) {
  mensajeResultado.textContent = mensaje;
  mensajeResultado.style.display = 'block'; 
  setTimeout(() => {
    mensajeResultado.style.display = 'none'; 
  }, 5000);
}

function verificarGanador() {
  // Comprobar filas
  if (
    (tableroJuego[0] === jugadorActual && tableroJuego[1] === jugadorActual && tableroJuego[2] === jugadorActual) ||
    (tableroJuego[3] === jugadorActual && tableroJuego[4] === jugadorActual && tableroJuego[5] === jugadorActual) ||
    (tableroJuego[6] === jugadorActual && tableroJuego[7] === jugadorActual && tableroJuego[8] === jugadorActual)
  ) {
    return true;
  }

  // Comprobar columnas
  if (
    (tableroJuego[0] === jugadorActual && tableroJuego[3] === jugadorActual && tableroJuego[6] === jugadorActual) ||
    (tableroJuego[1] === jugadorActual && tableroJuego[4] === jugadorActual && tableroJuego[7] === jugadorActual) ||
    (tableroJuego[2] === jugadorActual && tableroJuego[5] === jugadorActual && tableroJuego[8] === jugadorActual)
  ) {
    return true;
  }

  // Comprobar diagonales
  if (
    (tableroJuego[0] === jugadorActual && tableroJuego[4] === jugadorActual && tableroJuego[8] === jugadorActual) ||
    (tableroJuego[2] === jugadorActual && tableroJuego[4] === jugadorActual && tableroJuego[6] === jugadorActual)
  ) {
    return true;
  }

  return false;
}

function cambiarJugador() {
  jugadorActual = jugadorActual === 'X' ? 'O' : 'X';
}

function reiniciarJuego() {
  tableroJuego = ['', '', '', '', '', '', '', '', ''];
  jugadorActual = 'X';
  juegoTerminado = false;
  actualizarTablero();
  mensajeResultado.style.display = 'none'; 
}

celdas.forEach((celda, indice) => {
  celda.addEventListener('click', () => {
    // Si el juego ya ha terminado o la celda ya ha sido marcada, no hacer nada
    if (juegoTerminado || tableroJuego[indice]) {
      return;
    }

    tableroJuego[indice] = jugadorActual;
    actualizarTablero();

   // aca verificamos que el ganador sea X u O se cambie a jugador 1  o 2 y lo mostramos

    if (verificarGanador()) {
      const jugadorGanador = (jugadorActual === 'X') ? '1' : '2';
      mostrarMensaje(`¡Jugador ${jugadorGanador} ha ganado!`);
      juegoTerminado = true;
      return;
    }

    if (!tableroJuego.includes('')) {
      mostrarMensaje('HAY EMPATEEE!');
      juegoTerminado = true;
      return;
    }

    // Cambiar de jugador
    cambiarJugador();
  });
});

// Botón para reiniciar el juego
const botonReiniciar = document.querySelector('.restart-btn');
botonReiniciar.addEventListener('click', reiniciarJuego);



