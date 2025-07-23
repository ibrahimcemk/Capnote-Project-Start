// AI Service for intelligent features
export interface AIInsight {
  id: string;
  type: 'suggestion' | 'reminder' | 'optimization' | 'pattern';
  title: string;
  description: string;
  action?: string;
  priority: 'low' | 'medium' | 'high';
  category: string;
  createdAt: Date;
}

export interface SpendingPattern {
  category: string;
  averageAmount: number;
  frequency: string;
  trend: 'increasing' | 'decreasing' | 'stable';
  prediction: number;
}

export interface ProductivityInsight {
  completionRate: number;
  mostProductiveTime: string;
  commonTags: string[];
  suggestions: string[];
}

class AIService {
  private static instance: AIService;

  private constructor() {}

  static getInstance(): AIService {
    if (!AIService.instance) {
      AIService.instance = new AIService();
    }
    return AIService.instance;
  }

  // Akıllı kategori önerisi
  suggestCategory(title: string, description: string): string {
    const text = `${title} ${description}`.toLowerCase();
    
    // İş ile ilgili kelimeler
    if (text.includes('toplantı') || text.includes('proje') || text.includes('sunum') || 
        text.includes('rapor') || text.includes('müşteri') || text.includes('ofis')) {
      return 'İş';
    }
    
    // Alışveriş ile ilgili kelimeler
    if (text.includes('market') || text.includes('alışveriş') || text.includes('satın') || 
        text.includes('mağaza') || text.includes('ürün') || text.includes('sipariş')) {
      return 'Alışveriş';
    }
    
    // Sağlık ile ilgili kelimeler
    if (text.includes('doktor') || text.includes('hastane') || text.includes('ilaç') || 
        text.includes('egzersiz') || text.includes('spor') || text.includes('diyet')) {
      return 'Sağlık';
    }
    
    // Eğitim ile ilgili kelimeler
    if (text.includes('ders') || text.includes('ödev') || text.includes('sınav') || 
        text.includes('kurs') || text.includes('eğitim') || text.includes('öğren')) {
      return 'Eğitim';
    }
    
    return 'Kişisel';
  }

  // Akıllı etiket rengi önerisi
  suggestTagColor(category: string): string {
    const colorMap: { [key: string]: string } = {
      'İş': '#3B82F6',
      'Kişisel': '#10B981',
      'Önemli': '#F59E0B',
      'İdea': '#8B5CF6',
      'Alışveriş': '#EF4444',
      'Sağlık': '#06B6D4',
      'Eğitim': '#F97316',
      'Finans': '#84CC16',
      'Seyahat': '#EC4899',
      'Ev': '#6B7280'
    };
    
    return colorMap[category] || '#6B7280';
  }

  // Harcama analizi
  analyzeSpendingPatterns(payments: any[]): SpendingPattern[] {
    const patterns: { [key: string]: any } = {};
    
    payments.forEach(payment => {
      const category = this.categorizePayment(payment.title);
      if (!patterns[category]) {
        patterns[category] = {
          amounts: [],
          dates: [],
          count: 0
        };
      }
      patterns[category].amounts.push(payment.amount);
      patterns[category].dates.push(new Date(payment.dueDate));
      patterns[category].count++;
    });

    return Object.entries(patterns).map(([category, data]: [string, any]) => {
      const averageAmount = data.amounts.reduce((a: number, b: number) => a + b, 0) / data.amounts.length;
      const frequency = this.calculateFrequency(data.dates);
      const trend = this.calculateTrend(data.amounts);
      
      return {
        category,
        averageAmount,
        frequency,
        trend,
        prediction: averageAmount * (trend === 'increasing' ? 1.1 : trend === 'decreasing' ? 0.9 : 1)
      };
    });
  }

  // Ödeme kategorilendirme
  private categorizePayment(title: string): string {
    const titleLower = title.toLowerCase();
    
    if (titleLower.includes('elektrik') || titleLower.includes('su') || titleLower.includes('doğalgaz') || titleLower.includes('internet')) {
      return 'Faturalar';
    }
    if (titleLower.includes('kira') || titleLower.includes('aidat')) {
      return 'Konut';
    }
    if (titleLower.includes('market') || titleLower.includes('yemek') || titleLower.includes('restoran')) {
      return 'Yiyecek';
    }
    if (titleLower.includes('benzin') || titleLower.includes('otobüs') || titleLower.includes('taksi')) {
      return 'Ulaşım';
    }
    if (titleLower.includes('netflix') || titleLower.includes('spotify') || titleLower.includes('sinema')) {
      return 'Eğlence';
    }
    
    return 'Diğer';
  }

