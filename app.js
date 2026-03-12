const STORAGE_PROFILE_KEY = "pulsematch.profile.v1";
const STORAGE_MATCHES_KEY = "pulsematch.matches.v1";

const INTEREST_GROUPS = [
  "US Politics",
  "Global Elections",
  "Crypto",
  "AI & Tech",
  "Climate & Energy",
  "Sports",
  "Entertainment",
  "Macro & Rates",
  "Commodities",
  "Startups",
  "Public Health",
  "Space",
  "Gaming",
  "Science",
  "Defense",
  "China Markets",
];

const CANDIDATE_POOL = [
  {
    id: "c1",
    name: "Nina",
    style: "Volatility hunter",
    reputation: 0.77,
    interests: ["Crypto", "Macro & Rates", "AI & Tech", "China Markets"],
    markets: [
      {
        id: "m1",
        prompt: "Will ETH ETF flows exceed $6B by year-end?",
        side: "YES",
        confidence: 68,
        closeDate: "2026-12-31",
        impliedVol: "High",
      },
      {
        id: "m2",
        prompt: "Will the Fed deliver two or more cuts this year?",
        side: "NO",
        confidence: 61,
        closeDate: "2026-09-18",
        impliedVol: "Medium",
      },
    ],
  },
  {
    id: "c2",
    name: "Rafael",
    style: "Narrative momentum",
    reputation: 0.69,
    interests: ["Sports", "Entertainment", "US Politics", "Gaming"],
    markets: [
      {
        id: "m3",
        prompt: "Will a streaming-only studio win Best Picture next season?",
        side: "YES",
        confidence: 55,
        closeDate: "2027-03-16",
        impliedVol: "Medium",
      },
      {
        id: "m4",
        prompt: "Will the underdog win the finals this year?",
        side: "NO",
        confidence: 63,
        closeDate: "2026-06-12",
        impliedVol: "High",
      },
    ],
  },
  {
    id: "c3",
    name: "Amina",
    style: "Data-first forecaster",
    reputation: 0.88,
    interests: ["Public Health", "Climate & Energy", "Science", "US Politics"],
    markets: [
      {
        id: "m5",
        prompt: "Will a major city pass congestion pricing by Q4?",
        side: "YES",
        confidence: 70,
        closeDate: "2026-10-20",
        impliedVol: "Low",
      },
      {
        id: "m6",
        prompt: "Will a new WHO pandemic guideline be adopted this year?",
        side: "YES",
        confidence: 59,
        closeDate: "2026-12-10",
        impliedVol: "Low",
      },
    ],
  },
  {
    id: "c4",
    name: "Julian",
    style: "Contrarian macro",
    reputation: 0.74,
    interests: ["Macro & Rates", "Commodities", "Defense", "Global Elections"],
    markets: [
      {
        id: "m7",
        prompt: "Will Brent crude settle above $95 before Q3?",
        side: "YES",
        confidence: 66,
        closeDate: "2026-08-01",
        impliedVol: "High",
      },
      {
        id: "m8",
        prompt: "Will any G7 nation call a snap election this year?",
        side: "NO",
        confidence: 57,
        closeDate: "2026-11-30",
        impliedVol: "Medium",
      },
    ],
  },
  {
    id: "c5",
    name: "Mika",
    style: "Quant analyst",
    reputation: 0.82,
    interests: ["AI & Tech", "Startups", "Space", "Science"],
    markets: [
      {
        id: "m9",
        prompt: "Will a top-5 LLM release true real-time voice translation this year?",
        side: "YES",
        confidence: 72,
        closeDate: "2026-12-05",
        impliedVol: "Medium",
      },
      {
        id: "m10",
        prompt: "Will a private lunar mission complete a soft landing by Q4?",
        side: "NO",
        confidence: 53,
        closeDate: "2026-11-11",
        impliedVol: "High",
      },
    ],
  },
];

const state = {
  step: 0,
  selectedInterests: new Set(),
  pairingMode: "opposite",
  profile: null,
  deck: [],
  index: 0,
  matches: [],
  passes: 0,
};

