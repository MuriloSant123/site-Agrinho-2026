const modules = [
  { id: "solo", label: "Solo", symbol: "S", x: 50, y: 14 },
  { id: "agua", label: "Água", symbol: "A", x: 78, y: 24 },
  { id: "irrigacao", label: "Irrigação", symbol: "I", x: 86, y: 52 },
  { id: "clima", label: "Clima", symbol: "C", x: 68, y: 80 },
  { id: "energia", label: "Energia", symbol: "E", x: 36, y: 84 },
  { id: "cultivo", label: "Cultivo", symbol: "P", x: 14, y: 58 },
  { id: "biodiversidade", label: "Biodiversidade", symbol: "B", x: 19, y: 28 },
  { id: "maquinas", label: "Máquinas", symbol: "M", x: 50, y: 50 },
  { id: "preservacao", label: "Preservação Ambiental", symbol: "R", x: 50, y: 93 }
];

const baseConnections = [
  ["solo", "agua"], ["solo", "cultivo"], ["agua", "irrigacao"], ["irrigacao", "cultivo"],
  ["clima", "agua"], ["clima", "irrigacao"], ["energia", "irrigacao"], ["energia", "maquinas"],
  ["maquinas", "cultivo"], ["cultivo", "biodiversidade"], ["biodiversidade", "preservacao"],
  ["preservacao", "agua"], ["preservacao", "solo"], ["maquinas", "preservacao"],
  ["clima", "energia"], ["solo", "maquinas"], ["cultivo", "preservacao"], ["preservacao", "energia"],
  ["clima", "solo"], ["cultivo", "agua"], ["solo", "biodiversidade"], ["biodiversidade", "maquinas"],
  ["cultivo", "energia"], ["energia", "solo"], ["agua", "maquinas"], ["cultivo", "clima"],
  ["agua", "energia"]
];

