import { View, Text } from "react-native";
import { Progress } from "@/components/ui/progress";

export default function HomeScreen() {
  return (
    <View className="flex-1 items-center justify-center">
      <Progress />
      <Text className="text-xl font-bold text-blue-500">
        Welcome to Nativewind!
      </Text>
    </View>
  );
}
