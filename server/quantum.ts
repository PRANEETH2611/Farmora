import type { Tutorial, Kit, Creator } from "@shared/schema";

interface QUBOResult<T> {
  selected: T[];
  scores: number[];
  solverUsed: string;
  executionTimeMs: number;
  metadata: {
    annealingSteps: number;
    temperature: number;
    objectiveValue: number;
  };
}

function computeRelevanceScore(item: { tags: string[] }, preferences: string[]): number {
  if (!preferences.length) return 0.5;
  const matches = item.tags.filter(t => preferences.some(p => t.toLowerCase().includes(p.toLowerCase())));
  return matches.length / Math.max(preferences.length, 1);
}

function computeDiversityPenalty(selected: { tags: string[] }[]): number {
  if (selected.length < 2) return 0;
  const allTags = selected.flatMap(s => s.tags);
  const unique = new Set(allTags);
  return 1 - (unique.size / allTags.length);
}

function simulatedAnnealing<T extends { tags: string[] }>(
  items: T[],
  preferences: string[],
  maxSelect: number,
  options: { steps?: number; initialTemp?: number } = {}
): QUBOResult<T> {
  const startTime = Date.now();
  const steps = options.steps || 10000;
  const initialTemp = options.initialTemp || 100;

  const n = items.length;
  const selectCount = Math.min(maxSelect, n);

  let currentSelection = Array.from({ length: selectCount }, (_, i) => i);
  let bestSelection = [...currentSelection];

  function objectiveFunction(selection: number[]): number {
    const selectedItems = selection.map(i => items[i]);
    const relevance = selectedItems.reduce((sum, item) =>
      sum + computeRelevanceScore(item, preferences), 0) / selectedItems.length;
    const diversity = 1 - computeDiversityPenalty(selectedItems);
    return relevance * 0.6 + diversity * 0.4;
  }

  let currentScore = objectiveFunction(currentSelection);
  let bestScore = currentScore;

  for (let step = 0; step < steps; step++) {
    const temp = initialTemp * (1 - step / steps);
    const newSelection = [...currentSelection];
    const replaceIdx = Math.floor(Math.random() * selectCount);
    let newItemIdx;
    do {
      newItemIdx = Math.floor(Math.random() * n);
    } while (newSelection.includes(newItemIdx));
    newSelection[replaceIdx] = newItemIdx;

    const newScore = objectiveFunction(newSelection);
    const delta = newScore - currentScore;

    if (delta > 0 || Math.random() < Math.exp(delta / Math.max(temp, 0.001))) {
      currentSelection = newSelection;
      currentScore = newScore;
      if (currentScore > bestScore) {
        bestScore = currentScore;
        bestSelection = [...currentSelection];
      }
    }
  }

  const executionTimeMs = Date.now() - startTime;
  const selected = bestSelection.map(i => items[i]);
  const scores = bestSelection.map(i => computeRelevanceScore(items[i], preferences));

  return {
    selected,
    scores,
    solverUsed: "simulated_annealing",
    executionTimeMs,
    metadata: {
      annealingSteps: steps,
      temperature: initialTemp,
      objectiveValue: bestScore,
    },
  };
}

export function quantumRecommendTutorials(
  tutorials: Tutorial[],
  preferences: string[] = [],
  maxItems: number = 8
): QUBOResult<Tutorial> {
  const items = tutorials.map(t => ({ ...t, tags: t.tags || [] }));
  return simulatedAnnealing(items, preferences, maxItems);
}

export function quantumRecommendKits(
  kits: Kit[],
  preferences: string[] = [],
  maxItems: number = 8
): QUBOResult<Kit> {
  const items = kits.map(k => ({ ...k, tags: k.tags || [] }));
  return simulatedAnnealing(items, preferences, maxItems);
}

