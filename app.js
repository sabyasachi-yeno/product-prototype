const STORAGE_PROFILE_KEY = "pulsematch.profile.v1";
const STORAGE_MATCHES_KEY = "pulsematch.matches.v1";
const STORAGE_POSITIONS_KEY = "pulsematch.positions.v1";
const STORAGE_GROUP_TRADES_KEY = "pulsematch.groupTrades.v1";
const STORAGE_ACCOUNT_KEY = "pulsematch.account.v1";
const STORAGE_GROUP_CONFIGS_KEY = "pulsematch.groupConfigs.v1";
const STORAGE_POLY_MARKETS_KEY = "pulsematch.polyMarkets.v1";
const STORAGE_POLY_POSITIONS_KEY = "pulsematch.polyPositions.v1";
const STORAGE_CREATOR_QUEUE_KEY = "pulsematch.creatorQueue.v1";

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

const GROUP_MARKET_TEMPLATES = {
  "US Politics": [
    "Will either major party hold over 52 Senate seats after the next election cycle?",
    "Will a federal privacy bill pass before year-end?",
  ],
  "Global Elections": [
    "Will an incumbent government lose in any G20 election this year?",
    "Will voter turnout exceed 70% in any major national election this year?",
  ],
  Crypto: [
    "Will BTC close above $120k before year-end?",
    "Will a top-10 chain face a 24h outage this quarter?",
  ],
  "AI & Tech": [
    "Will a frontier model pass top-tier coding benchmark threshold this year?",
    "Will one of the top-3 cloud providers launch autonomous agent billing this year?",
  ],
  "Climate & Energy": [
    "Will global solar additions exceed analyst consensus this year?",
    "Will at least two major cities introduce new emissions pricing before Q4?",
  ],
  Sports: [
    "Will the preseason title favorite miss the finals?",
    "Will any league announce expansion by next season?",
  ],
  Entertainment: [
    "Will global box office beat last year by 10%+?",
    "Will a non-English show top streaming charts for 4+ weeks?",
  ],
  "Macro & Rates": [
    "Will the Fed cut rates at least twice this year?",
    "Will 10Y yields briefly move above 5% this cycle?",
  ],
  Commodities: [
    "Will copper hit a new all-time high this year?",
    "Will Brent close a month above $100 this year?",
  ],
  Startups: [
    "Will any AI startup IPO above a $20B valuation this year?",
    "Will seed-stage valuations contract from current quarter levels?",
  ],
  "Public Health": [
    "Will a major country introduce nationwide preventive screening expansion?",
    "Will global flu hospitalization rates exceed the 5-year average this season?",
  ],
  Space: [
    "Will a private mission complete a crewed orbital test this year?",
    "Will satellite launch cadence set a monthly record this year?",
  ],
  Gaming: [
    "Will a new title exceed 20M players in its first quarter?",
    "Will cloud gaming MAU grow year-over-year by 30%+?",
  ],
  Science: [
    "Will a fusion milestone with net-positive output be independently replicated?",
    "Will a major gene-editing therapy gain new regulatory approval this year?",
  ],
  Defense: [
    "Will any NATO member lift defense spending above 3% of GDP this year?",
    "Will autonomous drone procurement budgets rise in the next fiscal cycle?",
  ],
  "China Markets": [
    "Will China CSI300 outperform S&P 500 this quarter?",
    "Will China announce additional broad property stimulus this year?",
  ],
};

function buildDefaultAccount() {
  return {
    cash: 5000,
    realizedPnl: 0,
    tradesPlaced: 0,
    tradesSettled: 0,
  };
}

function ensureAccountShape(account) {
  const fallback = buildDefaultAccount();
  if (!account || typeof account !== "object") return fallback;
  return {
    cash: Number.isFinite(account.cash) ? account.cash : fallback.cash,
    realizedPnl: Number.isFinite(account.realizedPnl) ? account.realizedPnl : fallback.realizedPnl,
    tradesPlaced: Number.isFinite(account.tradesPlaced) ? account.tradesPlaced : fallback.tradesPlaced,
    tradesSettled: Number.isFinite(account.tradesSettled) ? account.tradesSettled : fallback.tradesSettled,
  };
}

function buildDefaultPolyMarkets() {
  return [
    {
      id: "pm-1",
      question: "Will the Fed cut rates at least twice this year?",
      category: "Macro & Rates",
      closeDate: "2026-12-20",
      yesPrice: 0.57,
      volume: 148200,
      liquidity: 92000,
      resolutionSource: "FOMC official statement",
      status: "open",
      createdBy: "PulseMatch Desk",
      visibility: "public",
      groupId: null,
      tape: [],
    },
    {
      id: "pm-2",
      question: "Will BTC print a new all-time high before year-end?",
      category: "Crypto",
      closeDate: "2026-12-31",
      yesPrice: 0.62,
      volume: 213700,
      liquidity: 118000,
      resolutionSource: "Major exchange consolidated index",
      status: "open",
      createdBy: "PulseMatch Desk",
      visibility: "public",
      groupId: null,
      tape: [],
    },
    {
      id: "pm-3",
      question: "Will a top cloud vendor release full autonomous agent billing this year?",
      category: "AI & Tech",
      closeDate: "2026-11-15",
      yesPrice: 0.43,
      volume: 96200,
      liquidity: 74000,
      resolutionSource: "Official product launch documentation",
      status: "open",
      createdBy: "PulseMatch Desk",
      visibility: "public",
      groupId: null,
      tape: [],
    },
  ];
}

const state = {
  step: 0,
  selectedInterests: new Set(),
  pairingMode: "opposite",
  profile: null,
  deck: [],
  index: 0,
  matches: [],
  passes: 0,
  positions: [],
  trustedGroups: [],
  groupTrades: [],
  groupConfigs: {},
  polyMarkets: [],
  polyPositions: [],
  creatorQueue: [],
  account: buildDefaultAccount(),
  selectedGroupId: null,
  selectedExchangeMarketId: null,
  activeTab: "feed",
  drag: {
    active: false,
    pointerId: null,
    startX: 0,
    deltaX: 0,
  },
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
  positionsList: document.getElementById("positionsList"),
  positionsSummary: document.getElementById("positionsSummary"),
  groupsSummary: document.getElementById("groupsSummary"),
  trustedGroupsGrid: document.getElementById("trustedGroupsGrid"),
  groupDeskLabel: document.getElementById("groupDeskLabel"),
  groupReputationSummary: document.getElementById("groupReputationSummary"),
  governanceSummary: document.getElementById("governanceSummary"),
  inviteMemberInput: document.getElementById("inviteMemberInput"),
  sendInviteButton: document.getElementById("sendInviteButton"),
  pendingInvitesList: document.getElementById("pendingInvitesList"),
  groupMembersList: document.getElementById("groupMembersList"),
  socialGraphSummary: document.getElementById("socialGraphSummary"),
  socialGraphList: document.getElementById("socialGraphList"),
  createMarketQuestion: document.getElementById("createMarketQuestion"),
  createMarketCloseDate: document.getElementById("createMarketCloseDate"),
  createMarketButton: document.getElementById("createMarketButton"),
  groupMarketSelect: document.getElementById("groupMarketSelect"),
  groupStakeInput: document.getElementById("groupStakeInput"),
  groupConfidenceInput: document.getElementById("groupConfidenceInput"),
  forecastProbabilityInput: document.getElementById("forecastProbabilityInput"),
  forecastRationaleInput: document.getElementById("forecastRationaleInput"),
  submitForecastButton: document.getElementById("submitForecastButton"),
  simulatePeersButton: document.getElementById("simulatePeersButton"),
  forecastConsensusSummary: document.getElementById("forecastConsensusSummary"),
  forecastList: document.getElementById("forecastList"),
  tradeYesButton: document.getElementById("tradeYesButton"),
  tradeNoButton: document.getElementById("tradeNoButton"),
  groupTradesList: document.getElementById("groupTradesList"),
  exchangeMarketSearch: document.getElementById("exchangeMarketSearch"),
  exchangeMarketList: document.getElementById("exchangeMarketList"),
  exchangeSelectedTitle: document.getElementById("exchangeSelectedTitle"),
  exchangeSelectedMeta: document.getElementById("exchangeSelectedMeta"),
  exchangeYesPrice: document.getElementById("exchangeYesPrice"),
  exchangeNoPrice: document.getElementById("exchangeNoPrice"),
  exchangeOrderBook: document.getElementById("exchangeOrderBook"),
  exchangeTradeSide: document.getElementById("exchangeTradeSide"),
  exchangeTradeOutcome: document.getElementById("exchangeTradeOutcome"),
  exchangeTradeShares: document.getElementById("exchangeTradeShares"),
  exchangeTradePrice: document.getElementById("exchangeTradePrice"),
  executeExchangeTradeButton: document.getElementById("executeExchangeTradeButton"),
  exchangePositionSummary: document.getElementById("exchangePositionSummary"),
  exchangeTapeList: document.getElementById("exchangeTapeList"),
  creatorQuestionInput: document.getElementById("creatorQuestionInput"),
  creatorCategorySelect: document.getElementById("creatorCategorySelect"),
  creatorCloseDateInput: document.getElementById("creatorCloseDateInput"),
  creatorResolutionSourceInput: document.getElementById("creatorResolutionSourceInput"),
  creatorVisibilitySelect: document.getElementById("creatorVisibilitySelect"),
  creatorGroupSelect: document.getElementById("creatorGroupSelect"),
  creatorInitialYesPrice: document.getElementById("creatorInitialYesPrice"),
  creatorInitialLiquidity: document.getElementById("creatorInitialLiquidity"),
  submitCreatorMarketButton: document.getElementById("submitCreatorMarketButton"),
  creatorQueueList: document.getElementById("creatorQueueList"),
  creatorPublishedList: document.getElementById("creatorPublishedList"),
  accountCash: document.getElementById("accountCash"),
  accountOpenExposure: document.getElementById("accountOpenExposure"),
  accountRealizedPnl: document.getElementById("accountRealizedPnl"),
  flowCompletionLabel: document.getElementById("flowCompletionLabel"),
  flowProgressBar: document.getElementById("flowProgressBar"),
  flowNextAction: document.getElementById("flowNextAction"),
  resetButton: document.getElementById("resetButton"),
  kpiPairs: document.getElementById("kpiPairs"),
  kpiPasses: document.getElementById("kpiPasses"),
  kpiHitRate: document.getElementById("kpiHitRate"),
  kpiRemaining: document.getElementById("kpiRemaining"),
  marketTabs: document.querySelectorAll(".market-tab"),
  feedTabPanel: document.getElementById("feedTabPanel"),
  positionsTabPanel: document.getElementById("positionsTabPanel"),
  groupsTabPanel: document.getElementById("groupsTabPanel"),
  exchangeTabPanel: document.getElementById("exchangeTabPanel"),
  creatorTabPanel: document.getElementById("creatorTabPanel"),
  toast: document.getElementById("toast"),
};

