import { Image, StyleSheet, Platform, useColorScheme } from "react-native";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import { useSafeAreaFrame } from "react-native-safe-area-context";

export default function HomeScreen() {
  const safeArea = useSafeAreaFrame();

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      backBackgroundColor={{
        light: Colors.light.background,
        dark: Colors.dark.background,
      }}
      headerImage={
        <Image
          source={require("@/assets/images/banner.jpg")}
          style={styles.bannerImage}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        {/* trocar essa logo para a vetorial dela e mudar a fonte para ser reativa ao tema */}
        <Image
          source={
            useColorScheme() == "dark"
              ? require("@/assets/images/logoDark.png")
              : require("@/assets/images/logoLight.png")
          }
          style={[
            styles.navamaerLogo,
            { width: safeArea.width - 64, height: (safeArea.width - 64) / 5 },
          ]}
        />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText>
          Edit{" "}
          <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText>{" "}
          to see changes. Press{" "}
          <ThemedText type="defaultSemiBold">
            {Platform.select({ ios: "cmd + d", android: "cmd + m" })}
          </ThemedText>{" "}
          to open developer tools.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">
          Tap the Explore tab to learn more about what's included in this
          starter app.
        </ThemedText>
        <ThemedText>
          Tap the Explore tab to learn more about what's included in this
          starter app.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
        <ThemedText>
          When you're ready, run{" "}
          <ThemedText type="defaultSemiBold">npm run reset-project</ThemedText>{" "}
          to get a fresh <ThemedText type="defaultSemiBold">app</ThemedText>{" "}
          directory. This will move the current{" "}
          <ThemedText type="defaultSemiBold">app</ThemedText> to{" "}
          <ThemedText type="defaultSemiBold">app-example</ThemedText>.
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  bannerImage: { width: "100%", height: "100%", objectFit: "cover" },
  titleContainer: {
    alignItems: "center",
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  navamaerLogo: {
    objectFit: "scale-down",
    height: "auto",
  },
});
