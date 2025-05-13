import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  userAnswersSchema, 
  insertUserSchema, 
  insertProductSchema, 
  insertInvestmentSchema 
} from "@shared/schema";
import { 
  calculateRiskProfile, 
  determineInvestmentHorizon,
  identifyMainObjective,
  evaluateESGSensitivity,
  calculateCompatibilityScore
} from "../client/src/utils/profileUtils";
import { generateRecommendations } from "../client/src/utils/recommendationEngine";

export async function registerRoutes(app: Express): Promise<Server> {
  // API route for submitting questionnaire answers
  app.post("/api/questionnaire", async (req, res) => {
    try {
      const validatedData = userAnswersSchema.parse(req.body);
      
      // Create or update user profile
      const userId = req.session?.userId || "anonymous"; // In a real app, use authenticated user ID
      
      // Calculate profile attributes
      const riskProfile = calculateRiskProfile(validatedData);
      const investmentHorizon = determineInvestmentHorizon(validatedData);
      const mainObjective = identifyMainObjective(validatedData);
      const esgSensitivity = evaluateESGSensitivity(validatedData);
      const compatibilityScore = calculateCompatibilityScore(validatedData);
      
      // Store the profile in the database
      const profile = await storage.createOrUpdateUserProfile({
        userId,
        riskProfile,
        investmentHorizon,
        mainObjective,
        esgSensitivity,
        compatibilityScore,
        answers: validatedData
      });
      
      // Store user ID in session (simplified authentication)
      if (req.session) {
        req.session.userId = userId;
      }
      
      res.status(200).json({ success: true, profileId: profile.id });
    } catch (error: any) {
      res.status(400).json({ error: error.message || "Invalid questionnaire data" });
    }
  });
  
  // API route for getting recommendations based on profile
  app.get("/api/profile/recommendations", async (req, res) => {
    try {
      const userId = req.session?.userId || "anonymous";
      
      // Get user profile
      const profile = await storage.getUserProfile(userId);
      
      if (!profile) {
        return res.status(404).json({ error: "Profile not found" });
      }
      
      // Generate recommendations based on profile
      const recommendations = generateRecommendations(profile);
      
      res.status(200).json({ profile, recommendations });
    } catch (error: any) {
      res.status(500).json({ error: error.message || "Failed to retrieve recommendations" });
    }
  });
  
  // API route for creating an investment
  app.post("/api/investments", async (req, res) => {
    try {
      const userId = req.session?.userId || "anonymous";
      
      // Validate investment data
      const validatedData = insertInvestmentSchema.parse({
        ...req.body,
        userId
      });
      
      // Create investment
      const investment = await storage.createInvestment(validatedData);
      
      res.status(201).json({ success: true, investment });
    } catch (error: any) {
      res.status(400).json({ error: error.message || "Invalid investment data" });
    }
  });
  
  // API route for getting portfolio summary
  app.get("/api/portfolio", async (req, res) => {
    try {
      const userId = req.session?.userId || "anonymous";
      
      // Get portfolio data
      const portfolio = await storage.getUserPortfolio(userId);
      
      if (!portfolio) {
        return res.status(404).json({ error: "Portfolio not found" });
      }
      
      res.status(200).json({ portfolio });
    } catch (error: any) {
      res.status(500).json({ error: error.message || "Failed to retrieve portfolio" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