function init() {
  renderInterestGrid();
  bindEvents();
  renderStep();
  hydrateFromStorage();
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
      updateReview();
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
  els.positionsList.addEventListener("click", onPositionActionClick);
  els.trustedGroupsGrid.addEventListener("click", onGroupCardClick);
  els.groupMarketSelect.addEventListener("change", onGroupMarketChange);
  els.sendInviteButton.addEventListener("click", sendGroupInvite);
  els.pendingInvitesList.addEventListener("click", onPendingInviteActionClick);
  els.createMarketButton.addEventListener("click", createGroupMarket);
  els.submitForecastButton.addEventListener("click", submitForecast);
  els.simulatePeersButton.addEventListener("click", simulatePeerForecasts);
  els.tradeYesButton.addEventListener("click", () => placeGroupTrade("YES"));
  els.tradeNoButton.addEventListener("click", () => placeGroupTrade("NO"));
  els.groupTradesList.addEventListener("click", onGroupTradeActionClick);
  els.exchangeMarketList.addEventListener("click", onExchangeMarketClick);
  els.exchangeMarketSearch.addEventListener("input", renderExchangeMarkets);
  els.exchangeTradeSide.addEventListener("change", syncExchangeTradePrice);
  els.exchangeTradeOutcome.addEventListener("change", syncExchangeTradePrice);
  els.executeExchangeTradeButton.addEventListener("click", executeExchangeTrade);
  els.submitCreatorMarketButton.addEventListener("click", submitCreatorMarket);
  els.creatorVisibilitySelect.addEventListener("change", renderCreatorGroupOptions);
  els.creatorQueueList.addEventListener("click", onCreatorQueueActionClick);
  els.marketTabs.forEach((tab) => {
    tab.addEventListener("click", () => setActiveTab(tab.dataset.marketTab));
  });

  document.addEventListener("keydown", (event) => {
    if (els.marketSection.classList.contains("hidden")) return;
    if (state.activeTab !== "feed") return;
    if (!state.deck[state.index]) return;
    if (event.key === "ArrowLeft") handleSwipe("pass");
    if (event.key === "ArrowRight") handleSwipe("pair");
  });

  initSwipeGestures();
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
  persistMatches();
  persistPositions();
  persistGroupTrades();
  persistGroupConfigs();
  persistPolyMarkets();
  persistPolyPositions();
  persistCreatorQueue();
  persistAccount();
  initializeMatching();
}

function initializeMatching() {
  state.deck = buildDeck(state.profile);
  state.index = 0;
  refreshTrustedGroupsFromConfigs();
  if (!state.selectedGroupId || !state.trustedGroups.some((group) => group.id === state.selectedGroupId)) {
    state.selectedGroupId = state.trustedGroups[0]?.id ?? null;
  }

  els.onboardingSection.classList.add("hidden");
  els.marketSection.classList.remove("hidden");

  renderSummary();
  renderCard();
  renderMatches();
  renderPositions();
  renderTrustedGroups();
  renderGovernancePanel();
  renderGroupMarketDesk();
  renderForecasts();
  renderGroupTrades();
  seedPolyMarketsIfNeeded();
  renderCreatorCategoryOptions();
  renderCreatorGroupOptions();
  renderExchangeMarkets();
  renderExchangeSelectedMarket();
  renderCreatorTerminal();
  renderAccount();
  renderHappyFlow();
  renderKpis();
  setActiveTab(state.activeTab);
}

function refreshTrustedGroupsFromConfigs() {
  const baseGroups = buildTrustedGroups(state.profile.interests);
  baseGroups.forEach((group) => ensureGroupConfig(group));
  state.trustedGroups = baseGroups.map((group) => {
    const config = getGroupConfig(group.id);
    return {
      ...group,
      inviteOnly: config.inviteOnly,
      markets: [...group.markets, ...(config.customMarkets || [])],
      memberCount: activeMembersForGroup(group.id).length,
    };
  });
  persistGroupConfigs();
}

function ensureGroupConfig(group) {
  const ownerName = state.profile?.displayName || "Owner";
  const existing = state.groupConfigs[group.id];
  if (!existing) {
    state.groupConfigs[group.id] = {
      inviteOnly: true,
      governancePolicy: "owner-approved",
      members: [
        { id: `owner-${slugify(ownerName)}`, name: ownerName, role: "owner", status: "active", reputation: 70 },
        ...buildFoundingMembers(group),
      ],
      pendingInvites: [],
      customMarkets: [],
      forecastsByMarket: {},
      socialLinks: [],
    };
    state.groupConfigs[group.id].socialLinks = buildInitialSocialLinks(group.id, state.groupConfigs[group.id].members);
    return;
  }

  if (!Array.isArray(existing.members)) existing.members = [];
  if (!Array.isArray(existing.pendingInvites)) existing.pendingInvites = [];
  if (!Array.isArray(existing.customMarkets)) existing.customMarkets = [];
  if (!Array.isArray(existing.socialLinks)) existing.socialLinks = [];
  if (!existing.forecastsByMarket || typeof existing.forecastsByMarket !== "object") {
    existing.forecastsByMarket = {};
  }

  const ownerIndex = existing.members.findIndex((member) => member.role === "owner");
  if (ownerIndex === -1) {
    existing.members.unshift({
      id: `owner-${slugify(ownerName)}`,
      name: ownerName,
      role: "owner",
      status: "active",
      reputation: 70,
    });
  } else {
    existing.members[ownerIndex].name = ownerName;
    existing.members[ownerIndex].status = "active";
  }

  ensureSocialLinksForMembers(group.id);
}

function buildFoundingMembers(group) {
  const candidateNames = [
    "Ava",
    "Liam",
    "Noah",
    "Maya",
    "Iris",
    "Kian",
    "Sora",
    "Riya",
    "Omar",
    "Leah",
    "Zane",
    "Nora",
  ];
  const seed = Math.floor(deterministicFloat(group.id) * 1000);
  const first = candidateNames[seed % candidateNames.length];
  const second = candidateNames[(seed + 5) % candidateNames.length];
  return [first, second].map((name, idx) => ({
    id: `${group.id}-founder-${idx + 1}`,
    name,
    role: "member",
    status: "active",
    reputation: 58 + Math.round(deterministicFloat(`${group.id}-${name}`) * 20),
  }));
}

function getGroupConfig(groupId) {
  return state.groupConfigs[groupId] || null;
}

function activeMembersForGroup(groupId) {
  const config = getGroupConfig(groupId);
  if (!config) return [];
  return config.members.filter((member) => member.status === "active");
}

function currentUserIsActiveMember(groupId) {
  const profileName = state.profile?.displayName;
  if (!profileName) return false;
  return activeMembersForGroup(groupId).some((member) => member.name === profileName);
}

function averageMemberVis(groupId) {
  const members = activeMembersForGroup(groupId);
  if (members.length === 0) return 0;
  return Math.round(members.reduce((sum, member) => sum + member.reputation, 0) / members.length);
}

function resolveMemberName(groupId, memberId) {
  const config = getGroupConfig(groupId);
  const member = config?.members?.find((item) => item.id === memberId);
  return member?.name || "Unknown";
}

function buildInitialSocialLinks(groupId, members) {
  const active = members.filter((member) => member.status === "active");
  if (active.length <= 1) return [];
  const owner = active.find((member) => member.role === "owner") || active[0];
  const links = [];
  active.forEach((member, idx) => {
    if (member.id === owner.id) return;
    links.push({
      id: `${groupId}-link-owner-${idx}`,
      source: owner.id,
      target: member.id,
      strength: 54 + Math.round(deterministicFloat(`${groupId}-${owner.id}-${member.id}`) * 20),
      lastInteractionAt: new Date().toISOString(),
    });
  });
  if (active.length >= 3) {
    links.push({
      id: `${groupId}-link-peer`,
      source: active[1].id,
      target: active[2].id,
      strength: 49 + Math.round(deterministicFloat(`${groupId}-${active[1].id}-${active[2].id}`) * 18),
      lastInteractionAt: new Date().toISOString(),
    });
  }
  return links;
}

function ensureSocialLinksForMembers(groupId) {
  const config = getGroupConfig(groupId);
  if (!config) return;
  const active = activeMembersForGroup(groupId);
  const activeIds = new Set(active.map((member) => member.id));
  config.socialLinks = config.socialLinks.filter(
    (link) => activeIds.has(link.source) && activeIds.has(link.target)
  );
  if (active.length <= 1) return;
  const owner = active.find((member) => member.role === "owner") || active[0];
  active.forEach((member) => {
    if (member.id === owner.id) return;
    const exists = config.socialLinks.some(
      (link) =>
        (link.source === owner.id && link.target === member.id) ||
        (link.source === member.id && link.target === owner.id)
    );
    if (!exists) {
      config.socialLinks.push({
        id: `${groupId}-link-${owner.id}-${member.id}`,
        source: owner.id,
        target: member.id,
        strength: 52 + Math.round(deterministicFloat(`${groupId}-${owner.id}-${member.id}`) * 18),
        lastInteractionAt: new Date().toISOString(),
      });
    }
  });
}

function adjustMemberVis(groupId, memberName, delta) {
  const config = getGroupConfig(groupId);
  if (!config) return;
  const member = config.members.find((item) => item.name === memberName && item.status === "active");
  if (!member) return;
  member.reputation = Math.round(clamp(member.reputation + delta, 20, 99));
}

