const $barraEstado = document.querySelector('#barra-estado');
const $tablero = document.querySelector('#tablero');

let ronda;
let secuenciaMaquina;
let secuenciaUsuario;

actualizarEstado(`Presione "Iniciar" para empezar el juego.`);

document.querySelector('button[type = button]').onclick = comenzarJuego;

function comenzarJuego() {
    actualizarEstadoBoton(false);
    iniciarEstadoJuego();
    manejarRonda();
}

function actualizarEstado(estado, juegoPerdido = false) {
    const $estado = document.querySelector('#estado');
    $estado.textContent = estado;

    if (juegoPerdido) {
        $estado.classList.remove('alert-primary');
        $estado.classList.add('alert-danger');
    } else {
        $estado.classList.remove('alert-danger');
        $estado.classList.add('alert-primary');
    }
}

function actualizarEstadoBoton(habilitar) {
    const $boton = document.querySelector('#iniciar');

    if (habilitar) {
        $boton.classList.remove('btn-outline-secondary');
        $boton.classList.add('btn-outline-primary');
        $boton.classList.remove('disabled');
    } else {
        $boton.classList.remove('btn-outline-primary');
        $boton.classList.add('btn-outline-secondary');
        $boton.classList.add('disabled');
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

    const $nuevoCuadrado = obtenerCuadradoAleatorio();
    secuenciaMaquina.push($nuevoCuadrado);

    const RETRASO_TURNO_JUGADOR = (secuenciaMaquina.length + 1) * 1000; // milisegundos antes del turno del jugador

    secuenciaMaquina.forEach(function($cuadrado, indice) {
        const RETRASO_MS = (indice + 1) * 1000;
        setTimeout(function() {
            resaltarCuadrado($cuadrado);
        }, RETRASO_MS);
    });

    setTimeout(function() {
        actualizarEstado('Turno del jugador.');
        desbloquearInputUsuario();
    }, RETRASO_TURNO_JUGADOR);
}

function actualizarNumeroRonda(numero) {
    document.querySelector('#ronda').textContent = numero;
}

function obtenerCuadradoAleatorio() {
    const $cuadrados = document.querySelectorAll('.cuadrado');
    const indiceAleatorio = Math.floor(Math.random() * $cuadrados.length);
    return $cuadrados[indiceAleatorio];
}

function resaltarCuadrado($cuadrado) {
    $cuadrado.style.opacity = 0.5;
    setTimeout(function() {
        $cuadrado.style.opacity = 1;
    }, 500);
}

function bloquearInputUsuario() {
    document.querySelectorAll('.cuadrado').forEach(function($cuadrado) {
        $cuadrado.onclick = function() {};
    });
}

function desbloquearInputUsuario() {
    document.querySelectorAll('.cuadrado').forEach(function($cuadrado) {
        $cuadrado.onclick = manejarInputUsuario;
    });
}

function manejarInputUsuario(event) {
    const $cuadrado = event.target;
    const $cuadradoMaquina = secuenciaMaquina[secuenciaUsuario.length];

    if ($cuadrado.id !== $cuadradoMaquina.id) {
        perder();
        return
    }
    
    secuenciaUsuario.push($cuadrado);
    resaltarCuadrado($cuadrado);

    if (secuenciaMaquina.length === secuenciaUsuario.length) {
        bloquearInputUsuario();
        setTimeout(manejarRonda, 1000);
    }
}

function perder() {
    bloquearInputUsuario();
    actualizarEstado('Perdiste! Presione "Iniciar" para volver a jugar.', true);
    actualizarEstadoBoton(true);

function ocultarElemento(elemento) {
    document.querySelector(`#${elemento}`).classList.add('oculto');
}

function mostrarElemento(elemento) {
    document.querySelector(`#${elemento}`).classList.remove('oculto');
}
