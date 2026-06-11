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
  ["solo", "agua"],
  ["solo", "cultivo"],
  ["agua", "irrigacao"],
  ["irrigacao", "cultivo"],
  ["clima", "agua"],
  ["clima", "irrigacao"],
  ["energia", "irrigacao"],
  ["energia", "maquinas"],
  ["maquinas", "cultivo"],
  ["cultivo", "biodiversidade"],
  ["biodiversidade", "preservacao"],
  ["preservacao", "agua"],
  ["preservacao", "solo"],
  ["maquinas", "preservacao"],
  ["clima", "energia"],
  ["solo", "maquinas"],
  ["cultivo", "preservacao"],
  ["preservacao", "energia"],
  ["clima", "solo"],
  ["cultivo", "agua"],
  ["solo", "biodiversidade"],
  ["biodiversidade", "maquinas"],
  ["cultivo", "energia"],
  ["energia", "solo"],
  ["agua", "maquinas"],
  ["cultivo", "clima"],
  ["agua", "energia"]
];

const events = [
  {
    id: "seca",
    label: "Seca intensa",
    state: "A rede redistribui água, energia e proteção ecológica",
    path: ["clima", "agua", "irrigacao", "cultivo", "preservacao", "energia"],
    messages: [
      "Clima detecta uma sequência crítica de calor e baixa umidade.",
      "Água recebe alerta e limita usos não essenciais.",
      "Irrigação muda para pulsos curtos, evitando desperdício.",
      "Cultivo recebe suporte prioritário nas áreas mais sensíveis.",
      "Preservação Ambiental acompanha estresse em nascentes e bordas verdes.",
      "Energia prioriza bombas eficientes e reduz cargas secundárias."
    ],
    consequence: "Sistema reduz desperdícios e protege produção sem romper o equilíbrio ambiental."
  },
  {
    id: "chuva",
    label: "Chuva excessiva",
    state: "A rede abre rotas de drenagem e pausa operações vulneráveis",
    path: ["clima", "solo", "maquinas", "cultivo", "agua", "preservacao"],
    messages: [
      "Clima anuncia chuva persistente antes que a operação comece.",
      "Solo muda para estado de proteção contra compactação.",
      "Máquinas adiam rotas pesadas em áreas encharcadas.",
      "Cultivo recebe manejo de risco para evitar perdas.",
      "Água coordena reservatórios e canais de escoamento.",
      "Preservação Ambiental observa erosão e protege margens."
    ],
    consequence: "A propriedade evita dano físico ao solo e usa a água excedente como recurso."
  },
  {
    id: "degradada",
    label: "Área degradada",
    state: "A rede converte uma falha local em plano de regeneração",
    path: ["preservacao", "solo", "biodiversidade", "maquinas", "cultivo", "agua"],
    messages: [
      "Preservação Ambiental identifica uma zona com baixa vitalidade.",
      "Solo entra em modo de recuperação de estrutura.",
      "Biodiversidade amplia corredores vivos e polinizadores.",
      "Máquinas recalculam rotas para não pressionar a área.",
      "Cultivo adapta uso da borda produtiva durante a regeneração.",
      "Água fornece suporte controlado para a recuperação."
    ],
    consequence: "A área degradada deixa de ser tratada como perda e vira parte do sistema de cura."
  },
  {
    id: "agua-alta",
    label: "Consumo excessivo de água",
    state: "A rede renegocia consumo antes que o recurso fique crítico",
    path: ["agua", "irrigacao", "cultivo", "energia", "solo", "preservacao"],
    messages: [
      "Água percebe que a demanda ultrapassou o padrão sustentável.",
      "Irrigação reduz vazão e muda horários de operação.",
      "Cultivo indica quais áreas podem esperar sem perda produtiva.",
      "Energia desloca bombeamento para janelas mais eficientes.",
      "Solo informa onde há retenção suficiente.",
      "Preservação Ambiental mantém reserva para ecossistemas essenciais."
    ],
    consequence: "A rede troca excesso por precisão e transforma economia em decisão coletiva."
  },
  {
    id: "bio",
    label: "Crescimento da biodiversidade",
    state: "A rede reconhece vida nova como infraestrutura produtiva",
    path: ["biodiversidade", "cultivo", "preservacao", "solo", "agua", "maquinas"],
    messages: [
      "Biodiversidade registra aumento de polinizadores e inimigos naturais.",
      "Cultivo ajusta manejo para aproveitar a proteção biológica.",
      "Preservação Ambiental expande faixas de refúgio.",
      "Solo recebe mais matéria orgânica e estabilidade.",
      "Água reduz intervenção em áreas mais equilibradas.",
      "Máquinas evitam corredores vivos durante as operações."
    ],
    consequence: "A rede entende biodiversidade como aliada, não como cenário ao redor da produção."
  },
  {
    id: "energia",
    label: "Falha energética",
    state: "A rede mantém funções críticas enquanto reorganiza o campo",
    path: ["energia", "irrigacao", "agua", "maquinas", "cultivo", "clima"],
    messages: [
      "Energia identifica queda e entra em modo de prioridade.",
      "Irrigação suspende setores não urgentes.",
      "Água preserva pressão para pontos estratégicos.",
      "Máquinas retornam para zonas seguras.",
      "Cultivo recebe proteção mínima até a retomada.",
      "Clima verifica se a interrupção coincide com risco ambiental."
    ],
    consequence: "A falha não paralisa a propriedade: ela reorganiza a ordem das decisões."
  },
  {
    id: "irrigar",
    label: "Necessidade de irrigação",
    state: "A rede consulta o conjunto antes de liberar água",
    path: ["cultivo", "solo", "clima", "agua", "energia", "irrigacao"],
    messages: [
      "Cultivo solicita apoio para um ciclo sensível.",
      "Solo confirma onde a água será absorvida com eficiência.",
      "Clima verifica janela sem chuva próxima.",
      "Água autoriza volume compatível com a reserva.",
      "Energia escolhe o melhor momento de bombeamento.",
      "Irrigação executa a resposta com precisão localizada."
    ],
    consequence: "Irrigar deixa de ser ligar um sistema e passa a ser uma decisão compartilhada."
  },
  {
    id: "recuperacao",
    label: "Recuperação ambiental",
    state: "A rede coloca produção e restauração no mesmo fluxo",
    path: ["preservacao", "biodiversidade", "solo", "agua", "cultivo", "maquinas", "energia"],
    messages: [
      "Preservação Ambiental inicia um ciclo de restauração.",
      "Biodiversidade reforça corredores ecológicos.",
      "Solo recebe manejo de regeneração.",
      "Água mantém suporte sem saturar a área.",
      "Cultivo redesenha bordas para conviver com a recuperação.",
      "Máquinas desviam rotas e reduzem impacto.",
      "Energia reserva operação para etapas essenciais."
    ],
    consequence: "A recuperação ambiental deixa de competir com a fazenda e passa a orientar o futuro dela."
  }
];

