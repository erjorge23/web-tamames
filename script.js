// ==========================================
// 1. LÓGICA DEL MENÚ DE INICIO DE SESIÓN
// ==========================================
const modal = document.getElementById("modalLogin");
function abrirModal() { modal.style.display = "block"; }
function cerrarModal() { modal.style.display = "none"; }
window.onclick = function(event) { if (event.target == modal) cerrarModal(); }

// ==========================================
// 2. GENERADOR DE RUTINAS AVANZADO (Biometría + Nivel)
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  const btnRutina = document.getElementById('btn-rutina');
  
  btnRutina.addEventListener('click', () => {
    // Recoger valores del usuario
    const peso = parseFloat(document.getElementById('rutina-peso').value);
    const alturaCm = parseFloat(document.getElementById('rutina-altura').value);
    const nivel = document.getElementById('rutina-nivel').value;
    const grupo = document.getElementById('rutina-grupo').value;
    const tipo = document.getElementById('rutina-tipo').value;
    const divResultado = document.getElementById('resultado-rutina');

    if (isNaN(peso) || isNaN(alturaCm) || peso <= 0 || alturaCm <= 0) {
      divResultado.innerHTML = "<span style='color: rgb(255, 107, 107);'>❌ Por favor, introduce tu peso y altura correctamente para adaptar la rutina.</span>";
      return;
    }

    // Calcular IMC para adaptar los ejercicios (Proteger articulaciones)
    const alturaM = alturaCm / 100;
    const imc = peso / (alturaM * alturaM);
    let esBajoImpacto = imc >= 27; // Si hay sobrepeso, quitamos saltos
    let biometriaInfo = "";

    if (imc < 18.5) {
      biometriaInfo = "💡 Nota Biometría: Tienes bajo peso. No te saltes las comidas post-entreno, necesitas calorías para crear músculo.";
    } else if (esBajoImpacto) {
      biometriaInfo = "💡 Nota Biometría: Hemos sustituido los ejercicios con saltos por versiones de BAJO IMPACTO para proteger tus rodillas y articulaciones.";
    } else {
      biometriaInfo = "💡 Nota Biometría: Tu relación peso/altura es óptima para realizar ejercicios de impacto y rango completo.";
    }

    // Configurar volumen según el nivel
    let multiplicadorSeries = 1;
    let consejoNivel = "";
    if (nivel === "principiante") {
      multiplicadorSeries = 2; // Principiantes hacen 2-3 series
      consejoNivel = "Céntrate en aprender la técnica. No subas el peso si no controlas el movimiento.";
    } else if (nivel === "intermedio") {
      multiplicadorSeries = 3; // Intermedios hacen 3-4 series
      consejoNivel = "Intenta subir un poco el peso respecto a la semana pasada (Sobrecarga progresiva).";
    } else {
      multiplicadorSeries = 4; // Avanzados hacen 4-5 series
      consejoNivel = "Aplica máxima intensidad. Llega al fallo muscular en la última serie de cada ejercicio.";
    }

    let rutina = "";
    let descanso = "";

    // SELECCIÓN DE EJERCICIOS
    if (grupo === 'pecho') {
      if (tipo === 'fuerza') {
        rutina = `1. Press de Banca: ${multiplicadorSeries + 1} series x 3-5 reps\n2. Press Inclinado: ${multiplicadorSeries} series x 6 reps\n3. Fondos en paralelas: ${multiplicadorSeries} series x 6 reps`;
        descanso = "Descansa 3 minutos entre series.";
      } else if (tipo === 'hipertrofia') {
        rutina = `1. Press de Banca Mancuernas: ${multiplicadorSeries} series x 8-12 reps\n2. Aperturas en polea: ${multiplicadorSeries} series x 12-15 reps\n3. Extensión de tríceps: ${multiplicadorSeries} series x 12 reps`;
        descanso = "Descansa 90 segundos entre series.";
      } else {
        let ejCardio = esBajoImpacto ? "Batidas con cuerda (Battle Ropes)" : "Burpees";
        rutina = `1. Flexiones: ${multiplicadorSeries} series x fallo\n2. Press ligero rápido: ${multiplicadorSeries} series x 20 reps\n3. ${ejCardio}: 3 series x 45 segundos`;
        descanso = "Descansa 45 segundos para mantener pulsaciones altas.";
      }
    } 
    else if (grupo === 'espalda') {
      if (tipo === 'fuerza') {
        rutina = `1. Peso Muerto: ${multiplicadorSeries + 1} series x 3-5 reps\n2. Dominadas lastradas: ${multiplicadorSeries} series x 5 reps\n3. Remo con barra pesada: ${multiplicadorSeries} series x 6 reps`;
        descanso = "Descansa 3 minutos entre series pesadas.";
      } else {
        rutina = `1. Jalón al pecho: ${multiplicadorSeries + 1} series x 10 reps\n2. Remo en polea baja: ${multiplicadorSeries} series x 12 reps\n3. Curl de bíceps: ${multiplicadorSeries} series x 12 reps`;
        descanso = "Descansa 60 a 90 segundos.";
      }
    }
    else if (grupo === 'piernas') {
      if (tipo === 'fuerza') {
        rutina = `1. Sentadilla trasera: ${multiplicadorSeries + 1} series x 3-5 reps\n2. Prensa de piernas: ${multiplicadorSeries} series x 6 reps\n3. Peso Muerto Rumano: ${multiplicadorSeries} series x 8 reps`;
        descanso = "Descansa 3 minutos (las piernas agotan mucho el sistema nervioso).";
      } else if (tipo === 'hipertrofia') {
        rutina = `1. Prensa de piernas: ${multiplicadorSeries + 1} series x 12 reps\n2. Extensiones de cuádriceps: ${multiplicadorSeries} series x 15 reps\n3. Curl femoral: ${multiplicadorSeries} series x 12 reps`;
        descanso = "Descansa 90 segundos.";
      } else {
        let ejSalto = esBajoImpacto ? "Zancadas sin salto (paso a paso)" : "Sentadillas con salto";
        rutina = `1. Sentadilla Goblet: ${multiplicadorSeries} series x 20 reps\n2. ${ejSalto}: ${multiplicadorSeries} series x 1 minuto\n3. Sprint estático/bici: 4 x 30 seg`;
        descanso = "Descansa 45 segundos.";
      }
    }
    else if (grupo === 'fullbody') {
      if (tipo === 'resistencia') {
        let ejImpacto = esBajoImpacto ? "Kettlebell Swings (Sin saltos)" : "Saltos al cajón";
        rutina = `CIRCUITO (Da ${multiplicadorSeries} vueltas completas):\n1. Sentadillas (15 reps)\n2. Flexiones (10 reps)\n3. ${ejImpacto} (15 reps)\n4. Plancha (45 seg)`;
        descanso = "Sin descanso entre ejercicios. Descansa 2 min al terminar la vuelta completa.";
      } else {
        rutina = `1. Sentadilla: ${multiplicadorSeries} series x 8 reps\n2. Press Banca: ${multiplicadorSeries} series x 8 reps\n3. Remo: ${multiplicadorSeries} series x 8 reps\n4. Press Hombros: ${multiplicadorSeries} series x 10 reps`;
        descanso = "Descansa 90 segundos.";
      }
    }

    // Construir el texto final
    const resultadoHTML = `
<strong style="color:var(--primary); font-size:1.2rem;">RUTINA NIVEL: ${nivel.toUpperCase()}</strong>

${rutina}

<strong style="color:var(--primary);">TIEMPOS DE DESCANSO:</strong>
${descanso}

<strong style="color:var(--primary);">CONSEJOS PARA TI:</strong>
- ${consejoNivel}
- ${biometriaInfo}
    `;
    
    divResultado.innerHTML = resultadoHTML;
  });
});