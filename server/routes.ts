import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertTutorialSchema, insertKitSchema, insertCreatorSchema } from "@shared/schema";
import { quantumRecommendTutorials, quantumRecommendKits, quantumOptimizeCreators, simulateQAOA, quantumRandom, generateFarmPlan } from "./quantum";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  // --- TUTORIALS ---
  app.get("/api/tutorials", async (req, res) => {
    const category = req.query.category as string | undefined;
    const search = req.query.search as string | undefined;
    const tutorials = await storage.getTutorials(category, search);
    res.json(tutorials);
  });

  app.get("/api/tutorials/:id", async (req, res) => {
    const tutorial = await storage.getTutorial(req.params.id);
    if (!tutorial) return res.status(404).json({ message: "Tutorial not found" });
    await storage.incrementTutorialViews(req.params.id);
    res.json(tutorial);
  });

  app.post("/api/tutorials", async (req, res) => {
    const parsed = insertTutorialSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ message: "Invalid data", errors: parsed.error.issues });
    const tutorial = await storage.createTutorial(parsed.data);
    res.status(201).json(tutorial);
  });

  // --- KITS ---
  app.get("/api/kits", async (req, res) => {
    const search = req.query.search as string | undefined;
    const kitsData = await storage.getKits(search);
    res.json(kitsData);
  });

  app.get("/api/kits/:id", async (req, res) => {
    const kit = await storage.getKit(req.params.id);
    if (!kit) return res.status(404).json({ message: "Kit not found" });
    res.json(kit);
  });

  app.post("/api/kits", async (req, res) => {
    const parsed = insertKitSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ message: "Invalid data", errors: parsed.error.issues });
    const kit = await storage.createKit(parsed.data);
    res.status(201).json(kit);
  });

  // --- CREATORS ---
  app.get("/api/creators", async (_req, res) => {
    const creators = await storage.getCreators();
    res.json(creators);
  });

  // --- QUANTUM ENDPOINTS ---
  app.post("/api/quantum/recommend", async (req, res) => {
    const { type = "tutorials", preferences = [], maxItems = 8 } = req.body;
    
    if (type === "tutorials") {
      const tutorials = await storage.getTutorials();
      const result = quantumRecommendTutorials(tutorials, preferences, maxItems);
      await storage.logQuantumCall("/quantum/recommend", req.body, { count: result.selected.length }, result.solverUsed, result.executionTimeMs);
      res.json(result);
    } else if (type === "kits") {
      const kitsData = await storage.getKits();
      const result = quantumRecommendKits(kitsData, preferences, maxItems);
      await storage.logQuantumCall("/quantum/recommend", req.body, { count: result.selected.length }, result.solverUsed, result.executionTimeMs);
      res.json(result);
    } else {
      res.status(400).json({ message: "Invalid type. Use 'tutorials' or 'kits'." });
    }
  });

  app.post("/api/quantum/qaoa-demo", async (req, res) => {
    const { itemCount = 8 } = req.body;
    const result = simulateQAOA(Math.min(itemCount, 12));
    await storage.logQuantumCall("/quantum/qaoa-demo", req.body, { optimalState: result.optimalState }, "qaoa_simulator", result.executionTimeMs);
    res.json(result);
  });

  app.post("/api/quantum/creator-optimize", async (_req, res) => {
    const creators = await storage.getCreators();
    if (creators.length === 0) return res.json({ selected: [], scores: [], solverUsed: "none", executionTimeMs: 0, metadata: {}, fairnessScore: 0 });
    const result = quantumOptimizeCreators(creators);
    await storage.logQuantumCall("/quantum/creator-optimize", {}, { count: result.selected.length }, result.solverUsed, result.executionTimeMs);
    res.json(result);
  });

  app.get("/api/quantum/random", async (_req, res) => {
    const creators = await storage.getCreators();
    if (creators.length === 0) return res.json({ creator: null });
    const idx = quantumRandom(creators.length);
    const creator = creators[idx];
    res.json({ creator, method: "quantum_random" });
  });

  app.post("/api/quantum/farm-plan", async (req, res) => {
    const { cropType = "Spinach", durationDays = 7 } = req.body;
    const result = generateFarmPlan(cropType, Math.min(durationDays, 14));
    await storage.logQuantumCall("/quantum/farm-plan", req.body, { planLength: result.plan.length }, result.solverUsed, result.executionTimeMs);
    res.json(result);
  });

  return httpServer;
}