const events = [
  {
    id: "seca",
    label: "Seca intensa",
    state: "Sensores detectam queda de umidade - protocolo IoT ativado",
    path: ["clima", "agua", "irrigacao", "cultivo", "preservacao", "energia"],
    messages: [
      "[SENSOR-CLIMA] Umidade: 23% | Temp: 38°C | ALERTA CRÍTICO enviado",
      "[GATEWAY-AGUA] Recebendo: PRIORITY=HIGH | Redistribuindo vazão para pivôs",
      "[EDGE-IRRIGACAO] Modo economia: 8min ON / 2min OFF | -38% consumo",
      "[ATUADOR-CULTIVO] Protegendo talhões críticos | Tolerância: 3 dias",
      "[SENSOR-PRESERVACAO] Fluxo ecológico mínimo reservado | -18% para produção",
      "[EDGE-ENERGIA] Otimizando bombas para 22h-4h | Eficiência: +31%"
    ],
    consequence: "Sistema reduz desperdícios mantendo produção e proteção ambiental sem falhar."
  },
  {
    id: "chuva",
    label: "Chuva excessiva",
    state: "Precipitação ativada: 85mm em 4h | Sistema em modo defesa",
    path: ["clima", "solo", "maquinas", "cultivo", "agua", "preservacao"],
    messages: [
      "[SENSOR-CLIMA] Chuva 85mm/4h prevista | ALERTA: compactação e erosão",
      "[SENSOR-SOLO] Umidade: 72% (limite: 65%) | Zonas A,B,D em risco",
      "[ATUADOR-MAQUINAS] Operação suspensa | Retorno para garagens | ETA: 18min",
      "[SENSOR-CULTIVO] Drenagem ativada em pontos baixos | Proteção: raiz+caule",
      "[GATEWAY-AGUA] Abrindo descarregadores | Escoamento: 280L/s controlado",
      "[ATUADOR-PRESERVACAO] Anti-erosão ativado | Reforço de margens +12%"
    ],
    consequence: "A fazenda evita dano físico ao solo e usa água excedente como recurso."
  },
  {
    id: "degradada",
    label: "Área degradada",
    state: "Zona crítica: compactação + erosão | Protocolo regeneração ativado",
    path: ["preservacao", "solo", "biodiversidade", "maquinas", "cultivo", "agua"],
    messages: [
      "[SENSOR-PRESERVACAO] Zona C crítica: vitalidade 18% | Regeneração iniciada",
      "[SENSOR-SOLO] Estrutura degradada | Cobertura morta: +4cm | Infiltração: +34%",
      "[ATUADOR-BIODIVERSIDADE] Corredores ampliados | Fluxo fauna: +56%",
      "[ATUADOR-MAQUINAS] Isolamento 45m | Acesso bloqueado por 180 dias",
      "[SENSOR-CULTIVO] Redesenhando bordas | Plantio redistribuído para áreas estáveis",
      "[GATEWAY-AGUA] Irrigação regenerativa | 12L/m² em 3 ciclos suaves"
    ],
    consequence: "Área degradada deixa de ser perda e vira infraestrutura de cura."
  },
  {
    id: "agua-alta",
    label: "Consumo excessivo de água",
    state: "Demanda ultrapassou limite sustentável - negociação de consumo",
    path: ["agua", "irrigacao", "cultivo", "energia", "solo", "preservacao"],
    messages: [
      "[SENSOR-AGUA] Volume: 12.4M³ | Taxa +45% | Modo economia ativado",
      "[ATUADOR-IRRIGACAO] Pulso curto: 4min ON / 1min OFF | Economia: -40%",
      "[SENSOR-CULTIVO] Áreas resilientes mapeadas | 89% do esforço concentrado lá",
      "[EDGE-ENERGIA] Novo schedule: 22h-4h | -31% evaporação por calor solar",
      "[SENSOR-SOLO] Umidade volumétrica: 14% (A) vs 22% (B) | Priorizando B",
      "[GATEWAY-PRESERVACAO] Reserva ecológica: 18% | Mensagem: 'Ecossistema primeiro'"
    ],
    consequence: "Rede troca excesso por precisão e transforma economia em decisão coletiva."
  },
  {
    id: "bio",
    label: "Crescimento da biodiversidade",
    state: "Ecossistema em expansão - infraestrutura produtiva reconhecida",
    path: ["biodiversidade", "cultivo", "preservacao", "solo", "agua", "maquinas"],
    messages: [
      "[SENSOR-BIO] Polinizadores: +18% | Inimigos naturais: +24% registrados",
      "[ATUADOR-CULTIVO] Reduzindo defensivos | Proteção biológica: 67%",
      "[GATEWAY-PRESERVACAO] Corredores ecológicos expandidos | Refúgio biodiverso",
      "[SENSOR-SOLO] Matéria orgânica: +18% | Estabilidade estrutural: +12%",
      "[ATUADOR-AGUA] Menor intervenção em áreas equilibradas | Autonomia natural",
      "[ATUADOR-MAQUINAS] Rotas desviando corredores vivos | Proteção: 100%"
    ],
    consequence: "Rede entende biodiversidade como aliada infraestrutural, não cenário."
  },
  {
    id: "energia",
    label: "Falha energética",
    state: "Queda tensão: 380V → 120V | Modo emergência: backup ativado",
    path: ["energia", "irrigacao", "agua", "maquinas", "cultivo", "clima"],
    messages: [
      "[EDGE-ENERGIA] Hierarquia emergência ativada | Fila: Bomba > IoT > Clima",
      "[ATUADOR-IRRIGACAO] Suspendendo | Reserva de pressão autossuficiente por 6h",
      "[GATEWAY-AGUA] Pressurização manual | 4.2 bar em pontos críticos garantidos",
      "[ATUADOR-MAQUINAS] Retorno seguro: 50% velocidade | ETA garagens: 22min",
      "[SENSOR-CULTIVO] Modo dormência | Suporte mínimo | Reinício quando 380V normalizar",
      "[SENSOR-CLIMA] Monitorando coincidência com risco ambiental | Status: Seguro"
    ],
    consequence: "Falha não paralisa: reorganiza ordem de decisões e preserva funções vitais."
  },
  {
    id: "irrigar",
    label: "Necessidade de irrigação",
    state: "Protocolo decisão coletiva antes de liberar água",
    path: ["cultivo", "solo", "clima", "agua", "energia", "irrigacao"],
    messages: [
      "[SENSOR-CULTIVO] Solicitação: Ciclo sensível necessário | Status crítico",
      "[GATEWAY-SOLO] Confirmando: Absorção eficiente 87% em zona alvo",
      "[SENSOR-CLIMA] Janela analisada: Sem chuva próxima | Ideal para irrigação",
      "[ATUADOR-AGUA] Autoriza 24m³ | Volume compatível com reserva | Aprovado",
      "[EDGE-ENERGIA] Bombas programadas 23h | Eficiência máxima | Pronto",
      "[ATUADOR-IRRIGACAO] Executando com precisão localizada | Status: OK"
    ],
    consequence: "Irrigar deixa de ser comando e passa a ser decisão compartilhada."
  },
  {
    id: "recuperacao",
    label: "Recuperação ambiental",
    state: "Produção e restauração no mesmo fluxo decisório",
    path: ["preservacao", "biodiversidade", "solo", "agua", "cultivo", "maquinas", "energia"],
    messages: [
      "[GATEWAY-PRESERVACAO] Ciclo restauração iniciado | Monitoramento: 48 sensores",
      "[ATUADOR-BIODIVERSIDADE] Reforçando corredores | Conectividade: 94%",
      "[SENSOR-SOLO] Regeneração em curso | Microbiana: x3 população | Fungos: ativos",
      "[GATEWAY-AGUA] Suporte sem saturação | Infiltração natural: +34%",
      "[ATUADOR-CULTIVO] Convivência planejada | Limite claro com zona regeneração",
      "[ATUADOR-MAQUINAS] Rotas alternativas permanentes | Impacto aceitável",
      "[EDGE-ENERGIA] Suporte 24/7 | Consumo +2% | Monitoramento contínuo"
    ],
    consequence: "Recuperação deixa de competir com fazenda e passa a orientar futuro."
  }
];

