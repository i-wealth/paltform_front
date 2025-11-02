"use client";

import { useMemo, useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  LineChart,
  Line,
  CartesianGrid,
  Legend,
} from "recharts";

// -----------------------------
// مدل هوش مصنوعی پیشرفته برای پورتفولیو‌سازی ایرانی
// -----------------------------

interface InvestmentAsset {
  name: string;
  category: "سهام" | "اوراق" | "طلا" | "ارز" | "مسکن" | "صندوق" | "ارز دیجیتال" | "سپرده";
  riskLevel: 1 | 2 | 3 | 4 | 5;
  expectedReturn: number;
  liquidity: 1 | 2 | 3 | 4 | 5;
  minInvestment: number;
  description: string;
  suitableFor: ("محافظه‌کار" | "متعادل" | "جسور")[];
  market: "بورس تهران" | "فرابورس" | "طلا" | "ارز" | "مسکن" | "بانک" | "کریپتو";
}

interface PortfolioAllocation {
  asset: InvestmentAsset;
  weight: number;
  expectedContribution: number;
  riskContribution: number;
}

interface AIOptimizedPortfolio {
  riskProfile: "محافظه‌کار" | "متعادل" | "جسور";
  totalExpectedReturn: number;
  totalRiskScore: number;
  sharpeRatio: number;
  diversificationScore: number;
  allocations: PortfolioAllocation[];
  rebalancingSchedule: string;
  marketCondition: "مناسب" | "احتیاط" | "ریسکی";
}

// -----------------------------
// مدل هوش مصنوعی تحلیل رفتار معاملاتی
// -----------------------------

interface TradingBehavior {
  asset: string;
  totalInvestment: number;
  totalProfitLoss: number;
  totalTransactions: number;
  averageHoldingPeriod: number; // روز
  winRate: number;
  riskPerTrade: number;
  emotionalDecisions: number; // 1-10
}

interface UserTradingProfile {
  userId: string;
  declaredRiskProfile: "محافظه‌کار" | "متعادل" | "جسور";
  actualBehavior: "محافظه‌کار" | "متعادل" | "جسور" | "احساسی";
  totalPortfolioValue: number;
  tradingBehaviors: TradingBehavior[];
  consistencyScore: number; // 1-100
  learningAbility: number; // 1-10
}

interface AITradingAdvice {
  type: "ریسک" | "تنوع" | "زمان‌بندی" | "روانشناسی" | "ریبالانس";
  priority: "بالا" | "متوسط" | "پایین";
  title: string;
  description: string;
  specificActions: string[];
  expectedImpact: string;
  urgency: "فوری" | "آینده" | "بلندمدت";
  confidence: number; // 0-100
}

// -----------------------------
// هوش مصنوعی تحلیل‌گر رفتار معاملاتی
// -----------------------------

class IranianTradingBehaviorAI {
  private marketData: any;
  private userProfile: UserTradingProfile;

  constructor(userProfile: UserTradingProfile) {
    this.userProfile = userProfile;
    this.marketData = this.loadIranianMarketData();
  }

  private loadIranianMarketData() {
    return {
      goldVolatility: 0.25,
      cryptoVolatility: 0.65,
      stockVolatility: 0.35,
      bondVolatility: 0.15,
      typicalHoldingPeriods: {
        طلا: 90,
        ارز: 45,
        سهام: 120,
        اوراق: 180,
        "ارز دیجیتال": 30
      },
      riskAdjustments: {
        طلا: 1.2,
        ارز: 1.8,
        سهام: 2.0,
        اوراق: 0.8,
        "ارز دیجیتال": 2.5
      }
    };
  }

  // تحلیل عمیق رفتار معاملاتی
  public analyzeTradingBehavior(): AITradingAdvice[] {
    const advices: AITradingAdvice[] = [];

    // 1. تحلیل تطابق شخصیت اعلامی با رفتار واقعی
    advices.push(...this.analyzeProfileConsistency());

    // 2. تحلیل مدیریت ریسک
    advices.push(...this.analyzeRiskManagement());

    // 3. تحلیل تنوع سبد
    advices.push(...this.analyzeDiversification());

    // 4. تحلیل زمان‌بندی معاملات
    advices.push(...this.analyzeTiming());

    // 5. تحلیل روانشناسی معاملات
    advices.push(...this.analyzePsychology());

    // 6. پیشنهادات ریبالانس
    advices.push(...this.generateRebalancingAdvice());

    return this.prioritizeAdvices(advices);
  }

  private analyzeProfileConsistency(): AITradingAdvice[] {
    const declared = this.userProfile.declaredRiskProfile;
    const actual = this.calculateActualRiskProfile();

    this.userProfile.actualBehavior = actual;
    const consistency = this.calculateConsistencyScore(declared, actual);

    if (consistency < 60) {
      return [{
        type: "ریبالانس",
        priority: "بالا",
        title: "تضاد بین شخصیت اعلامی و رفتار معاملاتی",
        description: `شما خود را ${declared} معرفی کرده‌اید، اما رفتار معاملاتی شما ${actual} است. این تضاد می‌تواند منجر به تصمیمات ناسازگار شود.`,
        specificActions: [
          "بازنگری در اهداف سرمایه‌گذاری",
          "تنظیم سبد متناسب با شخصیت واقعی",
          "مشاوره با متخصص برای همسوسازی"
        ],
        expectedImpact: "کاهش ۴۰٪ تصمیمات احساسی",
        urgency: "فوری",
        confidence: 85
      }];
    }

    return [];
  }

  private calculateActualRiskProfile(): "محافظه‌کار" | "متعادل" | "جسور" | "احساسی" {
    const totalRiskScore = this.userProfile.tradingBehaviors.reduce((score, behavior) => {
      const assetRisk = this.marketData.riskAdjustments[behavior.asset] || 1.0;
      const behaviorRisk = (behavior.riskPerTrade * behavior.totalTransactions) / 10;
      return score + (assetRisk * behaviorRisk);
    }, 0);

    const avgRisk = totalRiskScore / this.userProfile.tradingBehaviors.length;

    // تحلیل احساسی بودن معاملات
    const emotionalScore = this.userProfile.tradingBehaviors.reduce((sum, behavior) => 
      sum + behavior.emotionalDecisions, 0) / this.userProfile.tradingBehaviors.length;

    if (emotionalScore > 7) return "احساسی";
    if (avgRisk < 1.2) return "محافظه‌کار";
    if (avgRisk < 2.0) return "متعادل";
    return "جسور";
  }

  private calculateConsistencyScore(declared: string, actual: string): number {
    const consistencyMatrix: Record<string, Record<string, number>> = {
      "محافظه‌کار": { "محافظه‌کار": 100, "متعادل": 60, "جسور": 20, "احساسی": 10 },
      "متعادل": { "محافظه‌کار": 70, "متعادل": 100, "جسور": 50, "احساسی": 30 },
      "جسور": { "محافظه‌کار": 30, "متعادل": 60, "جسور": 100, "احساسی": 40 }
    };

    return consistencyMatrix[declared]?.[actual] || 50;
  }

  private analyzeRiskManagement(): AITradingAdvice[] {
    const advices: AITradingAdvice[] = [];
    const highRiskBehaviors = this.userProfile.tradingBehaviors.filter(b =>
      b.riskPerTrade > 3 && this.marketData.riskAdjustments[b.asset] > 1.5
    );

    if (highRiskBehaviors.length > 0) {
      advices.push({
        type: "ریسک",
        priority: "بالا",
        title: "تمرکز ریسک در دارایی‌های پرنوسان",
        description: `${highRiskBehaviors.length} دارایی با ریسک بالا شناسایی شد که نیاز به مدیریت فعال دارند.`,
        specificActions: [
          "تعیین حد ضرر برای هر معامله",
          "کاهش حجم معاملات در دارایی‌های پرریسک",
          "استفاده از اوراق برای پوشش ریسک"
        ],
        expectedImpact: "کاهش ۳۵٪ ضررهای سنگین",
        urgency: "فوری",
        confidence: 90
      });
    }

    // تحلیل نسبت سود به زیان
    const totalProfit = this.userProfile.tradingBehaviors.reduce((sum, b) => sum + Math.max(0, b.totalProfitLoss), 0);
    const totalLoss = this.userProfile.tradingBehaviors.reduce((sum, b) => sum + Math.min(0, b.totalProfitLoss), 0);

    if (Math.abs(totalLoss) > totalProfit * 0.7) {
      advices.push({
        type: "ریسک",
        priority: "بالا",
        title: "عدم تعادل در مدیریت سود/ضرر",
        description: "نسبت ضرر به سود شما بالاست. نیاز به بهبود استراتژی خروج دارید.",
        specificActions: [
          "تعیین نقاط خروج قبل از ورود",
          "استفاده از trailing stop loss",
          "محدود کردن ضرر به ۲٪ از کل سرمایه در هر معامله"
        ],
        expectedImpact: "بهبود ۵۰٪ نسبت سود به ضرر",
        urgency: "فوری",
        confidence: 88
      });
    }

    return advices;
  }

  private analyzeDiversification(): AITradingAdvice[] {
    const assetDistribution = this.calculateAssetDistribution();
    const concentrationRisk = this.calculateConcentrationRisk(assetDistribution);

    if (concentrationRisk > 0.6) {
      return [{
        type: "تنوع",
        priority: "متوسط",
        title: "تمرکز بیش از حد در سبد دارایی",
        description: `بیش از ۶۰٪ سرمایه شما در ${this.getTopConcentratedAssets(assetDistribution)} متمرکز شده است.`,
        specificActions: [
          "افزایش سهم اوراق و طلا به ۳۰٪",
          "تنوع‌بخشی بین سهام مختلف",
          "در نظر گرفتن صندوق‌های مختلط"
        ],
        expectedImpact: "کاهش ۲۵٪ نوسانات پرتفولیو",
        urgency: "آینده",
        confidence: 75
      }];
    }

    return [];
  }

  private calculateAssetDistribution(): Record<string, number> {
    const distribution: Record<string, number> = {};
    const totalValue = this.userProfile.totalPortfolioValue;

    this.userProfile.tradingBehaviors.forEach(behavior => {
      distribution[behavior.asset] = (distribution[behavior.asset] || 0) + behavior.totalInvestment;
    });

    // تبدیل به درصد
    Object.keys(distribution).forEach(asset => {
      distribution[asset] = (distribution[asset] / totalValue) * 100;
    });

    return distribution;
  }