function reinforceSocialLink(groupId, memberAName, memberBName, delta = 2) {
  if (!memberAName || !memberBName || memberAName === memberBName) return;
  const config = getGroupConfig(groupId);
  if (!config) return;
  const memberA = config.members.find((item) => item.name === memberAName && item.status === "active");
  const memberB = config.members.find((item) => item.name === memberBName && item.status === "active");
  if (!memberA || !memberB) return;

  let link = config.socialLinks.find(
    (item) =>
      (item.source === memberA.id && item.target === memberB.id) ||
      (item.source === memberB.id && item.target === memberA.id)
  );
  if (!link) {
    link = {
      id: `${groupId}-link-${memberA.id}-${memberB.id}`,
      source: memberA.id,
      target: memberB.id,
      strength: 50,
      lastInteractionAt: new Date().toISOString(),
    };
    config.socialLinks.push(link);
  }
  link.strength = round2(clamp(link.strength + delta, 30, 99));
  link.lastInteractionAt = new Date().toISOString();
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
  resetCardVisualState();

  if (!card) {
    els.matchCard.innerHTML = `
      <p class="empty-card">No more candidates in this batch.</p>
      <p class="empty-card">Switch to My Positions to manage open tickets.</p>
    `;
    els.passButton.disabled = true;
    els.pairButton.disabled = true;
    return;
  }

  els.passButton.disabled = false;
  els.pairButton.disabled = false;

  els.matchCard.innerHTML = `
    <span class="swipe-indicator left">PASS</span>
    <span class="swipe-indicator right">PAIR</span>
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
      persistMatches();
      addPositionFromMatch(card, match);
      renderMatches();
      renderPositions();
      toast(`Mutual pair with ${card.candidate.name}! Position added to My Positions.`);
      renderHappyFlow();
    } else {
      toast(`${card.candidate.name} did not reciprocate this round.`);
    }
  }

  state.index += 1;
  renderKpis();
  renderCard();
  renderHappyFlow();
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

function addPositionFromMatch(card, match) {
  const position = {
    id: `p-${match.id}`,
    marketPrompt: match.prompt,
    counterparty: match.candidateName,
    side: card.userSide,
    candidateSide: card.market.side,
    entryProbability: deriveEntryProbability(card),
    stakeBand: match.stakeBand,
    sharedInterests: match.sharedInterests,
    status: "open",
    createdAt: new Date().toISOString(),
    settledAt: null,
    pnl: null,
  };
  state.positions.unshift(position);
  persistPositions();
}

function renderPositions() {
  const openPositions = state.positions.filter((position) => position.status === "open").length;
  const settledPositions = state.positions.length - openPositions;
  els.positionsSummary.textContent =
    state.positions.length === 0
      ? "No open positions yet"
      : `${openPositions} open · ${settledPositions} settled`;

  els.positionsList.innerHTML = "";
  if (state.positions.length === 0) {
    els.positionsList.innerHTML = "<li class='position-item'><small>No positions yet. Pair a match to create one.</small></li>";
    return;
  }

  state.positions.forEach((position) => {
    const li = document.createElement("li");
    li.className = "position-item";
    const badgeClass = `status-${position.status}`;
    const prettyStatus = position.status === "open" ? "Open" : position.status === "won" ? "Won" : "Lost";
    const pnlLabel = position.pnl === null ? "Unrealized" : formatPnl(position.pnl);

    li.innerHTML = `
      <div class="position-head">
        <div>
          <strong>${position.marketPrompt}</strong>
          <small>${state.profile.displayName}: ${position.side} vs ${position.counterparty}: ${position.candidateSide}</small>
        </div>
        <span class="status-badge ${badgeClass}">${prettyStatus}</span>
      </div>
      <div class="position-meta">
        <span>Entry: ${position.entryProbability}%</span>
        <span>Stake: ${position.stakeBand}</span>
        <span>PnL: ${pnlLabel}</span>
        <span>Themes: ${position.sharedInterests.join(", ")}</span>
      </div>
      ${
        position.status === "open"
          ? `<div class="position-actions">
              <button class="tiny" type="button" data-position-id="${position.id}" data-outcome="won">Settle Won</button>
              <button class="tiny ghost" type="button" data-position-id="${position.id}" data-outcome="lost">Settle Lost</button>
            </div>`
          : ""
      }
    `;
    els.positionsList.appendChild(li);
  });
}

function buildTrustedGroups(interests) {
  return interests.map((interest, index) => {
    const id = `g-${slugify(interest)}`;
    const templates = GROUP_MARKET_TEMPLATES[interest] || [
      `Will ${interest} consensus forecasts be revised upward this quarter?`,
      `Will ${interest} generate a major market-moving headline before quarter-end?`,
    ];
    const markets = templates.map((prompt, marketIndex) => ({
      id: `${id}-m${marketIndex + 1}`,
      prompt,
      closeDate: buildCloseDate(index, marketIndex),
    }));
    const communitySize = 120 + Math.round(deterministicFloat(id) * 420);

    return {
      id,
      interest,
      name: `${interest} Intelligence Circle`,
      communitySize,
      markets,
    };
  });
}

function renderTrustedGroups() {
  const groups = state.trustedGroups;
  els.groupsSummary.textContent =
    groups.length === 0 ? "0 active groups" : `${groups.length} groups matched to your interests`;
  els.trustedGroupsGrid.innerHTML = "";

  if (groups.length === 0) {
    els.trustedGroupsGrid.innerHTML =
      "<div class='group-card'><small>Add interests in onboarding to unlock trusted groups.</small></div>";
    return;
  }

  groups.forEach((group) => {
    const config = getGroupConfig(group.id);
    const rep = computeGroupReputation(group.id);
    const openTrades = state.groupTrades.filter(
      (trade) => trade.groupId === group.id && trade.status === "open"
    ).length;
    const activeMembers = activeMembersForGroup(group.id);
    const card = document.createElement("article");
    card.className = `group-card ${state.selectedGroupId === group.id ? "active" : ""}`;
    card.dataset.groupId = group.id;
    card.innerHTML = `
      <div class="group-head">
        <div>
          <strong>${group.name}</strong>
          <small>${group.communitySize} community · ${activeMembers.length} active members · ${group.interest}</small>
        </div>
        <span class="status-badge ${rep.verified ? "status-verified" : "status-building"}">
          ${rep.verified ? "Verified Intel" : "Reputation Building"}
        </span>
      </div>
      <div class="group-meta">
        <span>${config?.inviteOnly ? "Invite-only" : "Open group"}</span>
        <span>Governance: ${config?.governancePolicy || "owner-approved"}</span>
        <span>Circle intelligence score: ${rep.score}</span>
        <span>Average member VIS: ${rep.visAverage}</span>
        <span>Accuracy: ${rep.accuracy}%</span>
        <span>Settled calls: ${rep.settled}</span>
        <span>Open trades: ${openTrades}</span>
        <span>Your rep tier: ${rep.tier}</span>
        <span>${rep.verified ? "Verified intelligence circle" : "Intelligence score building"}</span>
      </div>
    `;
    els.trustedGroupsGrid.appendChild(card);
  });
}

function computeGroupReputation(groupId) {
  const settled = state.groupTrades.filter(
    (trade) => trade.groupId === groupId && trade.status !== "open"
  );
  const wins = settled.filter((trade) => trade.status === "won").length;
  const accuracy = settled.length ? Math.round((wins / settled.length) * 100) : 0;
  const visAverage = averageMemberVis(groupId);

  let tradeScore = 50;
  settled.forEach((trade) => {
    const convictionFactor = 1 + Math.abs(trade.entryProbability - 50) / 40;
    tradeScore += trade.status === "won" ? 6 + convictionFactor * 4 : -(4 + convictionFactor * 4);
  });
  tradeScore = Math.round(clamp(tradeScore, 0, 100));
  const score = Math.round(clamp(tradeScore * 0.65 + visAverage * 0.35, 0, 100));

  const verified = settled.length >= 3 && accuracy >= 60 && score >= 55 && visAverage >= 55;
  let tier = "Unrated";
  if (verified && score >= 75 && accuracy >= 68) {
    tier = "Elite";
  } else if (verified) {
    tier = "Verified";
  } else if (settled.length >= 1) {
    tier = "Building";
  }

  return { score, accuracy, settled: settled.length, verified, tier, visAverage, tradeScore };
}

function onGroupCardClick(event) {
  const card = event.target.closest("[data-group-id]");
  if (!card) return;
  state.selectedGroupId = card.dataset.groupId;
  renderTrustedGroups();
  renderGovernancePanel();
  renderGroupMarketDesk();
  renderForecasts();
  renderGroupTrades();
}

function onGroupMarketChange() {
  renderForecasts();
  renderGroupTrades();
}

function renderGovernancePanel() {
  const group = getSelectedGroup();
  els.pendingInvitesList.innerHTML = "";
  els.groupMembersList.innerHTML = "";
  els.socialGraphList.innerHTML = "";

  if (!group) {
    els.governanceSummary.textContent = "Select a group to manage membership.";
    els.socialGraphSummary.textContent = "No graph data yet.";
    els.sendInviteButton.disabled = true;
    return;
  }

  const config = getGroupConfig(group.id);
  const activeMembers = activeMembersForGroup(group.id);
  els.governanceSummary.textContent = `${config.inviteOnly ? "Invite-only" : "Open"} · ${
    config.governancePolicy
  } · ${activeMembers.length} active members · ${config.pendingInvites.length} pending invites`;
  els.sendInviteButton.disabled = false;

  if (config.pendingInvites.length === 0) {
    els.pendingInvitesList.innerHTML =
      "<li class='position-item'><small>No pending invites. Invite-only governance is active.</small></li>";
  } else {
    config.pendingInvites.forEach((invite) => {
      const li = document.createElement("li");
      li.className = "position-item";
      li.innerHTML = `
        <div class="position-head">
          <div>
            <strong>${invite.name}</strong>
            <small>Invited by ${invite.invitedBy} on ${formatShortDate(invite.createdAt)}</small>
          </div>
        </div>
        <div class="position-actions">
          <button class="tiny" type="button" data-invite-id="${invite.id}" data-invite-action="approve">Approve Invite</button>
          <button class="tiny ghost" type="button" data-invite-id="${invite.id}" data-invite-action="reject">Reject Invite</button>
        </div>
      `;
      els.pendingInvitesList.appendChild(li);
    });
  }

  activeMembers.forEach((member) => {
    const li = document.createElement("li");
    li.className = "position-item";
    li.innerHTML = `
      <div class="position-head">
        <div>
          <strong>${member.name}</strong>
          <small class="member-role">${member.role} · VIS ${member.reputation}</small>
        </div>
      </div>
    `;
    els.groupMembersList.appendChild(li);
  });

  renderSocialGraph(group.id);
}

function renderSocialGraph(groupId) {
  const config = getGroupConfig(groupId);
  if (!config) {
    els.socialGraphSummary.textContent = "No graph data yet.";
    return;
  }
  ensureSocialLinksForMembers(groupId);
  const activeMembers = activeMembersForGroup(groupId);
  const links = (config.socialLinks || []).slice().sort((a, b) => b.strength - a.strength);
  const visAvg = averageMemberVis(groupId);
  els.socialGraphSummary.textContent = `${activeMembers.length} members · ${links.length} trust links · average VIS ${visAvg}`;

  if (links.length === 0) {
    els.socialGraphList.innerHTML = "<li class='position-item'><small>Invite and approve members to build social graph links.</small></li>";
    return;
  }

  links.slice(0, 8).forEach((link) => {
    const source = resolveMemberName(groupId, link.source);
    const target = resolveMemberName(groupId, link.target);
    const li = document.createElement("li");
    li.className = "position-item";
    li.innerHTML = `
      <div class="position-head">
        <strong>${source} ↔ ${target}</strong>
        <span class="status-badge status-building">Trust ${Math.round(link.strength)}</span>
      </div>
      <div class="position-meta">
        <span>Last interaction: ${formatShortDate(link.lastInteractionAt)}</span>
      </div>
    `;
    els.socialGraphList.appendChild(li);
  });
}

function sendGroupInvite() {
  const group = getSelectedGroup();
  if (!group) return;
  if (!currentUserIsActiveMember(group.id)) {
    toast("Only active members can send invites in this group.");
    return;
  }

  const candidateName = els.inviteMemberInput.value.trim();
  if (candidateName.length < 2) {
    toast("Enter a valid member name to send an invite.");
    return;
  }

  const config = getGroupConfig(group.id);
  const normalized = candidateName.toLowerCase();
  const alreadyMember = config.members.some((member) => member.name.toLowerCase() === normalized);
  const alreadyPending = config.pendingInvites.some((invite) => invite.name.toLowerCase() === normalized);
  if (alreadyMember || alreadyPending) {
    toast("This member is already active or has a pending invite.");
    return;
  }

  config.pendingInvites.unshift({
    id: `inv-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    name: candidateName,
    invitedBy: state.profile.displayName,
    createdAt: new Date().toISOString(),
  });

  els.inviteMemberInput.value = "";
  persistGroupConfigs();
  renderGovernancePanel();
  toast(`Invite sent to ${candidateName}. Awaiting governance decision.`);
}