const simulatorPriorities = [
  {
    id: "producao",
    label: "Proteger produção",
    focus: "Cultivo priorizado sem isolar água e energia.",
    effects: ["Produção estabilizada", "Recursos otimizados", "Impacto ambiental monitorado"]
  },
  {
    id: "recursos",
    label: "Poupar recursos",
    focus: "Água e energia negociam limites antes da operação.",
    effects: ["Consumo reduzido", "Operação sustentável", "Reserva protegida"]
  },
  {
    id: "vida",
    label: "Regenerar vida",
    focus: "Biodiversidade e preservação como infraestrutura.",
    effects: ["Áreas frágeis protegidas", "Recuperação acelerada", "Produção natural"]
  },
  {
    id: "continuidade",
    label: "Manter operação",
    focus: "Máquinas e energia com impacto controlado.",
    effects: ["Paradas evitadas", "Risco distribuído", "Prioridades ativas"]
  }
];

const simulatorScenarios = {
  seca: {
    label: "Seca intensa",
    status: "Sensores detectam queda de umidade - protocolo IoT ativado",
    zones: ["agua", "cultivo", "energia", "preservacao"],
    steps: {
      producao: [
        "[SENSOR-CLIMA] Umidade: 23% | Temp: 38°C | ALERTA CRÍTICO",
        "[GATEWAY-AGUA] PRIORITY=HIGH | Vazão para pivôs críticos",
        "[EDGE-ENERGIA] Otimizando bombas 22h-4h | +31% eficiência",
        "[ATUADOR-PRESERVACAO] Fluxo ecológico mínimo | Preservação ativa"
      ],
      recursos: [
        "[SENSOR-AGUA] Volume: 12.4M³ | Taxa +45% | ECONOMIA",
        "[SENSOR-SOLO] Zona A: 14% | Zona B: 22% | Priorizando B",
        "[ATUADOR-IRRIGACAO] Pulso: 8min ON / 2min OFF | -38%",
        "[SENSOR-CULTIVO] Tolerância: ±3 dias sem risco"
      ],
      vida: [
        "[ATUADOR-PRESERVACAO] Corredores protegidos | +22%",
        "[SENSOR-BIO] Polinizadores: +18% | Sombreamento: 67%",
        "[GATEWAY-AGUA] Reserva ecológica 18% | Mensagem ativa",
        "[SENSOR-CULTIVO] Concentrando 89% em áreas resilientes"
      ],
      continuidade: [
        "[EDGE-ENERGIA] P1:Bomba | P2:IoT | P3:Clima | Modo hierárquico",
        "[ATUADOR-MAQUINAS] Trajetos -1.2km | Deslocamentos reduzidos",
        "[ATUADOR-IRRIGACAO] Schedule 22h-4h | -31% evaporação",
        "[GATEWAY-CULTIVO] Ciclo mantido | Demanda 45% da normal"
      ]
    }
  },
  chuva: {
    label: "Chuva excessiva",
    status: "Precipitação ativada: 85mm em 4h | Sistema em modo defesa",
    zones: ["agua", "maquinas", "cultivo", "preservacao"],
    steps: {
      producao: [
        "[SENSOR-CULTIVO] Umidade 72% | Limite: 65% | Zonas A,B,D críticas",
        "[ATUADOR-MAQUINAS] Suspensão | Retorno garagens | 18min",
        "[GATEWAY-AGUA] Descarregadores abertos | 280L/s controlado",
        "[SENSOR-PRESERVACAO] Erosão monitorada | Margens críticas"
      ],
      recursos: [
        "[ATUADOR-AGUA] Reservatório auxiliar | +340M³ | 94% eficiência",
        "[SENSOR-SOLO] Proteção ativa | Sem máquinas | +18% infiltração",
        "[EDGE-ENERGIA] -65% carga | Bombeamento essencial + rede",
        "[SENSOR-CULTIVO] Esperando | Seguro em: <58% umidade | 36h"
      ],
      vida: [
        "[ATUADOR-PRESERVACAO] Anti-erosão | +12% cobertura",
        "[SENSOR-BIO] Drenagem natural detectada | Máquinas desviam",
        "[GATEWAY-AGUA] Mata ciliar protegida | Escoamento direto",
        "[ATUADOR-MAQUINAS] Desvio seguro | +2.1km alternativa"
      ],
      continuidade: [
        "[ATUADOR-MAQUINAS] Pontos altos | 100% seguro",
        "[EDGE-ENERGIA] Modo resiliente | 99.8% uptime",
        "[SENSOR-AGUA] Drenagem coordenada | Picos suavizados",
        "[GATEWAY-CULTIVO] Parada temporária | Reinício amanhã 14h"
      ]
    }
  },
  degradada: {
    label: "Área degradada",
    status: "Zona crítica identificada: compactação + erosão | Regeneração ativada",
    zones: ["preservacao", "biodiversidade", "maquinas", "cultivo"],
    steps: {
      producao: [
        "[SENSOR-CULTIVO] Zona C crítica | Vitalidade: 18% | Redesenhando",
        "[ATUADOR-MAQUINAS] Isolamento 45m | Acesso bloqueado | 180 dias",
        "[SENSOR-SOLO] Degradação detectada | Protocolo regeneração",
        "[GATEWAY-PRESERVACAO] Monitoramento contínuo | Meta: 65%+ em 6m"
      ],
      recursos: [
        "[SENSOR-AGUA] Irrigação suave | 12L/m² em 3 ciclos | 87% absorção",
        "[EDGE-ENERGIA] Reservando para bombeamento regeneração | +22%",
        "[ATUADOR-MAQUINAS] Zero passagens em C | Desvio 6 meses",
        "[SENSOR-SOLO] Cobertura +4cm | Retenção umidade +34%"
      ],
      vida: [
        "[SENSOR-BIO] Corredores ampliados | Fauna +56% | Poliniz: +18",
        "[ATUADOR-PRESERVACAO] Zona regenerativa | 48 sensores monit",
        "[SENSOR-SOLO] Microbiana x3 | Fungos benéficos | Teia ativa",
        "[GATEWAY-CULTIVO] Convivência planejada | Limite claro zona C"
      ],
      continuidade: [
        "[ATUADOR-MAQUINAS] Rotas alternativas | -2.8km, +4min/trajeto",
        "[SENSOR-CULTIVO] Tarefas redistrib | Áreas +12% esforço",
        "[EDGE-ENERGIA] Suporte 24/7 | +2% consumo | Monitoração",
        "[GATEWAY-PRESERVACAO] Timeline claro | D+180 reinserção"
      ]
    }
  },
  energia: {
    label: "Falha energética",
    status: "Queda tensão detectada: 380V → 120V | Modo emergência ativado",
    zones: ["energia", "agua", "maquinas", "cultivo"],
    steps: {
      producao: [
        "[SENSOR-CULTIVO] Pivô A,C + Estufa críticos | Máquinas pausadas OK",
        "[EDGE-ENERGIA] Fila: (1)Bomba-A (2)IoT (3)Clima | Prioridade ativa",
        "[ATUADOR-AGUA] Pressão manual em P1 | 4.2 bar garantido",
        "[SENSOR-MAQUINAS] Retorno seguro 50% | ETA garagens 22min"
      ],
      recursos: [
        "[EDGE-ENERGIA] Cortando: Iluminação -18kW | -12kW -8kW secundários",
        "[GATEWAY-AGUA] Pumping parado | Pressão acumulada | 6h autonomia",
        "[ATUADOR-IRRIGACAO] Pausado | Schedule 22h quando energia volta",
        "[SENSOR-PRESERVACAO] Monitorando cursos | Impacto: nenhum | OK"
      ],
      vida: [
        "[ATUADOR-PRESERVACAO] Modo proteção | Fluxo gravidade | Seguro",
        "[SENSOR-AGUA] Reserva ecológica protegida | Redir automática",
        "[EDGE-ENERGIA] Backup: IoT + vital | 2.8kW apenas",
        "[ATUADOR-MAQUINAS] Paradas <50m ecosistema | Protegido"
      ],
      continuidade: [
        "[EDGE-ENERGIA] Hierarquia 5 níveis | Downgrade se <60V",
        "[SENSOR-MAQUINAS] Finalizando movimentos | 8-14min",
        "[GATEWAY-AGUA] Abastecimento 48h via pressão",
        "[ATUADOR-CULTIVO] Modo dormência | Reinício automático +380V"
      ]
    }
  }
};

