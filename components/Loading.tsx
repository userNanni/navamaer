import { colorReactive } from "@/constants/Colors";
import { ThemedView } from "./ThemedView";
import { ActivityIndicator } from "react-native";
import { useSafeAreaFrame } from "react-native-safe-area-context";

export default function Loading() {
  const safeArea = useSafeAreaFrame();
  return (
    <ThemedView
      style={{
        alignItems: "center",
        justifyContent: "center",
        width: safeArea.width,
        height: safeArea.height,
      }}
    >
      <ActivityIndicator size="large" color={colorReactive} />
    </ThemedView>
  );
}
