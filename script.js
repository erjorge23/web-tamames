// ==========================================
// 1. LÓGICA DEL MENÚ DE INICIO DE SESIÓN
// ==========================================
const modal = document.getElementById("modalLogin");

function abrirModal() {
  modal.style.display = "block";
}

function cerrarModal() {
  modal.style.display = "none";
}

// Cierra el modal si el usuario hace clic fuera de la caja
window.onclick = function(event) {
  if (event.target == modal) {
    cerrarModal();
  }
}

// ==========================================
// 2. LÓGICA DEL GENERADOR DE RUTINAS
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  const btnRutina = document.getElementById('btn-rutina');
  const selectGrupo = document.getElementById('grupo-muscular');
  const selectTipo = document.getElementById('tipo-entreno');
  const divResultadoRutina = document.getElementById('resultado-rutina');

  btnRutina.addEventListener('click', () => {
    const grupo = selectGrupo.value;
    const tipo = selectTipo.value;
    let rutina = "";
    let descanso = "";

    // Lógica para decidir los ejercicios
    if (grupo === 'pecho') {
      if (tipo === 'fuerza') {
        rutina = "1. Press de Banca con barra: 4 x 3-5 reps\n2. Press Inclinado c/mancuernas: 3 x 6 reps\n3. Fondos lastrados: 3 x 6 reps\n4. Press francés (Tríceps): 3 x 6-8 reps";
        descanso = "Descansa 2 a 3 minutos entre series.";
      } else if (tipo === 'hipertrofia') {
        rutina = "1. Press de Banca: 4 x 8-12 reps\n2. Aperturas en polea: 3 x 12-15 reps\n3. Press declinado en máquina: 3 x 10 reps\n4. Extensión de tríceps en polea: 4 x 12 reps";
        descanso = "Descansa 60 a 90 segundos entre series.";
      } else {
        rutina = "1. Flexiones explosivas: 4 x fallo\n2. Press con mancuernas ligero: 4 x 15-20 reps\n3. Burpees: 3 x 1 minuto\n4. Flexiones diamante (Tríceps): 3 x fallo";
        descanso = "Descansa solo 45 segundos para mantener pulsaciones altas.";
      }
    } 
    else if (grupo === 'espalda') {
      if (tipo === 'fuerza') {
        rutina = "1. Peso Muerto: 4 x 3-5 reps\n2. Dominadas lastradas: 3 x 5 reps\n3. Remo con barra: 3 x 6 reps\n4. Curl de bíceps pesado: 3 x 6-8 reps";
        descanso = "Descansa 2 a 3 minutos entre series.";
      } else if (tipo === 'hipertrofia') {
        rutina = "1. Jalón al pecho: 4 x 8-12 reps\n2. Remo en polea baja: 3 x 10-12 reps\n3. Pullover en polea: 3 x 15 reps\n4. Curl martillo (Bíceps): 4 x 12 reps";
        descanso = "Descansa 60 a 90 segundos entre series.";
      } else {
        rutina = "1. Remo TRX: 4 x fallo\n2. Dominadas asistidas / excéntricas: 3 x 10 reps\n3. Saltos a la comba: 3 x 2 minutos\n4. Curl de bíceps con banda elástica: 3 x 20 reps";
        descanso = "Descansa solo 45 segundos para mantener pulsaciones altas.";
      }
    }
    else if (grupo === 'piernas') {
      if (tipo === 'fuerza') {
        rutina = "1. Sentadilla trasera con barra: 4 x 3-5 reps\n2. Peso Muerto Rumano: 3 x 6 reps\n3. Prensa de piernas inclinada: 3 x 6 reps\n4. Elevación de gemelos con peso: 4 x 8 reps";
        descanso = "Descansa 3 minutos entre series (las piernas exigen más).";
      } else if (tipo === 'hipertrofia') {
        rutina = "1. Prensa de piernas: 4 x 10-12 reps\n2. Extensiones de cuádriceps: 3 x 15 reps\n3. Curl femoral tumbado: 3 x 12 reps\n4. Zancadas (Lunges) c/mancuernas: 3 x 10/pierna";
        descanso = "Descansa 90 segundos entre series.";
      } else {
        rutina = "1. Sentadillas con salto: 4 x 20 reps\n2. Zancadas alternas rápidas: 3 x 1 min\n3. Sprint en cinta o estático: 4 x 30 segundos\n4. Subidas al cajón (Box jumps): 3 x 15 reps";
        descanso = "Descansa 45 segundos. Prepárate para sudar.";
      }
    }
    else if (grupo === 'fullbody') {
      if (tipo === 'fuerza') {
        rutina = "1. Sentadilla pesada: 3 x 5 reps\n2. Press de Banca: 3 x 5 reps\n3. Dominadas o Jalón: 3 x 5 reps\n4. Press Militar (Hombros): 3 x 5 reps";
        descanso = "Descansa 2 a 3 minutos. Es un entreno muy demandante.";
      } else if (tipo === 'hipertrofia') {
        rutina = "1. Prensa de piernas: 3 x 10 reps\n2. Press inclinado mancuernas: 3 x 10 reps\n3. Remo en polea: 3 x 10 reps\n4. Elevaciones laterales (Hombros): 3 x 15 reps";
        descanso = "Descansa 60 a 90 segundos.";
      } else {
        rutina = "CIRCUITO (4 Rondas completas, sin pausa entre ejercicios):\n1. Kettlebell Swings (15 reps)\n2. Flexiones (10 reps)\n3. Zancadas (20 reps)\n4. Plancha abdominal (45 seg)";
        descanso = "Descansa 2 minutos solo al terminar cada ronda completa.";
      }
    }

    // Imprimir el resultado en pantalla
    divResultadoRutina.innerHTML = `<strong>TUS EJERCICIOS:</strong>\n\n${rutina}\n\n<strong style="color:var(--primary);">💡 CONSEJO:</strong>\n${descanso}`;
  });
});

