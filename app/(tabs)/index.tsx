import { View, Text } from "react-native";
import "@/style.css";

export default function HomeScreen() {
  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-xl font-bold text-blue-500">
        Welcome to Nativewind!
      </Text>
    </View>
  );
}