const simulatorPriorities = [
  {
    id: "producao",
    label: "Proteger produção",
    focus: "Cultivo assume prioridade sem isolar água e energia.",
    effects: ["Produção estabilizada", "Uso seletivo de recursos", "Risco ambiental vigiado"]
  },
  {
    id: "recursos",
    label: "Poupar recursos",
    focus: "Água e energia negociam limites antes da operação.",
    effects: ["Consumo reduzido", "Operação mais lenta", "Reserva protegida"]
  },
  {
    id: "vida",
    label: "Regenerar vida",
    focus: "Biodiversidade e preservação entram como infraestrutura do campo.",
    effects: ["Áreas frágeis protegidas", "Recuperação acelerada", "Produção ajustada ao ciclo natural"]
  },
  {
    id: "continuidade",
    label: "Manter operação",
    focus: "Máquinas e energia mantêm funções críticas com impacto controlado.",
    effects: ["Paradas evitadas", "Rotas recalculadas", "Prioridades temporárias ativadas"]
  }
];

const simulatorScenarios = {
  seca: {
    label: "Seca intensa",
    status: "A rede responde a escassez hídrica",
    zones: ["agua", "cultivo", "energia", "preservacao"],
    steps: {
      producao: [
        "Clima antecipa a pressão sobre o cultivo.",
        "Água libera suporte mínimo para talhões críticos.",
        "Energia prioriza bombeamento eficiente.",
        "Preservação acompanha impacto em nascentes."
      ],
      recursos: [
        "Água fecha usos secundários e cria limite coletivo.",
        "Solo indica áreas que ainda seguram umidade.",
        "Irrigação trabalha em pulsos curtos.",
        "Cultivo aceita janela de tolerância controlada."
      ],
      vida: [
        "Preservação protege corredores e bordas vegetais.",
        "Biodiversidade mantém sombreamento e refúgio.",
        "Água reserva fluxo ecológico mínimo.",
        "Cultivo concentra esforço onde há maior resiliência."
      ],
      continuidade: [
        "Energia separa cargas essenciais das adiáveis.",
        "Máquinas reduzem deslocamentos improdutivos.",
        "Irrigação opera em horários de menor perda.",
        "Cultivo mantém o ciclo sem expandir demanda."
      ]
    }
  },
  chuva: {
    label: "Chuva excessiva",
    status: "A rede protege solo, rotas e reservatórios",
    zones: ["agua", "maquinas", "cultivo", "preservacao"],
    steps: {
      producao: [
        "Cultivo identifica áreas vulneráveis ao encharcamento.",
        "Máquinas suspendem rotas pesadas.",
        "Água redireciona excedentes para zonas seguras.",
        "Preservação monitora margens e pontos de erosão."
      ],
      recursos: [
        "Água armazena excedente em vez de descartar.",
        "Solo entra em modo de baixa compactação.",
        "Energia reduz operações dispensáveis.",
        "Cultivo aguarda janela segura de manejo."
      ],
      vida: [
        "Preservação abre protocolo contra erosão.",
        "Biodiversidade protege corredores de drenagem natural.",
        "Água evita pressão sobre áreas de mata ciliar.",
        "Máquinas desviam de áreas em recuperação."
      ],
      continuidade: [
        "Máquinas recalculam rotas elevadas.",
        "Energia mantém comunicação e bombas essenciais.",
        "Água coordena escoamento preventivo.",
        "Cultivo recebe operação mínima até o solo estabilizar."
      ]
    }
  },
  degradada: {
    label: "Área degradada",
    status: "A rede transforma dano local em recuperação sistêmica",
    zones: ["preservacao", "biodiversidade", "maquinas", "cultivo"],
    steps: {
      producao: [
        "Cultivo redesenha bordas produtivas.",
        "Máquinas isolam a área sensível.",
        "Solo recebe recuperação gradual.",
        "Preservação acompanha ganho de vitalidade."
      ],
      recursos: [
        "Água fornece apoio controlado sem saturar a área.",
        "Energia reserva operação para etapas essenciais.",
        "Máquinas reduzem passagens repetidas.",
        "Solo prioriza retenção e cobertura."
      ],
      vida: [
        "Biodiversidade amplia corredores ecológicos.",
        "Preservação define zona de regeneração ativa.",
        "Solo recebe cobertura e menos pressão.",
        "Cultivo convive com a área em restauração."
      ],
      continuidade: [
        "Máquinas criam rotas alternativas.",
        "Cultivo redistribui tarefas para áreas estáveis.",
        "Energia mantém suporte aos pontos críticos.",
        "Preservação sinaliza quando a área pode reentrar no ciclo."
      ]
    }
  },
  energia: {
    label: "Falha energética",
    status: "A rede conserva funções críticas",
    zones: ["energia", "agua", "maquinas", "cultivo"],
    steps: {
      producao: [
        "Cultivo informa quais setores não podem parar.",
        "Energia cria fila de prioridade.",
        "Água mantém pressão nos pontos essenciais.",
        "Máquinas entram em modo de retorno seguro."
      ],
      recursos: [
        "Energia corta cargas não críticas.",
        "Água segura operações de alto consumo.",
        "Irrigação aguarda janela de eficiência.",
        "Preservação mantém alerta para impactos indiretos."
      ],
      vida: [
        "Preservação protege áreas que dependem de fluxo mínimo.",
        "Água preserva reserva ecológica.",
        "Energia alimenta apenas pontos vitais.",
        "Máquinas evitam atravessar áreas sensíveis."
      ],
      continuidade: [
        "Energia ativa hierarquia de emergência.",
        "Máquinas finalizam movimentos em andamento.",
        "Água mantém abastecimento estratégico.",
        "Cultivo recebe suporte mínimo até a normalização."
      ]
    }
  }
};