function onPendingInviteActionClick(event) {
  const button = event.target.closest("button[data-invite-id][data-invite-action]");
  if (!button) return;
  resolveInviteAction(button.dataset.inviteId, button.dataset.inviteAction);
}

function resolveInviteAction(inviteId, action) {
  const group = getSelectedGroup();
  if (!group) return;
  const config = getGroupConfig(group.id);
  const inviteIndex = config.pendingInvites.findIndex((invite) => invite.id === inviteId);
  if (inviteIndex === -1) return;

  const invite = config.pendingInvites[inviteIndex];
  config.pendingInvites.splice(inviteIndex, 1);
  if (action === "approve") {
    config.members.push({
      id: `member-${group.id}-${slugify(invite.name)}`,
      name: invite.name,
      role: "member",
      status: "active",
      reputation: 54 + Math.round(deterministicFloat(`${group.id}-${invite.name}`) * 24),
    });
    reinforceSocialLink(group.id, state.profile.displayName, invite.name, 2.5);
    toast(`${invite.name} approved. Membership updated by governance.`);
  } else {
    toast(`${invite.name} invite rejected by governance.`);
  }

  refreshTrustedGroupsFromConfigs();
  persistGroupConfigs();
  renderTrustedGroups();
  renderGovernancePanel();
  renderGroupMarketDesk();
  renderForecasts();
  renderGroupTrades();
  renderCreatorGroupOptions();
  renderExchangeMarkets();
  renderExchangeSelectedMarket();
  renderHappyFlow();
}

function renderGroupMarketDesk() {
  const group = getSelectedGroup();
  els.groupMarketSelect.innerHTML = "";

  if (!group) {
    els.groupDeskLabel.textContent = "Select a group";
    els.groupReputationSummary.textContent = "No reputation data yet";
    els.createMarketButton.disabled = true;
    els.tradeYesButton.disabled = true;
    els.tradeNoButton.disabled = true;
    els.submitForecastButton.disabled = true;
    els.simulatePeersButton.disabled = true;
    return;
  }

  const canOperate = currentUserIsActiveMember(group.id);
  const rep = computeGroupReputation(group.id);
  els.groupDeskLabel.textContent = `${group.name} · ${group.interest}`;
  els.groupReputationSummary.textContent = `Circle score ${rep.score}/100 · VIS avg ${rep.visAverage} · Accuracy ${rep.accuracy}% · Tier ${rep.tier} · ${
    group.inviteOnly ? "Invite-only group" : "Open group"
  }`;
  group.markets.forEach((market) => {
    const option = document.createElement("option");
    option.value = market.id;
    option.textContent = `${market.prompt} (close ${market.closeDate})`;
    els.groupMarketSelect.appendChild(option);
  });

  if (!els.createMarketCloseDate.value) {
    const defaultDate = new Date();
    defaultDate.setDate(defaultDate.getDate() + 21);
    els.createMarketCloseDate.value = defaultDate.toISOString().slice(0, 10);
  }

  els.createMarketButton.disabled = !canOperate;
  els.tradeYesButton.disabled = !canOperate;
  els.tradeNoButton.disabled = !canOperate;
  els.submitForecastButton.disabled = !canOperate;
  els.simulatePeersButton.disabled = !canOperate;
}

function createGroupMarket() {
  const group = getSelectedGroup();
  if (!group) return;
  if (!currentUserIsActiveMember(group.id)) {
    toast("Only approved group members can create markets.");
    return;
  }

  const question = els.createMarketQuestion.value.trim();
  const closeDate = els.createMarketCloseDate.value;
  if (question.length < 12) {
    toast("Market question should be at least 12 characters.");
    return;
  }
  if (!closeDate) {
    toast("Please select a market close date.");
    return;
  }

  const config = getGroupConfig(group.id);
  const newMarket = {
    id: `${group.id}-custom-${Date.now()}`,
    prompt: question,
    closeDate,
    createdBy: state.profile.displayName,
    isCustom: true,
  };
  config.customMarkets.unshift(newMarket);
  state.polyMarkets.unshift({
    id: newMarket.id,
    question: newMarket.prompt,
    category: group.interest,
    closeDate: newMarket.closeDate,
    yesPrice: 0.5,
    volume: 0,
    liquidity: 16000,
    resolutionSource: "Trusted group governance outcome",
    status: "open",
    createdBy: state.profile.displayName,
    visibility: "group",
    groupId: group.id,
    tape: [],
  });

  els.createMarketQuestion.value = "";
  refreshTrustedGroupsFromConfigs();
  persistGroupConfigs();
  persistPolyMarkets();
  renderTrustedGroups();
  renderGroupMarketDesk();
  renderExchangeMarkets();
  renderExchangeSelectedMarket();
  els.groupMarketSelect.value = newMarket.id;
  renderForecasts();
  renderGroupTrades();
  renderHappyFlow();
  toast("Market created and published to this trusted group.");
}

function submitForecast() {
  const group = getSelectedGroup();
  if (!group) return;
  if (!currentUserIsActiveMember(group.id)) {
    toast("Only approved members can submit forecasts in invite-only groups.");
    return;
  }

  const marketId = els.groupMarketSelect.value;
  if (!marketId) {
    toast("Select a market before submitting a forecast.");
    return;
  }

  const probability = Number(els.forecastProbabilityInput.value);
  const rationale = els.forecastRationaleInput.value.trim();
  const forecast = {
    id: `fc-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    marketId,
    author: state.profile.displayName,
    probability,
    rationale: rationale || "No rationale provided.",
    source: "member",
    createdAt: new Date().toISOString(),
  };
  upsertMarketForecast(group.id, forecast);
  adjustMemberVis(group.id, state.profile.displayName, 0.8);
  activeMembersForGroup(group.id)
    .filter((member) => member.name !== state.profile.displayName)
    .slice(0, 2)
    .forEach((peer) => reinforceSocialLink(group.id, state.profile.displayName, peer.name, 0.9));
  persistGroupConfigs();
  renderForecasts();
  renderGovernancePanel();
  renderTrustedGroups();
  renderGroupMarketDesk();
  renderHappyFlow();
  toast("Forecast submitted to collaborative desk.");
}

function simulatePeerForecasts() {
  const group = getSelectedGroup();
  if (!group) return;
  const marketId = els.groupMarketSelect.value;
  if (!marketId) {
    toast("Select a market before simulating peer forecasts.");
    return;
  }

  const peers = activeMembersForGroup(group.id).filter((member) => member.name !== state.profile.displayName);
  if (peers.length === 0) {
    toast("No peer members available yet. Invite and approve members first.");
    return;
  }

  const anchor = Number(els.forecastProbabilityInput.value);
  const count = Math.min(3, peers.length);
  for (let i = 0; i < count; i += 1) {
    const peer = peers[i];
    const noise = Math.round((deterministicFloat(`${marketId}-${peer.name}-${Date.now()}`) - 0.5) * 24);
    const probability = clamp(anchor + noise, 1, 99);
    upsertMarketForecast(group.id, {
      id: `fc-peer-${marketId}-${peer.id}`,
      marketId,
      author: peer.name,
      probability,
      rationale: `Signal blend from ${peer.name}'s intelligence workflow.`,
      source: "peer",
      createdAt: new Date().toISOString(),
    });
    reinforceSocialLink(group.id, state.profile.displayName, peer.name, 0.8);
  }

  adjustMemberVis(group.id, state.profile.displayName, 0.6);
  persistGroupConfigs();
  renderForecasts();
  renderGovernancePanel();
  renderTrustedGroups();
  renderGroupMarketDesk();
  renderHappyFlow();
  toast("Peer forecasts added for collaborative consensus.");
}

function upsertMarketForecast(groupId, forecast) {
  const config = getGroupConfig(groupId);
  if (!config.forecastsByMarket[forecast.marketId]) config.forecastsByMarket[forecast.marketId] = [];

  const list = config.forecastsByMarket[forecast.marketId];
  const existingIndex = list.findIndex((item) => item.author === forecast.author);
  if (existingIndex >= 0) {
    list[existingIndex] = forecast;
  } else {
    list.unshift(forecast);
  }
}

function getForecastsForMarket(groupId, marketId) {
  const config = getGroupConfig(groupId);
  return config?.forecastsByMarket?.[marketId] || [];
}

