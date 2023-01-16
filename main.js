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

