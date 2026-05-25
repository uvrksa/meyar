// ============================================================
// MEYAAR — AI Service
// AI integration abstraction layer
// Prepared for future LLM/ML integration
// DO NOT connect real AI APIs yet
// ============================================================

import type { UUID, ProjectType } from '../models';

// ── AI Provider Interface ───────────────────────────────────

export interface AIProvider {
  name: string;
  analyze(input: AIAnalysisInput): Promise<AIAnalysisResult>;
  summarize(text: string, options?: SummarizeOptions): Promise<string>;
  estimateCost(input: CostEstimationInput): Promise<CostEstimation>;
}

// ── AI Analysis Types ───────────────────────────────────────

export interface AIAnalysisInput {
  type: 'feasibility' | 'financial' | 'technical' | 'risk' | 'market';
  projectType: ProjectType;
  data: Record<string, unknown>;
  fileIds?: UUID[];
  language: 'ar' | 'en';
}

export interface AIAnalysisResult {
  id: UUID;
  type: string;
  summary: string;
  findings: AIFinding[];
  recommendations: AIRecommendation[];
  confidence: number; // 0-1
  processingTime: number; // ms
  metadata?: Record<string, unknown>;
}

export interface AIFinding {
  category: string;
  title: string;
  description: string;
  severity: 'info' | 'warning' | 'critical';
  evidence?: string;
}

export interface AIRecommendation {
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  impact: string;
  effort: 'low' | 'medium' | 'high';
}

// ── Cost Estimation ─────────────────────────────────────────

export interface CostEstimationInput {
  projectType: ProjectType;
  area?: number;
  floors?: number;
  location?: string;
  investmentAmount?: number;
  specifications?: Record<string, unknown>;
}

export interface CostEstimation {
  estimatedCost: {
    min: number;
    max: number;
    average: number;
    currency: string;
  };
  breakdown: CostBreakdownItem[];
  assumptions: string[];
  confidence: number;
  comparables?: ComparableProject[];
}

export interface CostBreakdownItem {
  category: string;
  description: string;
  amount: number;
  percentage: number;
}

export interface ComparableProject {
  title: string;
  type: ProjectType;
  cost: number;
  area?: number;
  location?: string;
  completedAt: string;
}

// ── Summarize Options ───────────────────────────────────────

export interface SummarizeOptions {
  maxLength?: number;
  style: 'executive' | 'technical' | 'brief';
  language: 'ar' | 'en';
}

// ── File Understanding ──────────────────────────────────────

export interface FileAnalysisResult {
  fileId: UUID;
  fileType: string;
  extractedData: Record<string, unknown>;
  summary: string;
  entities: ExtractedEntity[];
  tables?: ExtractedTable[];
}

export interface ExtractedEntity {
  type: 'number' | 'date' | 'currency' | 'measurement' | 'location' | 'organization';
  value: string;
  context: string;
  confidence: number;
}

export interface ExtractedTable {
  title?: string;
  headers: string[];
  rows: string[][];
}

// ── Mock AI Provider ────────────────────────────────────────

class MockAIProvider implements AIProvider {
  name = 'mock';

  async analyze(input: AIAnalysisInput): Promise<AIAnalysisResult> {
    // Simulate processing time
    await new Promise((resolve) => setTimeout(resolve, 2000));

    return {
      id: crypto.randomUUID() as UUID,
      type: input.type,
      summary: this.getMockSummary(input.type, input.language),
      findings: this.getMockFindings(input.type, input.language),
      recommendations: this.getMockRecommendations(input.language),
      confidence: 0.85,
      processingTime: 2000,
    };
  }

  async summarize(text: string, options?: SummarizeOptions): Promise<string> {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const maxLen = options?.maxLength || 200;
    if (text.length <= maxLen) return text;
    return text.substring(0, maxLen) + '...';
  }

  async estimateCost(input: CostEstimationInput): Promise<CostEstimation> {
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const baseMultiplier = input.area ? input.area * 2500 : 500000;
    const min = baseMultiplier * 0.8;
    const max = baseMultiplier * 1.4;

    return {
      estimatedCost: {
        min: Math.round(min),
        max: Math.round(max),
        average: Math.round((min + max) / 2),
        currency: 'SAR',
      },
      breakdown: [
        { category: 'تكاليف البناء', description: 'المواد والعمالة', amount: Math.round(baseMultiplier * 0.6), percentage: 60 },
        { category: 'التصميم والهندسة', description: 'الرسومات والإشراف', amount: Math.round(baseMultiplier * 0.15), percentage: 15 },
        { category: 'التراخيص والرسوم', description: 'رسوم حكومية', amount: Math.round(baseMultiplier * 0.05), percentage: 5 },
        { category: 'احتياطي', description: 'مصاريف غير متوقعة', amount: Math.round(baseMultiplier * 0.1), percentage: 10 },
        { category: 'أخرى', description: 'تجهيزات ومعدات', amount: Math.round(baseMultiplier * 0.1), percentage: 10 },
      ],
      assumptions: [
        'الأسعار مبنية على متوسط السوق السعودي 2024',
        'لا تشمل تكلفة الأرض',
        'تفترض جودة تشطيبات متوسطة',
      ],
      confidence: 0.72,
    };
  }

