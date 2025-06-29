import { View, Text } from "react-native";
import * as Progress from "react-native-progress";

export default function HomeScreen() {
  return (
    <View className="items-center justify-center mt-12 flex flex-col">
      <View className="flex flex-col items-center justify-center align-middle m-2">
        <Text className="text-xl dark:text-white m-3">
          How much time have you wasted in a year?
        </Text>
        <Progress.Circle
          size={300}
          progress={0.1}
          thickness={30}
          showsText={true}
          formatText={() => `${10}%`}
        />
      </View>
      <Text className="text-2xl dark:text-white m-3">
        Time wasted on <Text className="font-bitcount">{"something"}</Text>
      </Text>
    </View>
  );
}