const els = {
  onboardingSection: document.getElementById("onboardingSection"),
  marketSection: document.getElementById("marketSection"),
  steps: document.querySelectorAll(".step"),
  stepDots: document.querySelectorAll(".step-dot"),
  stepLabel: document.getElementById("stepLabel"),
  displayName: document.getElementById("displayName"),
  experience: document.getElementById("experience"),
  interestGrid: document.getElementById("interestGrid"),
  pairingModeChoices: document.getElementById("pairingModeChoices"),
  riskTolerance: document.getElementById("riskTolerance"),
  stepProgressBar: document.getElementById("stepProgressBar"),
  reviewName: document.getElementById("reviewName"),
  reviewExperience: document.getElementById("reviewExperience"),
  reviewPairing: document.getElementById("reviewPairing"),
  reviewRisk: document.getElementById("reviewRisk"),
  reviewInterests: document.getElementById("reviewInterests"),
  backButton: document.getElementById("backButton"),
  nextButton: document.getElementById("nextButton"),
  matchCard: document.getElementById("matchCard"),
  statusLine: document.getElementById("statusLine"),
  summaryPairingMode: document.getElementById("summaryPairingMode"),
  summaryInterests: document.getElementById("summaryInterests"),
  passButton: document.getElementById("passButton"),
  pairButton: document.getElementById("pairButton"),
  matchList: document.getElementById("matchList"),
  resetButton: document.getElementById("resetButton"),
  kpiPairs: document.getElementById("kpiPairs"),
  kpiPasses: document.getElementById("kpiPasses"),
  kpiHitRate: document.getElementById("kpiHitRate"),
  kpiRemaining: document.getElementById("kpiRemaining"),
  toast: document.getElementById("toast"),
};

function init() {
  renderInterestGrid();
  bindEvents();
  hydrateFromStorage();
  renderStep();
}

function renderInterestGrid() {
  els.interestGrid.innerHTML = "";
  INTEREST_GROUPS.forEach((interest) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "pill";
    button.textContent = interest;
    button.dataset.interest = interest;
    button.addEventListener("click", () => {
      if (state.selectedInterests.has(interest)) {
        state.selectedInterests.delete(interest);
        button.classList.remove("active");
      } else {
        state.selectedInterests.add(interest);
        button.classList.add("active");
      }
      updateProfilePreview();
    });
    els.interestGrid.appendChild(button);
  });
}

function bindEvents() {
  els.backButton.addEventListener("click", goBack);
  els.nextButton.addEventListener("click", goNext);
  els.pairingModeChoices.addEventListener("click", (event) => {
    const target = event.target.closest("button[data-pairing-mode]");
    if (!target) return;

    state.pairingMode = target.dataset.pairingMode;
    Array.from(els.pairingModeChoices.children).forEach((child) => child.classList.remove("active"));
    target.classList.add("active");
    updateReview();
  });

  els.riskTolerance.addEventListener("input", updateReview);
  els.displayName.addEventListener("input", updateReview);
  els.experience.addEventListener("change", updateReview);

  els.passButton.addEventListener("click", () => handleSwipe("pass"));
  els.pairButton.addEventListener("click", () => handleSwipe("pair"));
  els.resetButton.addEventListener("click", resetAll);

  document.addEventListener("keydown", (event) => {
    if (els.marketSection.classList.contains("hidden")) return;
    if (!state.deck[state.index]) return;
    if (event.key === "ArrowLeft") handleSwipe("pass");
    if (event.key === "ArrowRight") handleSwipe("pair");
  });
}

function renderStep() {
  els.steps.forEach((stepEl, idx) => {
    stepEl.classList.toggle("hidden", idx !== state.step);
  });
  els.stepDots.forEach((dot, idx) => {
    dot.classList.toggle("active", idx === state.step);
  });

  els.stepLabel.textContent = `Step ${state.step + 1} of 4`;
  els.stepProgressBar.style.width = `${((state.step + 1) / 4) * 100}%`;
  els.backButton.disabled = state.step === 0;
  els.nextButton.textContent = state.step === 3 ? "Start matching" : "Next";
  updateReview();
}

