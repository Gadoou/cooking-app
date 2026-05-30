import React, { createContext, useContext, useState } from 'react';

const translations: Record<string, string> = {
  "welcomeFoodie": "أهلاً بك يا طباخ!",
  "mainTitle": "ماذا تريد أن تطبخ اليوم؟",
  "subTitle": "الخيار الذي يناسب وقتك وميزانيتك",
  "searchPlaceholder": "البحث عن وصفة أو مكون",
  "quick": "سريع",
  "cost": "ميزانية",
  "group": "مجموعات",
  "all": "الكل",
  "custom": "تصفية",
  "suggestedRecipes": "وصفات مقترحة",
  "recipeNotFound": "الوصفة غير موجودة",
  "recipeDetails": "تفاصيل الوصفة",
  "liked": "أعجبني",
  "like": "إعجاب",
  "weeklyPlan": "الخطة الأسبوعية",
  "overview": "نظرة عامة",
  "ingredients": "المكونات",
  "steps": "الخطوات",
  "reviews": "التقييمات",
  "ingredientsChecklist": "قائمة المكونات",
  "missing": "مفقود",
  "mealFor": "وجبة لـ",
  "cookingSteps": "خطوات الطبخ",
  "mins": "دقائق",
  "startGuidedCooking": "ابدأ الطبخ الموجه",
  "communityReviews": "آراء المجتمع",
  "rateThisRecipe": "قيم هذه الوصفة",
  "shareExperience": "شارك تجربتك...",
  "submitReview": "إرسال التقييم",
  "noReviewsYet": "لا توجد تقييمات بعد. كن أول من يقيم!",
  "missingTotal": "إجمالي المفقود:",
  "orderMissingItems": "طلب المكونات المفقودة",
  "Your Week": "خطتك الأسبوعية",
  "Your Profile": "حسابك الشخصي",
  "My Recipes": "وصفاتي",
  "Apply Filters": "تطبيق التصفية",
  "Filters": "تصفية",
  "Reset": "إعادة ضبط",
  "Cancel": "إلغاء",
};

interface LanguageContextType {
  isRTL: boolean;
  toggleLayout: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [isRTL, setIsRTL] = useState(false);

  const toggleLayout = () => setIsRTL(!isRTL);
  const t = (key: string) => (isRTL ? translations[key] || key : key);

  return (
    <LanguageContext.Provider value={{ isRTL, toggleLayout, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within a LanguageProvider');
  return context;
};
