// =====================
// FitForge · Objetivos (Tracks)
// =====================
const TRACKS = [
  { id: "fuerza", name: "Fuerza y Musculación" },
  { id: "cardio", name: "Cardio y Resistencia" },
  { id: "yoga",   name: "Yoga y Movilidad" },
];

function getTrackFromURL() {
  const u = new URL(window.location.href);
  const t = u.searchParams.get("track");
  return TRACKS.some(x => x.id === t) ? t : null;
}
function getTrack() {
  return getTrackFromURL() || localStorage.getItem("track") || "fuerza";
}
function setTrack(t) {
  localStorage.setItem("track", t);
  const u = new URL(window.location.href);
  if (!u.searchParams.get("track")) location.reload();
}

// =====================
// Lecciones de Fitness
// =====================
const LESSONS = [
  {
    tag: "Fundamentos",
    title: "La Técnica es lo primero",
    text: "Antes de aumentar la intensidad, asegúrate de dominar el movimiento para evitar lesiones.",
    examples: {
      fuerza: ["Mantén la espalda recta en el peso muerto.", "Controla la fase excéntrica (bajada)."],
      cardio: ["Aterriza con la parte media del pie al correr.", "Mantén un ritmo de respiración constante."],
      yoga:   ["Fluye con tu respiración.", "No fuerces las posturas si sientes dolor agudo."],
    },
    check: "¿Cuál es tu punto débil actual en la técnica?",
  },
  {
    tag: "Progresión",
    title: "Sobrecarga Progresiva",
    text: "Para mejorar, tu cuerpo necesita un estímulo un poco mayor cada semana.",
    examples: {
      fuerza: ["Sube 1kg de peso.", "Haz 1 repetición más que la semana pasada."],
      cardio: ["Corre 5 minutos más.", "Aumenta un nivel la resistencia de la bici."],
      yoga:   ["Mantén la postura 10 segundos extra.", "Prueba una variante más profunda."],
    },
    check: "¿Cómo vas a hacer tu entrenamiento más difícil esta semana?",
  },
  {
    tag: "Recuperación",
    title: "El descanso también entrena",
    text: "El músculo y la resistencia se construyen mientras duermes y descansas, no mientras entrenas.",
    examples: {
      fuerza: ["Duerme al menos 7-8 horas.", "Deja 48h de descanso al músculo trabajado."],
      cardio: ["Haz descansos activos (caminar) tras un día intenso."],
      yoga:   ["Usa la postura del niño (Balasana) para reiniciar tu cuerpo."],
    },
    check: "¿Cuántas horas dormiste anoche?",
  }
];

// =====================
// Pistas (Evaluación Física)
// =====================
const PISTA_STEPS = {
  fuerza: [
    { t:"Nivel Actual", b:"Vamos a medir tu fuerza base.", q:"¿Cuántas flexiones seguidas puedes hacer?"},
    { t:"Equipamiento", b:"Necesitamos saber de qué dispones.", q:"¿Entrenas en gimnasio o en casa?"},
    { t:"Objetivo", b:"¿Volumen o definición?", q:"¿Quieres ganar masa muscular o perder grasa?"}
  ],
  cardio: [
    { t:"Resistencia", b:"Midamos tu capacidad aeróbica.", q:"¿Cuánto aguantas corriendo sin parar?"},
    { t:"Impacto", b:"Cuidado con las articulaciones.", q:"¿Tienes molestias en rodillas o tobillos?"},
    { t:"Frecuencia", b:"Consistencia semanal.", q:"¿Cuántos días a la semana quieres hacer cardio?"}
  ],
  yoga: [
    { t:"Flexibilidad", b:"Tu rango de movimiento.", q:"¿Llegas a tocarte las puntas de los pies de pie?"},
    { t:"Estrés", b:"El yoga ayuda a la mente.", q:"Del 1 al 10, ¿cuál es tu nivel de estrés diario?"},
    { t:"Equipamiento", b:"Lo básico.", q:"¿Tienes esterilla (mat) de yoga y bloques?"}
  ],
};

// =====================
// Helpers DOM
// =====================
function $(sel, root=document){ return root.querySelector(sel); }
function el(tag, cls){ const n=document.createElement(tag); if(cls) n.className=cls; return n; }

function ensureTrackSelector() {
  const sel = $("#trackSel");
  if (!sel) return;
  const t = getTrack();
  sel.value = t;
  sel.addEventListener("change", (e) => {
    setTrack(e.target.value);
  });
}