function computeConsensus(groupId, forecasts) {
  const activeMembers = activeMembersForGroup(groupId);
  const memberByName = new Map(activeMembers.map((member) => [member.name, member]));

  if (forecasts.length === 0) {
    return { probability: null, spread: null, participants: 0 };
  }

  let weightedTotal = 0;
  let weightSum = 0;
  forecasts.forEach((forecast) => {
    const member = memberByName.get(forecast.author);
    const rep = member ? member.reputation : 55;
    const weight = clamp(0.7 + rep / 100, 0.7, 1.8);
    weightedTotal += forecast.probability * weight;
    weightSum += weight;
  });

  const probs = forecasts.map((f) => f.probability);
  const spread = Math.max(...probs) - Math.min(...probs);
  return {
    probability: Math.round(weightedTotal / Math.max(weightSum, 1)),
    spread,
    participants: forecasts.length,
  };
}

function renderForecasts() {
  const group = getSelectedGroup();
  els.forecastList.innerHTML = "";

  if (!group) {
    els.forecastConsensusSummary.textContent = "No forecasts yet for this market.";
    return;
  }
  const marketId = els.groupMarketSelect.value || group.markets[0]?.id;
  if (!marketId) {
    els.forecastConsensusSummary.textContent = "No market selected.";
    return;
  }

  const forecasts = getForecastsForMarket(group.id, marketId);
  const consensus = computeConsensus(group.id, forecasts);
  if (consensus.probability === null) {
    els.forecastConsensusSummary.textContent = "No forecasts yet for this market.";
  } else {
    els.forecastConsensusSummary.textContent = `Consensus ${consensus.probability}% · Spread ${consensus.spread} pts · ${consensus.participants} contributors`;
  }

  if (forecasts.length === 0) {
    els.forecastList.innerHTML =
      "<li class='position-item'><small>Submit the first forecast or simulate peers to start collaboration.</small></li>";
    return;
  }

  forecasts
    .slice()
    .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
    .forEach((forecast) => {
      const li = document.createElement("li");
      li.className = "position-item";
      li.innerHTML = `
        <div class="position-head">
          <div>
            <strong>${forecast.author}</strong>
            <small>${forecast.probability}% probability · ${forecast.source}</small>
          </div>
          <span class="status-badge status-building">${formatShortDate(forecast.createdAt)}</span>
        </div>
        <div class="position-meta">
          <span>${forecast.rationale}</span>
        </div>
      `;
      els.forecastList.appendChild(li);
    });
}

function placeGroupTrade(side) {
  const group = getSelectedGroup();
  if (!group) return;
  if (group.inviteOnly && !currentUserIsActiveMember(group.id)) {
    toast("This invite-only group requires active membership to trade.");
    return;
  }
  const market = group.markets.find((item) => item.id === els.groupMarketSelect.value) || group.markets[0];
  if (!market) return;

  const stake = Number(els.groupStakeInput.value);
  if (!Number.isFinite(stake) || stake < 10) {
    toast("Stake must be at least $10.");
    return;
  }
  if (stake > state.account.cash) {
    toast("Insufficient trading cash for this stake. Lower stake or settle open trades.");
    return;
  }

  const conviction = Number(els.groupConfidenceInput.value);
  const trade = {
    id: `gt-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    groupId: group.id,
    groupName: group.name,
    trader: state.profile.displayName,
    marketId: market.id,
    prompt: market.prompt,
    side,
    stake: round2(stake),
    entryProbability: conviction,
    status: "open",
    actualOutcome: null,
    createdAt: new Date().toISOString(),
    settledAt: null,
    pnl: null,
  };

  state.account.cash = round2(state.account.cash - trade.stake);
  state.account.tradesPlaced += 1;
  state.groupTrades.unshift(trade);
  persistGroupTrades();
  persistAccount();
  renderGroupTrades();
  renderTrustedGroups();
  renderGroupMarketDesk();
  renderAccount();
  renderHappyFlow();
  toast(`${side} trade placed in ${group.interest} group.`);
}

function renderGroupTrades() {
  const group = getSelectedGroup();
  els.groupTradesList.innerHTML = "";
  if (!group) {
    els.groupTradesList.innerHTML = "<li class='position-item'><small>Select a trusted group to begin trading.</small></li>";
    return;
  }

  const trades = state.groupTrades.filter((trade) => trade.groupId === group.id);
  if (trades.length === 0) {
    els.groupTradesList.innerHTML =
      "<li class='position-item'><small>No trades yet in this group. Place your first market call.</small></li>";
    return;
  }

  trades.forEach((trade) => {
    const prettyStatus =
      trade.status === "open" ? "Open" : trade.status === "won" ? "Won" : "Lost";
    const badgeClass = `status-${trade.status}`;
    const pnlText = trade.pnl === null ? "Unrealized" : formatPnl(trade.pnl);
    const li = document.createElement("li");
    li.className = "position-item";
    li.innerHTML = `
      <div class="position-head">
        <div>
          <strong>${trade.prompt}</strong>
          <small>${trade.side} · stake $${trade.stake.toFixed(2)} · conviction ${trade.entryProbability}%</small>
        </div>
        <span class="status-badge ${badgeClass}">${prettyStatus}</span>
      </div>
      <div class="position-meta">
        <span>PnL: ${pnlText}</span>
        <span>Opened: ${formatShortDate(trade.createdAt)}</span>
        <span>Outcome: ${trade.actualOutcome || "Pending"}</span>
        <span>Group: ${group.interest}</span>
      </div>
      ${
        trade.status === "open"
          ? `<div class="position-actions">
              <button class="tiny" type="button" data-group-trade-id="${trade.id}" data-market-outcome="YES">Resolve Outcome: YES</button>
              <button class="tiny ghost" type="button" data-group-trade-id="${trade.id}" data-market-outcome="NO">Resolve Outcome: NO</button>
            </div>`
          : ""
      }
    `;
    els.groupTradesList.appendChild(li);
  });
}

function seedPolyMarketsIfNeeded() {
  if (state.polyMarkets.length === 0) {
    state.polyMarkets = buildDefaultPolyMarkets();
  } else {
    state.polyMarkets = state.polyMarkets.map((market) => normalizePolyMarket(market));
  }
  if (!state.selectedExchangeMarketId || !getAccessiblePolyMarkets().some((m) => m.id === state.selectedExchangeMarketId)) {
    state.selectedExchangeMarketId = getAccessiblePolyMarkets()[0]?.id || null;
  }
  persistPolyMarkets();
}

function normalizePolyMarket(market) {
  return {
    id: market.id,
    question: market.question,
    category: market.category || "General",
    closeDate: market.closeDate || buildCloseDate(0, 0),
    yesPrice: clamp(Number(market.yesPrice) || 0.5, 0.05, 0.95),
    volume: Number(market.volume) || 0,
    liquidity: Number(market.liquidity) || 10000,
    resolutionSource: market.resolutionSource || "Community resolution",
    status: market.status || "open",
    createdBy: market.createdBy || "Unknown",
    visibility: market.visibility || "public",
    groupId: market.groupId || null,
    tape: Array.isArray(market.tape) ? market.tape : [],
  };
}

function getAccessiblePolyMarkets() {
  return state.polyMarkets.filter((market) => {
    if (market.visibility !== "group") return true;
    if (!market.groupId) return true;
    return currentUserIsActiveMember(market.groupId);
  });
}

function renderExchangeMarkets() {
  const query = els.exchangeMarketSearch.value.trim().toLowerCase();
  const markets = getAccessiblePolyMarkets().filter((market) => {
    if (!query) return true;
    return market.question.toLowerCase().includes(query) || market.category.toLowerCase().includes(query);
  });

  if (!markets.some((market) => market.id === state.selectedExchangeMarketId)) {
    state.selectedExchangeMarketId = markets[0]?.id || null;
  }

  els.exchangeMarketList.innerHTML = "";
  if (markets.length === 0) {
    els.exchangeMarketList.innerHTML =
      "<div class='exchange-market-item'><small>No markets match this filter or access policy.</small></div>";
    renderExchangeSelectedMarket();
    return;
  }

  markets.forEach((market) => {
    const item = document.createElement("article");
    item.className = `exchange-market-item ${market.id === state.selectedExchangeMarketId ? "active" : ""}`;
    item.dataset.exchangeMarketId = market.id;
    item.innerHTML = `
      <div class="group-head">
        <div>
          <strong>${market.question}</strong>
          <small>${market.category} · closes ${market.closeDate}</small>
        </div>
        <span class="status-badge status-building">${market.visibility === "group" ? "Invite-only" : "Public"}</span>
      </div>
      <div class="group-meta">
        <span>YES: ${(market.yesPrice * 100).toFixed(1)}%</span>
        <span>NO: ${((1 - market.yesPrice) * 100).toFixed(1)}%</span>
        <span>Volume: $${Math.round(market.volume).toLocaleString()}</span>
        <span>Liquidity: $${Math.round(market.liquidity).toLocaleString()}</span>
      </div>
    `;
    els.exchangeMarketList.appendChild(item);
  });

  renderExchangeSelectedMarket();
}

function onExchangeMarketClick(event) {
  const card = event.target.closest("[data-exchange-market-id]");
  if (!card) return;
  state.selectedExchangeMarketId = card.dataset.exchangeMarketId;
  renderExchangeMarkets();
}

function getSelectedExchangeMarket() {
  return getAccessiblePolyMarkets().find((market) => market.id === state.selectedExchangeMarketId) || null;
}

function renderExchangeSelectedMarket() {
  const market = getSelectedExchangeMarket();
  els.exchangeOrderBook.innerHTML = "";
  els.exchangeTapeList.innerHTML = "";

  if (!market) {
    els.exchangeSelectedTitle.textContent = "Select a market";
    els.exchangeSelectedMeta.textContent = "-";
    els.exchangeYesPrice.textContent = "-";
    els.exchangeNoPrice.textContent = "-";
    els.exchangePositionSummary.textContent = "No exchange positions yet.";
    els.executeExchangeTradeButton.disabled = true;
    return;
  }

  els.exchangeSelectedTitle.textContent = market.question;
  const visibilityLabel = market.visibility === "group" ? "Invite-only trusted group" : "Public";
  els.exchangeSelectedMeta.textContent = `${market.category} · ${visibilityLabel} · resolves via ${market.resolutionSource}`;
  els.exchangeYesPrice.textContent = `${(market.yesPrice * 100).toFixed(1)}%`;
  els.exchangeNoPrice.textContent = `${((1 - market.yesPrice) * 100).toFixed(1)}%`;

  buildExchangeOrderBook(market).forEach((row) => {
    const li = document.createElement("li");
    li.className = "position-item";
    li.innerHTML = `
      <div class="position-head">
        <strong>${row.label}</strong>
        <span class="status-badge status-building">${(row.price * 100).toFixed(1)}%</span>
      </div>
      <div class="position-meta">
        <span>Depth: ${row.depth.toLocaleString()} shares</span>
      </div>
    `;
    els.exchangeOrderBook.appendChild(li);
  });

  syncExchangeTradePrice();
  els.executeExchangeTradeButton.disabled = false;
  renderExchangePositionSummary(market.id);
  renderExchangeTape(market);
}

function buildExchangeOrderBook(market) {
  const spread = clamp(0.02 + 12000 / Math.max(market.liquidity, 12000) * 0.02, 0.02, 0.06);
  const yesBid = clamp(market.yesPrice - spread / 2, 0.01, 0.99);
  const yesAsk = clamp(market.yesPrice + spread / 2, 0.01, 0.99);
  const noMid = 1 - market.yesPrice;
  const noBid = clamp(noMid - spread / 2, 0.01, 0.99);
  const noAsk = clamp(noMid + spread / 2, 0.01, 0.99);
  const depthBase = Math.max(500, Math.round(market.liquidity / 60));
  return [
    { label: "YES Bid", price: yesBid, depth: depthBase + 140 },
    { label: "YES Ask", price: yesAsk, depth: depthBase + 90 },
    { label: "NO Bid", price: noBid, depth: depthBase + 120 },
    { label: "NO Ask", price: noAsk, depth: depthBase + 80 },
  ];
}

function syncExchangeTradePrice() {
  const market = getSelectedExchangeMarket();
  if (!market) return;
  const side = els.exchangeTradeSide.value;
  const outcome = els.exchangeTradeOutcome.value;
  const book = buildExchangeOrderBook(market);
  const yesBid = book[0].price;
  const yesAsk = book[1].price;
  const noBid = book[2].price;
  const noAsk = book[3].price;

  let price = market.yesPrice;
  if (outcome === "YES") {
    price = side === "BUY" ? yesAsk : yesBid;
  } else {
    price = side === "BUY" ? noAsk : noBid;
  }
  els.exchangeTradePrice.value = price.toFixed(2);
}

function executeExchangeTrade() {
  const market = getSelectedExchangeMarket();
  if (!market) return;
  const side = els.exchangeTradeSide.value;
  const outcome = els.exchangeTradeOutcome.value;
  const shares = Number(els.exchangeTradeShares.value);
  const price = Number(els.exchangeTradePrice.value);
  if (!Number.isFinite(shares) || shares <= 0) {
    toast("Shares must be a positive number.");
    return;
  }
  if (!Number.isFinite(price) || price <= 0 || price >= 1) {
    toast("Price must be between 0.01 and 0.99.");
    return;
  }

  const notional = round2(shares * price);
  const position = getPolyPosition(market.id, outcome);
  if (side === "BUY") {
    if (notional > state.account.cash) {
      toast("Insufficient cash for this exchange order.");
      return;
    }
    state.account.cash = round2(state.account.cash - notional);
    upsertPolyPosition(market.id, outcome, shares, price);
  } else {
    if (!position || position.shares < shares) {
      toast("Not enough shares to sell this outcome.");
      return;
    }
    const proceeds = notional;
    const realized = round2((price - position.avgPrice) * shares);
    state.account.cash = round2(state.account.cash + proceeds);
    state.account.realizedPnl = round2(state.account.realizedPnl + realized);
    state.account.tradesSettled += 1;
    position.shares = round2(position.shares - shares);
    if (position.shares <= 0) {
      state.polyPositions = state.polyPositions.filter(
        (item) => !(item.marketId === market.id && item.outcome === outcome)
      );
    }
  }

  state.account.tradesPlaced += 1;
  applyExchangePriceImpact(market, side, outcome, shares);
  market.volume = round2(market.volume + notional);
  market.tape.unshift({
    id: `tx-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    side,
    outcome,
    shares: round2(shares),
    price: round2(price),
    timestamp: new Date().toISOString(),
    trader: state.profile.displayName,
  });
  market.tape = market.tape.slice(0, 20);

  persistAccount();
  persistPolyMarkets();
  persistPolyPositions();
  renderExchangeMarkets();
  renderExchangeSelectedMarket();
  renderAccount();
  renderHappyFlow();
  toast(`${side} ${shares} ${outcome} shares at ${(price * 100).toFixed(1)}%.`);
}

