import { View, Text, Pressable, Alert } from "react-native";
import { useState, useEffect } from "react";
import { supabase } from "@/utils/supabase";

export default function HomeScreen() {
  const [removeAllRows, setRemoveAllRows] = useState<boolean>(false);
  useEffect(() => {
    async function removeAllRowsSupabase() {
      try {
        const { error: e1 } = await supabase
          .from("time_entries")
          .delete()
          .neq("id", 0);
        const { error: e2 } = await supabase
          .from("total_amount_wasted")
          .update("total_amount", 0)
          .eq("username", "default");
        if (e1) {
          Alert.alert("Error", "Failed to delete data: " + e1.message);
        } else if (e2) {
          Alert.alert("Error", "Failed to delete data: " + e2.message);
        } else {
          Alert.alert("Success", "All data has been deleted");
        }
      } catch (e) {
        Alert.alert("Error", "An unexpected error occurred");
      } finally {
        setRemoveAllRows(false);
      }
    }
    if (removeAllRows) {
      Alert.alert(
        "Confirm Deletion",
        "Are you sure you want to delete all data? This cannot be undone.",
        [
          {
            text: "Cancel",
            style: "cancel",
            onPress: () => setRemoveAllRows(false),
          },
          {
            text: "Delete",
            style: "destructive",
            onPress: () => removeAllRowsSupabase(),
          },
        ],
      );
    }
  }, [removeAllRows]);

  return (
    <View className="items-center justify-center mt-12 flex-1">
      <Text className="text-3xl dark:text-white">Settings</Text>
      <Pressable
        className="p-2 m-4 bg-gray-500/30 dark:bg-gray-500/80 rounded"
        onPress={() => setRemoveAllRows(true)}
      >
        <Text className="text-lg dark:text-white">Wipe Data</Text>
      </Pressable>
    </View>
  );
}