  private calculateConcentrationRisk(distribution: Record<string, number>): number {
    const values = Object.values(distribution);
    const topTwo = values.sort((a, b) => b - a).slice(0, 2);
    return topTwo.reduce((sum, val) => sum + val, 0) / 100;
  }

  private getTopConcentratedAssets(distribution: Record<string, number>): string {
    const sorted = Object.entries(distribution)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 2)
      .map(([asset]) => asset);

    return sorted.join(" و ");
  }

  private analyzeTiming(): AITradingAdvice[] {
    const timingIssues: AITradingAdvice[] = [];

    this.userProfile.tradingBehaviors.forEach(behavior => {
      const typicalHolding = this.marketData.typicalHoldingPeriods[behavior.asset];
      
      if (typicalHolding && behavior.averageHoldingPeriod < typicalHolding * 0.3) {
        timingIssues.push({
          type: "زمان‌بندی",
          priority: "متوسط",
          title: `معاملات کوتاه‌مدت در ${behavior.asset}`,
          description: `میانگین مدت نگهداری ${behavior.asset} شما ${behavior.averageHoldingPeriod} روز است، در حالی که دوره معمول ${typicalHolding} روز می‌باشد.`,
          specificActions: [
            "انتقال به استراتژی بلندمدت‌تر",
            "استفاده از سفارشات OCO",
            "تعیین اهداف قیمتی واقع‌بینانه"
          ],
          expectedImpact: "کاهش ۲۰٪ هزینه‌های معاملاتی",
          urgency: "آینده",
          confidence: 70
        });
      }
    });

    return timingIssues.slice(0, 2); // حداکثر ۲ توصیه
  }

  private analyzePsychology(): AITradingAdvice[] {
    const emotionalBehaviors = this.userProfile.tradingBehaviors.filter(b => b.emotionalDecisions > 6);

    if (emotionalBehaviors.length > 0) {
      return [{
        type: "روانشناسی",
        priority: "بالا",
        title: "معاملات احساسی شناسایی شد",
        description: `${emotionalBehaviors.length} دارایی وجود دارد که تصمیمات معاملاتی شما در آن‌ها تحت تأثیر احساسات بوده است.`,
        specificActions: [
          "ایجاد چک‌لیست قبل از هر معامله",
          "تعیین قوانین معاملاتی مشخص",
          "استفاده از سیستم معاملاتی خودکار",
          "مشاوره با روانشناس مالی"
        ],
        expectedImpact: "کاهش ۶۰٪ تصمیمات احساسی",
        urgency: "فوری",
        confidence: 82
      }];
    }

    return [];
  }

  private generateRebalancingAdvice(): AITradingAdvice[] {
    const currentDistribution = this.calculateAssetDistribution();
    const targetDistribution = this.calculateTargetDistribution();
    const rebalancingNeeds = this.identifyRebalancingNeeds(currentDistribution, targetDistribution);

    if (rebalancingNeeds.length > 0) {
      return [{
        type: "ریبالانس",
        priority: "متوسط",
        title: "نیاز به بازتعادل سبد دارایی",
        description: "سبد شما از توزیع بهینه فاصله گرفته و نیاز به تنظیم دارد.",
        specificActions: rebalancingNeeds,
        expectedImpact: "بهبود ۱۵٪ نسبت شارپ",
        urgency: "آینده",
        confidence: 78
      }];
    }

    return [];
  }

  private calculateTargetDistribution(): Record<string, number> {
    const baseAllocations: Record<string, Record<string, number>> = {
      "محافظه‌کار": { "طلا": 40, "اوراق": 35, "سهام": 20, "نقد": 5 },
      "متعادل": { "طلا": 25, "اوراق": 30, "سهام": 35, "ارز دیجیتال": 10 },
      "جسور": { "طلا": 15, "اوراق": 20, "سهام": 40, "ارز دیجیتال": 25 }
    };

    return baseAllocations[this.userProfile.actualBehavior] || baseAllocations["متعادل"];
  }

  private identifyRebalancingNeeds(current: Record<string, number>, target: Record<string, number>): string[] {
    const actions: string[] = [];
    const threshold = 5; // درصد

    Object.keys(target).forEach(asset => {
      const currentPercent = current[asset] || 0;
      const targetPercent = target[asset];
      const difference = currentPercent - targetPercent;

      if (Math.abs(difference) > threshold) {
        if (difference > 0) {
          actions.push(`کاهش ${Math.round(difference)}٪ از ${asset}`);
        } else {
          actions.push(`افزایش ${Math.round(-difference)}٪ به ${asset}`);
        }
      }
    });

    return actions;
  }

  private prioritizeAdvices(advices: AITradingAdvice[]): AITradingAdvice[] {
    const priorityWeights = { "بالا": 3, "متوسط": 2, "پایین": 1 };
    const urgencyWeights = { "فوری": 3, "آینده": 2, "بلندمدت": 1 };

    return advices.sort((a, b) => {
      const scoreA = priorityWeights[a.priority] * urgencyWeights[a.urgency] * a.confidence;
      const scoreB = priorityWeights[b.priority] * urgencyWeights[b.urgency] * b.confidence;
      return scoreB - scoreA;
    }).slice(0, 5); // فقط ۵ توصیه برتر
  }

  // تولید گزارش جامع
  public generateComprehensiveReport() {
    const analysis = this.analyzeTradingBehavior();
    const consistency = this.calculateConsistencyScore(
      this.userProfile.declaredRiskProfile,
      this.userProfile.actualBehavior
    );

    return {
      userProfile: this.userProfile,
      consistencyScore: consistency,
      riskAlignment: consistency >= 70 ? "خوب" : consistency >= 50 ? "متوسط" : "ضعیف",
      keyStrengths: this.identifyStrengths(),
      keyWeaknesses: this.identifyWeaknesses(),
      aiAdvices: analysis,
      nextSteps: this.generateNextSteps(analysis),
      monitoringMetrics: this.suggestMonitoringMetrics()
    };
  }

  private identifyStrengths(): string[] {
    const strengths: string[] = [];
    const behaviors = this.userProfile.tradingBehaviors;

    // تحلیل نقاط قوت
    const goodWinRate = behaviors.filter(b => b.winRate > 60).length;
    if (goodWinRate > behaviors.length * 0.5) {
      strengths.push("نرخ موفقیت بالا در معاملات");
    }

    const disciplinedTrades = behaviors.filter(b => b.emotionalDecisions < 4).length;
    if (disciplinedTrades > behaviors.length * 0.6) {
      strengths.push("انضباط معاملاتی خوب");
    }

    return strengths.length > 0 ? strengths : ["پتانسیل یادگیری بالا"];
  }

  private identifyWeaknesses(): string[] {
    const weaknesses: string[] = [];
    const behaviors = this.userProfile.tradingBehaviors;

    if (behaviors.some(b => b.riskPerTrade > 5)) {
      weaknesses.push("ریسک بالا در معاملات فردی");
    }

    if (behaviors.filter(b => b.totalProfitLoss < 0).length > behaviors.length * 0.4) {
      weaknesses.push("تعداد معاملات منفی بالا");
    }

    if (this.userProfile.consistencyScore < 60) {
      weaknesses.push("عدم ثبات در استراتژی");
    }

    return weaknesses.length > 0 ? weaknesses : ["نیاز به بهبود در مدیریت احساسات"];
  }

  private generateNextSteps(advices: AITradingAdvice[]): string[] {
    const nextSteps: string[] = [
      "بازبینی ماهانه این گزارش",
      "ثبت روزانه معاملات در دفترچه معاملاتی"
    ];

    const highPriorityAdvices = advices.filter(a => a.priority === "بالا");
    if (highPriorityAdvices.length > 0) {
      nextSteps.push("اجرای فوری توصیه‌های با اولویت بالا");
    }

    if (this.userProfile.learningAbility > 7) {
      nextSteps.push("شرکت در دوره‌های پیشرفته تحلیل تکنیکال");
    }

    return nextSteps;
  }

  private suggestMonitoringMetrics(): { metric: string; target: string; current: string }[] {
    return [
      {
        metric: "نسبت سود به ضرر",
        target: "بالای ۱.۵",
        current: this.calculateProfitLossRatio().toFixed(2)
      },
      {
        metric: "نمره ثبات استراتژی",
        target: "بالای ۷۰",
        current: this.userProfile.consistencyScore.toString()
      },
      {
        metric: "میانگین نمره احساسی",
        target: "زیر ۴",
        current: (this.userProfile.tradingBehaviors.reduce((sum, b) => sum + b.emotionalDecisions, 0) /
          this.userProfile.tradingBehaviors.length).toFixed(1)
      }
    ];
  }

  private calculateProfitLossRatio(): number {
    const totalProfit = this.userProfile.tradingBehaviors.reduce((sum, b) => sum + Math.max(0, b.totalProfitLoss), 0);
    const totalLoss = this.userProfile.tradingBehaviors.reduce((sum, b) => sum + Math.min(0, b.totalProfitLoss), 0);

    return totalLoss !== 0 ? Math.abs(totalProfit / totalLoss) : totalProfit > 0 ? 10 : 0;
  }
}

// -----------------------------
// کامپوننت جدید برای نمایش تحلیل هوش مصنوعی
// -----------------------------

