import React, { createContext, useContext, useState } from 'react';

const translations: Record<string, string> = {
  // UI General
  "Welcome, Foodie!": "أهلاً بك يا طباخ!",
  "What do you wanna cook today?": "ماذا تريد أن تطبخ اليوم؟",
  "the choice that matches your time and budget": "الخيار الذي يناسب وقتك وميزانيتك",
  "search by recipe or ingredient": "البحث عن وصفة أو مكون",
  "Home": "الرئيسية",
  "Planner": "المخطط",
  "Quick": "سريع",
  "Budget": "ميزانية",
  "Groups": "مجموعات",
  "All": "الكل",
  "Filter": "تصفية",
  "Suggested Recipes": "وصفات مقترحة",
  "Recipe Details": "تفاصيل الوصفة",
  "Liked": "أعجبني",
  "Like": "إعجاب",
  "Weekly Plan": "الخطة الأسبوعية",
  "Overview": "نظرة عامة",
  "Ingredients": "المكونات",
  "Steps": "الخطوات",
  "Reviews": "التقييمات",
  "Ingredients Checklist": "قائمة المكونات",
  "missing": "مفقود",
  "meal for": "وجبة لـ",
  "Cooking Steps": "خطوات الطبخ",
  "mins": "دقائق",
  "Start Guided Cooking": "ابدأ الطبخ الموجه",
  "Community Reviews": "آراء المجتمع",
  "Rate this recipe": "قيم هذه الوصفة",
  "Share your experience...": "شارك تجربتك...",
  "Submit Review": "إرسال التقييم",
  "No reviews yet. Be the first!": "لا توجد تقييمات بعد. كن أول من يقيم!",
  "Missing Total:": "إجمالي المفقود:",
  "Order Missing Items": "طلب المكونات المفقودة",
  "Your Week": "خطتك الأسبوعية",
  "Your Profile": "حسابك الشخصي",
  "Your Favorites": "وصفاتي المفضلة",
  "You haven't liked any recipes yet.": "لم تعجب بأي وصفات بعد.",
  "Grocery List": "قائمة المشتريات",
  "Today's check out": "مشتريات اليوم",
  "The whole week": "مشتريات الأسبوع",
  "Place Order": "إتمام الطلب",
  "Cancel": "إلغاء",
  "Filters": "تصفية",
  "Reset": "إعادة ضبط",
  "Apply Filters": "تطبيق التصفية",
  "Select Day": "اختر اليوم",
  "Select Slot": "اختر الوجبة",

  // Days
  "Monday": "الاثنين",
  "Tuesday": "الثلاثاء",
  "Wednesday": "الأربعاء",
  "Thursday": "الخميس",
  "Friday": "الجمعة",
  "Saturday": "السبت",
  "Sunday": "الأحد",

  // Meal Slots
  "Breakfast": "الإفطار",
  "Lunch": "الغداء",
  "Dinner": "العشاء",
  "Tap to add a meal": "اضغط لإضافة وجبة",

  // Filter Modal
  "Cooking Time": "وقت الطبخ",
  "How many will be eating": "عدد الأشخاص",
  "Diet": "النظام الغذائي",
  "Meal Origin": "أصل الوجبة",
  "Cook with what you have": "اطبخ بما لديك",
  "Any": "الكل",
  "Under $100": "أقل من 100$",
  "$100-200": "100-200$",
  "Over $200": "أكثر من 200$",
  "Under 15m": "أقل من 15د",
  "15-30m": "15-30د",
  "Over 45m": "أكثر من 45د",
  "1 Person": "شخص واحد",
  "2 People": "شخصان",
  "4 People": "4 أشخاص",
  "Balanced": "متوازن",
  "Protein": "بروتين",
  "Healthy": "صحي",
  "Asian": "آسيوي",
  "Egyptian": "مصري",
  "Italian": "إيطالي",
  "Indian": "هندي",

  // Diet Styles (Internal)
  "lowCal": "صحي",
  "protein": "بروتين",
  "vegan": "متوازن",
  "group": "مجموعات",

  // Profile
  "Account info": "معلومات الحساب",
  "Modify account info": "تعديل معلومات الحساب",
  "Notifications": "التنبيهات",
  "Privacy & security": "الخصوصية والأمان",
  "App services": "خدمات التطبيق",
  "Data usage": "استخدام البيانات",
  "Info about the app": "معلومات عن التطبيق",
  "App visuals": "مظهر التطبيق",
  "Light Mode": "الوضع الفاتح",
  "Dark Mode": "الوضع الداكن",
  "Help": "المساعدة",
  "Call customer service": "اتصل بخدمة العملاء",
  "Q&As": "الأسئلة الشائعة",
  "Other help choices": "خيارات مساعدة أخرى",

  // Recipes
  "Spicy Garlic Pasta": "باستا الثوم الحارة",
  "High Protein Chicken Bowl": "وعاء الدجاج عالي البروتين",
  "Vegan Quinoa Salad": "سلطة الكينوا النباتية",
  "Family Taco Feast": "وليمة التاكو العائلية",
  "Budget Lentil Soup": "شوربة العدس الاقتصادية",
  "Keto Salmon Steak": "ستيك السلمون كيتو",

  // Ingredients
  "Pasta": "باستا",
  "Garlic": "ثوم",
  "Olive Oil": "زيت زيتون",
  "Chicken": "دجاج",
  "Rice": "أرز",
  "Broccoli": "بروكلي",
  "Quinoa": "كينوا",
  "Cucumber": "خيار",
  "Lemon": "ليمون",
  "Beef": "لحم بقر",
  "Tortillas": "تورتيلا",
  "Avocado": "أفوكادو",
  "Lentils": "عدس",
  "Carrots": "جزر",
  "Onions": "بصل",
  "Salmon": "سلمون",
  "Butter": "زبدة",
  "Asparagus": "هليون"
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
