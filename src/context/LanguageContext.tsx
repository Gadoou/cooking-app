import React, { createContext, useContext, useState } from 'react';

const translations: Record<string, string> = {
  // UI General
  "Welcome, Foodie!": "أهلاً بك يا طباخ!",
  "What do you wanna cook today?": "ماذا تريد أن تطبخ اليوم؟",
  "the choice that matches your time and budget": "الخيار الذي يناسب وقتك وميزانيتك",
  "search by recipe or ingredient": "البحث عن وصفة أو مكون",
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
  "Your Week": "الخطة الأسبوعية",
  "Your Profile": "حسابي",
  "Your Favorites": "وصفاتي المفضلة",
  "You haven't liked any recipes yet.": "لم تعجب بأي وصفات بعد.",
  "Grocery List": "قائمة المشتريات",
  "Today's check out": "مشتريات اليوم",
  "The whole week": "مشتريات الأسبوع",
  "Place Order": "إتمام الطلب",
  "Cancel": "إلغاء",
  "$": "ج.م",
  "Filters": "تصفية",
  "Reset": "إعادة ضبط",
  "Apply Filters": "تطبيق التصفية",
  "Select Day": "اختر اليوم",
  "Select Slot": "اختر الوجبة",

  // Stats
  "Meals": "وجبات",
  "Total Cost": "إجمالي التكلفة",
  "Avg. Time": "متوسط الوقت",

  // Grocery List
  "Total to Buy:": "إجمالي الشراء:",
  "No ingredients found in plan.": "لا توجد مكونات في الخطة.",
  "Your order for": "طلبك بقيمة",
  "has been placed successfully!": "تم بنجاح!",

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

  // Navigation
  "Home": "الرئيسية",
  "My Recipes": "وصفاتي",
  "Planner": "الخطة",
  "Profile": "حسابي",

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
  "Kafta": "كفته",
  "Thanksgiving Turkey": "ديك رومي",
  "Steak": "ستيك",
  "Potato": "بطاطس",
  "Milk": "حليب",
  "Oil": "زيت",
  "Pepper": "فلفل",
  "Black Pepper": "فلفل أسود",

  // Steak Steps
  "Steak with Mashed Potatoes: A perfectly seared sirloin paired with creamy, buttery mashed potatoes.": "ستيك مع بطاطس مهروسة: سيرلوين مشوي بإتقان مع بطاطس مهروسة كريمية بالزبدة.",
  "Take the steak out of the fridge 20–30 minutes before cooking. Prep all other items.": "أخرج الستيك من الثلاجة قبل ٢٠-٣٠ دقيقة من الطبخ. جهز باقي المكونات.",
  "Dry the steak very well. Season both sides with salt and black pepper.": "جفف الستيك جيداً. تبل الجانبين بالملح والفلفل الأسود.",
  "Heat pan on high. Add oil and wait until hot and shiny.": "سخن المقلاة على نار عالية. أضف الزيت وانتظر حتى يسخن ويلمع.",
  "Place steak in pan. Let sear for 2–3 minutes until it gets a brown crust.": "ضع الستيك في المقلاة. اتركه يتشوح لمدة ٢-٣ دقائق حتى تتكون قشرة بنية.",
  "Flip steak. Add butter, garlic, and herbs. Baste the steak for 2–3 minutes.": "اقلب الستيك. أضف الزبدة والثوم والأعشاب. اسكب الزبدة المذابة فوق الستيك لمدة ٢-٣ دقائق.",
  "Remove from pan and let it rest for 5–7 minutes before cutting.": "أخرجه من المقلاة واتركه يرتاح لمدة ٥-٧ دقائق قبل التقطيع.",
  "Boil potato until soft. Mash with butter, milk, salt, and pepper until creamy.": "اسلق البطاطس حتى تنضج. اهرسها مع الزبدة والحليب والملح والفلفل حتى تصبح كريمية.",
  "Slice steak or serve whole beside the mashed potatoes. Enjoy!": "قطع الستيك أو قدمه كاملاً بجانب البطاطس المهروسة. استمتع!",

  "Chicken Shawarma": "شاورما دجاج",
  "A beloved Middle Eastern street food with tender, spice-marinated chicken, creamy garlic sauce, and fresh vegetables.": "أكلة الشارع الشرق أوسطية المفضلة: دجاج متبل ببهارات غنية، مع صلصة الثوم الكريمية وخضروات طازجة.",
  "Prepare the marinade with olive oil, lemon, garlic, and spices. Coat the chicken thoroughly.": "جهز التتبيلة بزيت الزيتون والليمون والثوم والبهارات. غلف الدجاج جيداً.",
  "Marinate the chicken in the fridge for at least 1 hour (overnight is best for maximum flavor).": "اترك الدجاج يتبل في الثلاجة لمدة ساعة على الأقل (يفضل طوال الليل لنكهة أقوى).",
  "Sear the chicken in a hot skillet or roast in the oven until browned and fully cooked through.": "شوح الدجاج في مقلاة ساخنة أو اشوه في الفرن حتى يحمر وينضج تماماً.",
  "Let the chicken rest for 5 minutes to keep it juicy, then slice into thin, shaved strips.": "اترك الدجاج يرتاح لمدة ٥ دقائق ليظل طرياً، ثم قطعه إلى شرائح رفيعة.",
  "Warm the pita bread, spread garlic sauce, add the chicken, toppings, and roll it up. Enjoy!": "سخن خبز البيتا، ادهنه بصلصة الثوم، أضف الدجاج والمنكهات ثم لفه. استمتع!",
  "Pita": "خبز بيتا",
  "Pickles": "مخلل",
  "Mixed Mahshi": "مشكل محاشي",
  "Bashamel Macaroni": "مكرونه بشاميل",

  // Kafta
  "Traditional Lebanese-style seasoned ground meat skewers, grilled to perfection with fresh parsley and Middle Eastern spices.": "أسياخ لحم مفروم متبلة على الطريقة اللبنانية التقليدية، مشوية بإتقان مع البقدونس الطازج والبهارات الشرقية.",
  "Mix ground meat with minced herbs and spices, then grill until charred.": "اخلط اللحم المفروم مع الأعشاب والبهارات المفرومة، ثم اشوِها حتى تنضج.",

  // Turkey
  "A classic whole roasted turkey with herb butter, garlic, and aromatics. The centerpiece of a festive feast.": "ديك رومي كامل مشوي مع زبدة الأعشاب والثوم والمنكهات. القطعة المركزية لأي وليمة احتفالية.",
  "Prep the bird with herb butter and roast until internal temp hits 165°F.": "جهز الديك الرومي بزبدة الأعشاب واشوه حتى تصل درجة الحرارة الداخلية إلى ١٦٥ فهرنهايت.",

  // Mahshi
  "A traditional Egyptian favorite: zucchini, eggplant, and peppers stuffed with a fragrant herb and rice mixture.": "طبق مصري تقليدي محبوب: كوسة وباذنجان وفلفل محشو بخلطة الأرز والأعشاب العطرية.",
  "Hollow out veggies, stuff with rice mix, and simmer in broth.": "قور الخضار، واحشها بخلطة الأرز، واتركها تنضج في المرق.",

  // Macaroni
  "Makarona Bashamel: Egyptians quintessential comfort food: penne pasta layered with spiced ground beef and thick, creamy béchamel sauce.": "مكرونة بالبشاميل: الأكلة المصرية المفضلة: طبقات من المكرونة البنّة مع اللحم المفروم المتبل وصلصة البشاميل الغنية والكريمية.",
  "Prepare the pasta, minced beef, onion, tomato paste, milk, flour, butter, and spices. Grease dish.": "جهز المكرونة، اللحم المفروم، البصل، صلصة الطماطم، الحليب، الدقيق، الزبدة، والبهارات. ادهن الصينية.",
  "Boil the pasta in salted water until it is about 80% cooked. Drain and set aside.": "اسلق المكرونة في ماء مملح حتى تنضج بنسبة ٨٠٪ تقريباً. صفيها واتركها جانباً.",
  "Sauté onion and brown the beef. Add tomato paste, salt, pepper, and spices. Cook until flavorful.": "شوح البصل وحمر اللحم. أضف صلصة الطماطم والملح والفلفل والبهارات. اطبخها حتى تفوح رائحتها.",
  "Melt butter, whisk in flour, and slowly add milk until creamy and thick. Season with nutmeg.": "ذوّب الزبدة، قلب الدقيق، ثم أضف الحليب تدريجياً حتى يصبح القوام كريمياً وكثيفاً. تبل بجوزة الطيب.",
  "Mix the cooked pasta with 2–3 tablespoons of béchamel so it stays creamy.": "اخلط المكرونة المسلوقة بملعقتين أو ثلاث من البشاميل لتبقى كريمية.",
  "Layer half pasta, meat filling, then rest of pasta. Pour remaining béchamel over the top.": "ضع طبقة من نصف المكرونة، ثم اللحم، ثم باقي المكرونة. صب باقي البشاميل على الوجه.",
  "Bake at 200°C for 20–25 minutes until golden brown. Add cheese if desired.": "اخبزها في درجة حرارة ٢٠٠ مئوية لمدة ٢٠-٢٥ دقيقة حتى يحمر الوجه. أضف الجبن حسب الرغبة.",
  "Let it rest for 5 minutes before eating so the layers hold together. Serve hot.": "اتركها ترتاح لمدة ٥ دقائق قبل التقطيع لتماسك الطبقات. قدمها ساخنة.",

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
  "Asparagus": "هليون",
  "Tomato Paste": "صلصة طماطم",
  "Flour": "دقيق",
  "Mozzarella": "موزاريلا",
  "Spices": "بهارات"
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