function AITradingAnalysis({ userTradingData }: { userTradingData: any }) {
  const [analysisReport, setAnalysisReport] = useState<any>(null);
  const [selectedAdvice, setSelectedAdvice] = useState<AITradingAdvice | null>(null);

  useEffect(() => {
    if (userTradingData) {
      const aiAnalyzer = new IranianTradingBehaviorAI(userTradingData);
      const report = aiAnalyzer.generateComprehensiveReport();
      setAnalysisReport(report);
    }
  }, [userTradingData]);

  if (!analysisReport) {
    return (
      <div className="bg-white p-6 rounded-2xl shadow border border-gray-100">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* خلاصه اجرایی */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-2xl">
        <h3 className="text-xl font-bold mb-4">🧠 تحلیل هوش مصنوعی رفتار معاملاتی</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold">{analysisReport.consistencyScore}%</div>
            <div className="text-sm opacity-90">نمره تطابق رفتاری</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">{analysisReport.riskAlignment}</div>
            <div className="text-sm opacity-90">همسویی ریسک</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">{analysisReport.aiAdvices.length}</div>
            <div className="text-sm opacity-90">توصیه هوش مصنوعی</div>
          </div>
        </div>
      </div>

      {/* نقاط قوت و ضعف */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-green-50 border border-green-200 rounded-2xl p-6">
          <h4 className="font-bold text-green-800 mb-3">✅ نقاط قوت شما</h4>
          <ul className="space-y-2">
            {analysisReport.keyStrengths.map((strength: string, index: number) => (
              <li key={index} className="flex items-center gap-2 text-green-700">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                {strength}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-orange-50 border border-orange-200 rounded-2xl p-6">
          <h4 className="font-bold text-orange-800 mb-3">📝 حوزه‌های بهبود</h4>
          <ul className="space-y-2">
            {analysisReport.keyWeaknesses.map((weakness: string, index: number) => (
              <li key={index} className="flex items-center gap-2 text-orange-700">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                {weakness}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* توصیه‌های هوش مصنوعی */}
      <div className="bg-white p-6 rounded-2xl shadow border border-gray-100">
        <h4 className="text-lg font-bold text-gray-800 mb-4">🎯 توصیه‌های هوش مصنوعی برای بهبود عملکرد</h4>
        <div className="space-y-4">
          {analysisReport.aiAdvices.map((advice: AITradingAdvice, index: number) => (
            <div 
              key={index}
              className={`border rounded-xl p-4 cursor-pointer hover:shadow-md transition-all ${
                selectedAdvice === advice ? 'ring-2 ring-indigo-400 bg-indigo-50' : ''
              }`}
              onClick={() => setSelectedAdvice(advice)}
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h5 className="font-semibold text-gray-800">{advice.title}</h5>
                  <div className="flex gap-2 mt-1">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      advice.priority === "بالا" ? "bg-red-100 text-red-800" :
                      advice.priority === "متوسط" ? "bg-yellow-100 text-yellow-800" :
                      "bg-blue-100 text-blue-800"
                    }`}>
                      اولویت: {advice.priority}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      advice.urgency === "فوری" ? "bg-orange-100 text-orange-800" :
                      advice.urgency === "آینده" ? "bg-blue-100 text-blue-800" :
                      "bg-gray-100 text-gray-800"
                    }`}>
                      فوریت: {advice.urgency}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-600">اعتماد: {advice.confidence}%</div>
                  <div className="text-xs text-gray-500">{advice.type}</div>
                </div>
              </div>
              
              <p className="text-sm text-gray-600 mb-3">{advice.description}</p>
              
              {selectedAdvice === advice && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="mt-4 p-4 bg-white border rounded-lg"
                >
                  <h6 className="font-semibold text-gray-700 mb-2">📋 اقدامات مشخص:</h6>
                  <ul className="list-disc pr-4 space-y-1 text-sm text-gray-600 mb-3">
                    {advice.specificActions.map((action, actionIndex) => (
                      <li key={actionIndex}>{action}</li>
                    ))}
                  </ul>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-green-600">تأثیر مورد انتظار: {advice.expectedImpact}</span>
                  </div>
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* معیارهای نظارت */}
      <div className="bg-white p-6 rounded-2xl shadow border border-gray-100">
        <h4 className="text-lg font-bold text-gray-800 mb-4">📊 معیارهای نظارت و پیگیری</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {analysisReport.monitoringMetrics.map((metric: any, index: number) => (
            <div key={index} className="border rounded-xl p-4 text-center">
              <div className="text-sm text-gray-600 mb-1">{metric.metric}</div>
              <div className="text-2xl font-bold text-gray-800 mb-1">{metric.current}</div>
              <div className="text-xs text-gray-500">هدف: {metric.target}</div>
            </div>
          ))}
        </div>
      </div>

      {/* گام‌های بعدی */}
      <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
        <h4 className="font-bold text-blue-800 mb-3">🛣️ گام‌های بعدی پیشنهادی</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {analysisReport.nextSteps.map((step: string, index: number) => (
            <div key={index} className="flex items-center gap-3 p-3 bg-white rounded-lg border">
              <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold">
                {index + 1}
              </div>
              <span className="text-sm text-gray-700">{step}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// پایگاه داده دارایی‌های بهینه‌شده برای بازار ایران
const iranianInvestmentAssets: InvestmentAsset[] = [
  {
    name: "صندوق درآمد ثابت",
    category: "صندوق",
    riskLevel: 1,
    expectedReturn: 0.20,
    liquidity: 5,
    minInvestment: 1000000,
    description: "سرمایه‌گذاری در اوراق با درآمد ثابت و سپرده‌های بانکی",
    suitableFor: ["محافظه‌کار", "متعادل", "جسور"],
    market: "بورس تهران"
  },
  {
    name: "سپرده بانکی یکساله",
    category: "سپرده",
    riskLevel: 1,
    expectedReturn: 0.18,
    liquidity: 3,
    minInvestment: 1000000,
    description: "سپرده بلندمدت با سود تضمین شده",
    suitableFor: ["محافظه‌کار"],
    market: "بانک"
  },
  {
    name: "اوراق خزانه اسلامی",
    category: "اوراق",
    riskLevel: 1,
    expectedReturn: 0.22,
    liquidity: 4,
    minInvestment: 1000000,
    description: "اوراق با پشتوانه دولت",
    suitableFor: ["محافظه‌کار", "متعادل"],
    market: "بورس تهران"
  },
  {
    name: "صندوق سهامی آهسته",
    category: "صندوق",
    riskLevel: 2,
    expectedReturn: 0.35,
    liquidity: 4,
    minInvestment: 500000,
    description: "ترکیب سهام و اوراق با مدیریت حرفه‌ای",
    suitableFor: ["محافظه‌کار", "متعادل"],
    market: "بورس تهران"
  },
  {
    name: "طلای آبشده",
    category: "طلا",
    riskLevel: 2,
    expectedReturn: 0.28,
    liquidity: 5,
    minInvestment: 500000,
    description: "طلای فیزیکی با نقدشوندگی بالا",
    suitableFor: ["محافظه‌کار", "متعادل", "جسور"],
    market: "طلا"
  },
  {
    name: "سهام بلوچیپ",
    category: "سهام",
    riskLevel: 3,
    expectedReturn: 0.45,
    liquidity: 5,
    minInvestment: 500000,
    description: "سهام شرکت‌های بزرگ و پایدار",
    suitableFor: ["متعادل", "جسور"],
    market: "بورس تهران"
  },
  {
    name: "سهام رشد",
    category: "سهام",
    riskLevel: 4,
    expectedReturn: 0.65,
    liquidity: 4,
    minInvestment: 1000000,
    description: "سهام شرکت‌های با پتانسیل رشد بالا",
    suitableFor: ["جسور", "متعادل"],
    market: "بورس تهران"
  },
  {
    name: "صندوق پروژه",
    category: "صندوق",
    riskLevel: 4,
    expectedReturn: 0.55,
    liquidity: 2,
    minInvestment: 2000000,
    description: "سرمایه‌گذاری در پروژه‌های عمرانی",
    suitableFor: ["جسور"],
    market: "فرابورس"
  },
  {
    name: "ارز دیجیتال (تتر)",
    category: "ارز دیجیتال",
    riskLevel: 4,
    expectedReturn: 0.25,
    liquidity: 5,
    minInvestment: 1000000,
    description: "ارز دیجیتال با پشتوانه دلار",
    suitableFor: ["جسور", "متعادل"],
    market: "کریپتو"
  },
  {
    name: "سهام استارتاپ",
    category: "سهام",
    riskLevel: 5,
    expectedReturn: 0.85,
    liquidity: 2,
    minInvestment: 5000000,
    description: "سرمایه‌گذاری در استارتاپ‌های فناوری",
    suitableFor: ["جسور"],
    market: "فرابورس"
  }
];

// مدل پیشرفته MPT (Modern Portfolio Theory) بهینه‌شده برای ایران
class IranianPortfolioOptimizer {
  private assets: InvestmentAsset[];
  private correlationMatrix: Map<string, Map<string, number>>;

  constructor(assets: InvestmentAsset[]) {
    this.assets = assets;
    this.correlationMatrix = this.buildCorrelationMatrix();
  }

  private buildCorrelationMatrix(): Map<string, Map<string, number>> {
    const matrix = new Map();

    const correlations: Record<string, Record<string, number>> = {
      "صندوق درآمد ثابت": { 
        "سپرده بانکی یکساله": 0.95, 
        "اوراق خزانه اسلامی": 0.90, 
        "طلای آبشده": -0.15, 
        "سهام بلوچیپ": -0.10 
      },
      "سپرده بانکی یکساله": { 
        "صندوق درآمد ثابت": 0.95, 
        "اوراق خزانه اسلامی": 0.85, 
        "طلای آبشده": -0.20, 
        "سهام بلوچیپ": -0.15 
      },
      "اوراق خزانه اسلامی": { 
        "صندوق درآمد ثابت": 0.90, 
        "سپرده بانکی یکساله": 0.85, 
        "طلای آبشده": -0.10, 
        "سهام بلوچیپ": -0.05 
      },
      "طلای آبشده": { 
        "صندوق درآمد ثابت": -0.15, 
        "سپرده بانکی یکساله": -0.20, 
        "اوراق خزانه اسلامی": -0.10, 
        "سهام بلوچیپ": 0.30 
      },
      "سهام بلوچیپ": { 
        "صندوق درآمد ثابت": -0.10, 
        "سپرده بانکی یکساله": -0.15, 
        "اوراق خزانه اسلامی": -0.05, 
        "طلای آبشده": 0.30 
      }
    };

    this.assets.forEach(asset1 => {
      const row = new Map();
      this.assets.forEach(asset2 => {
        const key1 = asset1.name;
        const key2 = asset2.name;
        if (correlations[key1] && correlations[key1][key2] !== undefined) {
          row.set(asset2.name, correlations[key1][key2]);
        } else if (key1 === key2) {
          row.set(asset2.name, 1.0);
        } else {
          row.set(asset2.name, 0.0);
        }
      });
      matrix.set(asset1.name, row);
    });

    return matrix;
  }

  private calculatePortfolioRisk(allocations: PortfolioAllocation[]): number {
    let variance = 0;

    for (let i = 0; i < allocations.length; i++) {
      for (let j = 0; j < allocations.length; j++) {
        const asset1 = allocations[i].asset;
        const asset2 = allocations[j].asset;
        const weight1 = allocations[i].weight / 100;
        const weight2 = allocations[j].weight / 100;
        const correlation = this.correlationMatrix.get(asset1.name)?.get(asset2.name) || 0;
        const risk1 = asset1.riskLevel / 5;
        const risk2 = asset2.riskLevel / 5;
        
        variance += weight1 * weight2 * risk1 * risk2 * correlation;
      }
    }

    return Math.sqrt(variance);
  }

  private calculateExpectedReturn(allocations: PortfolioAllocation[]): number {
    return allocations.reduce((total, allocation) => {
      return total + (allocation.weight / 100) * allocation.asset.expectedReturn;
    }, 0);
  }

  public optimizePortfolio(
    riskProfile: "محافظه‌کار" | "متعادل" | "جسور",
    investmentAmount: number,
    timeHorizon: number
  ): AIOptimizedPortfolio {
    const suitableAssets = this.assets.filter(asset => 
      asset.suitableFor.includes(riskProfile) && 
      asset.minInvestment <= investmentAmount
    );

    let targetAllocations: PortfolioAllocation[];

    switch (riskProfile) {
      case "محافظه‌کار":
        targetAllocations = this.conservativeAllocation(suitableAssets, investmentAmount);
        break;
      case "متعادل":
        targetAllocations = this.balancedAllocation(suitableAssets, investmentAmount, timeHorizon);
        break;
      case "جسور":
        targetAllocations = this.aggressiveAllocation(suitableAssets, investmentAmount, timeHorizon);
        break;
      default:
        targetAllocations = this.balancedAllocation(suitableAssets, investmentAmount, timeHorizon);
    }

    const totalExpectedReturn = this.calculateExpectedReturn(targetAllocations);
    const totalRiskScore = this.calculatePortfolioRisk(targetAllocations);
    const sharpeRatio = totalRiskScore > 0 ? totalExpectedReturn / totalRiskScore : 0;
    const diversificationScore = this.calculateDiversification(targetAllocations);

    return {
      riskProfile,
      totalExpectedReturn,
      totalRiskScore,
      sharpeRatio,
      diversificationScore,
      allocations: targetAllocations,
      rebalancingSchedule: this.getRebalancingSchedule(riskProfile, timeHorizon),
      marketCondition: this.assessMarketCondition()
    };
  }

  private conservativeAllocation(
    assets: InvestmentAsset[],
    amount: number
  ): PortfolioAllocation[] {
    const lowRiskAssets = assets.filter(a => a.riskLevel <= 2);

    const baseAllocation = [
      { asset: lowRiskAssets.find(a => a.name === "صندوق درآمد ثابت") || lowRiskAssets[0], weight: 40 },
      { asset: lowRiskAssets.find(a => a.name === "سپرده بانکی یکساله") || lowRiskAssets[1], weight: 30 },
      { asset: lowRiskAssets.find(a => a.name === "اوراق خزانه اسلامی") || lowRiskAssets[2], weight: 20 },
      { asset: lowRiskAssets.find(a => a.name === "طلای آبشده") || lowRiskAssets[3], weight: 10 }
    ].filter(a => a.asset);

    return this.normalizeWeights(baseAllocation);
  }

  private balancedAllocation(
    assets: InvestmentAsset[],
    amount: number,
    timeHorizon: number
  ): PortfolioAllocation[] {
    const mediumRiskAssets = assets.filter(a => a.riskLevel <= 4);

    const baseAllocation = [
      { asset: mediumRiskAssets.find(a => a.name === "صندوق سهامی آهسته"), weight: 30 },
      { asset: mediumRiskAssets.find(a => a.name === "سهام بلوچیپ"), weight: 25 },
      { asset: mediumRiskAssets.find(a => a.name === "طلای آبشده"), weight: 20 },
      { asset: mediumRiskAssets.find(a => a.name === "صندوق درآمد ثابت"), weight: 15 },
      { asset: mediumRiskAssets.find(a => a.name === "ارز دیجیتال (تتر)"), weight: 10 }
    ].filter(a => a.asset);

    if (timeHorizon > 3) {
      const equityAllocation = baseAllocation.find(a => a.asset?.name === "سهام بلوچیپ");
      const fixedIncomeAllocation = baseAllocation.find(a => a.asset?.name === "صندوق درآمد ثابت");
      
      if (equityAllocation && fixedIncomeAllocation) {
        equityAllocation.weight += 5;
        fixedIncomeAllocation.weight -= 5;
      }
    }

    return this.normalizeWeights(baseAllocation);
  }

  private aggressiveAllocation(
    assets: InvestmentAsset[],
    amount: number,
    timeHorizon: number
  ): PortfolioAllocation[] {
    const highRiskAssets = assets.filter(a => a.riskLevel >= 3);

    let allocation = [
      { asset: highRiskAssets.find(a => a.name === "سهام رشد"), weight: 35 },
      { asset: highRiskAssets.find(a => a.name === "صندوق پروژه"), weight: 25 },
      { asset: highRiskAssets.find(a => a.name === "سهام استارتاپ"), weight: 20 },
      { asset: highRiskAssets.find(a => a.name === "ارز دیجیتال (تتر)"), weight: 15 },
      { asset: highRiskAssets.find(a => a.name === "طلای آبشده"), weight: 5 }
    ].filter(a => a.asset);

    if (amount > 100000000) {
      allocation = [
        { asset: highRiskAssets.find(a => a.name === "سهام رشد"), weight: 25 },
        { asset: highRiskAssets.find(a => a.name === "صندوق پروژه"), weight: 20 },
        { asset: highRiskAssets.find(a => a.name === "سهام استارتاپ"), weight: 15 },
        { asset: highRiskAssets.find(a => a.name === "ارز دیجیتال (تتر)"), weight: 15 },
        { asset: highRiskAssets.find(a => a.name === "طلای آبشده"), weight: 10 },
        { asset: highRiskAssets.find(a => a.name === "سهام بلوچیپ"), weight: 15 }
      ].filter(a => a.asset);
    }

    return this.normalizeWeights(allocation);
  }

  private normalizeWeights(allocations: { asset: InvestmentAsset; weight: number }[]): PortfolioAllocation[] {
    const totalWeight = allocations.reduce((sum, a) => sum + a.weight, 0);
    const normalized = allocations.map(a => ({
      asset: a.asset,
      weight: Math.round((a.weight / totalWeight) * 100),
      expectedContribution: 0,
      riskContribution: 0
    }));

    return normalized.map(allocation => ({
      ...allocation,
      expectedContribution: (allocation.weight / 100) * allocation.asset.expectedReturn,
      riskContribution: (allocation.weight / 100) * (allocation.asset.riskLevel / 5)
    }));
  }

  private calculateDiversification(allocations: PortfolioAllocation[]): number {
    const categoryWeights = new Map<string, number>();

    allocations.forEach(allocation => {
      const category = allocation.asset.category;
      const currentWeight = categoryWeights.get(category) || 0;
      categoryWeights.set(category, currentWeight + allocation.weight);
    });

    let hhi = 0;
    categoryWeights.forEach(weight => {
      hhi += Math.pow(weight / 100, 2);
    });

    return Math.max(0, 1 - hhi);
  }

  private getRebalancingSchedule(riskProfile: string, timeHorizon: number): string {
    switch (riskProfile) {
      case "محافظه‌کار":
        return "فصلی";
      case "متعادل":
        return timeHorizon > 3 ? "شش‌ماهه" : "فصلی";
      case "جسور":
        return "ماهانه";
      default:
        return "فصلی";
    }
  }

  private assessMarketCondition(): "مناسب" | "احتیاط" | "ریسکی" {
    const marketIndicators = {
      tedpixVolatility: 0.15,
      goldTrend: "صعودی",
      currencyStability: "پایدار",
      interestRates: "در حال افزایش"
    };

    if (marketIndicators.tedpixVolatility > 0.25) return "ریسکی";
    if (marketIndicators.tedpixVolatility > 0.15) return "احتیاط";
    return "مناسب";
  }
}

// -----------------------------
// کامپوننت پورتفولیو هوش مصنوعی
// -----------------------------
function AIPortfolioRecommendation({
  riskCategory,
  investmentAmount,
  timeHorizon = 3
}: {
  riskCategory: "محافظه‌کار" | "متعادل" | "جسور";
  investmentAmount: number;
  timeHorizon?: number;
}) {
  const optimizer = new IranianPortfolioOptimizer(iranianInvestmentAssets);

  const portfolios = {
    محافظه‌کار: optimizer.optimizePortfolio("محافظه‌کار", investmentAmount, timeHorizon),
    متعادل: optimizer.optimizePortfolio("متعادل", investmentAmount, timeHorizon),
    جسور: optimizer.optimizePortfolio("جسور", investmentAmount, timeHorizon)
  };

  return (
    <div className="mt-8 space-y-6">
      <h3 className="text-xl font-bold text-gray-800 text-center">
        🧠 پورتفولیوهای بهینه‌شده هوش مصنوعی
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Object.entries(portfolios).map(([profile, portfolio]) => (
          <div key={profile} className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
            <div className={`p-4 text-white ${
              profile === "محافظه‌کار" ? "bg-blue-600" :
              profile === "متعادل" ? "bg-emerald-600" :
              "bg-rose-600"
            }`}>
              <h4 className="font-bold text-lg">{profile}</h4>
              <div className="flex justify-between items-center mt-2">
                <span>بازده مورد انتظار:</span>
                <span className="font-bold">{(portfolio.totalExpectedReturn * 100).toFixed(1)}%</span>
              </div>
            </div>

            <div className="p-4">
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="text-center">
                  <div className="text-sm text-gray-600">ریسک</div>
                  <div className="font-bold text-gray-800">{(portfolio.totalRiskScore * 100).toFixed(1)}</div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-gray-600">نسبت شارپ</div>
                  <div className="font-bold text-gray-800">{portfolio.sharpeRatio.toFixed(2)}</div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-gray-600">تنوع</div>
                  <div className="font-bold text-gray-800">{(portfolio.diversificationScore * 100).toFixed(0)}%</div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-gray-600">بازتعادل</div>
                  <div className="font-bold text-gray-800">{portfolio.rebalancingSchedule}</div>
                </div>
              </div>

              <div className="space-y-3">
                <h5 className="font-semibold text-gray-700">ترکیب دارایی‌ها:</h5>
                {portfolio.allocations.map((allocation, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                      <span className="text-sm">{allocation.asset.name}</span>
                    </div>
                    <div className="text-right">
                      <span className="font-bold">{allocation.weight}%</span>
                      <div className="text-xs text-gray-500">
                        بازده: {(allocation.expectedContribution * 100).toFixed(1)}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className={`mt-4 p-3 rounded-lg text-center text-sm font-medium ${
                portfolio.marketCondition === "مناسب" ? "bg-green-100 text-green-800" :
                portfolio.marketCondition === "احتیاط" ? "bg-yellow-100 text-yellow-800" :
                "bg-red-100 text-red-800"
              }`}>
                شرایط بازار: {portfolio.marketCondition}
              </div>

              <button className="w-full mt-4 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors">
                انتخاب این پورتفولیو
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl p-6 shadow border border-gray-100">
        <h4 className="font-bold text-gray-800 mb-4">📊 تحلیل تخصصی پورتفولیوها</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h5 className="font-semibold text-gray-700 mb-3">مقایسه بازده و ریسک</h5>
            <div className="space-y-2">
              {Object.entries(portfolios).map(([profile, portfolio]) => (
                <div key={profile} className="flex justify-between items-center">
                  <span>{profile}</span>
                  <div className="flex gap-4">
                    <span className="text-green-600">+{(portfolio.totalExpectedReturn * 100).toFixed(1)}%</span>
                    <span className="text-red-600">{(portfolio.totalRiskScore * 100).toFixed(1)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h5 className="font-semibold text-gray-700 mb-3">توصیه‌های هوش مصنوعی</h5>
            <ul className="list-disc pr-4 space-y-2 text-sm text-gray-600">
              <li>پورتفولیو محافظه‌کار: مناسب برای اهداف کوتاه‌مدت و حفظ سرمایه</li>
              <li>پورتفولیو متعادل: ترکیب بهینه از رشد و امنیت برای افق میان‌مدت</li>
              <li>پورتفولیو جسور: پتانسیل سود بالا با پذیرش ریسک بیشتر</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

// -----------------------------
// داده‌های اولیه نمودار شخصیت ریسک
// -----------------------------
const baseRiskData = [
  { name: "محافظه‌کار", value: 40, color: "#60A5FA" },
  { name: "متعادل", value: 35, color: "#FBBF24" },
  { name: "ریسک‌پذیر", value: 25, color: "#F87171" },
];

// -----------------------------
// سوالات جدید تعیین شخصیت سرمایه‌گذاری
// -----------------------------
const riskQuestions: {
  id: number;
  text: string;
  options: string[];
}[] = [
  {
    id: 1,
    text: "اگر پولی اضافه داشته باشید، چگونه تصمیم می‌گیرید؟",
    options: [
      "سریع آن را در حساب پس‌انداز امن می‌گذارم.",
      "بخش کوچکی را سرمایه‌گذاری می‌کنم و بقیه را ذخیره می‌کنم.",
      "بیشتر آن را در فرصت‌های جدید سرمایه‌گذاری می‌کنم.",
      "همه آن را در یک ایده پرریسک سرمایه‌گذاری می‌کنم.",
    ],
  },
  {
    id: 2,
    text: "اگر در بازار سهام ضرر کنید، چه واکنشی دارید؟",
    options: [
      "فوراً همه سرمایه را خارج می‌کنم.",
      "کمی صبر می‌کنم، ولی با احتیاط.",
      "منتظر می‌مانم تا بازار برگردد.",
      "حتی سرمایه بیشتری وارد می‌کنم.",
    ],
  },
  {
    id: 3,
    text: "فرصت سرمایه‌گذاری در یک استارتاپ با ۵۰٪ احتمال شکست وجود دارد، چه می‌کنید؟",
    options: [
      "اصلاً وارد نمی‌شوم.",
      "مبلغ کمی وارد می‌کنم.",
      "مبلغ متوسطی سرمایه‌گذاری می‌کنم.",
      "با اشتیاق زیاد سرمایه‌گذاری می‌کنم.",
    ],
  },
  {
    id: 4,
    text: "اگر امروز ۱۰۰ میلیون تومان برنده شوید، چه می‌کنید؟",
    options: [
      "همه را در بانک می‌گذارم.",
      "نصف را ذخیره و نصف را سرمایه‌گذاری می‌کنم.",
      "بیشتر آن را سرمایه‌گذاری می‌کنم.",
      "تمامش را روی یک فرصت پرریسک می‌گذارم.",
    ],
  },
  {
    id: 5,
    text: "در مواجهه با یک تصمیم مالی بزرگ، چه رویکردی دارید؟",
    options: [
      "تحقیقات کامل انجام می‌دهم و تا مطمئن نشوم اقدام نمی‌کنم.",
      "مقداری تحقیق می‌کنم و سریع تصمیم می‌گیرم.",
      "بیشتر به حس و شهود خود تکیه می‌کنم.",
      "بدون معطلی وارد عمل می‌شوم.",
    ],
  },
  {
    id: 6,
    text: "وقتی قیمت یک ارز دیجیتال محبوب نصف می‌شود، چه می‌کنید؟",
    options: [
      "سریع آن را می‌فروشم.",
      "نگه می‌دارم و منتظر می‌مانم.",
      "مقدار کمی بیشتر می‌خرم.",
      "مقدار زیادی بیشتر می‌خرم.",
    ],
  },
  {
    id: 7,
    text: "اگر ۵۰ میلیون تومان برای سرمایه‌گذاری داشته باشید، چطور آن را پخش می‌کنید؟",
    options: [
      "همه را در یک گزینه امن می‌گذارم.",
      "در دو گزینه سرمایه‌گذاری می‌کنم.",
      "در چند گزینه با ریسک متفاوت پخش می‌کنم.",
      "تقریباً همه حوزه‌ها را امتحان می‌کنم.",
    ],
  },
];

// -----------------------------
// استایل کارت‌ها/لی‌اوت مسیر مالی شبیه داشبورد
// -----------------------------
const pathCards = [
  {
    key: "conservative",
    badge: "امنیت بالا",
    title: "مسیر محافظه‌کار",
    gradient: "from-sky-500 to-sky-600",
    kpis: [
      { label: "ریسک", value: "کم" },
      { label: "بازده مورد انتظار", value: "۳–۸٪" },
      { label: "نوسان", value: "پایین" },
    ],
    pros: ["امنیت بالا", "پایداری در تورم", "مناسب اهداف کوتاه‌مدت"],
    cons: ["بازده پایین‌تر", "نیاز به صبر بیشتر"],
  },
  {
    key: "balanced",
    badge: "تعادل",
    title: "مسیر متعادل",
    gradient: "from-emerald-500 to-teal-500",
    kpis: [
      { label: "ریسک", value: "متوسط" },
      { label: "بازده مورد انتظار", value: "۸–۱۵٪" },
      { label: "نوسان", value: "میان‌مدت" },
    ],
    pros: ["ترکیب درآمد ثابت و رشد", "تناسب با اقساط و هدف"],
    cons: ["نیاز به پایش دوره‌ای"],
  },
  {
    key: "aggressive",
    badge: "رشد بالا",
    title: "مسیر جسورانه",
    gradient: "from-fuchsia-500 to-rose-500",
    kpis: [
      { label: "ریسک", value: "زیاد" },
      { label: "بازده مورد انتظار", value: "۱۵–۳۵٪" },
      { label: "نوسان", value: "بالا" },
    ],
    pros: ["پتانسیل سود بالا", "حوزه‌های جسورانه مثل کریپتو/استارتاپ"],
    cons: ["ریسک بسیار بالا", "نیاز به کنترل هیجان"],
  },
];

// -----------------------------
// داده‌های جدید برای پورتفولیو و صندوق‌ها
// -----------------------------
const investmentFunds = [
  {
    id: 1,
    name: "صندوق طلایی امن",
    type: "محافظه‌کار",
    returnRate: "5-8%",
    risk: "کم",
    minInvestment: 1000000,
    description: "سرمایه‌گذاری در طلا و اوراق قرضه امن",
    features: ["سود ماهانه", "امنیت بالا", "نقدشوندگی سریع"],
    color: "bg-amber-500",
  },
  {
    id: 2,
    name: "صندوق سهام متعادل",
    type: "متعادل",
    returnRate: "8-15%",
    risk: "متوسط",
    minInvestment: 2000000,
    description: "ترکیب سهام و اوراق مشارکت",
    features: ["سود季度", "تنوع مناسب", "مدیریت حرفه‌ای"],
    color: "bg-emerald-500",
  },
  {
    id: 3,
    name: "صندوق رشد تهاجمی",
    type: "تهاجمی",
    returnRate: "15-35%",
    risk: "بالا",
    minInvestment: 5000000,
    description: "سرمایه‌گذاری در استارتاپ‌ها و ارز دیجیتال",
    features: ["پتانسیل سود بالا", "فرصت‌های نوآورانه", "همراهی با مشاور"],
    color: "bg-rose-500",
  },
];

// -----------------------------
// داده‌های تاریخچه معاملات با سود/زیان
// -----------------------------
const transactionHistory = [
  {
    date: "1402/01/15",
    type: "خرید",
    asset: "طلا",
    amount: 5000000,
    profitLoss: 750000,
    profitLossPercent: 15,
    duration: "45 روز"
  },
  {
    date: "1402/01/20",
    type: "فروش",
    asset: "سهام",
    amount: 3000000,
    profitLoss: -450000,
    profitLossPercent: -15,
    duration: "30 روز"
  },
  {
    date: "1402/02/05",
    type: "خرید",
    asset: "ارز دیجیتال",
    amount: 2000000,
    profitLoss: 1200000,
    profitLossPercent: 60,
    duration: "60 روز"
  },
  {
    date: "1402/02/15",
    type: "خرید",
    asset: "اوراق",
    amount: 4000000,
    profitLoss: 320000,
    profitLossPercent: 8,
    duration: "90 روز"
  },
  {
    date: "1402/03/01",
    type: "فروش",
    asset: "طلا",
    amount: 2500000,
    profitLoss: -125000,
    profitLossPercent: -5,
    duration: "20 روز"
  },
  {
    date: "1402/03/10",
    type: "خرید",
    asset: "سهام",
    amount: 3500000,
    profitLoss: 525000,
    profitLossPercent: 15,
    duration: "25 روز"
  },
];

// داده‌های نمودار عملکرد
const performanceData = [
  { month: "فروردین", طلا: 5, سهام: 8, ارز: 15, اوراق: 3 },
  { month: "اردیبهشت", طلا: 6, سهام: 12, ارز: 25, اوراق: 4 },
  { month: "خرداد", طلا: 4, سهام: 15, ارز: 18, اوراق: 3 },
  { month: "تیر", طلا: 7, سهام: 10, ارز: 22, اوراق: 4 },
];

// -----------------------------
// پیشنهادات هوش مصنوعی
// -----------------------------
const aiSuggestions = [
  {
    id: 1,
    title: "مدیریت ریسک بهتر",
    description: "با توجه به رفتار معاملاتی شما، پیشنهاد می‌کنم از حد ضرر استفاده کنید.",
    priority: "بالا",
    type: "ریسک",
  },
  {
    id: 2,
    title: "تنوع‌بخشی به سبد",
    description: "سرمایه شما در یک نوع دارایی متمرکز شده است. پیشنهاد تنوع‌بخشی داریم.",
    priority: "متوسط",
    type: "تنوع",
  },
  {
    id: 3,
    title: "سرمایه‌گذاری مرحله‌ای",
    description: "برای کاهش ریسک زمان‌بندی بازار، از روش سرمایه‌گذاری مرحله‌ای استفاده کنید.",
    priority: "متوسط",
    type: "استراتژی",
  },
];

// -----------------------------
// داده‌های بودجه‌بندی و تورم
// -----------------------------
const inflationRates = {
  'خوراک': 0.4,
  'پوشاک': 0.2,
  'تعمیرات (ماشین و خانه)': 0.15,
  'سرمایه گذاری': 0.1,
  'مسافرت': 0.3,
  'اجاره خانه': 0.12,
  'پول توجیبی': 0.35
};

const initialBudgetData = {
  income: 45000000,
  expenses: {
    'خوراک': 8000000,
    'پوشاک': 3000000,
    'تعمیرات (ماشین و خانه)': 2000000,
    'سرمایه گذاری': 5000000,
    'مسافرت': 2500000,
    'اجاره خانه': 10000000,
    'پول توجیبی': 1500000
  }
};

// -----------------------------
// کامپوننت پورتفولیو پیشنهادی
// -----------------------------
function SuggestedPortfolio({ riskCategory, diversityScore, onFundSelect }: {
  riskCategory: string;
  diversityScore: number;
  onFundSelect: (fund: any) => void;
}) {
  const suggestedPortfolios = {
    محافظه‌کار: [
      { name: "طلا", weight: 40, color: "#F59E0B" },
      { name: "اوراق قرضه", weight: 35, color: "#10B981" },
      { name: "سهام بلو", weight: 25, color: "#3B82F6" },
    ],
    "کم‌ریسک": [
      { name: "سهام متعادل", weight: 45, color: "#3B82F6" },
      { name: "اوراق", weight: 30, color: "#10B981" },
      { name: "طلا", weight: 15, color: "#F59E0B" },
      { name: "نقد", weight: 10, color: "#6B7280" },
    ],
    تهاجمی: [
      { name: "ارز دیجیتال", weight: 35, color: "#EF4444" },
      { name: "سهام رشد", weight: 30, color: "#3B82F6" },
      { name: "استارتاپ", weight: 25, color: "#8B5CF6" },
      { name: "طلا", weight: 10, color: "#F59E0B" },
    ],
  };

  const portfolio = suggestedPortfolios[riskCategory as keyof typeof suggestedPortfolios] || suggestedPortfolios["کم‌ریسک"];

  return (
    <div className="bg-white p-6 rounded-2xl shadow border border-gray-100 mt-6">
      <h3 className="text-lg font-bold text-gray-800 mb-4">🎯 پورتفولیو پیشنهادی برای شما</h3>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* نمودار پای پورتفولیو */}
        <div className="flex flex-col items-center">
          <div className="h-64 w-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={portfolio}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="weight"
                >
                  {portfolio.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value}%`, "سهم"]} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* جزئیات پورتفولیو */}
        <div className="space-y-4">
          <div className="bg-gray-50 rounded-xl p-4">
            <h4 className="font-semibold text-gray-800 mb-3">ترکیب دارایی‌ها:</h4>
            <div className="space-y-2">
              {portfolio.map((asset, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: asset.color }} />
                    <span className="text-sm text-gray-700">{asset.name}</span>
                  </div>
                  <span className="font-medium text-gray-900">{asset.weight}%</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-blue-50 rounded-xl p-4">
            <h4 className="font-semibold text-blue-800 mb-2">📊 صندوق‌های پیشنهادی</h4>
            <div className="space-y-2">
              {investmentFunds
                .filter(fund => fund.type === riskCategory)
                .map(fund => (
                  <div key={fund.id} className="flex items-center justify-between p-2 hover:bg-blue-100 rounded-lg cursor-pointer"
                    onClick={() => onFundSelect(fund)}>
                    <span className="text-sm text-blue-700">{fund.name}</span>
                    <span className="text-xs bg-blue-200 text-blue-800 px-2 py-1 rounded-full">
                      بازده: {fund.returnRate}
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// -----------------------------
// کامپوننت جزئیات صندوق
// -----------------------------
function FundDetail({ fund, onBack, onInvest }: {
  fund: any;
  onBack: () => void;
  onInvest: (fund: any, amount: string) => void;
}) {
  const [investmentAmount, setInvestmentAmount] = useState("");

  if (!fund) return null;

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      onClick={onBack}
    >
      <motion.div
        className="bg-white rounded-2xl p-6 max-w-md w-full"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-gray-800">{fund.name}</h3>
          <button onClick={onBack} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>

        <div className={`${fund.color} text-white p-4 rounded-xl mb-4`}>
          <div className="text-center">
            <div className="text-2xl font-bold">{fund.returnRate}</div>
            <div className="text-sm opacity-90">بازده سالانه</div>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-gray-800 mb-2">توضیحات</h4>
            <p className="text-gray-600 text-sm">{fund.description}</p>
          </div>

          <div>
            <h4 className="font-semibold text-gray-800 mb-2">ویژگی‌ها</h4>
            <ul className="list-disc pr-4 space-y-1 text-sm text-gray-600">
              {fund.features.map((feature: string, index: number) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-600">حداقل سرمایه‌گذاری:</span>
              <span className="font-bold">{fund.minInvestment.toLocaleString()} تومان</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">سطح ریسک:</span>
              <span className={`px-2 py-1 rounded-full text-xs ${
                fund.risk === "کم" ? "bg-green-100 text-green-800" :
                fund.risk === "متوسط" ? "bg-yellow-100 text-yellow-800" :
                "bg-red-100 text-red-800"
              }`}>
                {fund.risk}
              </span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              مبلغ سرمایه‌گذاری (تومان)
            </label>
            <input
              type="number"
              value={investmentAmount}
              onChange={(e) => setInvestmentAmount(e.target.value)}
              placeholder={`حداقل ${fund.minInvestment.toLocaleString()}`}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <button
            onClick={() => onInvest(fund, investmentAmount)}
            className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 transition-colors"
          >
            سرمایه‌گذاری در این صندوق
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

/// -----------------------------
// کامپوننت بودجه‌بندی هوشمند
// -----------------------------
function BudgetingSection() {
  const [budgetData, setBudgetData] = useState(initialBudgetData);
  const [predictions, setPredictions] = useState<any[]>([]);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    // محاسبه پیش‌بینی‌ها بر اساس تورم
    const calculatedPredictions = Object.keys(budgetData.expenses).map(category => {
      const lastMonth = budgetData.expenses[category as keyof typeof budgetData.expenses];
      const inflation = inflationRates[category as keyof typeof inflationRates] || 0;
      const predicted = Math.round(lastMonth * (1 + inflation));
      
      return {
        category,
        lastMonth,
        inflation,
        predicted,
        increase: predicted - lastMonth
      };
    });

    setPredictions(calculatedPredictions);
  }, [budgetData]);

  const handleExpenseChange = (category: string, value: string) => {
    const newValue = parseInt(value) || 0;
    setBudgetData(prev => ({
      ...prev,
      expenses: {
        ...prev.expenses,
        [category]: newValue
      }
    }));
  };

  const handleIncomeChange = (value: string) => {
    const newValue = parseInt(value) || 0;
    setBudgetData(prev => ({
      ...prev,
      income: newValue
    }));
  };

  const totalExpenses = Object.values(budgetData.expenses).reduce((sum, expense) => sum + expense, 0);
  const remaining = budgetData.income - totalExpenses;

  return (
    <div className="bg-white p-6 rounded-2xl shadow border border-gray-100 space-y-6">
      <h3 className="text-lg font-bold text-gray-800">💰 بودجه‌بندی هوشمند ماهانه</h3>

      {/* کارت‌های خلاصه */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
          <div className="text-sm text-green-600 mb-1">درآمد ماهانه</div>
          <div className="text-xl font-bold text-green-700">
            <input
              type="number"
              value={budgetData.income}
              onChange={(e) => handleIncomeChange(e.target.value)}
              className="bg-transparent text-center w-full outline-none"
            />
          </div>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center">
          <div className="text-sm text-red-600 mb-1">هزینه کل</div>
          <div className="text-xl font-bold text-red-700">{totalExpenses.toLocaleString()} تومان</div>
        </div>
        <div className={`border rounded-xl p-4 text-center ${
          remaining >= 0 ? 'bg-blue-50 border-blue-200' : 'bg-orange-50 border-orange-200'
        }`}>
          <div className="text-sm mb-1">مانده قابل سرمایه‌گذاری</div>
          <div className={`text-xl font-bold ${
            remaining >= 0 ? 'text-blue-700' : 'text-orange-700'
          }`}>
            {remaining.toLocaleString()} تومان
          </div>
        </div>
      </div>

      {/* فرم ویرایش هزینه‌ها */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {predictions.map((prediction, index) => (
          <div key={index} className="border rounded-xl p-4 bg-gray-50 hover:shadow-lg transition-all">
            <h4 className="font-bold mb-3 text-blue-700">{prediction.category}</h4>
            
            <div className="space-y-2 mb-3">
              <div className="flex justify-between text-sm">
                <span>هزینه ماه قبل:</span>
                <input
                  type="number"
                  value={prediction.lastMonth}
                  onChange={(e) => handleExpenseChange(prediction.category, e.target.value)}
                  className="bg-white border rounded px-2 py-1 w-24 text-left"
                />
              </div>
              <div className="flex justify-between text-sm">
                <span>نرخ تورم:</span>
                <span className="text-orange-600">{(prediction.inflation * 100).toFixed(0)}%</span>
              </div>
            </div>

            <div className="bg-white rounded-lg p-3 border">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-semibold">پیش‌بینی ماه آینده:</span>
                <span className="text-green-700 font-bold">{prediction.predicted.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-xs text-gray-600">
                <span>افزایش:</span>
                <span className={prediction.increase >= 0 ? "text-green-600" : "text-red-600"}>
                  {prediction.increase.toLocaleString()} تومان
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* نمودارها */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div className="bg-white p-4 rounded-xl border">
          <h4 className="font-bold text-right mb-4">سهم هزینه‌ها در ماه آینده</h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={predictions}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="predicted"
                >
                  {predictions.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={[
                      '#60a5fa', '#f472b6', '#facc15', '#34d399', '#fb923c', '#a78bfa', '#f87171'
                    ][index % 7]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value.toLocaleString()} تومان`, "مبلغ"]} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border">
          <h4 className="font-bold text-right mb-4">مقایسه هزینه قبل و پیش‌بینی</h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={predictions}>
                <XAxis dataKey="category" fontSize={12} />
                <YAxis fontSize={12} />
                <Tooltip formatter={(value) => [`${value.toLocaleString()} تومان`, "مبلغ"]} />
                <Bar dataKey="lastMonth" fill="#93c5fd" name="ماه قبل" />
                <Bar dataKey="predicted" fill="#3b82f6" name="پیش‌بینی" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* دکمه ذخیره */}
      <div className="text-center pt-4">
        {!isSaved ? (
          <button
            onClick={() => setIsSaved(true)}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg shadow-md transition"
          >
            ذخیره بودجه پیشنهادی
          </button>
        ) : (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-green-700 font-semibold">✅ بودجه با موفقیت ذخیره شد</p>
            <p className="text-sm text-green-600 mt-1">
              {remaining >= 0 
                ? `شما ${remaining.toLocaleString()} تومان برای سرمایه‌گذاری دارید`
                : `هزینه‌های شما ${Math.abs(remaining).toLocaleString()} تومان بیشتر از درآمد است`
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
} 

// -----------------------------
// کامپوننت اصلی
// -----------------------------
export default function UserFinancialPath() {
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const [answers, setAnswers] = useState<number[]>(Array(riskQuestions.length).fill(-1));
  const [selectedFund, setSelectedFund] = useState<any>(null);
  const [showFundDetail, setShowFundDetail] = useState(false);
  const [timeRange, setTimeRange] = useState("1m");

  // حالت‌های جدید برای هوش مصنوعی
  const [investmentAmount, setInvestmentAmount] = useState<number>(5000000);
  const [timeHorizon, setTimeHorizon] = useState<number>(3);
  const [userTradingData, setUserTradingData] = useState<UserTradingProfile | null>(null);

  // محاسبه نمره‌ها بر اساس منطق کاربر
  const { riskScore, diversityScore, investPercent, riskCategory, riskLabel } = useMemo(() => {
    if (answers.every((a) => a === -1)) {
      return {
        riskScore: 0,
        diversityScore: 0,
        investPercent: 0.4,
        riskCategory: "کم‌ریسک",
        riskLabel: "⚖ متعادل/کم‌ریسک",
      };
    }

    const mapped = answers.map((a) => (a >= 0 ? a + 1 : 0));
    const rawRisk = mapped.slice(0, 6).reduce((s, v) => s + v, 0);
    const riskScore = Math.round(((rawRisk - 6) / (24 - 6)) * 9 + 1);
    const div = Math.min(10, Math.max(1, (mapped[6] || 1) * 3));

    let investPercent = 0.4;
    if (riskScore <= 3) investPercent = 0.2;
    else if (riskScore <= 6) investPercent = 0.4;
    else investPercent = 0.6;

    let riskCategory = "کم‌ریسک";
    let riskLabel = "⚖ کم‌ریسک/متعادل: ترکیب احتیاط و استفاده از فرصت‌ها";
    if (riskScore <= 3) {
      riskCategory = "محافظه‌کار";
      riskLabel = "📉 محافظه‌کار: امنیت مالی اولویت اصلی شماست";
    } else if (riskScore > 6) {
      riskCategory = "تهاجمی";
      riskLabel = "🚀 تهاجمی: به دنبال رشد سریع حتی با ریسک بالا";
    }

    return { riskScore, diversityScore: div, investPercent, riskCategory, riskLabel };
  }, [answers]);

  const riskData = useMemo(() => {
    const data = [...baseRiskData];
    if (riskCategory === "محافظه‌کار") {
      data[0].value = 60;
      data[1].value = 25;
      data[2].value = 15;
    } else if (riskCategory === "کم‌ریسک" || riskCategory === "متعادل") {
      data[0].value = 30;
      data[1].value = 50;
      data[2].value = 20;
    } else {
      data[0].value = 20;
      data[1].value = 30;
      data[2].value = 50;
    }
    return data;
  }, [riskCategory]);

  // فیلتر معاملات بر اساس بازه زمانی
  const filteredTransactions = useMemo(() => {
    return transactionHistory;
  }, [timeRange]);

  // شبیه‌سازی داده‌های کاربر برای هوش مصنوعی تحلیل رفتار
  useEffect(() => {
    if (riskCategory) {
      const simulatedUserData: UserTradingProfile = {
        userId: "user_123",
        declaredRiskProfile: riskCategory,
        actualBehavior: "متعادل",
        totalPortfolioValue: 50000000,
        consistencyScore: 75,
        learningAbility: 8,
        tradingBehaviors: [
          {
            asset: "طلا",
            totalInvestment: 15000000,
            totalProfitLoss: 2250000,
            totalTransactions: 12,
            averageHoldingPeriod: 45,
            winRate: 67,
            riskPerTrade: 2,
            emotionalDecisions: 3
          },
          {
            asset: "ارز دیجیتال",
            totalInvestment: 8000000,
            totalProfitLoss: -1200000,
            totalTransactions: 25,
            averageHoldingPeriod: 15,
            winRate: 42,
            riskPerTrade: 4,
            emotionalDecisions: 7
          },
          {
            asset: "سهام",
            totalInvestment: 20000000,
            totalProfitLoss: 3500000,
            totalTransactions: 18,
            averageHoldingPeriod: 75,
            winRate: 61,
            riskPerTrade: 3,
            emotionalDecisions: 4
          }
        ]
      };

      setUserTradingData(simulatedUserData);
    }
  }, [riskCategory]);

  const handleFundSelect = (fund: any) => {
    setSelectedFund(fund);
    setShowFundDetail(true);
  };

  const handleInvest = (fund: any, amount: string) => {
    const investmentAmount = parseInt(amount);
    if (investmentAmount && investmentAmount >= fund.minInvestment) {
      alert(`سرمایه‌گذاری ${investmentAmount.toLocaleString()} تومان در ${fund.name} با موفقیت ثبت شد!`);
      setShowFundDetail(false);
      setSelectedFund(null);
    } else {
      alert(`لطفاً مبلغی معتبر (حداقل ${fund.minInvestment.toLocaleString()} تومان) وارد کنید.`);
    }
  };

  return (
    <div className="p-4 md:p-6 max-w-6xl mx-auto" dir="rtl">
      {/* هدر جستجو */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">👋 چطور می‌تونیم کمکت کنیم؟</h2>
        <input type="text" placeholder="سوال مالی‌ت رو اینجا بپرس..." className="w-full max-w-md mx-auto px-4 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm" />
      </div>

      {/* مرحله‌ها */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { key: "risk", title: "تعیین شخصیت سرمایه‌گذاری", icon: "📊" },
          { key: "income", title: "درآمد و هزینه‌ها", icon: "💰" },
          { key: "behavior", title: "رفتارهای معاملاتی", icon: "🧠" },
          { key: "path", title: "مسیر مالی اختصاصی", icon: "🛣️" },
        ].map((step) => (
          <div
            key={step.key}
            onClick={() => setActiveKey(activeKey === step.key ? null : step.key)}
            className={`cursor-pointer border rounded-xl p-4 shadow hover:shadow-md transition-all bg-white relative overflow-hidden ${
              activeKey === step.key ? "ring-2 ring-indigo-400" : ""
            }`}
          >
            <div className="absolute -left-10 top-1/2 -translate-y-1/2 h-20 w-20 rounded-full bg-indigo-50"/>
            <div className="flex flex-col items-center relative">
              <div className="text-3xl mb-2">{step.icon}</div>
              <h4 className="text-sm font-bold text-gray-800 text-center">{step.title}</h4>
            </div>
          </div>
        ))}
      </div>

      {/* محتوای مرحله فعال */}
      {activeKey === "risk" && (
        <motion.div
          className="mt-8"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
        >
          <div className="bg-white p-6 rounded-2xl shadow border border-gray-100">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* فرم سوالات */}
              <div className="lg:col-span-2 space-y-5">
                <h3 className="text-base font-bold text-gray-800">📋 پرسشنامه شخصیت سرمایه‌گذاری</h3>
                {riskQuestions.map((q, qi) => (
                  <div key={q.id} className="border rounded-xl p-4">
                    <p className="font-medium text-gray-800 mb-3">{qi + 1}. {q.text}</p>
                    <div className="grid sm:grid-cols-2 gap-2">
                      {q.options.map((opt, oi) => {
                        const id = `q${q.id}_o${oi}`;
                        return (
                          <label
                            key={id}
                            htmlFor={id}
                            className={`flex items-center gap-2 text-sm border rounded-lg px-3 py-2 cursor-pointer hover:bg-gray-50 ${
                              answers[qi] === oi ? "border-indigo-400 ring-1 ring-indigo-200 bg-indigo-50" : "border-gray-200"
                            }`}
                          >
                            <input
                              id={id}
                              name={`q_${q.id}`}
                              type="radio"
                              className="accent-indigo-600"
                              checked={answers[qi] === oi}
                              onChange={() =>
                                setAnswers((prev) => {
                                  const draft = [...prev];
                                  draft[qi] = oi;
                                  return draft;
                                })
                              }
                            />
                            <span>{opt}</span>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              {/* خلاصه و نمودار */}
              <div className="space-y-4">
                <div className="p-4 rounded-2xl border shadow-sm">
                  <h4 className="font-bold text-gray-700 mb-2">نتیجه تحلیل</h4>
                  <p className="text-sm text-gray-700">{riskLabel}</p>
                  <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                    <div className="bg-indigo-50 rounded-lg p-3">
                      <div className="text-xs text-gray-500">نمره ریسک</div>
                      <div className="text-xl font-bold text-indigo-700">{riskScore}</div>
                    </div>
                    <div className="bg-emerald-50 rounded-lg p-3">
                      <div className="text-xs text-gray-500">تنوع‌طلبی</div>
                      <div className="text-xl font-bold text-emerald-700">{diversityScore}</div>
                    </div>
                    <div className="bg-amber-50 rounded-lg p-3">
                      <div className="text-xs text-gray-500">درصد سرمایه‌گذاری</div>
                      <div className="text-xl font-bold text-amber-700">{Math.round(investPercent * 100)}%</div>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-2xl border shadow-sm">
                  <h4 className="font-bold text-gray-700 mb-3">نوع شخصیت شما</h4>
                  <div className="text-sm text-gray-600 mb-2">{riskCategory}</div>
                  <div className="h-48">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie data={riskData} cx="50%" cy="50%" innerRadius={48} outerRadius={70} dataKey="value">
                          {riskData.map((e, i) => (
                            <Cell key={i} fill={e.color} />
                          ))}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex justify-center gap-3 text-xs mt-2">
                    {riskData.map((d) => (
                      <div key={d.name} className="flex items-center gap-1">
                        <span className="inline-block w-2.5 h-2.5 rounded-full" style={{ background: d.color }} />
                        <span className="text-gray-600">{d.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* نمایش پورتفولیو پیشنهادی وقتی کاربر به سوالات پاسخ داد */}
          {answers.every(a => a !== -1) && (
            <>
              <SuggestedPortfolio 
                riskCategory={riskCategory} 
                diversityScore={diversityScore}
                onFundSelect={handleFundSelect}
              />
              
              {/* بخش جدید: ورودی‌های کاربر برای پورتفولیو */}
              <div className="bg-white p-6 rounded-2xl shadow border border-gray-100 mt-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4">💰 مشخصات سرمایه‌گذاری</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      مبلغ سرمایه‌گذاری (تومان)
                    </label>
                    <input
                      type="number"
                      value={investmentAmount}
                      onChange={(e) => setInvestmentAmount(Number(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                      placeholder="5000000"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      افق سرمایه‌گذاری (سال)
                    </label>
                    <select
                      value={timeHorizon}
                      onChange={(e) => setTimeHorizon(Number(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value={1}>کوتاه‌مدت (۱ سال)</option>
                      <option value={3}>میان‌مدت (۳ سال)</option>
                      <option value={5}>بلندمدت (۵ سال)</option>
                    </select>
                  </div>
                </div>
              </div>
              
              {/* بخش هوش مصنوعی */}
              <AIPortfolioRecommendation 
                riskCategory={riskCategory}
                investmentAmount={investmentAmount}
                timeHorizon={timeHorizon}
              />
            </>
          )}
        </motion.div>
      )}

      {activeKey === "income" && (
        <motion.div
          className="mt-8"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
        >
          <BudgetingSection />
        </motion.div>
      )}

      {activeKey === "behavior" && (
        <motion.div
          className="mt-8"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
        >
          <div className="bg-white p-6 rounded-2xl shadow border border-gray-100 mb-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-gray-800">📈 تاریخچه معاملات و سود/زیان</h3>
              <div className="flex gap-2">
                <button 
                  onClick={() => setTimeRange("1m")}
                  className={`px-3 py-1 rounded-lg text-sm ${
                    timeRange === "1m" ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-700"
                  }`}
                >
                  ۱ ماهه
                </button>
                <button 
                  onClick={() => setTimeRange("3m")}
                  className={`px-3 py-1 rounded-lg text-sm ${
                    timeRange === "3m" ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-700"
                  }`}
                >
                  ۳ ماهه
                </button>
                <button 
                  onClick={() => setTimeRange("1y")}
                  className={`px-3 py-1 rounded-lg text-sm ${
                    timeRange === "1y" ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-700"
                  }`}
                >
                  ۱ ساله
                </button>
              </div>
            </div>

            {/* نمودار عملکرد */}
            <div className="mb-6">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="طلا" stroke="#F59E0B" strokeWidth={2} />
                  <Line type="monotone" dataKey="سهام" stroke="#3B82F6" strokeWidth={2} />
                  <Line type="monotone" dataKey="ارز" stroke="#EF4444" strokeWidth={2} />
                  <Line type="monotone" dataKey="اوراق" stroke="#10B981" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* جدول معاملات با سود/زیان */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-right">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="p-3">تاریخ</th>
                    <th className="p-3">نوع</th>
                    <th className="p-3">دارایی</th>
                    <th className="p-3">مبلغ سرمایه‌گذاری</th>
                    <th className="p-3">سود/زیان</th>
                    <th className="p-3">درصد</th>
                    <th className="p-3">مدت</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTransactions.map((transaction, index) => (
                    <tr key={index} className="border-b hover:bg-gray-50">
                      <td className="p-3">{transaction.date}</td>
                      <td className="p-3">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          transaction.type === "خرید" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                        }`}>
                          {transaction.type}
                        </span>
                      </td>
                      <td className="p-3">{transaction.asset}</td>
                      <td className="p-3">{transaction.amount.toLocaleString()} تومان</td>
                      <td className={`p-3 font-semibold ${
                        transaction.profitLoss >= 0 ? "text-green-600" : "text-red-600"
                      }`}>
                        {transaction.profitLoss >= 0 ? "+" : ""}{transaction.profitLoss.toLocaleString()} تومان
                      </td>
                      <td className={`p-3 ${
                        transaction.profitLossPercent >= 0 ? "text-green-600" : "text-red-600"
                      }`}>
                        {transaction.profitLossPercent >= 0 ? "+" : ""}{transaction.profitLossPercent}%
                      </td>
                      <td className="p-3 text-gray-600">{transaction.duration}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* خلاصه عملکرد */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
                <div className="text-sm text-green-600 mb-1">کل سرمایه‌گذاری</div>
                <div className="text-lg font-bold text-green-700">
                  {filteredTransactions.reduce((sum, t) => sum + t.amount, 0).toLocaleString()} تومان
                </div>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-center">
                <div className="text-sm text-blue-600 mb-1">تعداد معاملات</div>
                <div className="text-lg font-bold text-blue-700">{filteredTransactions.length}</div>
              </div>
              <div className="bg-purple-50 border border-purple-200 rounded-xl p-4 text-center">
                <div className="text-sm text-purple-600 mb-1">میانگین سود/معامله</div>
                <div className="text-lg font-bold text-purple-700">
                  {(filteredTransactions.reduce((sum, t) => sum + t.profitLoss, 0) / filteredTransactions.length).toLocaleString()} تومان
                </div>
              </div>
              <div className={`border rounded-xl p-4 text-center ${
                filteredTransactions.reduce((sum, t) => sum + t.profitLoss, 0) >= 0 
                  ? 'bg-emerald-50 border-emerald-200' 
                  : 'bg-orange-50 border-orange-200'
              }`}>
                <div className="text-sm mb-1">سود/زیان کل</div>
                <div className={`text-lg font-bold ${
                  filteredTransactions.reduce((sum, t) => sum + t.profitLoss, 0) >= 0 
                    ? 'text-emerald-700' 
                    : 'text-orange-700'
                }`}>
                  {filteredTransactions.reduce((sum, t) => sum + t.profitLoss, 0).toLocaleString()} تومان
                </div>
              </div>
            </div>
          </div>

          {/* تحلیل هوش مصنوعی رفتار معاملاتی */}
          {userTradingData && (
            <AITradingAnalysis userTradingData={userTradingData} />
          )}
        </motion.div>
      )}

      {activeKey === "path" && (
        <motion.div
          className="mt-8 bg-white p-6 rounded-2xl shadow border border-gray-100"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
        >
          <h3 className="text-base font-bold text-gray-800 mb-4">مسیر مالی اختصاصی</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {pathCards.map((card) => (
              <div key={card.key} className="border rounded-2xl overflow-hidden shadow-sm bg-white">
                <div className={`bg-gradient-to-r ${card.gradient} text-white p-4 flex items-center justify-between`}>
                  <div>
                    <div className="text-xs opacity-90">برچسب</div>
                    <div className="text-lg font-bold">{card.title}</div>
                  </div>
                  <span className="text-xs bg-white/20 px-3 py-1 rounded-full">{card.badge}</span>
                </div>

                <div className="px-4 py-3 grid grid-cols-3 gap-2">
                  {card.kpis.map((k) => (
                    <div key={k.label} className="bg-gray-50 rounded-xl p-3 text-center">
                      <div className="text-[11px] text-gray-500">{k.label}</div>
                      <div className="text-sm font-bold text-gray-800">{k.value}</div>
                    </div>
                  ))}
                </div>

                <div className="px-4 pb-4 text-sm">
                  <div className="grid grid-cols-1 gap-3">
                    <div className="bg-white border rounded-xl p-3">
                      <div className="font-semibold text-emerald-600 mb-1">✔ مزایا</div>
                      <ul className="list-disc pr-4 space-y-1 text-gray-700">
                        {card.pros.map((p, i) => (
                          <li key={i}>{p}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-white border rounded-xl p-3">
                      <div className="font-semibold text-rose-600 mb-1">✘ معایب</div>
                      <ul className="list-disc pr-4 space-y-1 text-gray-700">
                        {card.cons.map((c, i) => (
                          <li key={i}>{c}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="border-t px-4 py-3 flex items-center justify-between">
                  <div className="text-sm text-gray-500">تناسب با پروفایل: <span className="font-bold text-gray-800">{riskCategory === "تهاجمی" && card.key === "aggressive" ? "زیاد" : riskCategory === "محافظه‌کار" && card.key === "conservative" ? "زیاد" : "متوسط"}</span></div>
                  <button className="px-3 py-1.5 rounded-lg bg-gray-900 text-white text-sm hover:bg-black">انتخاب</button>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* مودال جزئیات صندوق */}
      {showFundDetail && (
        <FundDetail
          fund={selectedFund}
          onBack={() => {
            setShowFundDetail(false);
            setSelectedFund(null);
          }}
          onInvest={handleInvest}
        />
      )}
    </div>
  );
}