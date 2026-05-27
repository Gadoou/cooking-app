# Recipe Serving Size Toggle Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement a "meal for 1/2/4" serving size toggle on the Recipe Detail screen that dynamically scales ingredient quantities and prices.

**Architecture:** 
- Add `servingSize` state (1, 2, or 4) to `RecipeDetailScreen`.
- Implement `formatScaledQuantity` helper for unit-aware scaling.
- Add Segmented Control UI before the Ingredients section.
- Update ingredient rendering and total cost calculation.

**Tech Stack:** React Native.

---

### Task 1: Add State and Calculation Logic

**Files:**
- Modify: `app/recipe/[id].tsx`

- [ ] **Step 1: Add `servingSize` state and `formatScaledQuantity` helper**

```tsx
// Inside RecipeDetailScreen:
const [servingSize, setServingSize] = useState<1 | 2 | 4>(1);

const formatScaledQuantity = (baseQuantity: string, multiplier: number) => {
  const match = baseQuantity.match(/^(\d+(?:\.\d+)?)\s*([a-zA-Z\s]+)$/);
  if (!match) return baseQuantity;

  const val = parseFloat(match[1]);
  const unit = match[2];
  const scaledVal = val * multiplier;
  
  // Format to avoid decimals if whole number, else 1 decimal place
  const formattedVal = Number.isInteger(scaledVal) ? scaledVal : scaledVal.toFixed(1);
  return `${formattedVal}${unit}`;
};
```

- [ ] **Step 2: Update `totalCost` calculation**

```tsx
// Find where totalCost is calculated:
const missingIngredients = recipe.ingredients.filter(i => !ownedIngredients.includes(i.name));
const totalCost = missingIngredients.reduce((sum, i) => sum + (i.price * servingSize), 0);
```

- [ ] **Step 3: Commit**
```bash
git add app/recipe/[id].tsx
git commit -m "feat(recipe): add logic for serving size scaling"
```

### Task 2: Implement Toggle UI & Update Ingredients List

**Files:**
- Modify: `app/recipe/[id].tsx`

- [ ] **Step 1: Add styles for Segmented Toggle**

```tsx
// Add to StyleSheet:
  servingToggleContainer: {
    paddingVertical: 15,
    marginBottom: 10,
  },
  servingControl: {
    flexDirection: 'row',
    backgroundColor: '#F0F0F0',
    borderRadius: 12,
    padding: 4,
    height: 50,
  },
  servingButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  activeServing: {
    backgroundColor: '#FFF',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  servingText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  activeServingText: {
    color: '#FF6347',
    fontWeight: '700',
  },
```

- [ ] **Step 2: Render Toggle UI and updated Ingredients List**

```tsx
// Positioned after the Overview section and before the Ingredients tab content:
<View style={styles.servingToggleContainer}>
  <View style={styles.servingControl}>
    {[1, 2, 4].map((size) => (
      <TouchableOpacity 
        key={size}
        style={[styles.servingButton, servingSize === size && styles.activeServing]} 
        onPress={() => setServingSize(size as any)}
      >
        <Text style={[styles.servingText, servingSize === size && styles.activeServingText]}>
          meal for {size}
        </Text>
      </TouchableOpacity>
    ))}
  </View>
</View>

// Inside Ingredient rendering loop:
{recipe.ingredients.map((ingredient, index) => (
  <IngredientItem
    key={index}
    name={ingredient.name}
    quantity={formatScaledQuantity(ingredient.quantity, servingSize)}
    price={ingredient.price * servingSize}
    isOwned={ownedIngredients.includes(ingredient.name)}
    onToggle={() => toggleIngredient(ingredient.name)}
  />
))}
```

- [ ] **Step 3: Commit**
```bash
git add app/recipe/[id].tsx
git commit -m "feat(recipe): render serving size toggle and update ingredient items"
```