const nodeLayer = document.querySelector("#nodeLayer");
const connectionLayer = document.querySelector("#connectionLayer");
const signalLayer = document.querySelector("#signalLayer");
const eventGrid = document.querySelector("#eventGrid");
const dialogueList = document.querySelector("#dialogueList");
const activeEvent = document.querySelector("#activeEvent");
const consequence = document.querySelector("#consequence");
const networkState = document.querySelector("#networkState");
const resetNetwork = document.querySelector("#resetNetwork");
const comparisonTrigger = document.querySelector("#comparisonTrigger");
const comparisonTrack = document.querySelector("#comparisonTrack");
const simEventChoices = document.querySelector("#simEventChoices");
const simPriorityChoices = document.querySelector("#simPriorityChoices");
const runSimulation = document.querySelector("#runSimulation");
const simStatus = document.querySelector("#simStatus");
const simScore = document.querySelector("#simScore");
const fieldMap = document.querySelector("#fieldMap");
const simSummary = document.querySelector("#simSummary");
const simSteps = document.querySelector("#simSteps");
const simEffects = document.querySelector("#simEffects");
const contrastToggle = document.querySelector("#contrastToggle");
const fontIncrease = document.querySelector("#fontIncrease");
const fontDecrease = document.querySelector("#fontDecrease");
const backToTop = document.querySelector("#backToTop");