  private getMockSummary(type: string, language: string): string {
    const summaries: Record<string, Record<string, string>> = {
      feasibility: {
        ar: 'تشير نتائج التحليل الأولي إلى جدوى المشروع مع وجود فرص نمو واعدة في السوق المستهدف.',
        en: 'Initial analysis indicates project feasibility with promising growth opportunities in the target market.',
      },
      financial: {
        ar: 'التحليل المالي يظهر عائد استثمار إيجابي مع فترة استرداد متوقعة خلال 3-5 سنوات.',
        en: 'Financial analysis shows positive ROI with expected payback period of 3-5 years.',
      },
      technical: {
        ar: 'المتطلبات التقنية قابلة للتنفيذ ضمن المعايير الهندسية المعتمدة.',
        en: 'Technical requirements are feasible within approved engineering standards.',
      },
      risk: {
        ar: 'تم تحديد 3 مخاطر رئيسية تتطلب خطط تخفيف محددة.',
        en: '3 major risks identified requiring specific mitigation plans.',
      },
      market: {
        ar: 'السوق يظهر طلباً متزايداً مع منافسة معتدلة في القطاع المستهدف.',
        en: 'Market shows increasing demand with moderate competition in the target sector.',
      },
    };
    return summaries[type]?.[language] || summaries.feasibility.ar;
  }

  private getMockFindings(type: string, language: string): AIFinding[] {
    if (language === 'ar') {
      return [
        { category: 'السوق', title: 'طلب متزايد', description: 'يشهد السوق نمواً بنسبة 15% سنوياً', severity: 'info' },
        { category: 'المالية', title: 'تكاليف أولية مرتفعة', description: 'التكاليف الأولية أعلى من المتوسط بـ 20%', severity: 'warning' },
        { category: 'التنظيم', title: 'تراخيص مطلوبة', description: 'يتطلب المشروع 3 تراخيص إضافية', severity: 'info' },
      ];
    }
    return [
      { category: 'Market', title: 'Growing demand', description: 'Market growing at 15% annually', severity: 'info' },
      { category: 'Financial', title: 'High initial costs', description: 'Initial costs 20% above average', severity: 'warning' },
      { category: 'Regulatory', title: 'Permits required', description: 'Project requires 3 additional permits', severity: 'info' },
    ];
  }

  private getMockRecommendations(language: string): AIRecommendation[] {
    if (language === 'ar') {
      return [
        { title: 'تقليل التكاليف الأولية', description: 'استخدام مواد بديلة في المرحلة الأولى', priority: 'high', impact: 'توفير 15-20% من التكاليف', effort: 'medium' },
        { title: 'التنفيذ المرحلي', description: 'تقسيم المشروع إلى 3 مراحل', priority: 'medium', impact: 'تقليل المخاطر المالية', effort: 'low' },
      ];
    }
    return [
      { title: 'Reduce initial costs', description: 'Use alternative materials in phase 1', priority: 'high', impact: 'Save 15-20% of costs', effort: 'medium' },
      { title: 'Phased execution', description: 'Split project into 3 phases', priority: 'medium', impact: 'Reduce financial risk', effort: 'low' },
    ];
  }
}

// ── AI Service Class ────────────────────────────────────────

export class AIService {
  private provider: AIProvider;
  private analysisCache: Map<string, AIAnalysisResult> = new Map();

  constructor(provider?: AIProvider) {
    this.provider = provider || new MockAIProvider();
  }

  /**
   * Run analysis on project data
   */
  async analyzeProject(input: AIAnalysisInput): Promise<AIAnalysisResult> {
    const cacheKey = JSON.stringify(input);
    const cached = this.analysisCache.get(cacheKey);
    if (cached) return cached;

    const result = await this.provider.analyze(input);
    this.analysisCache.set(cacheKey, result);
    return result;
  }

  /**
   * Summarize text content
   */
  async summarize(text: string, options?: SummarizeOptions): Promise<string> {
    return this.provider.summarize(text, options);
  }

  /**
   * Estimate project cost
   */
  async estimateCost(input: CostEstimationInput): Promise<CostEstimation> {
    return this.provider.estimateCost(input);
  }

  /**
   * Analyze uploaded file (mock)
   */
  async analyzeFile(fileId: UUID, _mimeType: string): Promise<FileAnalysisResult> {
    await new Promise((resolve) => setTimeout(resolve, 2000));

    return {
      fileId,
      fileType: 'document',
      extractedData: {},
      summary: 'تم استخراج البيانات الأساسية من الملف بنجاح',
      entities: [
        { type: 'currency', value: '500,000 ر.س', context: 'الميزانية المقترحة', confidence: 0.9 },
        { type: 'measurement', value: '1,200 م²', context: 'المساحة الإجمالية', confidence: 0.95 },
      ],
    };
  }

  /**
   * Get engineering recommendations
   */
  async getRecommendations(projectType: ProjectType, context: Record<string, unknown>): Promise<AIRecommendation[]> {
    const result = await this.provider.analyze({
      type: 'technical',
      projectType,
      data: context,
      language: 'ar',
    });
    return result.recommendations;
  }

  /**
   * Clear analysis cache
   */
  clearCache(): void {
    this.analysisCache.clear();
  }

  /**
   * Switch AI provider
   */
  setProvider(provider: AIProvider): void {
    this.provider = provider;
    this.clearCache();
  }
}

// ── Singleton Instance ──────────────────────────────────────

export const aiService = new AIService();