// DOM Elements com null-safety
const getElement = (selector) => document.querySelector(selector) || null;

const nodeLayer = getElement("#nodeLayer");
const connectionLayer = getElement("#connectionLayer");
const signalLayer = getElement("#signalLayer");
const eventGrid = getElement("#eventGrid");
const dialogueList = getElement("#dialogueList");
const activeEvent = getElement("#activeEvent");
const consequence = getElement("#consequence");
const networkState = getElement("#networkState");
const resetNetwork = getElement("#resetNetwork");
const comparisonTrigger = getElement("#comparisonTrigger");
const comparisonTrack = getElement("#comparisonTrack");
const simEventChoices = getElement("#simEventChoices");
const simPriorityChoices = getElement("#simPriorityChoices");
const runSimulation = getElement("#runSimulation");
const simStatus = getElement("#simStatus");
const simScore = getElement("#simScore");
const fieldMap = getElement("#fieldMap");
const simSummary = getElement("#simSummary");
const simSteps = getElement("#simSteps");
const simEffects = getElement("#simEffects");
const contrastToggle = getElement("#contrastToggle");
const fontIncrease = getElement("#fontIncrease");
const fontDecrease = getElement("#fontDecrease");
const backToTop = getElement("#backToTop");

let currentTimers = [];
let simTimers = [];
let selectedSimEvent = "seca";
let selectedPriority = "producao";
let fontScale = 1;

