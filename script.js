/* 
  ====================================================================
  ACCESO, CARRUSEL DE CREADORES, CARRUSEL AUTOMÁTICO Y FORMULARIOS - BRAWL STARS
  ==================================================================== 
*/

document.addEventListener('DOMContentLoaded', () => {

    // 1. Lógica del Formulario de Login (Alumnos)
    const formularioLogin = document.getElementById('form-login');

    if (formularioLogin) {
        formularioLogin.addEventListener('submit', (e) => {
            e.preventDefault();
            const usuario = document.getElementById('usuario').value;
            alert(`¡Acceso concedido!\nBienvenido a la arena, brawler: ${usuario}`);
            formularioLogin.reset();
        });
    }

    // 2. Lógica de los Botones y Arrastre del Carrusel de Creadores
    const btnPrev = document.getElementById('btn-prev');
    const btnNext = document.getElementById('btn-next');
    const teachersTrack = document.getElementById('teachers-track');

    if (btnPrev && btnNext && teachersTrack) {
        
        // Función para calcular el ancho de desplazamiento al hacer clic en las flechas
        const getScrollAmount = () => {
            const card = teachersTrack.querySelector('.teacher-card');
            if (!card) return 320;
            return card.offsetWidth + 24; // Ancho de la tarjeta + la separación (gap)
        };

        // Evento para el botón derecho (siguiente)
        btnNext.addEventListener('click', () => {
            teachersTrack.scrollBy({
                left: getScrollAmount(),
                behavior: 'smooth'
            });
        });

        // Evento para el botón izquierdo (anterior)
        btnPrev.addEventListener('click', () => {
            teachersTrack.scrollBy({
                left: -getScrollAmount(),
                behavior: 'smooth'
            });
        });

        // --- ARRASTRE SUAVE CON EL MOUSE ---
        let isDown = false;
        let startX;
        let scrollLeft;

        teachersTrack.addEventListener('mousedown', (e) => {
            isDown = true;
            startX = e.pageX - teachersTrack.offsetLeft;
            scrollLeft = teachersTrack.scrollLeft;
            teachersTrack.style.scrollBehavior = 'auto'; // Desactiva el smooth temporalmente para respuesta inmediata con el mouse
        });

        window.addEventListener('mouseup', () => {
            if (!isDown) return;
            isDown = false;
            teachersTrack.style.scrollBehavior = 'smooth'; // Restaura el desplazamiento suave
        });

        window.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - teachersTrack.offsetLeft;
            const walk = (x - startX) * 1.5; // Velocidad de arrastre proporcional
            teachersTrack.scrollLeft = scrollLeft - walk;
        });
    }

    // 3. Lógica para el Formulario de Solicitud de Informes (Index Hero)
    const formularioHero = document.getElementById('form-hero-informes');

    if (formularioHero) {
        formularioHero.addEventListener('submit', (e) => {
            e.preventDefault();
            const nombreUsuario = document.getElementById('info_nombre').value;
            alert(`¡Gracias por tu interés, ${nombreUsuario}!\nTus datos fueron enviados con éxito. ¡Prepara a tu equipo para el Reto de Campeonato!`);
            formularioHero.reset();
        });
    }

});

/* 
  ====================================================================
  CARRUSEL AUTOMÁTICO CADA 4 SEGUNDOS (.auto-carousel)
  ==================================================================== 
*/
let indiceAuto = 0;
const slidesAuto = document.querySelectorAll('.auto-slide');

function cambiarSlideAuto(direccion) {
    if (slidesAuto.length === 0) return;
    slidesAuto[indiceAuto].classList.remove('active');
    if (direccion !== undefined) {
        indiceAuto = (indiceAuto + direccion + slidesAuto.length) % slidesAuto.length;
    } else {
        indiceAuto = (indiceAuto + 1) % slidesAuto.length;
    }
    slidesAuto[indiceAuto].classList.add('active');
}

if (slidesAuto.length > 0) {
    setInterval(function () { cambiarSlideAuto(); }, 4000);
}

/* 
  ====================================================================
  FECHA DINÁMICA SEGÚN EL DÍA ACTUAL (#fecha-dinamica)
  ==================================================================== 
*/
const hoy = new Date();
const elementoTiempo = document.getElementById('fecha-dinamica');

if (elementoTiempo) {
    const mes = String(hoy.getMonth() + 1).padStart(2, '0');
    const dia = String(hoy.getDate()).padStart(2, '0');
    elementoTiempo.setAttribute('datetime', `${hoy.getFullYear()}-${mes}-${dia}`);
    elementoTiempo.textContent = hoy.toLocaleDateString('es-MX', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    });
}