function goBack() {
  if (state.step === 0) return;
  state.step -= 1;
  renderStep();
}

function goNext() {
  const validationMessage = validateStep(state.step);
  if (validationMessage) {
    window.alert(validationMessage);
    return;
  }

  if (state.step < 3) {
    state.step += 1;
    renderStep();
    return;
  }

  finalizeOnboarding();
}

function validateStep(step) {
  if (step === 0) {
    const name = els.displayName.value.trim();
    if (!name) return "Please add a display name to continue.";
  }

  if (step === 1 && state.selectedInterests.size < 3) {
    return "Select at least 3 interest groups so matching has enough signal.";
  }

  return "";
}

function buildProfile() {
  return {
    displayName: els.displayName.value.trim(),
    experience: els.experience.value,
    pairingMode: state.pairingMode,
    riskTolerance: Number(els.riskTolerance.value),
    interests: Array.from(state.selectedInterests),
    capturedAt: new Date().toISOString(),
  };
}

function updateReview() {
  const preview = buildProfile();
  els.reviewName.textContent = preview.displayName || "Not set";
  els.reviewExperience.textContent = labelizeExperience(preview.experience);
  els.reviewPairing.textContent = prettyPairingMode(preview.pairingMode);
  els.reviewRisk.textContent = labelizeRisk(preview.riskTolerance);
  els.reviewInterests.innerHTML = "";
  preview.interests.forEach((interest) => {
    const chip = document.createElement("span");
    chip.className = "chip";
    chip.textContent = interest;
    els.reviewInterests.appendChild(chip);
  });
}

function finalizeOnboarding() {
  state.profile = buildProfile();
  localStorage.setItem(STORAGE_PROFILE_KEY, JSON.stringify(state.profile));
  localStorage.setItem(STORAGE_MATCHES_KEY, JSON.stringify(state.matches));
  initializeMatching();
}

function initializeMatching() {
  state.deck = buildDeck(state.profile);
  state.index = 0;

  els.onboardingSection.classList.add("hidden");
  els.marketSection.classList.remove("hidden");

  renderSummary();
  renderCard();
  renderMatches();
  renderKpis();
}

function buildDeck(profile) {
  const deck = [];

  CANDIDATE_POOL.forEach((candidate) => {
    candidate.markets.forEach((market) => {
      const sharedInterests = intersection(profile.interests, candidate.interests);
      if (sharedInterests.length === 0) return;

      const userSide = inferUserSide(profile.pairingMode, market.side, `${candidate.id}-${market.id}`);
      const compatibility = scoreCompatibility({
        profile,
        candidate,
        market,
        sharedInterests,
        userSide,
      });

      deck.push({
        id: `${candidate.id}-${market.id}`,
        candidate,
        market,
        sharedInterests,
        userSide,
        compatibility,
      });
    });
  });

  return deck.sort((a, b) => b.compatibility - a.compatibility);
}

function inferUserSide(pairingMode, candidateSide, seed) {
  if (pairingMode === "opposite") return candidateSide === "YES" ? "NO" : "YES";
  if (pairingMode === "same") return candidateSide;
  return deterministicFloat(seed) > 0.5 ? candidateSide : candidateSide === "YES" ? "NO" : "YES";
}

function scoreCompatibility({ profile, candidate, market, sharedInterests, userSide }) {
  const overlapScore = sharedInterests.length / Math.max(profile.interests.length, 1);
  const riskTargetByBand = { 1: 0.18, 2: 0.26, 3: 0.34 };
  const targetEdge = riskTargetByBand[profile.riskTolerance] ?? 0.26;
  const confidenceEdge = Math.abs(market.confidence - 50) / 100;
  const riskScore = 1 - Math.min(Math.abs(confidenceEdge - targetEdge) / 0.45, 1);

  let modeScore = 0.55;
  if (profile.pairingMode === "opposite" && userSide !== market.side) modeScore = 1;
  if (profile.pairingMode === "same" && userSide === market.side) modeScore = 1;
  if (profile.pairingMode === "hybrid") modeScore = 0.8;

  const repScore = candidate.reputation;
  const raw = overlapScore * 0.4 + riskScore * 0.2 + modeScore * 0.2 + repScore * 0.2;
  return Math.round(raw * 100);
}