function moduleById(id) {
  return modules.find((module) => module.id === id);
}

function createNetwork() {
  if (!nodeLayer) return;
  modules.forEach((module) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "network-node";
    button.id = `node-${module.id}`;
    button.dataset.module = module.id;
    button.dataset.symbol = module.symbol;
    button.style.left = `${module.x}%`;
    button.style.top = `${module.y}%`;
    button.setAttribute("aria-label", `${module.label}: aguardando comunicação da rede`);
    button.textContent = module.label;
    nodeLayer.appendChild(button);
  });
  drawConnections();
}

function drawConnections() {
  if (!connectionLayer) return;
  connectionLayer.innerHTML = "";
  connectionLayer.setAttribute("viewBox", "0 0 100 100");
  connectionLayer.setAttribute("preserveAspectRatio", "none");

  baseConnections.forEach(([from, to]) => {
    const start = moduleById(from);
    const end = moduleById(to);
    if (!start || !end) return;
    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", start.x);
    line.setAttribute("y1", start.y);
    line.setAttribute("x2", end.x);
    line.setAttribute("y2", end.y);
    line.setAttribute("class", "connection");
    line.dataset.from = from;
    line.dataset.to = to;
    connectionLayer.appendChild(line);
  });
}

function createEvents() {
  if (!eventGrid) return;
  events.forEach((event) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "event-button";
    button.textContent = event.label;
    button.dataset.event = event.id;
    button.addEventListener("click", () => activateEvent(event.id));
    eventGrid.appendChild(button);
  });
}

