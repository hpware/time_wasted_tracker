import { View, Text, Pressable } from "react-native";
import { useState } from "react";

export default function HomeScreen() {
  const [timerStarted, setTimerStarted] = useState<boolean>(false);
  const startTimer = () => {
    setTimerStarted(true);
  };
  const endTimer = () => {
    setTimerStarted(false);
  };
  return (
    <View className="items-center justify-center mt-12 flex flex-col">
      <Text className="text-2xl dark:text-white m-3">
        Time wasted on <Text className="font-bitcount">{"something"}</Text>
      </Text>
      {!timerStarted ? (
        <Pressable
          className="rounded bg-sky-600/60 text-white p-2 px-5 text-lg"
          onPress={startTimer}
        >
          <Text className="text-white text-lg">Start</Text>
        </Pressable>
      ) : (
        <View>
          <Text className="text-lg dark:text-white m-2">Timer: {"11:40"}</Text>
          <Pressable
            className="rounded bg-sky-600/60 text-white p-2 px-5 text-lg"
            onPress={endTimer}
          >
            <Text className="text-white text-lg">End timer</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}