function toggleMark(idx, btn){
  const marks = JSON.parse(localStorage.getItem("marks")||"{}");
  const t = getTrack();
  const key = `${t}:${idx}`;
  marks[key] = !marks[key];
  localStorage.setItem("marks", JSON.stringify(marks));
  btn.textContent = marks[key] ? "Guardado" : "Guardar Tip";
  btn.classList.toggle("primary", !!marks[key]);
}

function renderFeed(){
  const wrap = $("#feedWrap");
  if(!wrap) return;
  const t = getTrack();
  wrap.innerHTML = ""; 

  LESSONS.forEach((L, idx) => {
    const snap = el("section","cardSnap");
    const card = el("article","lessonCard");
    const main = el("div","lessonMain");
    const side = el("aside","lessonSide");
    const top = el("div","titleRow");
    
    const badge = el("span","badge");
    badge.textContent = L.tag;
    const markerBtn = el("button","btn");
    markerBtn.type="button";
    markerBtn.textContent = "Guardar Tip";
    markerBtn.onclick = () => toggleMark(idx, markerBtn);

    top.appendChild(badge);
    top.appendChild(markerBtn);

    const h2 = el("h2"); h2.textContent = L.title;
    const p = el("p"); p.textContent = L.text;

    const call = el("div","callout");
    const cb = el("b"); cb.textContent = "Pregunta rápida:";
    const cs = el("span"); cs.textContent = L.check;
    call.appendChild(cb); call.appendChild(cs);

    main.appendChild(top); main.appendChild(h2); main.appendChild(p); main.appendChild(call);

    const ex = el("div","sideBlock");
    const exH = el("h4"); exH.textContent = `Ejemplo · ${TRACKS.find(x=>x.id===t).name}`;
    const ul = el("ul");

    (L.examples[t] || []).forEach(txt => {
      const li = el("li"); li.textContent = txt;
      ul.appendChild(li);
    });
    ex.appendChild(exH); ex.appendChild(ul);
    side.appendChild(ex);

    card.appendChild(main); card.appendChild(side);
    snap.appendChild(card); wrap.appendChild(snap);
  });
}

function setupPista(){
  const wrap = $("#pistaWrap");
  if(!wrap) return;

  const t = getTrack();
  const steps = PISTA_STEPS[t] || [];
  wrap.innerHTML = "";

  steps.forEach((s,i)=>{
    const sec = el("section","pista");
    const card = el("div","pistaCard");
    card.innerHTML = `
      <div class="badge">Pregunta ${i+1}/${steps.length}</div>
      <h2 style="margin:10px 0 6px 0">${s.t}</h2>
      <p style="margin:0;color:var(--muted);line-height:1.45">${s.b}</p>
      <hr class="sep"/>
      <p style="margin:6px 0 10px 0;font-weight:bold">${s.q}</p>
      <textarea placeholder="Respuesta..."></textarea>
    `;
    sec.appendChild(card);
    wrap.appendChild(sec);
  });
}

