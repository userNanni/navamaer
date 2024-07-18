import { Image, StyleSheet } from "react-native";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

import { WebView } from "react-native-webview";

import {
  Colors,
  colorReactiveInverted,
  theme,
} from "@/constants/Colors";
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
      <ThemedView
        style={[
          styles.titleContainer,
          { paddingHorizontal: 32, paddingTop: 32 },
        ]}
      >
        <Image
          source={
            theme == "dark"
              ? require("@/assets/images/logoDark.png")
              : require("@/assets/images/logoLight.png")
          }
          style={[
            styles.navamaerLogo,
            { width: safeArea.width - 64, height: (safeArea.width - 64) / 5 },
          ]}
        />
      </ThemedView>
      <ThemedView style={{ paddingHorizontal: 32, gap: 12 }}>
        <ThemedView style={[styles.stepContainer, styles.firstStepContainer]}>
          <ThemedText style={{ textAlign: "justify" }}>
            Navamaer é uma competição entre as três escolas de formação de
            oficiais de carreira das Forças Armadas do Brasil: Escola Naval
            (EN), Academia Militar das Agulhas Negras (AMAN) e Academia da Força
            Aérea (AFA). Ocorre anualmente, e tem como principal objetivo
            estreitar os laços de amizade entre Marinha, Exército e Aeronáutica.
          </ThemedText>
        </ThemedView>
        <ThemedView style={styles.stepContainer}>
          <ThemedText type="subtitle" style={styles.subtitle}>
            AFA 2024
          </ThemedText>
          <ThemedText style={{}}>
            Este ano a competição será realizada na Academia da Força Aérea,
            localizada em Pirassununga - SP, de 19 a 26 de Julho de 2024.
          </ThemedText>
        </ThemedView>

        <ThemedView
          style={[
            styles.calendarContainer,
            styles.stepContainer,
            {
              shadowColor: colorReactiveInverted,
              minHeight: safeArea.height / 2,
            },
          ]}
        >
          <ThemedText type="subtitle" style={styles.subtitle}>
            Cronograma
          </ThemedText>
         
        </ThemedView>
        <ThemedView
          style={[
            styles.stepContainerPatrocinadores,
            {
              padding: 12,
              borderRadius: 16,
              backgroundColor: "#fff",
              shadowColor: colorReactiveInverted,
              shadowOpacity: 0.4,
              shadowRadius: 8,
              elevation: 5,
            },
          ]}
        >
          <ThemedText
            type="subtitle"
            style={[styles.subtitle, { color: "#252728" }]}
          >
            Patrocinadores
          </ThemedText>

          <Image
            source={require("@/assets/images/patrocinadores.jpg")}
            style={styles.patrocinadores}
          />
        </ThemedView>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  bannerImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    alignItems: "center",
    alignSelf: "center",
  },
  titleContainer: {
    alignItems: "center",
  },
  stepContainer: {
    gap: 8,
  },
  firstStepContainer: {
    marginTop: 12,
  },
  navamaerLogo: {
    objectFit: "scale-down",
    height: "auto",
  },
  patrocinadores: {
    width: "100%",
    height: 50,
    resizeMode: "contain",
  },
  stepContainerPatrocinadores: {
    marginVertical: 20,
  },
  subtitle: {
    textAlign: "center",
  },
  calendarContainer: {
    height: "auto",
    paddingTop: 8,
    borderRadius: 16,
    overflow: "hidden",
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 5,
  },
  calendar: {
    flex: 1,
  },
});
