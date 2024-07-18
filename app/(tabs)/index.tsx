import React, { useState } from "react";
import {
  Image,
  StyleSheet,
  View,
  TouchableOpacity,
  LayoutAnimation,
  Platform,
  UIManager,
  ScrollView,
} from "react-native";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { WebView } from "react-native-webview";
import { Colors, colorReactiveInverted, theme } from "@/constants/Colors";
import { useSafeAreaFrame } from "react-native-safe-area-context";

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function HomeScreen() {
  const safeArea = useSafeAreaFrame();
  const [showPhones, setShowPhones] = useState(false);

  const togglePhones = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setShowPhones(!showPhones);
  };

  const [showMap, setShowMap] = useState(false);

  const toggleMap = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setShowMap(!showMap);
  };

  return (
    <ScrollView style={styles.scrollView}>
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
              (EN), Academia Militar das Agulhas Negras (AMAN) e Academia da
              Força Aérea (AFA). Ocorre anualmente, e tem como principal
              objetivo estreitar os laços de amizade entre Marinha, Exército e
              Aeronáutica.
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

          <TouchableOpacity onPress={toggleMap} style={styles.mapHeader}>
            <ThemedText type="subtitle" style={styles.mapHeaderText}>
              Mapa {showMap ? "(Ocultar)" : "(Exibir)"}
            </ThemedText>
          </TouchableOpacity>
          {showMap && (
            <Image
              source={require("@/assets/images/mapa.jpg")}
              style={styles.mapImage}
            />
          )}

          <TouchableOpacity onPress={togglePhones} style={styles.phoneHeader}>
            <ThemedText type="subtitle" style={styles.phoneHeaderText}>
              Telefones Úteis {showPhones ? "(Ocultar)" : "(Exibir)"}
            </ThemedText>
          </TouchableOpacity>
          {showPhones && (
            <ThemedView style={styles.phoneListContainer}>
              <ThemedText>Oficial de Dia AFA – (19) 3565-7031</ThemedText>
              <ThemedText>Médico de Dia AFA – (19) 3565-7171</ThemedText>
              <ThemedText>Posto CAN – (19) 3565-7152</ThemedText>
              <ThemedText>
                Prefeitura de Aeronáutica YS - (19) 3565-7226
              </ThemedText>
              <ThemedText>
                Águia (autorização de acesso nos portões) – (19) 3565-7812
              </ThemedText>
            </ThemedView>
          )}

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
          <WebView
            nestedScrollEnabled
            source={{
              uri: "https://calendar.google.com/calendar/u/0/embed?height=300&wkst=1&ctz=America/Sao_Paulo&bgcolor=%23ffffff&showTitle=0&showNav=0&showDate=0&showPrint=0&showTabs=0&showCalendars=0&showTz=0&mode=AGENDA&hl=pt_BR&src=bHZpLm5hdmFtYWVyLmFmYUBnbWFpbC5jb20&color=%23039BE5",
            }}
            style={styles.calendar}
          />
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
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
  phoneHeader: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    marginTop: 16,
  },
  phoneHeaderText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  phoneListContainer: {
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 16,
    shadowOpacity: 0.4,
    shadowRadius: 8,
    marginTop: 8,
    borderWidth: 1,
    borderColor: "#ddd",
  },

  mapHeader: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginTop: 16,
  },

  mapHeaderText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },

  mapImage: {
    width: "100%",
    height: 200,
    resizeMode: "contain",
    marginTop: 8,
  },
});