  // Frekans hesaplama
  private calculateFrequency(dates: Date[]): string {
    if (dates.length < 2) return 'Tek seferlik';
    
    const intervals = dates.sort((a, b) => a.getTime() - b.getTime())
      .slice(1)
      .map((date, index) => date.getTime() - dates[index].getTime());
    
    const avgInterval = intervals.reduce((a, b) => a + b, 0) / intervals.length;
    const days = avgInterval / (1000 * 60 * 60 * 24);
    
    if (days <= 7) return 'Haftalık';
    if (days <= 31) return 'Aylık';
    if (days <= 365) return 'Yıllık';
    return 'Düzensiz';
  }

  // Trend hesaplama
  private calculateTrend(amounts: number[]): 'increasing' | 'decreasing' | 'stable' {
    if (amounts.length < 3) return 'stable';
    
    const recent = amounts.slice(-3);
    const older = amounts.slice(0, -3);
    
    const recentAvg = recent.reduce((a, b) => a + b, 0) / recent.length;
    const olderAvg = older.reduce((a, b) => a + b, 0) / older.length;
    
    const change = (recentAvg - olderAvg) / olderAvg;
    
    if (change > 0.1) return 'increasing';
    if (change < -0.1) return 'decreasing';
    return 'stable';
  }

  // Verimlilik analizi
  analyzeProductivity(notes: any[]): ProductivityInsight {
    const completedTasks = notes.filter(note => 
      note.checklist && note.checklist.length > 0 && 
      note.checklist.every((item: any) => item.isDone)
    );
    
    const completionRate = notes.length > 0 ? (completedTasks.length / notes.length) * 100 : 0;
    
    // En verimli zaman analizi
    const hourCounts: { [key: number]: number } = {};
    notes.forEach(note => {
      if (note.createdAt) {
        const hour = new Date(note.createdAt).getHours();
        hourCounts[hour] = (hourCounts[hour] || 0) + 1;
      }
    });
    
    const mostProductiveHour = Object.entries(hourCounts)
      .sort(([,a], [,b]) => b - a)[0]?.[0] || '9';
    
    const mostProductiveTime = `${mostProductiveHour}:00 - ${parseInt(mostProductiveHour) + 1}:00`;
    
    // Yaygın etiketler
    const tagCounts: { [key: string]: number } = {};
    notes.forEach(note => {
      if (note.tag) {
        tagCounts[note.tag] = (tagCounts[note.tag] || 0) + 1;
      }
    });
    
    const commonTags = Object.entries(tagCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 3)
      .map(([tag]) => tag);

    // Öneriler
    const suggestions = this.generateProductivitySuggestions(completionRate, commonTags);

    return {
      completionRate,
      mostProductiveTime,
      commonTags,
      suggestions
    };
  }

  // Verimlilik önerileri
  private generateProductivitySuggestions(completionRate: number, commonTags: string[]): string[] {
    const suggestions: string[] = [];
    
    if (completionRate < 50) {
      suggestions.push('Görevlerinizi daha küçük parçalara bölmeyi deneyin');
      suggestions.push('Günlük hedeflerinizi daha gerçekçi belirleyin');
    } else if (completionRate > 80) {
      suggestions.push('Harika! Daha zorlu hedefler belirlemeyi düşünebilirsiniz');
    }
    
    if (commonTags.includes('İş')) {
      suggestions.push('İş görevleriniz için Pomodoro tekniğini deneyebilirsiniz');
    }
    
    if (commonTags.includes('Kişisel')) {
      suggestions.push('Kişisel gelişim için haftalık hedefler belirleyin');
    }
    
    suggestions.push('Düzenli molalar verimliliğinizi artırabilir');
    suggestions.push('Benzer görevleri gruplandırarak zaman kazanabilirsiniz');
    
    return suggestions;
  }