// ==========================================
// 3. LÓGICA DE LA CALCULADORA DE IMC
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  const btnCalcular = document.querySelector('.btn-calcular');
  const inputPeso = document.querySelector('.input-peso');
  const inputAltura = document.querySelector('.input-altura');
  const divResultado = document.querySelector('.resultado-imc');

  btnCalcular.addEventListener('click', () => {
    const peso = parseFloat(inputPeso.value);
    const alturaCm = parseFloat(inputAltura.value);

    if (isNaN(peso) || isNaN(alturaCm) || peso <= 0 || alturaCm <= 0) {
      divResultado.style.color = 'rgb(255, 107, 107)';
      divResultado.innerHTML = 'Por favor, introduce valores válidos.';
      return;
    }

    const alturaM = alturaCm / 100;
    const imc = peso / (alturaM * alturaM);
    
    let categoria = '';
    let color = '';

    if (imc < 18.5) {
      categoria = 'Bajo peso. ¡Toca comer más y levantar hierro!';
      color = 'rgb(255, 204, 0)';
    } else if (imc < 25) {
      categoria = 'Peso normal. ¡Sigue manteniendo ese ritmo!';
      color = 'rgb(76, 175, 80)';
    } else if (imc < 30) {
      categoria = 'Sobrepeso. Perfecto para transformarlo en músculo puro.';
      color = 'rgb(255, 152, 0)';
    } else {
      categoria = 'Obesidad. El mejor día para empezar el cambio es hoy.';
      color = 'rgb(255, 87, 34)';
    }

    divResultado.style.color = color;
    divResultado.innerHTML = `Tu IMC es <strong>${imc.toFixed(1)}</strong><br><span style="font-size: 0.9rem; color: rgb(170, 170, 170);">${categoria}</span>`;
  });
});