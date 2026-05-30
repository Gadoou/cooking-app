# RTL Layout & Arabic Support Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement a global RTL/LTR toggle that flips the app's content while keeping the logo on the left and the toggle on the right.

**Architecture:** 
- `LanguageContext`: Manages global `isRTL` state.
- `AppHeader`: Forced `flexDirection: 'row'` to lock Logo (Left) and Toggle (Right).
- `Translation Helper`: Provides Arabic text when `isRTL` is true.

**Tech Stack:** React Native, Expo Router.

---

### Task 1: Create LanguageContext & Global Provider

**Files:**
- Create: `src/context/LanguageContext.tsx`
- Modify: `app/_layout.tsx`

- [ ] **Step 1: Implement LanguageContext with Arabic translation map**

```tsx
import React, { createContext, useContext, useState, useMemo } from 'react';

const translations: Record<string, string> = {
  "Welcome, Foodie!": "أهلاً بك يا طباخ!",
  "What do you wanna cook today?": "ماذا تريد أن تطبخ اليوم؟",
  "Your Week": "خطتك الأسبوعية",
  "Your Profile": "حسابك الشخصي",
  "My Recipes": "وصفاتي",
  "Ingredients Checklist": "قائمة المكونات",
  "Cooking Steps": "خطوات الطبخ",
  "Community Reviews": "آراء المجتمع",
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
```

- [ ] **Step 2: Wrap App with LanguageProvider in `app/_layout.tsx`**

```tsx
import { LanguageProvider } from '@/src/context/LanguageContext';

// Wrap inside other providers:
<LanguageProvider>
  <AppProvider>
    <PlannerProvider>
      <Stack>...</Stack>
    </PlannerProvider>
  </AppProvider>
</LanguageProvider>
```

- [ ] **Step 3: Commit**
```bash
git add src/context/LanguageContext.tsx app/_layout.tsx
git commit -m "feat(i18n): add global LanguageContext and Arabic translations"
```

### Task 2: Implement Locked Header with Toggle

**Files:**
- Modify: `src/components/AppHeader.tsx`

- [ ] **Step 1: Lock Header Layout and add Toggle Button**

```tsx
import { useLanguage } from '@/src/context/LanguageContext';

export const AppHeader = ({ welcomeText, rightElement }: { welcomeText: string; rightElement?: React.ReactNode }) => {
  const { isRTL, toggleLayout, t } = useLanguage();

  return (
    <View style={styles.header}>
      {/* Forced 'row' direction to keep Logo left and Toggle right */}
      <View style={[styles.topRow, { flexDirection: 'row' }]}>
        <View style={styles.logoContainer}>
          <Image 
            source={require('@/assets/images/brandlogo2.jpeg')} 
            style={styles.brandLogo} 
            resizeMode="contain" 
          />
        </View>
        
        {/* Toggle + rightElement */}
        <View style={styles.headerRight}>
          {rightElement}
          <TouchableOpacity onPress={toggleLayout} style={styles.langToggle}>
            <Text style={styles.langText}>{isRTL ? 'EN' : 'AR'}</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Text style={[styles.welcome, { textAlign: isRTL ? 'right' : 'left' }]}>
        {t(welcomeText)}
      </Text>
    </View>
  );
};

// Add styles:
  headerRight: { flexDirection: 'row', alignItems: 'center' },
  langToggle: { marginLeft: 15, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12, backgroundColor: '#E5E5E0' },
  langText: { fontSize: 12, fontWeight: '800', color: '#666' }
```

- [ ] **Step 2: Commit Header changes**
```bash
git add src/components/AppHeader.tsx
git commit -m "feat(header): implement locked header layout with language toggle"
```

### Task 3: Update Screen Layouts for RTL Support

**Files:**
- Modify: `app/(tabs)/index.tsx`
- Modify: `app/recipe/[id].tsx`

- [ ] **Step 1: Apply RTL styles and translations to Home Screen**

```tsx
// Inside HomeScreen:
const { isRTL, t } = useLanguage();

// In JSX:
<Text style={[styles.mainTitle, { textAlign: isRTL ? 'right' : 'left' }]}>
  {t("What do you wanna cook today?")}
</Text>
```

- [ ] **Step 2: Apply RTL mirroring to Recipe Detail tabs and ingredients**

```tsx
// Inside RecipeDetailScreen:
const { isRTL, t } = useLanguage();

// Mirror Tab Container:
<View style={[styles.tabContainer, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
  {/* tabs map */}
</View>

// Mirror Ingredient Row (in IngredientItem.tsx or usage):
<View style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
  {/* checkbox, text, price */}
</View>
```

- [ ] **Step 3: Commit Layout fixes**
```bash
git add app/(tabs)/index.tsx app/recipe/[id].tsx
git commit -m "feat(ui): mirror main screen layouts based on RTL state"
```
