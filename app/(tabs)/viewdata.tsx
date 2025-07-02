import { View, Text, ScrollView, Pressable } from "react-native";
import * as Progress from "react-native-progress";
import { supabase } from "@/utils/supabase";
import { useState, useEffect } from "react";

interface TimeEntry {
  id: number;
  created_at: string;
  duration: number;
  activity: string;
}

export default function ViewDataScreen() {
  const yearMS = 31556952000;
  const [yearMSPercent, setYearMSPercent] = useState<number>(0);
  const [timeWasted, setTimeWasted] = useState<TimeEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshData, setRefreshData] = useState(true);
  const formatTime = (ms: number) => {
    const hours = Math.floor(ms / 3600000);
    const minutes = Math.floor((ms % 3600000) / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);

    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const { data, error } = await supabase
        .from("time_entries")
        .select("*")
        .order("created_at", { ascending: false });
      if (!error && data) {
        setTimeWasted(data);
      }
      const { data: data2, error: error2 } = await supabase
        .from("total_amount_wasted")
        .select("total_amount")
        .eq("username", "default");
      console.log(data2);
      if (!error2 && data2) {
        const percentage = (data2[0].total_amount / yearMS) * 100;
        setYearMSPercent(Math.max(0, Math.min(100, percentage)));
      }
      setIsLoading(false);
    }
    fetchData();
    setRefreshData(false);
  }, [refreshData]);

  return (
    <ScrollView className="flex-1">
      <View className="items-center justify-center mt-12 flex flex-col pb-20">
        <View className="flex flex-col items-center justify-center align-middle m-2">
          <Text className="text-xl dark:text-white m-3">
            How much time have you wasted in {new Date().getFullYear()}?
          </Text>
          {!isLoading ? (
            <Progress.Circle
              size={200}
              progress={yearMSPercent / 100}
              thickness={30}
              showsText={true}
              formatText={() => `${String(yearMSPercent).slice(0, 4)}%`}
            />
          ) : (
            <Progress.Circle
              size={200}
              progress={0 / 100}
              thickness={30}
              showsText={true}
              formatText={() => `Loading...`}
            />
          )}
        </View>
        <Text className="text-2xl  dark:text-white m-3">Time Entries</Text>
        <Pressable onPress={() => setRefreshData(true)}>
          <Text className="dark:text-white text-blue-700">Click to update</Text>
        </Pressable>
        <View className="w-full p-4">
          {isLoading ? (
            <Text className="dark:text-white">Loading...</Text>
          ) : timeWasted && timeWasted.length > 0 ? (
            timeWasted.map((entry: TimeEntry) => (
              <Pressable
                key={entry.id}
                className="p-4 m-2 bg-gray-500/30 dark:bg-gray-600/60 rounded"
              >
                <Text className="dark:text-white">
                  Activity: {String(entry.activity)}
                </Text>
                <Text className="dark:text-white">
                  Duration: {formatTime(entry.duration)}
                </Text>
                <Text className="dark:text-white text-sm opacity-60">
                  Date: {new Date(entry.created_at).toLocaleDateString()}
                </Text>
              </Pressable>
            ))
          ) : (
            <Text className="dark:text-white">No entries found</Text>
          )}
        </View>
      </View>
    </ScrollView>
  );
}