function applyExchangePriceImpact(market, side, outcome, shares) {
  const directionBase = outcome === "YES" ? 1 : -1;
  const direction = side === "BUY" ? directionBase : -directionBase;
  const impact = clamp((shares / Math.max(market.liquidity, 5000)) * 2.2, 0.001, 0.06);
  market.yesPrice = clamp(round2(market.yesPrice + direction * impact), 0.05, 0.95);
}

function getPolyPosition(marketId, outcome) {
  return state.polyPositions.find((position) => position.marketId === marketId && position.outcome === outcome) || null;
}

function upsertPolyPosition(marketId, outcome, shares, price) {
  const existing = getPolyPosition(marketId, outcome);
  if (!existing) {
    state.polyPositions.push({
      id: `pos-${marketId}-${outcome}`,
      marketId,
      outcome,
      shares: round2(shares),
      avgPrice: round2(price),
    });
    return;
  }
  const totalShares = existing.shares + shares;
  existing.avgPrice = round2((existing.avgPrice * existing.shares + price * shares) / Math.max(totalShares, 1));
  existing.shares = round2(totalShares);
}

function renderExchangePositionSummary(marketId) {
  const market = state.polyMarkets.find((item) => item.id === marketId);
  const positions = state.polyPositions.filter((position) => position.marketId === marketId);
  if (!market || positions.length === 0) {
    els.exchangePositionSummary.textContent = "No exchange positions in this market.";
    return;
  }

  let totalValue = 0;
  let totalCost = 0;
  positions.forEach((position) => {
    const mark = position.outcome === "YES" ? market.yesPrice : 1 - market.yesPrice;
    totalValue += position.shares * mark;
    totalCost += position.shares * position.avgPrice;
  });
  const unrealized = round2(totalValue - totalCost);
  els.exchangePositionSummary.textContent = `${positions
    .map((p) => `${p.outcome} ${p.shares} @ ${(p.avgPrice * 100).toFixed(1)}%`)
    .join(" · ")} · Unrealized ${formatPnl(unrealized)}`;
}

function renderExchangeTape(market) {
  if (!market.tape || market.tape.length === 0) {
    els.exchangeTapeList.innerHTML = "<li class='position-item'><small>No fills yet in this market.</small></li>";
    return;
  }
  market.tape.slice(0, 8).forEach((fill) => {
    const li = document.createElement("li");
    li.className = "position-item";
    li.innerHTML = `
      <div class="position-head">
        <strong>${fill.side} ${fill.outcome}</strong>
        <span class="status-badge status-building">${(fill.price * 100).toFixed(1)}%</span>
      </div>
      <div class="position-meta">
        <span>${fill.shares} shares · ${fill.trader}</span>
        <span>${formatShortDate(fill.timestamp)}</span>
      </div>
    `;
    els.exchangeTapeList.appendChild(li);
  });
}

function renderCreatorCategoryOptions() {
  if (els.creatorCategorySelect.options.length > 0) return;
  INTEREST_GROUPS.forEach((category) => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    els.creatorCategorySelect.appendChild(option);
  });
}

function renderCreatorGroupOptions() {
  const isGroupVisibility = els.creatorVisibilitySelect.value === "group";
  els.creatorGroupSelect.disabled = !isGroupVisibility;
  els.creatorGroupSelect.innerHTML = "";

  if (state.trustedGroups.length === 0) {
    const option = document.createElement("option");
    option.value = "";
    option.textContent = "No trusted groups available";
    els.creatorGroupSelect.appendChild(option);
    return;
  }

  state.trustedGroups.forEach((group) => {
    const option = document.createElement("option");
    option.value = group.id;
    option.textContent = `${group.name} (${group.interest})`;
    els.creatorGroupSelect.appendChild(option);
  });
}

