import { View, Text, Pressable } from "react-native";
import { useState, useEffect } from "react";
import { supabase } from "@/utils/supabase";

export default function HomeScreen() {
  const [timerStarted, setTimerStarted] = useState<boolean>(false);
  const [time, setTime] = useState(0);
  const [activity, setActivity] = useState("");
  // PLACEHOLDER
  useEffect(() => {
    setActivity("something");
  }, []);
  useEffect(() => {
    let timeInterval;

    if (timerStarted) {
      timeInterval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    }

    return () => {
      if (timeInterval) {
        clearInterval(timeInterval);
      }
    };
  }, [timerStarted]);
  const formatTime = (ms: number) => {
    const hours = Math.floor(ms / 3600000);
    const minutes = Math.floor((ms % 3600000) / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);

    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };
  const supabaseSubmit = () => {};
  return (
    <View className="items-center justify-center mt-12 flex-1">
      <Text className="text-2xl dark:text-white m-3">
        Time wasted on <Text className="font-bitcount">{activity}</Text>
      </Text>
      <Text className="text-4xl font-mono dark:text-white mb-4">
        {formatTime(time)}
      </Text>
      <View className="flex flex-row gap-2 m-2">
        <Pressable
          className="rounded bg-sky-600/60 p-2 px-5 text-lg"
          style={({ pressed }) => ({
            opacity: pressed ? 0.7 : 1,
          })}
          onPress={() => setTimerStarted(!timerStarted)}
        >
          <Text className="text-white text-lg">
            {timerStarted ? "Stop" : "Start"}
          </Text>
        </Pressable>
        {timerStarted && (
          <Pressable
            className="rounded bg-sky-600/60 p-2 px-5 text-lg"
            style={({ pressed }) => ({
              opacity: pressed ? 0.7 : 1,
            })}
            onPress={() => supabaseSubmit}
          >
            <Text className="text-white text-lg">Submit</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
}