function renderSummary() {
  els.summaryPairingMode.textContent = prettyPairingMode(state.profile.pairingMode);
  els.summaryInterests.innerHTML = "";

  state.profile.interests.forEach((interest) => {
    const chip = document.createElement("span");
    chip.className = "chip";
    chip.textContent = interest;
    els.summaryInterests.appendChild(chip);
  });
}

function renderCard() {
  const card = state.deck[state.index];
  const remaining = Math.max(state.deck.length - state.index, 0);
  els.statusLine.textContent = `${remaining} cards left · ${state.matches.length} matches`;
  els.kpiRemaining.textContent = String(remaining);

  if (!card) {
    els.matchCard.innerHTML = `
      <p class="empty-card">No more candidates in this batch.</p>
      <p class="empty-card">You can reset onboarding to test another matching profile.</p>
    `;
    els.passButton.disabled = true;
    els.pairButton.disabled = true;
    return;
  }

  els.passButton.disabled = false;
  els.pairButton.disabled = false;

  els.matchCard.innerHTML = `
    <h3>${card.market.prompt}</h3>
    <p><strong>${card.candidate.name}</strong> · ${card.candidate.style}</p>
    <p>${matchingNarrative(card)}</p>
    <div class="match-meta">
      <span>Candidate side: <strong>${card.market.side}</strong> (${card.market.confidence}%)</span>
      <span>Your side: <strong>${card.userSide}</strong></span>
      <span>Market close: <strong>${card.market.closeDate}</strong></span>
      <span>Implied volatility: <strong>${card.market.impliedVol}</strong></span>
    </div>
    <div class="match-metrics">
      <span class="metric">Compatibility ${card.compatibility}%</span>
      <span class="metric">Shared: ${card.sharedInterests.join(", ")}</span>
      <span class="metric">Reputation ${Math.round(card.candidate.reputation * 100)}</span>
    </div>
  `;
}

function handleSwipe(action) {
  const card = state.deck[state.index];
  if (!card) return;

  if (action === "pass") {
    state.passes += 1;
    toast("Card passed. Next candidate loaded.");
  } else if (action === "pair") {
    const matched = isReciprocalMatch(card);
    if (matched) {
      const match = {
        id: `${card.id}-${Date.now()}`,
        candidateName: card.candidate.name,
        prompt: card.market.prompt,
        sides: `${state.profile.displayName}: ${card.userSide} vs ${card.candidate.name}: ${card.market.side}`,
        compatibility: card.compatibility,
        sharedInterests: card.sharedInterests,
        stakeBand: suggestStakeBand(state.profile.riskTolerance, card.market.confidence),
        createdAt: new Date().toISOString(),
      };
      state.matches.unshift(match);
      localStorage.setItem(STORAGE_MATCHES_KEY, JSON.stringify(state.matches));
      renderMatches();
      toast(`Mutual pair with ${card.candidate.name}! Trade ticket created.`);
    } else {
      toast(`${card.candidate.name} did not reciprocate this round.`);
    }
  }

  state.index += 1;
  renderKpis();
  renderCard();
}

function isReciprocalMatch(card) {
  // Deterministic seed keeps prototype behavior stable across reloads.
  const seed = `${state.profile.displayName}-${card.id}-${state.profile.pairingMode}`;
  const affinity = card.compatibility / 100;
  const threshold = 0.2 + affinity * 0.7;
  return deterministicFloat(seed) < threshold;
}

