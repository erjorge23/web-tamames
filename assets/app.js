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
// Lab export (Generador de Texto)
// =====================
function exportLabToMarkdown(){
  const out = $("#mdOut");
  const inv = $("#inv")?.value.trim() || "";
  const pr  = $("#prio")?.value.trim() || "";
  const sip = $("#sipoc")?.value.trim() || "";

  const t = getTrack();
  const tName = TRACKS.find(x=>x.id===t)?.name || t;

  // Usamos formato de subrayado para los títulos del documento
  const md = [
    "MI RUTINA DE ENTRENAMIENTO",
    "==========================",
    `Enfoque: ${tName}`,
    "",
    "1. Calentamiento",
    "----------------",
    inv ? inv : "Sin calentamiento definido.",
    "",
    "2. Ejercicios Principales",
    "-------------------------",
    pr ? pr : "Sin ejercicios definidos.",
    "",
    "3. Nutrición y Post-Entreno",
    "---------------------------",
    sip ? sip : "Sin notas.",
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
  if($("#feedWrap")) renderFeed();
  setupPista();

  const exp = $("#btnExport");
  if(exp) exp.addEventListener("click", exportLabToMarkdown);

  const dl = $("#btnDownload");
  if(dl) dl.addEventListener("click", ()=>{
    const text = $("#mdOut").value || "";
    downloadText(`mi_rutina.txt`, text);
  });
});