function createSimulatorChoices() {
  if (!simEventChoices || !simPriorityChoices) return;
  
  Object.entries(simulatorScenarios).forEach(([id, scenario]) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "choice-button";
    button.textContent = scenario.label;
    button.dataset.simEvent = id;
    button.setAttribute("aria-pressed", String(id === selectedSimEvent));
    button.addEventListener("click", () => {
      selectedSimEvent = id;
      updateSimulatorChoiceStates();
      previewSimulation();
    });
    simEventChoices.appendChild(button);
  });

  simulatorPriorities.forEach((priority) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "choice-button";
    button.textContent = priority.label;
    button.dataset.simPriority = priority.id;
    button.setAttribute("aria-pressed", String(priority.id === selectedPriority));
    button.addEventListener("click", () => {
      selectedPriority = priority.id;
      updateSimulatorChoiceStates();
      previewSimulation();
    });
    simPriorityChoices.appendChild(button);
  });

  updateSimulatorChoiceStates();
}

function updateSimulatorChoiceStates() {
  document.querySelectorAll("[data-sim-event]").forEach((button) => {
    const active = button.dataset.simEvent === selectedSimEvent;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
  });

  document.querySelectorAll("[data-sim-priority]").forEach((button) => {
    const active = button.dataset.simPriority === selectedPriority;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
  });
}

function clearSimulationTimers() {
  simTimers.forEach((timer) => window.clearTimeout(timer));
  simTimers = [];
}

function previewSimulation() {
  const scenario = simulatorScenarios[selectedSimEvent];
  const priority = simulatorPriorities.find((item) => item.id === selectedPriority);
  if (!scenario || !priority) return;

  clearSimulationTimers();
  if (fieldMap) fieldMap.classList.remove("running");
  document.querySelectorAll(".field-zone").forEach((zone) => zone.classList.remove("active"));
  if (simSteps) simSteps.innerHTML = "";
  if (simEffects) simEffects.innerHTML = "";
  if (simStatus) simStatus.textContent = scenario.status;
  if (simScore) simScore.textContent = priority.label;
  if (simSummary) simSummary.textContent = `${scenario.label}: ${priority.focus}`;
}

function runCooperationSimulation() {
  const scenario = simulatorScenarios[selectedSimEvent];
  const priority = simulatorPriorities.find((item) => item.id === selectedPriority);
  if (!scenario || !priority) return;

  const steps = scenario.steps[selectedPriority] || [];

  clearSimulationTimers();
  activateEvent(selectedSimEvent);
  if (fieldMap) fieldMap.classList.add("running");
  if (simSteps) simSteps.innerHTML = "";
  if (simEffects) simEffects.innerHTML = "";
  if (simStatus) simStatus.textContent = scenario.status;
  if (simScore) simScore.textContent = "Rede negociando";
  if (simSummary) simSummary.textContent = `${scenario.label}: ${priority.focus}`;

  document.querySelectorAll(".field-zone").forEach((zone) => {
    zone.classList.toggle("active", scenario.zones.includes(zone.dataset.zone));
  });

  steps.forEach((step, index) => {
    if (!simSteps) return;
    const item = document.createElement("li");
    item.textContent = step;
    item.dataset.simStep = String(index);
    simSteps.appendChild(item);

    const timer = window.setTimeout(() => {
      document.querySelectorAll(".sim-steps li").forEach((stepItem) => {
        stepItem.classList.toggle("active", stepItem.dataset.simStep === String(index));
      });
    }, index * 520);
    simTimers.push(timer);
  });

  priority.effects.forEach((effect, index) => {
    if (!simEffects) return;
    const pill = document.createElement("div");
    const label = document.createElement("span");
    const number = document.createElement("strong");

    pill.className = "effect-pill";
    label.textContent = effect;
    number.textContent = String(index + 1);
    pill.append(label, number);
    simEffects.appendChild(pill);
  });

  const finishTimer = window.setTimeout(() => {
    if (fieldMap) fieldMap.classList.remove("running");
    if (simScore) simScore.textContent = "Resposta integrada";
  }, steps.length * 520 + 900);
  simTimers.push(finishTimer);
}

function clearTimers() {
  currentTimers.forEach((timer) => window.clearTimeout(timer));
  currentTimers = [];
}

function resetState() {
  clearTimers();
  document.querySelectorAll(".network-node").forEach((node) => {
    node.classList.remove("active", "responding");
    node.setAttribute("aria-label", `${node.textContent}: aguardando comunicação da rede`);
  });
  document.querySelectorAll(".connection").forEach((line) => line.classList.remove("active"));
  document.querySelectorAll(".event-button").forEach((button) => button.classList.remove("active"));
  if (signalLayer) signalLayer.innerHTML = "";
  if (dialogueList) dialogueList.innerHTML = "";
  if (activeEvent) activeEvent.textContent = "Nenhum evento ativado ainda.";
  if (consequence) consequence.textContent = "A rede permanece pronta para redistribuir decisões quando algo muda no campo.";
  if (networkState) networkState.textContent = "Rede em escuta distribuída";
}