let currentTimers = [];
let simTimers = [];
let selectedSimEvent = "seca";
let selectedPriority = "producao";
let fontScale = 1;

function moduleById(id) {
  return modules.find((module) => module.id === id);
}

function createNetwork() {
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
  connectionLayer.innerHTML = "";
  connectionLayer.setAttribute("viewBox", "0 0 100 100");
  connectionLayer.setAttribute("preserveAspectRatio", "none");

  baseConnections.forEach(([from, to]) => {
    const start = moduleById(from);
    const end = moduleById(to);
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

  clearSimulationTimers();
  fieldMap.classList.remove("running");
  document.querySelectorAll(".field-zone").forEach((zone) => zone.classList.remove("active"));
  simSteps.innerHTML = "";
  simEffects.innerHTML = "";
  simStatus.textContent = scenario.status;
  simScore.textContent = priority.label;
  simSummary.textContent = `${scenario.label}: ${priority.focus}`;
}

function runCooperationSimulation() {
  const scenario = simulatorScenarios[selectedSimEvent];
  const priority = simulatorPriorities.find((item) => item.id === selectedPriority);
  const steps = scenario.steps[selectedPriority];

  clearSimulationTimers();
  activateEvent(selectedSimEvent);
  fieldMap.classList.add("running");
  simSteps.innerHTML = "";
  simEffects.innerHTML = "";
  simStatus.textContent = scenario.status;
  simScore.textContent = "Rede negociando";
  simSummary.textContent = `${scenario.label}: ${priority.focus}`;

  document.querySelectorAll(".field-zone").forEach((zone) => {
    zone.classList.toggle("active", scenario.zones.includes(zone.dataset.zone));
  });

  steps.forEach((step, index) => {
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
    fieldMap.classList.remove("running");
    simScore.textContent = "Resposta integrada";
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
  signalLayer.innerHTML = "";
  dialogueList.innerHTML = "";
  activeEvent.textContent = "Nenhum evento ativado ainda.";
  consequence.textContent = "A rede permanece pronta para redistribuir decisões quando algo muda no campo.";
  networkState.textContent = "Rede em escuta distribuída";
}

function activateEvent(eventId) {
  const event = events.find((item) => item.id === eventId);
  if (!event) return;

  resetState();
  activeEvent.textContent = event.label;
  networkState.textContent = event.state;

  document.querySelector(`[data-event="${event.id}"]`).classList.add("active");

  event.messages.forEach((message, index) => {
    const item = document.createElement("li");
    item.textContent = message;
    item.dataset.step = String(index);
    dialogueList.appendChild(item);
  });

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
    consequence.textContent = event.consequence;
    networkState.textContent = "Resposta integrada concluída";
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
  if (!start || !end) return;

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
  contrastToggle.addEventListener("click", () => {
    const active = document.body.classList.toggle("high-contrast");
    contrastToggle.setAttribute("aria-pressed", String(active));
  });

  fontIncrease.addEventListener("click", () => {
    fontScale = Math.min(1.28, fontScale + 0.08);
    applyFontScale();
  });

  fontDecrease.addEventListener("click", () => {
    fontScale = Math.max(0.88, fontScale - 0.08);
    applyFontScale();
  });

  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

createNetwork();
createEvents();
createSimulatorChoices();
previewSimulation();
setupAccessibility();

resetNetwork.addEventListener("click", resetState);
comparisonTrigger.addEventListener("click", toggleComparison);
runSimulation.addEventListener("click", runCooperationSimulation);
window.addEventListener("resize", drawConnections);