function submitCreatorMarket() {
  const question = els.creatorQuestionInput.value.trim();
  const category = els.creatorCategorySelect.value;
  const closeDate = els.creatorCloseDateInput.value;
  const resolutionSource = els.creatorResolutionSourceInput.value.trim();
  const visibility = els.creatorVisibilitySelect.value;
  const groupId = visibility === "group" ? els.creatorGroupSelect.value : null;
  const initialYesPrice = Number(els.creatorInitialYesPrice.value) / 100;
  const initialLiquidity = Number(els.creatorInitialLiquidity.value);

  if (question.length < 16) {
    toast("UGC market question should be at least 16 characters.");
    return;
  }
  if (!closeDate) {
    toast("Choose a close date for UGC market.");
    return;
  }
  if (!resolutionSource) {
    toast("Provide a resolution source for market integrity.");
    return;
  }
  if (visibility === "group" && !groupId) {
    toast("Select a target trusted group for invite-only market.");
    return;
  }
  if (visibility === "group" && !currentUserIsActiveMember(groupId)) {
    toast("You must be an active member of the target group to publish invite-only UGC markets.");
    return;
  }
  if (!Number.isFinite(initialLiquidity) || initialLiquidity < 1000) {
    toast("Initial liquidity must be at least $1000.");
    return;
  }

  const queueItem = {
    id: `ugc-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    question,
    category,
    closeDate,
    resolutionSource,
    visibility,
    groupId,
    initialYesPrice: clamp(initialYesPrice, 0.05, 0.95),
    initialLiquidity,
    status: "pending",
    submittedAt: new Date().toISOString(),
    submittedBy: state.profile.displayName,
    reviewedAt: null,
  };
  state.creatorQueue.unshift(queueItem);
  persistCreatorQueue();
  renderCreatorTerminal();
  renderHappyFlow();
  toast("UGC market submitted to creator moderation queue.");
}

function renderCreatorTerminal() {
  if (!els.creatorCloseDateInput.value) {
    const close = new Date();
    close.setDate(close.getDate() + 30);
    els.creatorCloseDateInput.value = close.toISOString().slice(0, 10);
  }

  renderCreatorGroupOptions();
  els.creatorQueueList.innerHTML = "";
  els.creatorPublishedList.innerHTML = "";

  const pending = state.creatorQueue.filter((item) => item.status === "pending");
  if (pending.length === 0) {
    els.creatorQueueList.innerHTML = "<li class='position-item'><small>No pending UGC markets in queue.</small></li>";
  } else {
    pending.forEach((item) => {
      const li = document.createElement("li");
      li.className = "position-item";
      li.innerHTML = `
        <div class="position-head">
          <div>
            <strong>${item.question}</strong>
            <small>${item.category} · ${item.visibility === "group" ? "Invite-only" : "Public"} · closes ${
              item.closeDate
            }</small>
          </div>
          <span class="status-badge status-building">Pending</span>
        </div>
        <div class="position-meta">
          <span>Submitted by ${item.submittedBy}</span>
          <span>Liquidity $${Math.round(item.initialLiquidity).toLocaleString()}</span>
        </div>
        <div class="position-actions">
          <button class="tiny" type="button" data-queue-id="${item.id}" data-queue-action="publish">Approve & Publish</button>
          <button class="tiny ghost" type="button" data-queue-id="${item.id}" data-queue-action="reject">Reject</button>
        </div>
      `;
      els.creatorQueueList.appendChild(li);
    });
  }

  const published = state.creatorQueue.filter((item) => item.status === "published");
  if (published.length === 0) {
    els.creatorPublishedList.innerHTML =
      "<li class='position-item'><small>No published UGC markets yet.</small></li>";
  } else {
    published.forEach((item) => {
      const li = document.createElement("li");
      li.className = "position-item";
      li.innerHTML = `
        <div class="position-head">
          <strong>${item.question}</strong>
          <span class="status-badge status-verified">Published</span>
        </div>
        <div class="position-meta">
          <span>${item.category} · ${item.visibility === "group" ? "Invite-only" : "Public"}</span>
          <span>Published ${formatShortDate(item.reviewedAt || item.submittedAt)}</span>
        </div>
      `;
      els.creatorPublishedList.appendChild(li);
    });
  }
}

function onCreatorQueueActionClick(event) {
  const button = event.target.closest("button[data-queue-id][data-queue-action]");
  if (!button) return;
  resolveCreatorQueueItem(button.dataset.queueId, button.dataset.queueAction);
}

function resolveCreatorQueueItem(queueId, action) {
  const item = state.creatorQueue.find((entry) => entry.id === queueId);
  if (!item || item.status !== "pending") return;
  item.status = action === "publish" ? "published" : "rejected";
  item.reviewedAt = new Date().toISOString();

  if (item.status === "published") {
    const publishedMarket = {
      id: `pm-ugc-${item.id}`,
      question: item.question,
      category: item.category,
      closeDate: item.closeDate,
      yesPrice: item.initialYesPrice,
      volume: 0,
      liquidity: item.initialLiquidity,
      resolutionSource: item.resolutionSource,
      status: "open",
      createdBy: item.submittedBy,
      visibility: item.visibility,
      groupId: item.visibility === "group" ? item.groupId : null,
      tape: [],
    };
    state.polyMarkets.unshift(publishedMarket);

    if (publishedMarket.groupId) {
      const config = getGroupConfig(publishedMarket.groupId);
      if (config) {
        const exists = config.customMarkets.some((market) => market.id === publishedMarket.id);
        if (!exists) {
          config.customMarkets.unshift({
            id: publishedMarket.id,
            prompt: publishedMarket.question,
            closeDate: publishedMarket.closeDate,
            createdBy: publishedMarket.createdBy,
            isCustom: true,
          });
        }
      }
    }
    refreshTrustedGroupsFromConfigs();
    persistGroupConfigs();
    persistPolyMarkets();
    renderTrustedGroups();
    renderGovernancePanel();
    renderGroupMarketDesk();
    renderForecasts();
    renderGroupTrades();
    renderExchangeMarkets();
    renderExchangeSelectedMarket();
    toast("UGC market approved and listed on prediction exchange.");
  } else {
    toast("UGC market rejected by moderation policy.");
  }

  persistCreatorQueue();
  renderCreatorTerminal();
  renderHappyFlow();
}

function onGroupTradeActionClick(event) {
  const button = event.target.closest("button[data-group-trade-id][data-market-outcome]");
  if (!button) return;
  settleGroupTrade(button.dataset.groupTradeId, button.dataset.marketOutcome);
}

function settleGroupTrade(tradeId, marketOutcome) {
  const trade = state.groupTrades.find((item) => item.id === tradeId);
  if (!trade || trade.status !== "open") return;

  trade.actualOutcome = marketOutcome;
  trade.status = trade.side === marketOutcome ? "won" : "lost";
  trade.settledAt = new Date().toISOString();
  trade.pnl = calculateGroupTradePnl(trade);
  if (trade.status === "won") {
    state.account.cash = round2(state.account.cash + trade.stake + trade.pnl);
  }
  state.account.realizedPnl = round2(state.account.realizedPnl + trade.pnl);
  state.account.tradesSettled += 1;

  // Member VIS (Verified Intelligence Score) updates from realized prediction outcomes.
  const visDelta = trade.status === "won" ? 3 + (trade.entryProbability - 50) / 20 : -(2 + (trade.entryProbability - 50) / 25);
  adjustMemberVis(trade.groupId, trade.trader || state.profile.displayName, visDelta);
  activeMembersForGroup(trade.groupId)
    .filter((member) => member.name !== (trade.trader || state.profile.displayName))
    .slice(0, 2)
    .forEach((peer) => reinforceSocialLink(trade.groupId, trade.trader || state.profile.displayName, peer.name, 1.5));

  persistGroupTrades();
  persistGroupConfigs();
  persistAccount();
  renderGroupTrades();
  renderTrustedGroups();
  renderGovernancePanel();
  renderGroupMarketDesk();
  renderAccount();
  renderHappyFlow();

  const rep = computeGroupReputation(trade.groupId);
  toast(
    `Trade settled ${trade.status.toUpperCase()} (${formatPnl(trade.pnl)}). Group intelligence score: ${rep.score}.`
  );
}

function calculateGroupTradePnl(trade) {
  if (trade.status === "won") {
    const rewardMultiplier = 0.25 + (100 - trade.entryProbability) / 100;
    return round2(trade.stake * rewardMultiplier);
  }
  return round2(-trade.stake);
}

function getSelectedGroup() {
  return state.trustedGroups.find((group) => group.id === state.selectedGroupId) || null;
}

function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function buildCloseDate(groupIndex, marketIndex) {
  const base = new Date();
  const days = 18 + groupIndex * 4 + marketIndex * 11;
  base.setDate(base.getDate() + days);
  return base.toISOString().slice(0, 10);
}

function onPositionActionClick(event) {
  const button = event.target.closest("button[data-position-id][data-outcome]");
  if (!button) return;
  settlePosition(button.dataset.positionId, button.dataset.outcome);
}

function settlePosition(positionId, outcome) {
  const position = state.positions.find((item) => item.id === positionId);
  if (!position || position.status !== "open") return;

  position.status = outcome === "won" ? "won" : "lost";
  position.settledAt = new Date().toISOString();
  position.pnl = calculatePositionPnl(position, position.status);
  persistPositions();
  renderPositions();
  toast(`Position settled as ${position.status.toUpperCase()} (${formatPnl(position.pnl)}).`);
  renderHappyFlow();
}

function calculatePositionPnl(position, status) {
  const stake = midpointStake(position.stakeBand);
  const entry = position.entryProbability / 100;
  if (status === "won") return round2(stake * (1 - entry));
  return round2(-stake * entry);
}

function midpointStake(stakeBand) {
  const numbers = stakeBand.match(/\d+/g) || [];
  if (numbers.length === 0) return 100;
  if (numbers.length === 1) return Number(numbers[0]);
  return (Number(numbers[0]) + Number(numbers[1])) / 2;
}

function round2(value) {
  return Math.round(value * 100) / 100;
}

function formatPnl(value) {
  const sign = value > 0 ? "+" : "";
  return `${sign}$${Math.abs(value).toFixed(2)}`;
}

function formatShortDate(isoString) {
  const date = new Date(isoString);
  if (Number.isNaN(date.getTime())) return "-";
  return date.toISOString().slice(0, 10);
}

function deriveEntryProbability(card) {
  const value = card.userSide === card.market.side ? card.market.confidence : 100 - card.market.confidence;
  return Math.max(5, Math.min(95, value));
}

function renderKpis() {
  const actions = state.matches.length + state.passes;
  const hitRate = actions ? Math.round((state.matches.length / actions) * 100) : 0;
  els.kpiPairs.textContent = String(state.matches.length);
  els.kpiPasses.textContent = String(state.passes);
  els.kpiHitRate.textContent = `${hitRate}%`;
}

function calculateOpenExposure() {
  const groupExposure = state.groupTrades
    .filter((trade) => trade.status === "open")
    .reduce((sum, trade) => sum + trade.stake, 0);
  const exchangeExposure = state.polyPositions.reduce(
    (sum, position) => sum + position.shares * position.avgPrice,
    0
  );
  return round2(groupExposure + exchangeExposure);
}

function renderAccount() {
  const exposure = calculateOpenExposure();
  els.accountCash.textContent = `$${state.account.cash.toFixed(2)}`;
  els.accountOpenExposure.textContent = `$${exposure.toFixed(2)}`;
  els.accountRealizedPnl.textContent = formatPnl(state.account.realizedPnl);
}

function renderHappyFlow() {
  const customMarketsCount = Object.values(state.groupConfigs).reduce(
    (sum, config) => sum + (config.customMarkets?.length || 0),
    0
  );
  const collaborativeForecastCount = Object.values(state.groupConfigs).reduce(
    (sum, config) =>
      sum +
      Object.values(config.forecastsByMarket || {}).reduce(
        (inner, list) => inner + (Array.isArray(list) ? list.length : 0),
        0
      ),
    0
  );
  const approvedInvitesCount = Object.values(state.groupConfigs).reduce((sum, config) => {
    const activeMembers = (config.members || []).filter((member) => member.status === "active").length;
    return sum + Math.max(0, activeMembers - 3);
  }, 0);
  const sociallyVerifiedGroups = state.trustedGroups.filter((group) => {
    const rep = computeGroupReputation(group.id);
    return rep.verified && rep.visAverage >= 60;
  }).length;
  const publishedUgcCount = state.creatorQueue.filter((item) => item.status === "published").length;
  const exchangeTradeCount = Math.max(0, state.account.tradesPlaced - state.groupTrades.length);

  const steps = [
    { done: Boolean(state.profile), action: "Complete onboarding profile" },
    { done: state.matches.length > 0, action: "Create your first mutual pair in Match Feed" },
    { done: state.positions.length > 0, action: "Open a position from a successful pair" },
    { done: approvedInvitesCount > 0, action: "Invite and approve one member in Trusted Groups" },
    { done: customMarketsCount > 0, action: "Create one new market in a trusted group" },
    { done: collaborativeForecastCount > 0, action: "Submit a collaborative forecast" },
    { done: publishedUgcCount > 0, action: "Publish one market from Creator Terminal queue" },
    { done: exchangeTradeCount > 0, action: "Execute one trade in Prediction Exchange" },
    { done: state.groupTrades.length > 0, action: "Place first trade in Trusted Groups" },
    {
      done: state.groupTrades.some((trade) => trade.status !== "open"),
      action: "Settle one group trade to verify intelligence reputation",
    },
    {
      done: sociallyVerifiedGroups > 0,
      action: "Reach verified social intelligence score in one trusted circle",
    },
  ];
  const completed = steps.filter((step) => step.done).length;
  const percent = Math.round((completed / steps.length) * 100);
  els.flowCompletionLabel.textContent = `${percent}%`;
  els.flowProgressBar.style.width = `${percent}%`;
  const next = steps.find((step) => !step.done);
  els.flowNextAction.textContent = next ? `Next: ${next.action}` : "Complete: happy trading flow achieved";
}

function suggestStakeBand(riskTolerance, confidence) {
  const baseByRisk = { 1: "$20-$60", 2: "$60-$180", 3: "$180-$500" };
  if (confidence >= 68 && riskTolerance > 1) return "$220-$650";
  return baseByRisk[riskTolerance] ?? "$60-$180";
}

function setActiveTab(tab) {
  if (tab === "positions") {
    state.activeTab = "positions";
  } else if (tab === "groups") {
    state.activeTab = "groups";
  } else if (tab === "exchange") {
    state.activeTab = "exchange";
  } else if (tab === "creator") {
    state.activeTab = "creator";
  } else {
    state.activeTab = "feed";
  }
  els.marketTabs.forEach((button) => {
    button.classList.toggle("active", button.dataset.marketTab === state.activeTab);
  });

  els.feedTabPanel.classList.toggle("hidden", state.activeTab !== "feed");
  els.positionsTabPanel.classList.toggle("hidden", state.activeTab !== "positions");
  els.groupsTabPanel.classList.toggle("hidden", state.activeTab !== "groups");
  els.exchangeTabPanel.classList.toggle("hidden", state.activeTab !== "exchange");
  els.creatorTabPanel.classList.toggle("hidden", state.activeTab !== "creator");
}

function prettyPairingMode(mode) {
  if (mode === "opposite") return "Opposite conviction";
  if (mode === "same") return "Same-side syndicate";
  return "Hybrid";
}

function hydrateFromStorage() {
  const rawProfile = localStorage.getItem(STORAGE_PROFILE_KEY);
  const rawMatches = localStorage.getItem(STORAGE_MATCHES_KEY);
  const rawPositions = localStorage.getItem(STORAGE_POSITIONS_KEY);
  const rawGroupTrades = localStorage.getItem(STORAGE_GROUP_TRADES_KEY);
  const rawGroupConfigs = localStorage.getItem(STORAGE_GROUP_CONFIGS_KEY);
  const rawPolyMarkets = localStorage.getItem(STORAGE_POLY_MARKETS_KEY);
  const rawPolyPositions = localStorage.getItem(STORAGE_POLY_POSITIONS_KEY);
  const rawCreatorQueue = localStorage.getItem(STORAGE_CREATOR_QUEUE_KEY);
  const rawAccount = localStorage.getItem(STORAGE_ACCOUNT_KEY);

  if (rawMatches) {
    try {
      state.matches = JSON.parse(rawMatches);
    } catch {
      state.matches = [];
    }
  }

  if (rawPositions) {
    try {
      state.positions = JSON.parse(rawPositions);
    } catch {
      state.positions = [];
    }
  }

  if (rawGroupTrades) {
    try {
      state.groupTrades = JSON.parse(rawGroupTrades);
    } catch {
      state.groupTrades = [];
    }
  }

  if (rawGroupConfigs) {
    try {
      state.groupConfigs = JSON.parse(rawGroupConfigs);
    } catch {
      state.groupConfigs = {};
    }
  }

  if (rawPolyMarkets) {
    try {
      state.polyMarkets = JSON.parse(rawPolyMarkets);
    } catch {
      state.polyMarkets = [];
    }
  }

  if (rawPolyPositions) {
    try {
      state.polyPositions = JSON.parse(rawPolyPositions);
    } catch {
      state.polyPositions = [];
    }
  }

  if (rawCreatorQueue) {
    try {
      state.creatorQueue = JSON.parse(rawCreatorQueue);
    } catch {
      state.creatorQueue = [];
    }
  }

  if (rawAccount) {
    try {
      state.account = ensureAccountShape(JSON.parse(rawAccount));
    } catch {
      state.account = buildDefaultAccount();
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

function persistMatches() {
  localStorage.setItem(STORAGE_MATCHES_KEY, JSON.stringify(state.matches));
}

function persistPositions() {
  localStorage.setItem(STORAGE_POSITIONS_KEY, JSON.stringify(state.positions));
}

function persistGroupTrades() {
  localStorage.setItem(STORAGE_GROUP_TRADES_KEY, JSON.stringify(state.groupTrades));
}

function persistGroupConfigs() {
  localStorage.setItem(STORAGE_GROUP_CONFIGS_KEY, JSON.stringify(state.groupConfigs));
}

function persistPolyMarkets() {
  localStorage.setItem(STORAGE_POLY_MARKETS_KEY, JSON.stringify(state.polyMarkets));
}

function persistPolyPositions() {
  localStorage.setItem(STORAGE_POLY_POSITIONS_KEY, JSON.stringify(state.polyPositions));
}

function persistCreatorQueue() {
  localStorage.setItem(STORAGE_CREATOR_QUEUE_KEY, JSON.stringify(state.creatorQueue));
}

function persistAccount() {
  localStorage.setItem(STORAGE_ACCOUNT_KEY, JSON.stringify(state.account));
}

function resetAll() {
  localStorage.removeItem(STORAGE_PROFILE_KEY);
  localStorage.removeItem(STORAGE_MATCHES_KEY);
  localStorage.removeItem(STORAGE_POSITIONS_KEY);
  localStorage.removeItem(STORAGE_GROUP_TRADES_KEY);
  localStorage.removeItem(STORAGE_GROUP_CONFIGS_KEY);
  localStorage.removeItem(STORAGE_POLY_MARKETS_KEY);
  localStorage.removeItem(STORAGE_POLY_POSITIONS_KEY);
  localStorage.removeItem(STORAGE_CREATOR_QUEUE_KEY);
  localStorage.removeItem(STORAGE_ACCOUNT_KEY);
  window.location.reload();
}

function initSwipeGestures() {
  const card = els.matchCard;
  card.addEventListener("pointerdown", onSwipePointerDown);
  card.addEventListener("pointermove", onSwipePointerMove);
  card.addEventListener("pointerup", onSwipePointerUp);
  card.addEventListener("pointercancel", onSwipePointerUp);
}

function onSwipePointerDown(event) {
  if (state.activeTab !== "feed") return;
  if (els.marketSection.classList.contains("hidden")) return;
  if (!state.deck[state.index]) return;
  if (event.pointerType === "mouse" && event.button !== 0) return;

  state.drag.active = true;
  state.drag.pointerId = event.pointerId;
  state.drag.startX = event.clientX;
  state.drag.deltaX = 0;
  els.matchCard.classList.add("dragging");
  els.matchCard.setPointerCapture(event.pointerId);
}

function onSwipePointerMove(event) {
  if (!state.drag.active || event.pointerId !== state.drag.pointerId) return;
  state.drag.deltaX = event.clientX - state.drag.startX;
  applyCardDrag(state.drag.deltaX);
}

function onSwipePointerUp(event) {
  if (!state.drag.active || event.pointerId !== state.drag.pointerId) return;

  const deltaX = state.drag.deltaX;
  const threshold = Math.min(120, els.matchCard.clientWidth * 0.28);
  state.drag.active = false;
  state.drag.pointerId = null;
  state.drag.deltaX = 0;
  els.matchCard.classList.remove("dragging");
  if (els.matchCard.hasPointerCapture(event.pointerId)) {
    els.matchCard.releasePointerCapture(event.pointerId);
  }

  if (Math.abs(deltaX) >= threshold) {
    const action = deltaX > 0 ? "pair" : "pass";
    animateCardOut(action, () => {
      handleSwipe(action);
      resetCardVisualState();
    });
    return;
  }

  resetCardVisualState();
}

function applyCardDrag(deltaX) {
  const rotation = clamp(deltaX / 20, -16, 16);
  els.matchCard.style.transform = `translateX(${deltaX}px) rotate(${rotation}deg)`;
  const strength = Math.min(Math.abs(deltaX) / 120, 1);
  const leftIndicator = els.matchCard.querySelector(".swipe-indicator.left");
  const rightIndicator = els.matchCard.querySelector(".swipe-indicator.right");
  if (leftIndicator) leftIndicator.style.opacity = deltaX < 0 ? String(strength) : "0";
  if (rightIndicator) rightIndicator.style.opacity = deltaX > 0 ? String(strength) : "0";
}

function animateCardOut(action, onComplete) {
  const direction = action === "pair" ? 1 : -1;
  const moveX = direction * Math.max(window.innerWidth * 0.7, 360);
  els.matchCard.style.transition = "transform 190ms ease, opacity 190ms ease";
  els.matchCard.style.transform = `translateX(${moveX}px) rotate(${direction * 16}deg)`;
  els.matchCard.style.opacity = "0.12";
  setTimeout(() => {
    els.matchCard.style.opacity = "1";
    onComplete();
  }, 195);
}

function resetCardVisualState() {
  els.matchCard.style.transition = "";
  els.matchCard.style.transform = "";
  els.matchCard.style.opacity = "";
  const indicators = els.matchCard.querySelectorAll(".swipe-indicator");
  indicators.forEach((indicator) => {
    indicator.style.opacity = "0";
  });
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
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