  // AI öngörüleri oluştur
  generateInsights(notes: any[], payments: any[]): AIInsight[] {
    const insights: AIInsight[] = [];
    
    // Yaklaşan ödemeler için öneriler
    const upcomingPayments = payments.filter(p => {
      const dueDate = new Date(p.dueDate);
      const today = new Date();
      const diffDays = Math.ceil((dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
      return diffDays <= 7 && diffDays > 0 && !p.isPaid;
    });

    if (upcomingPayments.length > 0) {
      insights.push({
        id: 'upcoming-payments',
        type: 'reminder',
        title: 'Yaklaşan Ödemeler',
        description: `${upcomingPayments.length} ödemenizin son tarihi bu hafta içinde`,
        action: 'Ödemeleri görüntüle',
        priority: 'high',
        category: 'Finans',
        createdAt: new Date()
      });
    }

    // Tamamlanmamış görevler
    const incompleteTasks = notes.filter(note => 
      note.checklist && note.checklist.length > 0 && 
      note.checklist.some((item: any) => !item.isDone)
    );

    if (incompleteTasks.length > 5) {
      insights.push({
        id: 'incomplete-tasks',
        type: 'optimization',
        title: 'Çok Fazla Açık Görev',
        description: `${incompleteTasks.length} göreviniz tamamlanmayı bekliyor`,
        action: 'Görevleri önceliklendir',
        priority: 'medium',
        category: 'Verimlilik',
        createdAt: new Date()
      });
    }

    // Harcama trendi
    const spendingPatterns = this.analyzeSpendingPatterns(payments);
    const increasingSpending = spendingPatterns.filter(p => p.trend === 'increasing');
    
    if (increasingSpending.length > 0) {
      insights.push({
        id: 'spending-trend',
        type: 'pattern',
        title: 'Artan Harcama Trendi',
        description: `${increasingSpending[0].category} kategorisinde harcamalarınız artıyor`,
        action: 'Bütçe planı oluştur',
        priority: 'medium',
        category: 'Finans',
        createdAt: new Date()
      });
    }

    // Verimlilik önerisi
    const productivity = this.analyzeProductivity(notes);
    if (productivity.completionRate < 60) {
      insights.push({
        id: 'productivity-tip',
        type: 'suggestion',
        title: 'Verimlilik İpucu',
        description: 'Görev tamamlama oranınızı artırmak için küçük hedefler belirleyin',
        priority: 'low',
        category: 'Verimlilik',
        createdAt: new Date()
      });
    }

    return insights;
  }

  // Akıllı hatırlatma önerisi
  suggestReminderTime(title: string, dueDate: Date): Date {
    const titleLower = title.toLowerCase();
    const reminderDate = new Date(dueDate);
    
    // Fatura ödemeleri için 3 gün önceden
    if (titleLower.includes('fatura') || titleLower.includes('elektrik') || titleLower.includes('su')) {
      reminderDate.setDate(reminderDate.getDate() - 3);
      reminderDate.setHours(9, 0, 0, 0);
      return reminderDate;
    }
    
    // Önemli toplantılar için 1 saat önceden
    if (titleLower.includes('toplantı') || titleLower.includes('randevu')) {
      reminderDate.setHours(reminderDate.getHours() - 1);
      return reminderDate;
    }
    
    // Genel görevler için 1 gün önceden
    reminderDate.setDate(reminderDate.getDate() - 1);
    reminderDate.setHours(10, 0, 0, 0);
    return reminderDate;
  }

  // Akıllı görev önerisi
  suggestTasks(notes: any[], currentTime: Date): string[] {
    const suggestions: string[] = [];
    const hour = currentTime.getHours();
    
    // Sabah önerileri (6-12)
    if (hour >= 6 && hour < 12) {
      suggestions.push('Günlük hedeflerinizi gözden geçirin');
      suggestions.push('En önemli 3 görevinizi belirleyin');
      if (notes.filter(n => n.tag === 'İş').length > 0) {
        suggestions.push('İş görevlerinize odaklanın');
      }
    }
    
    // Öğlen önerileri (12-17)
    else if (hour >= 12 && hour < 17) {
      suggestions.push('Sabah hedeflerinizi kontrol edin');
      suggestions.push('Kısa bir mola verin');
      suggestions.push('Yarım kalan görevleri tamamlayın');
    }
    
    // Akşam önerileri (17-22)
    else if (hour >= 17 && hour < 22) {
      suggestions.push('Günü değerlendirin');
      suggestions.push('Yarın için plan yapın');
      suggestions.push('Kişisel görevlerinize zaman ayırın');
    }
    
    // Gece önerileri (22-6)
    else {
      suggestions.push('Yarın için hazırlık yapın');
      suggestions.push('Dinlenme zamanı');
      suggestions.push('Telefonu bırakıp kitap okuyun');
    }
    
    return suggestions.slice(0, 2); // En fazla 2 öneri
  }
}

export const aiService = AIService.getInstance();