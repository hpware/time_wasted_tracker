import { View, Text } from "react-native";
import * as Progress from "react-native-progress";

export default function HomeScreen() {
  return (
    <View className="flex-1 items-center justify-center">
      <Progress.Bar progress={0.9} width={200} />
      <Progress.Pie progress={0.4} size={50} />
      <Progress.Circle size={30} indeterminate={true} />
      <Progress.CircleSnail color={["red", "green", "blue"]} />
      <Text className="text-xl font-bold text-blue-500">
        Welcome to Nativewind!
      </Text>
    </View>
  );
}