// =====================
// Lab export (Generador Automático de Rutinas)
// =====================
function exportLabToMarkdown(){
  const out = document.getElementById("mdOut");
  
  // Capturar las respuestas del usuario
  const goal = document.getElementById("qGoal").value;
  const nivel = document.getElementById("qNivel").value;
  const lugar = document.getElementById("qLugar").value;
  const dias = parseInt(document.getElementById("qDias").value);

  let rutina = "";
  let consejos = "";

  // Lógica del cerebro: Decidir qué rutina dar según respuestas
  if (lugar === "casa") {
    // RUTINAS PARA CASA (Sin material)
    rutina += "Día 1: Circuito Cuerpo Completo\n";
    rutina += " - Sentadillas al aire: 4 series x 15 reps\n";
    rutina += " - Flexiones (apoya rodillas si cuesta): 4 series x fallo\n";
    rutina += " - Plancha abdominal: 3 series x 40 segundos\n";
    
    if (dias >= 3) {
      rutina += "\nDía 2: Cardio HIIT y Piernas\n";
      rutina += " - Jumping Jacks: 4 series x 1 minuto\n";
      rutina += " - Zancadas alternas: 4 series x 12 reps/pierna\n";
      rutina += " - Escaladores (Mountain Climbers): 4 series x 45 seg\n";
    }
    if (dias >= 4) {
      rutina += "\nDía 3: Core y Glúteos intensivo\n";
      rutina += " - Puente de glúteo: 4 series x 20 reps\n";
      rutina += " - Abdominales tipo bicicleta: 3 series x 20 reps\n";
      rutina += " - Sentadilla con salto: 3 series x 12 reps\n";
    }
  } else {
    // RUTINAS PARA GIMNASIO (Con máquinas)
    if (goal === "fuerza" || goal === "salud") {
      rutina += "Día 1: Tren Superior (Empuje y Tirón)\n";
      rutina += " - Press de banca con mancuernas: 4 series x 10 reps\n";
      rutina += " - Jalón al pecho en polea: 4 series x 10 reps\n";
      rutina += " - Press militar (Hombros): 3 series x 12 reps\n";
      
      if (dias >= 3) {
        rutina += "\nDía 2: Tren Inferior (Piernas completas)\n";
        rutina += " - Prensa de piernas: 4 series x 12 reps\n";
        rutina += " - Peso muerto rumano (Femorales): 3 series x 10 reps\n";
        rutina += " - Extensiones de cuádriceps: 3 series x 15 reps\n";
      }
      if (dias >= 4) {
        rutina += "\nDía 3: Brazos y Abdomen\n";
        rutina += " - Curl de bíceps con barra: 4 series x 12 reps\n";
        rutina += " - Extensión de tríceps en polea: 4 series x 12 reps\n";
        rutina += " - Elevación de piernas colgando: 3 series x fallo\n";
      }
    } else if (goal === "perdida") {
      rutina += "Día 1: Circuito Metabólico y Pesas\n";
      rutina += " - 15 min de elíptica (Intensidad moderada)\n";
      rutina += " - Circuito: Sentadillas + Flexiones + Remo en máquina (3 rondas de 15 reps sin descanso)\n";
      
      if (dias >= 3) {
        rutina += "\nDía 2: Cardio Continuo y Core\n";
        rutina += " - 30 min de cinta inclinada o bicicleta\n";
        rutina += " - Plancha lateral: 3 series x 30 seg por lado\n";
      }
      if (dias >= 4) {
        rutina += "\nDía 3: Full Body Ligero\n";
        rutina += " - Máquina de pecho (Contractor): 3 series x 15 reps\n";
        rutina += " - Máquina de piernas (Curl femoral): 3 series x 15 reps\n";
        rutina += " - 15 min de remo estático al final\n";
      }
    }
  }

  // Si es el último día, añadimos descanso
  rutina += `\nDía ${dias}: DESCANSO ACTIVO (Caminar, estirar, yoga ligero)\n`;

  // Añadir consejos según el objetivo
  if (goal === "fuerza") {
    consejos = "Nutrición: Mantén un ligero superávit calórico y come suficiente proteína.\nDescanso: Deja descansar al menos 2 minutos entre series pesadas.";
  } else if (goal === "perdida") {
    consejos = "Nutrición: Mantén un déficit calórico ligero (come menos de lo que gastas).\nDescanso: Tiempos de descanso cortos (45 a 60 segundos) para sudar más.";
  } else {
    consejos = "Nutrición: Come alimentos reales y bebe 2 litros de agua al día.\nEnfoque: Disfruta del proceso, la constancia vale más que la intensidad extrema.";
  }

  // Formateamos el texto final para mostrarlo bonito
  const md = [
    "TU RUTINA INTELIGENTE CALCULADA",
    "===============================",
    "",
    "TUS DATOS",
    "---------",
    `Objetivo: ${document.getElementById("qGoal").options[document.getElementById("qGoal").selectedIndex].text}`,
    `Experiencia: ${document.getElementById("qNivel").options[document.getElementById("qNivel").selectedIndex].text}`,
    `Lugar: ${document.getElementById("qLugar").options[document.getElementById("qLugar").selectedIndex].text}`,
    `Días a entrenar: ${dias} días por semana`,
    "",
    "LOS EJERCICIOS",
    "--------------",
    rutina,
    "",
    "CONSEJOS EXTRA PARA TI",
    "----------------------",
    consejos
  ].join("\n");

  out.value = md;
}

function downloadText(filename, text){
  if(!text) return;
  const blob = new Blob([text], {type:"text/plain;charset=utf-8"});
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = filename; a.click();
  URL.revokeObjectURL(url);
}

// =====================
// Inicializador
// =====================
document.addEventListener("DOMContentLoaded", ()=>{
  ensureTrackSelector();
  if(document.getElementById("feedWrap")) renderFeed();
  setupPista();

  const exp = document.getElementById("btnExport");
  if(exp) exp.addEventListener("click", exportLabToMarkdown);

  const dl = document.getElementById("btnDownload");
  if(dl) dl.addEventListener("click", ()=>{
    const text = document.getElementById("mdOut").value || "";
    downloadText(`Mi_Rutina_Calculada.txt`, text);
  });
});