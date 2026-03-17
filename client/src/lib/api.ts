import { queryOptions } from "@tanstack/react-query";

const API_BASE = "/api";

async function fetchJSON<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || `Request failed: ${res.status}`);
  }
  return res.json();
}

export interface Tutorial {
  id: string;
  title: string;
  thumbnail: string;
  category: string;
  duration: string;
  difficulty: string;
  views: number;
  creator: string;
  tags: string[];
  description: string | null;
  createdAt: string | null;
}

export interface Kit {
  id: string;
  name: string;
  image: string;
  price: number;
  rating: number;
  reviews: number;
  description: string;
  isAffiliate: boolean;
  commission: number;
  tags: string[];
  createdAt: string | null;
}

export interface Creator {
  id: string;
  name: string;
  avatar: string | null;
  engagementScore: number;
  totalViews: number;
  tutorialCount: number;
  category: string;
  isNew: boolean;
  createdAt: string | null;
}

export interface QuantumResult<T> {
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

export interface QAOAResult {
  probabilities: { state: string; probability: number }[];
  optimalState: string;
  selectedIndices: number[];
  executionTimeMs: number;
}

export interface FarmPlan {
  plan: { day: number; task: string; type: string; priority: number }[];
  solverUsed: string;
  executionTimeMs: number;
}

export function tutorialsQuery(category?: string, search?: string) {
  const params = new URLSearchParams();
  if (category && category !== "all") params.set("category", category);
  if (search) params.set("search", search);
  const qs = params.toString();
  return queryOptions({
    queryKey: ["tutorials", category, search],
    queryFn: () => fetchJSON<Tutorial[]>(`${API_BASE}/tutorials${qs ? `?${qs}` : ""}`),
  });
}

export function tutorialQuery(id: string) {
  return queryOptions({
    queryKey: ["tutorial", id],
    queryFn: () => fetchJSON<Tutorial>(`${API_BASE}/tutorials/${id}`),
  });
}

export function kitsQuery(search?: string) {
  const params = new URLSearchParams();
  if (search) params.set("search", search);
  const qs = params.toString();
  return queryOptions({
    queryKey: ["kits", search],
    queryFn: () => fetchJSON<Kit[]>(`${API_BASE}/kits${qs ? `?${qs}` : ""}`),
  });
}

export function creatorsQuery() {
  return queryOptions({
    queryKey: ["creators"],
    queryFn: () => fetchJSON<Creator[]>(`${API_BASE}/creators`),
  });
}

export async function quantumRecommend(type: "tutorials" | "kits", preferences: string[] = [], maxItems = 8) {
  return fetchJSON<QuantumResult<Tutorial | Kit>>(`${API_BASE}/quantum/recommend`, {
    method: "POST",
    body: JSON.stringify({ type, preferences, maxItems }),
  });
}

export async function quantumQAOADemo(itemCount = 8) {
  return fetchJSON<QAOAResult>(`${API_BASE}/quantum/qaoa-demo`, {
    method: "POST",
    body: JSON.stringify({ itemCount }),
  });
}

export async function quantumCreatorOptimize() {
  return fetchJSON<QuantumResult<Creator> & { fairnessScore: number }>(`${API_BASE}/quantum/creator-optimize`, {
    method: "POST",
  });
}

export async function quantumRandomCreator() {
  return fetchJSON<{ creator: Creator | null; method: string }>(`${API_BASE}/quantum/random`);
}

export async function quantumFarmPlan(cropType: string, durationDays = 7) {
  return fetchJSON<FarmPlan>(`${API_BASE}/quantum/farm-plan`, {
    method: "POST",
    body: JSON.stringify({ cropType, durationDays }),
  });
}

export async function createTutorial(data: any) {
  return fetchJSON<Tutorial>(`${API_BASE}/tutorials`, {
    method: "POST",
    body: JSON.stringify(data),
  });
}
