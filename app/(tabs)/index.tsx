import { Image, StyleSheet, Platform, useColorScheme } from "react-native";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import { useSafeAreaFrame } from "react-native-safe-area-context";

import { WebView } from "react-native-webview";

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

      <ThemedView style={[styles.stepContainer, styles.firstStepContainer]}>
        <ThemedText>
          Navamaer é uma competição entre as três escolas de formação de
          oficiais de carreira das Forças Armadas do Brasil: Escola Naval (EN),
          Academia Militar das Agulhas Negras (AMAN) e Academia da Força Aérea
          (AFA). Ocorre anualmente, e tem como principal objetivo estreitar os
          laços de amizade entre Marinha, Exército e Aeronáutica.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle" style={styles.subtitle}>
          AFA 2024
        </ThemedText>
        <ThemedText style={styles.subtitleWithIndent}>
          Este ano a competição será realizada na Academia da Força Aérea,
          localizada em Pirassununga - SP, de 19 a 26 de Julho de 2024.
        </ThemedText>
      </ThemedView>

      <ThemedView style={[styles.calendarContainer, styles.stepContainer]}>
        <ThemedText type="subtitle" style={styles.subtitle}>
          Cronograma
        </ThemedText>
        <WebView
          source={{
            uri: "https://calendar.google.com/calendar/u/0/embed?height=300&wkst=1&ctz=America/Sao_Paulo&bgcolor=%23ffffff&showTitle=0&showNav=0&showDate=0&showPrint=0&showTabs=0&showCalendars=0&showTz=0&mode=AGENDA&hl=pt_BR&src=bHZpLm5hdmFtYWVyLmFmYUBnbWFpbC5jb20&color=%23039BE5",
          }}
          style={styles.calendar}
        />
      </ThemedView>

      <ThemedView style={styles.stepContainerPatrocinadores}>
        <ThemedText type="subtitle" style={styles.subtitle}>
          Patrocinadores
        </ThemedText>

        <Image
          source={require("@/assets/images/patrocinadores.jpg")}
          style={styles.patrocinadores}
        />
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
    marginBottom: 30,
  },
  firstStepContainer: {
    marginTop: 40, //Aumenta o espaçamento entre a logo da NAMAVAER e o primeiro texto
  },
  navamaerLogo: {
    objectFit: "scale-down",
    height: "auto",
  },
  patrocinadores: {
    width: "100%",
    height: 100,
    resizeMode: "contain",
  },
  stepContainerPatrocinadores: {
    marginTop: 40,
  },
  subtitle: {
    textAlign: "center",
  },
  subtitleWithIndent: {
    textIndent: 20,
  },
  calendarContainer: {
    height: 300,
    marginVertical: 20,
    borderRadius: 10,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  calendar: {
    flex: 1,
  },
});
