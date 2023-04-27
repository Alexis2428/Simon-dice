const $barraEstado = document.querySelector('#barra-estado');
const $tablero = document.querySelector('#tablero');

let ronda;
let secuenciaMaquina;
let secuenciaUsuario;

actualizarEstado(`Presione "Iniciar" para empezar el juego.`);

document.querySelector('#iniciar').onclick = iniciarJuego;

function iniciarJuego() {
    ocultarElemento('titulo');
    alternarEstadoBoton('habilitado');
    mostrarElemento('tablero');

    iniciarEstadoJuego();
    manejarRonda();
}

function actualizarEstado(estado, juegoPerdido = false) {
    const $estado = $barraEstado.querySelector('#estado');
    $estado.textContent = estado;

    if (juegoPerdido) {
        $estado.classList.remove('alert-primary');
        $estado.classList.add('alert-danger');

    } else {
        $estado.classList.remove('alert-danger');
        $estado.classList.add('alert-primary');
    }
}

function alternarEstadoBoton(estado) {      // recibe como parametro el estado actual del boton
    const $boton = document.querySelector('#iniciar');

    if (estado === 'deshabilitado') {
        $boton.classList.remove('btn-outline-secondary', 'disabled');
        $boton.classList.add('btn-outline-primary');

    } else {
        $boton.classList.remove('btn-outline-primary');
        $boton.classList.add('btn-outline-secondary', 'disabled');
    }
}

function iniciarEstadoJuego() {
    ronda = 0;
    secuenciaMaquina = [];
}

function manejarRonda() {
    ronda++;
    actualizarNumeroRonda(ronda);

    secuenciaUsuario = [];

    actualizarEstado('Turno de la maquina.');
    bloquearInputUsuario();

    const $nuevoCuadro = obtenerCuadroAleatorio();
    secuenciaMaquina.push($nuevoCuadro);

    const RETRASO_TURNO_JUGADOR = (secuenciaMaquina.length + 1) * 1000; // milisegundos antes del turno del jugador

    secuenciaMaquina.forEach(function($cuadro, indice) {
        const RETRASO_MS = (indice + 1) * 1000;
        setTimeout(function() {
            resaltarCuadro($cuadro);
        }, RETRASO_MS);
    });

    setTimeout(function() {
        actualizarEstado('Turno del jugador.');
        desbloquearInputUsuario();
    }, RETRASO_TURNO_JUGADOR);
}

function actualizarNumeroRonda(numero) {
    $barraEstado.querySelector('#ronda').textContent = numero.toString();
}

function obtenerCuadroAleatorio() {
    const $cuadros = $tablero.querySelectorAll('.cuadro');
    const indiceAleatorio = Math.floor(Math.random() * $cuadros.length);
    return $cuadros[indiceAleatorio];
}

function resaltarCuadro($cuadro) {
    $cuadro.style.opacity = 0.5;
    setTimeout(function() {
        $cuadro.style.opacity = 1;
    }, 500);
}

function bloquearInputUsuario() {
    $tablero.onclick = function() {};
}

function desbloquearInputUsuario() {
    $tablero.onclick = function(event) {
        const $elemento = event.target;

        if ($elemento.classList.contains('cuadro')) {
            manejarInputUsuario($elemento);
        }
    }
}

function manejarInputUsuario($cuadro) {
    const $cuadroMaquina = secuenciaMaquina[secuenciaUsuario.length];

    if ($cuadro.id !== $cuadroMaquina.id) {
        perder();
        return
    }
    
    secuenciaUsuario.push($cuadro);
    resaltarCuadro($cuadro);

    if (secuenciaMaquina.length === secuenciaUsuario.length) {
        bloquearInputUsuario();
        setTimeout(manejarRonda, 1000);
    }
}

function perder() {
    actualizarEstado('Perdiste! Presione "Iniciar" para volver a jugar.', true);
    alternarEstadoBoton('deshabilitado');
    
    ocultarElemento('tablero');
    mostrarElemento('titulo');
}

function ocultarElemento(elemento) {
    document.querySelector(`#${elemento}`).classList.add('oculto');
}

function mostrarElemento(elemento) {
    document.querySelector(`#${elemento}`).classList.remove('oculto');
}
