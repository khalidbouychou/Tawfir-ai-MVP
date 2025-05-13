import { 
  users, 
  type User, 
  type InsertUser, 
  userProfiles,
  type UserProfile,
  type InsertUserProfile,
  investments,
  type Investment,
  type InsertInvestment,
  products,
  type Product,
  type InsertProduct
} from "@shared/schema";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Profile methods
  getUserProfile(userId: string): Promise<UserProfile | undefined>;
  createOrUpdateUserProfile(profile: InsertUserProfile): Promise<UserProfile>;
  
  // Product methods
  getProducts(): Promise<Product[]>;
  getProduct(id: string): Promise<Product | undefined>;
  createProduct(product: InsertProduct): Promise<Product>;
  
  // Investment methods
  createInvestment(investment: InsertInvestment): Promise<Investment>;
  getUserInvestments(userId: string): Promise<Investment[]>;
  
  // Portfolio methods
  getUserPortfolio(userId: string): Promise<any>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private userProfiles: Map<string, UserProfile>;
  private products: Map<string, Product>;
  private investments: Map<string, Investment>;
  
  currentUserId: number;
  
  constructor() {
    this.users = new Map();
    this.userProfiles = new Map();
    this.products = new Map();
    this.investments = new Map();
    this.currentUserId = 1;
    
    // Initialize with sample products
    this.initializeSampleProducts();
  }
  
  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }
  
  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }
  
  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // Profile methods
  async getUserProfile(userId: string): Promise<UserProfile | undefined> {
    return this.userProfiles.get(userId);
  }
  
  async createOrUpdateUserProfile(profile: InsertUserProfile): Promise<UserProfile> {
    const existingProfile = this.userProfiles.get(profile.userId);
    
    const newProfile: UserProfile = {
      id: existingProfile?.id || `profile_${Date.now()}`,
      ...profile
    };
    
    this.userProfiles.set(profile.userId, newProfile);
    return newProfile;
  }
  
  // Product methods
  async getProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }
  
  async getProduct(id: string): Promise<Product | undefined> {
    return this.products.get(id);
  }
  
  async createProduct(product: InsertProduct): Promise<Product> {
    const newProduct: Product = {
      id: `product_${Date.now()}`,
      ...product
    };
    
    this.products.set(newProduct.id, newProduct);
    return newProduct;
  }
  
  // Investment methods
  async createInvestment(investment: InsertInvestment): Promise<Investment> {
    const newInvestment: Investment = {
      id: `investment_${Date.now()}`,
      ...investment,
      date: new Date().toISOString(),
      status: 'completed'
    };
    
    this.investments.set(newInvestment.id, newInvestment);
    return newInvestment;
  }
  
  async getUserInvestments(userId: string): Promise<Investment[]> {
    return Array.from(this.investments.values()).filter(
      (investment) => investment.userId === userId
    );
  }
  
  // Portfolio methods
  async getUserPortfolio(userId: string): Promise<any> {
    // In a real app, this would calculate the actual portfolio based on investments
    // For now, we'll return mock data
    
    const userInvestments = await this.getUserInvestments(userId);
    
    if (userInvestments.length === 0) {
      // Return demo portfolio if no investments exist
      return this.getDemoPortfolio();
    }
    
    // Calculate total investment amount
    const totalAmount = userInvestments.reduce((sum, inv) => sum + inv.amount, 0);
    
    // Get latest investment allocations
    const latestInvestment = userInvestments.sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    )[0];
    
    // Calculate portfolio based on latest investment allocations
    const allocations = latestInvestment.allocations.map(alloc => {
      const product = this.products.get(alloc.productId);
      const randomPerformance = (Math.random() * 10 - 2).toFixed(1); // Random between -2% and +8%
      
      return {
        id: alloc.productId,
        name: product?.name || 'Unknown Product',
        amount: alloc.amount,
        percentage: alloc.percentage,
        performance: parseFloat(randomPerformance)
      };
    });
    
    // Calculate global performance (weighted average)
    const globalPerformance = parseFloat((
      allocations.reduce((sum, alloc) => sum + (alloc.performance * alloc.percentage / 100), 0)
    ).toFixed(1));
    
    // Generate performance data (past 6 months)
    const performanceData = Array.from({ length: 6 }).map((_, i) => {
      const date = new Date();
      date.setMonth(date.getMonth() - 5 + i);
      
      const monthName = date.toLocaleString('default', { month: 'short' });
      const baseValue = totalAmount * (1 + (globalPerformance / 100) * (i / 5));
      const randomVariation = (Math.random() * 0.04 - 0.02) * baseValue; // ±2% random variation
      
      return {
        month: monthName,
        value: Math.round(baseValue + randomVariation)
      };
    });
    
    return {
      totalAmount,
      globalPerformance,
      dailyChange: parseFloat((Math.random() * 1.2 - 0.4).toFixed(1)), // Random between -0.4% and +0.8%
      allocations,
      performanceData
    };
  }
  
  // Helper methods
  private initializeSampleProducts() {
    const sampleProducts: Product[] = [
      {
        id: '1',
        name: 'Livret d\'épargne sécurisé',
        description: 'Faible risque, liquidité élevée',
        riskLevel: 'low',
        expectedReturn: '2-3%',
        minInvestment: 500
      },
      {
        id: '2',
        name: 'Fonds d\'investissement diversifié',
        description: 'Risque modéré, croissance stable',
        riskLevel: 'medium',
        expectedReturn: '4-6%',
        minInvestment: 1000
      },
      {
        id: '3',
        name: 'Plan épargne logement',
        description: 'Spécifique à l\'objectif immobilier',
        riskLevel: 'low',
        expectedReturn: '3-4%',
        minInvestment: 1000
      },
      {
        id: '4',
        name: 'Actions ESG sélectionnées',
        description: 'Risque plus élevé, impact positif',
        riskLevel: 'high',
        expectedReturn: '6-10%',
        minInvestment: 2000
      },
      {
        id: '5',
        name: 'Obligations d\'État',
        description: 'Très faible risque, rendement stable',
        riskLevel: 'very_low',
        expectedReturn: '1-2%',
        minInvestment: 1000
      },
      {
        id: '6',
        name: 'Fonds immobilier OPCI',
        description: 'Exposition au marché immobilier',
        riskLevel: 'medium',
        expectedReturn: '4-7%',
        minInvestment: 3000
      }
    ];
    
    sampleProducts.forEach(product => {
      this.products.set(product.id, product);
    });
  }
  
  private getDemoPortfolio() {
    return {
      totalAmount: 10000,
      globalPerformance: 5.2,
      dailyChange: 0.3,
      allocations: [
        {
          id: '1',
          name: 'Livret d\'épargne sécurisé',
          amount: 4120,
          percentage: 41.2,
          performance: 3.0
        },
        {
          id: '2',
          name: 'Fonds d\'investissement diversifié',
          amount: 3245,
          percentage: 32.4,
          performance: 8.2
        },
        {
          id: '3',
          name: 'Plan épargne logement',
          amount: 1990,
          percentage: 19.9,
          performance: 4.3
        },
        {
          id: '4',
          name: 'Actions ESG sélectionnées',
          amount: 645,
          percentage: 6.5,
          performance: 7.5
        }
      ],
      performanceData: [
        { month: 'Jan', value: 9500 },
        { month: 'Fév', value: 9650 },
        { month: 'Mar', value: 9800 },
        { month: 'Avr', value: 9700 },
        { month: 'Mai', value: 9900 },
        { month: 'Juin', value: 10000 }
      ]
    };
  }
}

export const storage = new MemStorage();
