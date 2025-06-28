import { View, Text } from "react-native";
import * as Progress from "react-native-progress";

export default function HomeScreen() {
  return (
    <View className="items-center justify-center mt-12 flex flex-col">
      <View>
        <Text className="text-lg dark:text-white">
          Time wasted on <Text className="font-bitcount">{"something"}</Text>
        </Text>
        <Progress.Bar progress={0.9} width={200} />
      </View>
      <Progress.Pie progress={0.4} size={50} />
      <Text className="text-xl font-bold text-blue-500">
        Welcome to Nativewind!
      </Text>
    </View>
  );
}
