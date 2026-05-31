import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, Alert, TextInput, Image } from 'react-native';
import { useLocalSearchParams, Stack, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { MOCK_RECIPES } from '@/src/data/mockRecipes';
import { useAppContext } from '@/src/context/AppContext';
import { usePlanner } from '@/src/context/PlannerContext';
import { IngredientItem } from '@/src/components/IngredientItem';
import { AddToPlanModal } from '@/src/components/AddToPlanModal';
import GuidedCookingModal from '@/src/components/GuidedCookingModal';
import { MealSlot } from '@/src/types';
import { useLanguage } from '@/src/context/LanguageContext';

export default function RecipeDetailScreen() {
  const { t, isRTL } = useLanguage();
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { isLiked, toggleLike } = useAppContext();
  const { addMeal } = usePlanner();
  const recipe = MOCK_RECIPES.find(r => r.id === id);

  // Local state
  const [ownedIngredients, setOwnedIngredients] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<'ingredients' | 'steps' | 'reviews'>('ingredients');
  const [newReview, setNewReview] = useState('');
  const [userRating, setUserRating] = useState(5);
  const [isPlanModalVisible, setIsPlanModalVisible] = useState(false);
  const [isGuidedModalVisible, setIsGuidedModalVisible] = useState(false);
  const [servingSize, setServingSize] = useState<1 | 2 | 4>(1);

  if (!recipe) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>{t('recipeNotFound')}</Text>
      </SafeAreaView>
    );
  }

  const formatScaledQuantity = (baseQuantity: string, multiplier: number) => {
    const match = baseQuantity.match(/^(\d+(?:\.\d+)?)\s*([a-zA-Z\s]+)$/);
    if (!match) return baseQuantity;

    const val = parseFloat(match[1]);
    const unit = match[2];
    const scaledVal = val * multiplier;
    
    const formattedVal = Number.isInteger(scaledVal) ? scaledVal : scaledVal.toFixed(1);
    return `${formattedVal}${unit}`;
  };

  const toggleIngredient = (name: string) => {
    setOwnedIngredients(prev => 
      prev.includes(name) ? prev.filter(i => i !== name) : [...prev, name]
    );
  };

  const missingIngredients = recipe.ingredients.filter(i => !ownedIngredients.includes(i.name));
  const totalCost = missingIngredients.reduce((sum, i) => sum + (i.price * servingSize), 0);

  const handleOrder = () => {
    if (missingIngredients.length === 0) {
      Alert.alert(t("Nothing to order"), t("You already have all the ingredients!"));
      return;
    }
    Alert.alert(
      t("Order Placed"), 
      `${t("Successfully ordered")} ${missingIngredients.length} ${t("items")}. ${t("Total")}: $${totalCost.toFixed(2)}`
    );
  };

  const handleSubmitReview = () => {
    if (newReview.trim() === '') {
      Alert.alert(t("Error"), t("Please write a comment first."));
      return;
    }
    Alert.alert(t("Review Submitted"), t("Thank you for your feedback!"));
    setNewReview('');
  };

  const handleAddToPlan = () => {
    setIsPlanModalVisible(true);
  };

  const handleConfirmPlan = (day: string, slot: MealSlot) => {
    addMeal(day, slot, recipe.id);
    Alert.alert(t("Weekly Plan"), `${t(recipe.title)} ${t("has been added to")} ${t(day)} ${t(slot)}.`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen 
        options={{ 
          title: t('Recipe Details'),
          headerShown: true,
          headerStyle: { backgroundColor: '#F5F5F0' },
          headerTintColor: '#000',
          headerLeft: () => (
            <TouchableOpacity 
              onPress={() => router.back()} 
              style={{ 
                width: 40, 
                height: 40, 
                justifyContent: 'center', 
                alignItems: 'center',
                marginLeft: 5
              }}
            >
              <Ionicons name="chevron-back" size={28} color="#000" />
            </TouchableOpacity>
          ),
        }} 
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <Text style={[styles.title, { textAlign: isRTL ? 'right' : 'left' }]}>{t(recipe.title)}</Text>
          
          {/* Info Bar */}
          <View style={[styles.infoBar, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
            <View style={[styles.infoItem, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
              <Ionicons name="cash-outline" size={20} color="#D4AF37" />
              <Text style={[styles.infoText, isRTL ? { marginRight: 6 } : { marginLeft: 6 }]}>
                {isRTL ? `${(recipe.cost * servingSize).toFixed(2)} ${t('$')}` : `${t('$')}${(recipe.cost * servingSize).toFixed(2)}`}
              </Text>
            </View>
            <View style={[styles.infoItem, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
              <Ionicons name="timer-outline" size={20} color="#D4AF37" />
              <Text style={[styles.infoText, isRTL ? { marginRight: 6 } : { marginLeft: 6 }]}>{recipe.cookingTime}{t('mins')}</Text>
            </View>
            <View style={[styles.infoItem, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
              <Ionicons name="globe-outline" size={20} color="#D4AF37" />
              <Text style={[styles.infoText, isRTL ? { marginRight: 6 } : { marginLeft: 6 }]}>{t(recipe.origin)}</Text>
            </View>
            <View style={[styles.infoItem, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
              <Ionicons name="leaf-outline" size={20} color="#D4AF37" />
              <Text style={[styles.infoText, isRTL ? { marginRight: 6 } : { marginLeft: 6 }]}>{t(recipe.dietStyle)}</Text>
            </View>
          </View>

          <View style={styles.placeholderImage}>
            {recipe.image ? (
              <Image source={recipe.image} style={styles.recipeImage} />
            ) : (
              <Ionicons name="restaurant-outline" size={80} color="#D4AF37" />
            )}
          </View>

          <View style={[styles.actionRow, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
            <TouchableOpacity 
              style={[styles.actionButton, styles.likeButton, { flexDirection: isRTL ? 'row-reverse' : 'row' }]} 
              onPress={() => toggleLike(recipe.id)}
            >
              <Ionicons 
                name={isLiked(recipe.id) ? "heart" : "heart-outline"} 
                size={22} 
                color="#FF6347" 
              />
              <Text style={[styles.actionButtonText, { color: "#FF6347" }, isRTL ? { marginRight: 8 } : { marginLeft: 8 }]}>
                {isLiked(recipe.id) ? t('Liked') : t('Like')}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.actionButton, styles.planButton, { flexDirection: isRTL ? 'row-reverse' : 'row' }]} 
              onPress={handleAddToPlan}
            >
              <Ionicons name="add-circle-outline" size={22} color="#fff" />
              <Text style={[styles.actionButtonText, isRTL ? { marginRight: 8 } : { marginLeft: 8 }]}>{t('Weekly Plan')}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { textAlign: isRTL ? 'right' : 'left' }]}>{t('Overview')}</Text>
            <Text style={[styles.overview, { textAlign: isRTL ? 'right' : 'left' }]}>{t(recipe.overview)}</Text>
          </View>

          {/* Tab Switcher */}
          <View style={[styles.tabContainer, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
            {['ingredients', 'steps', 'reviews'].map((tab) => (
              <TouchableOpacity 
                key={tab}
                style={[styles.tabButton, activeTab === tab && styles.activeTabButton]} 
                onPress={() => setActiveTab(tab as any)}
              >
                <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
                  {t(tab.charAt(0).toUpperCase() + tab.slice(1))}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Conditional Content Rendering */}
          {activeTab === 'ingredients' && (
            <View style={styles.section}>
              <View style={[styles.sectionHeader, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
                <Text style={styles.sectionTitle}>{t('Ingredients Checklist')}</Text>
                <Text style={styles.missingCount}>
                  {missingIngredients.length} {t('missing')}
                </Text>
              </View>
              
              <View style={styles.servingToggleContainer}>
                <View style={[styles.servingControl, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
                  {[1, 2, 4].map((size) => (
                    <TouchableOpacity 
                      key={size}
                      style={[styles.servingButton, servingSize === size && styles.activeServing]} 
                      onPress={() => setServingSize(size as any)}
                    >
                      <Text style={[styles.servingText, servingSize === size && styles.activeServingText]}>
                        {t('meal for')} {size}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {recipe.ingredients.map((ingredient, index) => (
                <IngredientItem
                  key={index}
                  name={t(ingredient.name)}
                  quantity={formatScaledQuantity(ingredient.quantity, servingSize)}
                  price={ingredient.price * servingSize}
                  isOwned={ownedIngredients.includes(ingredient.name)}
                  onToggle={() => toggleIngredient(ingredient.name)}
                />
              ))}
            </View>
          )}

          {activeTab === 'steps' && (
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { textAlign: isRTL ? 'right' : 'left' }]}>{t('Cooking Steps')}</Text>
              {recipe.stages.map((stage, index) => (
                <View key={stage.id} style={[styles.stepItem, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
                  <View style={[styles.stepNumber, isRTL ? { marginLeft: 15, marginRight: 0 } : { marginRight: 15, marginLeft: 0 }]}>
                    <Text style={styles.stepNumberText}>{index + 1}</Text>
                  </View>
                  <View style={[styles.stepContent, { alignItems: isRTL ? 'flex-end' : 'flex-start' }]}>
                    <Text style={[styles.stepDescription, { textAlign: isRTL ? 'right' : 'left' }]}>{t(stage.textDescription)}</Text>
                    <Text style={styles.stepTime}>{stage.timeNeeded} {t('mins')}</Text>
                  </View>
                </View>
              ))}
              <TouchableOpacity 
                style={[styles.startCookingButton, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}
                onPress={() => setIsGuidedModalVisible(true)}
              >
                <Ionicons name="play-circle" size={24} color="#fff" />
                <Text style={[styles.startCookingText, isRTL ? { marginRight: 8 } : { marginLeft: 8 }]}>{t('Start Guided Cooking')}</Text>
              </TouchableOpacity>
            </View>
          )}

          {activeTab === 'reviews' && (
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { textAlign: isRTL ? 'right' : 'left' }]}>{t('Community Reviews')}</Text>
              
              {/* Write a Review Section */}
              <View style={[styles.writeReviewContainer, { alignItems: isRTL ? 'flex-end' : 'flex-start' }]}>
                <Text style={styles.subSectionTitle}>{t('Rate this recipe')}</Text>
                <View style={[styles.ratingRow, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <TouchableOpacity key={star} onPress={() => setUserRating(star)}>
                      <Ionicons 
                        name={star <= userRating ? "star" : "star-outline"} 
                        size={30} 
                        color="#D4AF37" 
                      />
                    </TouchableOpacity>
                  ))}
                </View>
                <TextInput
                  style={[styles.reviewInput, { textAlign: isRTL ? 'right' : 'left' }]}
                  placeholder={t('Share your experience...')}
                  multiline
                  value={newReview}
                  onChangeText={setNewReview}
                />
                <TouchableOpacity style={[styles.submitButton, { width: '100%' }]} onPress={handleSubmitReview}>
                  <Text style={styles.submitButtonText}>{t('Submit Review')}</Text>
                </TouchableOpacity>
              </View>

              {/* Review List */}
              {recipe.reviews.length > 0 ? (
                recipe.reviews.map((review) => (
                  <View key={review.id} style={styles.reviewItem}>
                    <View style={[styles.reviewHeader, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
                      <Text style={styles.userName}>{review.user}</Text>
                      <View style={[styles.ratingStars, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
                        {[...Array(5)].map((_, i) => (
                          <Ionicons 
                            key={i} 
                            name={i < review.rating ? "star" : "star-outline"} 
                            size={14} 
                            color="#D4AF37" 
                          />
                        ))}
                      </View>
                    </View>
                    <Text style={[styles.reviewDate, { textAlign: isRTL ? 'right' : 'left' }]}>{review.date}</Text>
                    <Text style={[styles.reviewComment, { textAlign: isRTL ? 'right' : 'left' }]}>{review.comment}</Text>
                  </View>
                ))
              ) : (
                <Text style={styles.noReviews}>{t('No reviews yet. Be the first!')}</Text>
              )}
            </View>
          )}
        </View>
      </ScrollView>

      {/* Cart Footer - Only show if Ingredients tab is active */}
      {activeTab === 'ingredients' && (
        <View style={[styles.footer, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
          <View style={[styles.footerInfo, { alignItems: isRTL ? 'flex-end' : 'flex-start' }]}>
            <Text style={styles.totalLabel}>{t('Missing Total:')}</Text>
            <Text style={styles.totalPrice}>
              {isRTL ? `${totalCost.toFixed(2)} ${t('$')}` : `${t('$')}${totalCost.toFixed(2)}`}
            </Text>
          </View>
          <TouchableOpacity style={[styles.orderButton, isRTL ? { marginRight: 15 } : { marginLeft: 15 }]} onPress={handleOrder}>
            <Text style={styles.orderButtonText}>{t('Order Missing Items')}</Text>
          </TouchableOpacity>
        </View>
      )}

      <AddToPlanModal 
        visible={isPlanModalVisible}
        onClose={() => setIsPlanModalVisible(false)}
        onConfirm={handleConfirmPlan}
      />

      <GuidedCookingModal 
        visible={isGuidedModalVisible}
        onClose={() => setIsGuidedModalVisible(false)}
        recipe={recipe}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F0',
  },
  content: {
    padding: 20,
    paddingBottom: 120, // Extra space for footer
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 15,
  },
  infoBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    backgroundColor: '#fdfdfd',
    padding: 12,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#f0f0f0'
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  infoText: {
    marginLeft: 6,
    fontSize: 13,
    fontWeight: '600',
    color: '#555'
  },
  placeholderImage: {
    width: '100%',
    height: 200,
    backgroundColor: '#f9f9f9',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 25,
    overflow: 'hidden',
  },
  recipeImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 25,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 12,
    marginHorizontal: 5,
  },
  likeButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#FF6347',
  },
  planButton: {
    backgroundColor: '#FF6347',
  },
  actionButtonText: {
    marginLeft: 8,
    fontWeight: 'bold',
    fontSize: 14,
    color: '#fff'
  },
  section: {
    marginBottom: 30,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  subSectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
    color: '#333',
  },
  missingCount: {
    fontSize: 14,
    color: '#FF6347',
    fontWeight: '600'
  },
  overview: {
    fontSize: 16,
    lineHeight: 24,
    color: '#444',
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 25,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  activeTabButton: {
    borderBottomWidth: 3,
    borderBottomColor: '#FF6347',
  },
  tabText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#999',
  },
  activeTabText: {
    color: '#FF6347',
  },
  stepItem: {
    flexDirection: 'row',
    marginBottom: 20,
    marginTop: 10
  },
  stepNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#FAF9F6',
    borderWidth: 1,
    borderColor: '#D4AF37',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  stepNumberText: {
    color: '#D4AF37',
    fontWeight: 'bold',
    fontSize: 14
  },
  stepContent: {
    flex: 1,
  },
  stepDescription: {
    fontSize: 16,
    color: '#444',
    lineHeight: 22,
    marginBottom: 4,
  },
  stepTime: {
    fontSize: 12,
    color: '#999',
    fontWeight: '600',
  },
  startCookingButton: {
    backgroundColor: '#D4AF37',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    marginTop: 20,
  },
  startCookingText: {
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 8,
    fontSize: 16,
  },
  writeReviewContainer: {
    backgroundColor: '#fdfdfd',
    padding: 16,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#f0f0f0',
    marginBottom: 25,
    marginTop: 10
  },
  ratingRow: {
    flexDirection: 'row',
    marginBottom: 15
  },
  reviewInput: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 10,
    padding: 12,
    height: 80,
    textAlignVertical: 'top',
    fontSize: 15,
    marginBottom: 15
  },
  submitButton: {
    backgroundColor: '#FF6347',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center'
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: 'bold'
  },
  reviewItem: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    paddingBottom: 15
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4
  },
  userName: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#333'
  },
  ratingStars: {
    flexDirection: 'row'
  },
  reviewDate: {
    fontSize: 12,
    color: '#999',
    marginBottom: 8
  },
  reviewComment: {
    fontSize: 15,
    color: '#555',
    lineHeight: 20
  },
  noReviews: {
    textAlign: 'center',
    color: '#999',
    marginTop: 20,
    fontStyle: 'italic'
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    padding: 20,
    paddingBottom: 30,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  footerInfo: {
    flex: 1
  },
  totalLabel: {
    fontSize: 12,
    color: '#888',
    marginBottom: 2
  },
  totalPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000'
  },
  orderButton: {
    backgroundColor: '#FF6347',
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 12,
    flex: 1.2,
    marginLeft: 15,
    alignItems: 'center'
  },
  orderButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14
  },
  errorText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 50,
    color: '#666',
  },
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
});