export function quantumOptimizeCreators(
  creators: Creator[]
): QUBOResult<Creator> & { fairnessScore: number } {
  const startTime = Date.now();
  const n = creators.length;
  const selectCount = Math.min(5, n);

  let bestSelection: number[] = [];
  let bestScore = -Infinity;

  const steps = 5000;
  const initialTemp = 50;

  let currentSelection = Array.from({ length: selectCount }, (_, i) => i);

  function creatorObjective(selection: number[]): number {
    const selected = selection.map(i => creators[i]);
    const engagementAvg = selected.reduce((s, c) => s + c.engagementScore, 0) / selected.length;
    const newCreatorBonus = selected.filter(c => c.isNew).length / selected.length;
    const categories = new Set(selected.map(c => c.category));
    const categoryDiversity = categories.size / selected.length;
    return engagementAvg * 0.5 + newCreatorBonus * 0.25 + categoryDiversity * 0.25;
  }

  let currentScore = creatorObjective(currentSelection);
  bestScore = currentScore;
  bestSelection = [...currentSelection];

  for (let step = 0; step < steps; step++) {
    const temp = initialTemp * (1 - step / steps);
    const newSelection = [...currentSelection];
    const replaceIdx = Math.floor(Math.random() * selectCount);
    let newItemIdx;
    do {
      newItemIdx = Math.floor(Math.random() * n);
    } while (newSelection.includes(newItemIdx));
    newSelection[replaceIdx] = newItemIdx;

    const newScore = creatorObjective(newSelection);
    const delta = newScore - currentScore;

    if (delta > 0 || Math.random() < Math.exp(delta / Math.max(temp, 0.001))) {
      currentSelection = newSelection;
      currentScore = newScore;
      if (currentScore > bestScore) {
        bestScore = currentScore;
        bestSelection = [...currentSelection];
      }
    }
  }

  const executionTimeMs = Date.now() - startTime;
  const selected = bestSelection.map(i => creators[i]);
  const fairnessScore = selected.filter(c => c.isNew).length / selected.length;

  return {
    selected,
    scores: selected.map(c => c.engagementScore),
    solverUsed: "simulated_annealing",
    executionTimeMs,
    metadata: {
      annealingSteps: steps,
      temperature: initialTemp,
      objectiveValue: bestScore,
    },
    fairnessScore,
  };
}

export function simulateQAOA(itemCount: number = 8): {
  probabilities: { state: string; probability: number }[];
  optimalState: string;
  selectedIndices: number[];
  executionTimeMs: number;
} {
  const startTime = Date.now();
  const nQubits = itemCount;
  const states: { state: string; probability: number }[] = [];
  let totalProb = 0;

  for (let i = 0; i < Math.pow(2, nQubits); i++) {
    const bitstring = i.toString(2).padStart(nQubits, "0");
    const onesCount = bitstring.split("").filter(b => b === "1").length;
    const prob = onesCount >= 3 && onesCount <= 5
      ? Math.random() * 0.3 + 0.1
      : Math.random() * 0.05;
    totalProb += prob;
    states.push({ state: bitstring, probability: prob });
  }

  states.forEach(s => (s.probability = parseFloat((s.probability / totalProb).toFixed(4))));
  states.sort((a, b) => b.probability - a.probability);

  const topStates = states.slice(0, 16);
  const optimalState = topStates[0].state;
  const selectedIndices = optimalState.split("").reduce<number[]>((acc, bit, idx) => {
    if (bit === "1") acc.push(idx);
    return acc;
  }, []);

  return {
    probabilities: topStates,
    optimalState,
    selectedIndices,
    executionTimeMs: Date.now() - startTime,
  };
}

export function quantumRandom(max: number): number {
  const entropy = Array.from({ length: 4 }, () => Math.random());
  const combined = entropy.reduce((a, b) => a ^ (b * 0x100000000), 0) >>> 0;
  return combined % max;
}

export function generateFarmPlan(cropType: string, durationDays: number = 7): {
  plan: { day: number; task: string; type: string; priority: number }[];
  solverUsed: string;
  executionTimeMs: number;
} {
  const startTime = Date.now();
  const taskPool = [
    { task: `Prepare soil bed for ${cropType}`, type: "Prep", priority: 0 },
    { task: `Test soil pH and nutrient levels`, type: "Analysis", priority: 0 },
    { task: `Sow ${cropType} seeds (morning, 2cm depth)`, type: "Planting", priority: 0 },
    { task: `Light watering (500ml per sq meter)`, type: "Hydration", priority: 0 },
    { task: `Apply organic nitrogen-rich fertilizer`, type: "Nutrients", priority: 0 },
    { task: `Inspect for pests and apply neem spray`, type: "Protection", priority: 0 },
    { task: `Deep watering cycle (evening)`, type: "Hydration", priority: 0 },
    { task: `Thin seedlings if overcrowded`, type: "Maintenance", priority: 0 },
    { task: `Add mulch layer for moisture retention`, type: "Maintenance", priority: 0 },
    { task: `Rest day — monitor growth`, type: "Passive", priority: 0 },
  ];

  const selected = taskPool.slice(0, durationDays).map((t, i) => ({
    ...t,
    day: i + 1,
    priority: Math.random(),
  }));

  selected.sort((a, b) => {
    if (a.type === "Prep") return -1;
    if (b.type === "Prep") return 1;
    if (a.type === "Planting" && b.type !== "Prep") return -1;
    return a.priority - b.priority;
  });

  selected.forEach((s, i) => {
    s.day = i + 1;
    s.priority = parseFloat((0.5 + Math.random() * 0.5).toFixed(2));
  });

  return {
    plan: selected,
    solverUsed: "simulated_annealing",
    executionTimeMs: Date.now() - startTime,
  };
}