function renderMatches() {
  els.matchList.innerHTML = "";
  if (state.matches.length === 0) {
    els.matchList.innerHTML = "<li><small>No successful pairs yet. Swipe right to create one.</small></li>";
    return;
  }

  state.matches.forEach((match) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <strong>${match.candidateName}</strong>
      <div>${match.prompt}</div>
      <small>${match.sides}</small><br />
      <small>Recommended stake: ${match.stakeBand} · Compatibility: ${match.compatibility}%</small><br />
      <small>Shared interests: ${match.sharedInterests.join(", ")}</small>
    `;
    els.matchList.appendChild(li);
  });
}

function renderKpis() {
  const actions = state.matches.length + state.passes;
  const hitRate = actions ? Math.round((state.matches.length / actions) * 100) : 0;
  els.kpiPairs.textContent = String(state.matches.length);
  els.kpiPasses.textContent = String(state.passes);
  els.kpiHitRate.textContent = `${hitRate}%`;
}

function suggestStakeBand(riskTolerance, confidence) {
  const baseByRisk = { 1: "$20-$60", 2: "$60-$180", 3: "$180-$500" };
  if (confidence >= 68 && riskTolerance > 1) return "$220-$650";
  return baseByRisk[riskTolerance] ?? "$60-$180";
}

function prettyPairingMode(mode) {
  if (mode === "opposite") return "Opposite conviction";
  if (mode === "same") return "Same-side syndicate";
  return "Hybrid";
}

function hydrateFromStorage() {
  const rawProfile = localStorage.getItem(STORAGE_PROFILE_KEY);
  const rawMatches = localStorage.getItem(STORAGE_MATCHES_KEY);

  if (rawMatches) {
    try {
      state.matches = JSON.parse(rawMatches);
    } catch {
      state.matches = [];
    }
  }

  if (!rawProfile) return;

  try {
    const profile = JSON.parse(rawProfile);
    state.profile = profile;
    state.selectedInterests = new Set(profile.interests || []);
    state.pairingMode = profile.pairingMode || "opposite";

    els.displayName.value = profile.displayName || "";
    els.experience.value = profile.experience || "intermediate";
    els.riskTolerance.value = String(profile.riskTolerance || 2);

    Array.from(els.interestGrid.children).forEach((pill) => {
      if (state.selectedInterests.has(pill.dataset.interest)) pill.classList.add("active");
    });

    const selectedPairing = els.pairingModeChoices.querySelector(
      `button[data-pairing-mode="${state.pairingMode}"]`
    );
    if (selectedPairing) {
      Array.from(els.pairingModeChoices.children).forEach((child) => child.classList.remove("active"));
      selectedPairing.classList.add("active");
    }

    initializeMatching();
    toast(`Welcome back, ${profile.displayName}. Your desk is ready.`);
  } catch {
    localStorage.removeItem(STORAGE_PROFILE_KEY);
  }
}

function resetAll() {
  localStorage.removeItem(STORAGE_PROFILE_KEY);
  localStorage.removeItem(STORAGE_MATCHES_KEY);
  window.location.reload();
}

function deterministicFloat(seedText) {
  let hash = 0;
  for (let i = 0; i < seedText.length; i += 1) {
    hash = (hash << 5) - hash + seedText.charCodeAt(i);
    hash |= 0;
  }
  return (Math.abs(hash) % 1000) / 1000;
}

function intersection(a, b) {
  const bSet = new Set(b);
  return a.filter((item) => bSet.has(item));
}

function matchingNarrative(card) {
  const base =
    card.userSide === card.market.side
      ? "You are aligned for a syndicate-style position."
      : "You are naturally opposite, ideal for a balanced counterparty setup.";
  return `${base} Shared context: ${card.sharedInterests.join(", ")}.`;
}

function labelizeExperience(level) {
  if (level === "new") return "New to markets";
  if (level === "expert") return "Power user";
  return "Intermediate";
}

function labelizeRisk(level) {
  if (Number(level) === 1) return "Conservative";
  if (Number(level) === 3) return "Aggressive";
  return "Balanced";
}

let toastTimer = null;
function toast(message) {
  if (!els.toast) return;
  els.toast.textContent = message;
  els.toast.classList.remove("hidden");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => els.toast.classList.add("hidden"), 1900);
}

init();
