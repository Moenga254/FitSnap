import { ScrollView, Text, View, Pressable, Image, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { ScreenContainer } from "@/components/screen-container";
import { useColors } from "@/hooks/use-colors";

/**
 * Scan Screen
 * Allows users to capture or upload meal photos for analysis
 */
export default function ScanScreen() {
  const router = useRouter();
  const colors = useColors();

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Request camera permissions
  const requestCameraPermission = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    return status === "granted";
  };

  // Request photo library permissions
  const requestPhotoLibraryPermission = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    return status === "granted";
  };

  // Handle camera capture
  const handleTakePhoto = async () => {
    try {
      setError(null);
      const hasPermission = await requestCameraPermission();

      if (!hasPermission) {
        setError("Camera permission denied. Please enable it in settings.");
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        setSelectedImage(result.assets[0].uri);
      }
    } catch (err) {
      setError("Failed to access camera. Please try again.");
      console.error(err);
    }
  };

  // Handle photo library selection
  const handleUploadPhoto = async () => {
    try {
      setError(null);
      const hasPermission = await requestPhotoLibraryPermission();

      if (!hasPermission) {
        setError("Photo library permission denied. Please enable it in settings.");
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        setSelectedImage(result.assets[0].uri);
      }
    } catch (err) {
      setError("Failed to access photo library. Please try again.");
      console.error(err);
    }
  };

  // Analyze meal (mock)
  const handleAnalyzeMeal = async () => {
    if (!selectedImage) return;

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      router.push({
        pathname: "/results",
        params: {
          calories: 450,
          protein: 35,
          carbs: 55,
          fats: 12,
          feedback: "High carbs, low protein. Add more chicken!",
        },
      });
    }, 1500);
  };

  // Clear selected image
  const handleClearImage = () => {
    setSelectedImage(null);
    setError(null);
  };

  return (
    <ScreenContainer className="p-6">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        <View className="flex-1 gap-6">
          {/* Header */}
          <View className="items-center gap-2">
            <Text className="text-3xl font-bold text-foreground">Scan Meal</Text>
            <Text className="text-sm text-muted">Take a photo or upload an image</Text>
          </View>

          {/* Image Preview Section */}
          {selectedImage ? (
            <View className="gap-4">
              {/* Preview Image */}
              <View className="w-full aspect-square bg-surface rounded-3xl border-2 border-primary overflow-hidden">
                <Image
                  source={{ uri: selectedImage }}
                  className="w-full h-full"
                  resizeMode="cover"
                />
              </View>

              {/* Image Selected State */}
              <View className="gap-3">
                <Text className="text-center text-sm text-muted">Photo ready for analysis</Text>

                {/* Analyze Button */}
                <Pressable
                  onPress={handleAnalyzeMeal}
                  disabled={isLoading}
                  style={({ pressed }) => [
                    {
                      backgroundColor: colors.primary,
                      opacity: pressed || isLoading ? 0.8 : 1,
                      transform: [{ scale: pressed ? 0.97 : 1 }],
                    },
                  ]}
                  className="w-full rounded-full py-4 items-center flex-row justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <ActivityIndicator color={colors.background} size="small" />
                      <Text className="text-lg font-semibold text-background">Analyzing...</Text>
                    </>
                  ) : (
                    <Text className="text-lg font-semibold text-background">Analyze Meal</Text>
                  )}
                </Pressable>

                {/* Change Photo Button */}
                <Pressable
                  onPress={handleClearImage}
                  className="w-full bg-surface rounded-full py-4 items-center border border-border active:opacity-70"
                >
                  <Text className="text-lg font-semibold text-foreground">Change Photo</Text>
                </Pressable>
              </View>
            </View>
          ) : (
            <View className="gap-6">
              {/* Empty State Illustration */}
              <View className="w-full aspect-square bg-surface rounded-3xl border-2 border-dashed border-border items-center justify-center">
                <View className="items-center gap-4">
                  <Text className="text-6xl">📸</Text>
                  <Text className="text-sm text-muted text-center">
                    Take a photo of your meal to get started
                  </Text>
                </View>
              </View>

              {/* Error Message */}
              {error && (
                <View className="w-full bg-error/10 rounded-2xl p-4 border border-error">
                  <Text className="text-sm text-error text-center">{error}</Text>
                </View>
              )}

              {/* Action Buttons */}
              <View className="gap-3">
                {/* Take Photo Button */}
                <Pressable
                  onPress={handleTakePhoto}
                  style={({ pressed }) => [
                    {
                      backgroundColor: colors.primary,
                      opacity: pressed ? 0.8 : 1,
                      transform: [{ scale: pressed ? 0.97 : 1 }],
                    },
                  ]}
                  className="w-full rounded-full py-4 items-center flex-row justify-center gap-3"
                >
                  <Text className="text-2xl">📷</Text>
                  <Text className="text-lg font-semibold text-background">Take Photo</Text>
                </Pressable>

                {/* Upload Photo Button */}
                <Pressable
                  onPress={handleUploadPhoto}
                  className="w-full bg-surface rounded-full py-4 items-center flex-row justify-center gap-3 border border-border active:opacity-70"
                >
                  <Text className="text-2xl">🖼️</Text>
                  <Text className="text-lg font-semibold text-foreground">Upload Photo</Text>
                </Pressable>
              </View>

              {/* Info Box */}
              <View className="w-full bg-primary/5 rounded-2xl p-4 border border-primary/20">
                <View className="gap-2">
                  <Text className="text-sm font-semibold text-foreground">💡 Tips for best results:</Text>
                  <Text className="text-xs text-muted">
                    • Take a clear, well-lit photo of your meal{"\n"}
                    • Include all items on your plate{"\n"}
                    • Avoid shadows and reflections
                  </Text>
                </View>
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
