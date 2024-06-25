import Ionicons from "@expo/vector-icons/Ionicons";
import {
  SafeAreaFrameContext,
  useSafeAreaFrame,
} from "react-native-safe-area-context";
import { PropsWithChildren, useState } from "react";
import {
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
} from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";

export function CollapsiblePodium({
  children,
  title,
  points,
}: PropsWithChildren & { title: string; points: number }) {
  const [isOpen, setIsOpen] = useState(false);
  const theme = useColorScheme() ?? "light";

  const safeAreaFrame = useSafeAreaFrame();

  console.log(safeAreaFrame);

  return (
    <ThemedView style={{ flex: 1, width: safeAreaFrame.width - 96 }}>
      <TouchableOpacity
        style={[styles.heading]}
        onPress={() => setIsOpen((value) => !value)}
        activeOpacity={0.8}
      >
        <Ionicons
          name={isOpen ? "chevron-down" : "chevron-forward-outline"}
          size={18}
          color={theme === "light" ? Colors.light.icon : Colors.dark.icon}
        />
        <ThemedView
          style={{
            width: safeAreaFrame.width - 96,
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <ThemedText type="subtitle">{title}</ThemedText>
          <ThemedText type="subtitle" style={{ direction: "rtl" }}>
            {points}
          </ThemedText>
        </ThemedView>
      </TouchableOpacity>
      {isOpen && <ThemedView style={styles.content}>{children}</ThemedView>}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  heading: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  content: {
    marginTop: 6,
    marginLeft: 24,
  },
});