function activateEvent(eventId) {
  const event = events.find((item) => item.id === eventId);
  if (!event) return;

  resetState();
  if (activeEvent) activeEvent.textContent = event.label;
  if (networkState) networkState.textContent = event.state;

  const button = document.querySelector(`[data-event="${event.id}"]`);
  if (button) button.classList.add("active");

  if (dialogueList) {
    event.messages.forEach((message, index) => {
      const item = document.createElement("li");
      item.textContent = message;
      item.dataset.step = String(index);
      dialogueList.appendChild(item);
    });
  }

  event.path.forEach((moduleId, index) => {
    const timer = window.setTimeout(() => {
      activateNode(moduleId, event.messages[index]);
      activateConnection(event.path[index - 1], moduleId);
      if (index > 0) {
        createSignal(event.path[index - 1], moduleId);
      }
      updateDialogue(index);
    }, index * 720);
    currentTimers.push(timer);
  });

  const finishTimer = window.setTimeout(() => {
    if (consequence) consequence.textContent = event.consequence;
    if (networkState) networkState.textContent = "Resposta integrada concluída";
  }, event.path.length * 720 + 250);
  currentTimers.push(finishTimer);
}

function activateNode(moduleId, message) {
  const node = document.querySelector(`#node-${moduleId}`);
  if (!node) return;

  node.classList.add("active", "responding");
  node.setAttribute("aria-label", `${node.textContent}: ${message}`);

  window.setTimeout(() => {
    node.classList.remove("responding");
  }, 850);
}

function activateConnection(from, to) {
  if (!from || !to) return;

  document.querySelectorAll(".connection").forEach((line) => {
    const direct = line.dataset.from === from && line.dataset.to === to;
    const reverse = line.dataset.from === to && line.dataset.to === from;
    if (direct || reverse) {
      line.classList.add("active");
    }
  });
}

function createSignal(from, to) {
  const start = moduleById(from);
  const end = moduleById(to);
  if (!start || !end || !signalLayer) return;

  const signal = document.createElement("span");
  signal.className = "signal";
  signal.style.setProperty("--from-x", `${start.x}%`);
  signal.style.setProperty("--from-y", `${start.y}%`);
  signal.style.setProperty("--to-x", `${end.x}%`);
  signal.style.setProperty("--to-y", `${end.y}%`);
  signalLayer.appendChild(signal);

  window.setTimeout(() => {
    signal.remove();
  }, 950);
}

function updateDialogue(activeIndex) {
  document.querySelectorAll(".dialogue-list li").forEach((item) => {
    item.classList.toggle("current", item.dataset.step === String(activeIndex));
  });
}

function toggleComparison() {
  if (!comparisonTrack || !comparisonTrigger) return;
  const isOpen = comparisonTrack.classList.toggle("revealed");
  comparisonTrigger.setAttribute("aria-expanded", String(isOpen));
  comparisonTrigger.textContent = isOpen
    ? "Ocultar comparação"
    : "Comparar resposta isolada e integrada";
}

function applyFontScale() {
  document.documentElement.style.setProperty("--font-scale", fontScale.toFixed(2));
}

function setupAccessibility() {
  if (contrastToggle) {
    contrastToggle.addEventListener("click", () => {
      const active = document.body.classList.toggle("high-contrast");
      contrastToggle.setAttribute("aria-pressed", String(active));
    });
  }

  if (fontIncrease) {
    fontIncrease.addEventListener("click", () => {
      fontScale = Math.min(1.28, fontScale + 0.08);
      applyFontScale();
    });
  }

  if (fontDecrease) {
    fontDecrease.addEventListener("click", () => {
      fontScale = Math.max(0.88, fontScale - 0.08);
      applyFontScale();
    });
  }

  if (backToTop) {
    backToTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
}

// Inicialização
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

function init() {
  createNetwork();
  createEvents();
  createSimulatorChoices();
  previewSimulation();
  setupAccessibility();

  if (resetNetwork) resetNetwork.addEventListener("click", resetState);
  if (comparisonTrigger) comparisonTrigger.addEventListener("click", toggleComparison);
  if (runSimulation) runSimulation.addEventListener("click", runCooperationSimulation);
  window.addEventListener("resize", drawConnections);
}
