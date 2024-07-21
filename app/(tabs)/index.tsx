import React, { useState } from "react";
import {
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  Button,
  Linking,
} from "react-native";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import {
  Colors,
  colorReactive,
  colorReactiveInverted,
  theme,
} from "@/constants/Colors";
import { useSafeAreaFrame } from "react-native-safe-area-context";
import { WebView } from "react-native-webview";
import { DataTable } from "react-native-paper";

import { Ionicons } from "@expo/vector-icons";

import { Collapsible } from "@/components/Collapsible";

export default function HomeScreen() {
  const safeArea = useSafeAreaFrame();

  const [mapModalVisible, setMapModalVisible] = useState(false);
  const [SCAERModalVisible, setSCAERModalVisible] = useState(false);

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
          <Modal
            visible={mapModalVisible}
            animationType="slide"
            transparent={true}
          >
            <ThemedView
              style={{
                borderRadius: 16,
                backgroundColor: colorReactive,
                position: "absolute",
                top: "58%",
                width: safeArea.width,
                paddingVertical: 16,
              }}
            >
              <ThemedView style={{ backgroundColor: colorReactive }}>
                <TouchableOpacity
                  onPress={() => setMapModalVisible(false)}
                  style={{
                    alignSelf: "flex-end",
                    marginRight: 16,
                    paddingBottom: 16,
                  }}
                >
                  <Ionicons
                    name="close"
                    color={colorReactiveInverted}
                    size={30}
                  />
                </TouchableOpacity>
              </ThemedView>

              <Image
                source={require("@/assets/images/mapawifi.jpg")}
                style={{
                  top: 0,
                  height: safeArea.height / 3,
                  width: "100%",
                  objectFit: "scale-down",
                }}
              />
            </ThemedView>
          </Modal>

          <Modal
            visible={SCAERModalVisible}
            animationType="slide"
            transparent={true}
          >
            <ThemedView
              style={{
                borderRadius: 16,
                backgroundColor: colorReactive,
                position: "absolute",
                top: "48%",
                width: safeArea.width,
                paddingVertical: 16,
              }}
            >
              <ThemedView style={{ backgroundColor: colorReactive }}>
                <TouchableOpacity
                  onPress={() => setSCAERModalVisible(false)}
                  style={{
                    alignSelf: "flex-end",
                    marginRight: 16,
                    paddingBottom: 16,
                  }}
                >
                  <Ionicons
                    name="close"
                    color={colorReactiveInverted}
                    size={30}
                  />
                </TouchableOpacity>
              </ThemedView>
              <TouchableOpacity
                onPress={() =>
                  Linking.openURL(
                    "https://www.canva.com/design/DAGLA54WNUQ/5EvvWfs2qGm0Fwh6TPvPfw/view"
                  )
                }
              >
                <Image
                  source={require("@/assets/images/facilidadeSCAER.jpeg")}
                  style={{
                    top: 0,
                    height: safeArea.height / 2.125,
                    width: "100%",
                    objectFit: "scale-down",
                  }}
                />
              </TouchableOpacity>
            </ThemedView>
          </Modal>

          <TouchableOpacity
            style={{
              alignSelf: "center",
              paddingHorizontal: 24,
              paddingVertical: 8,
              borderRadius: 8,
              backgroundColor: colorReactiveInverted,
            }}
            onPress={() =>
              Linking.openURL(
                "https://www.flickr.com/photos/200886996@N06/albums/72177720317879201"
              )
            }
          >
            <ThemedText type="subtitle" style={{ color: colorReactive }}>
              Galeria
            </ThemedText>
          </TouchableOpacity>

          <ThemedView
            style={[
              {
                borderBottomColor: colorReactiveInverted,
                borderBottomWidth: StyleSheet.hairlineWidth,
                gap: 2,
                paddingBottom: 8,
              },
            ]}
          ></ThemedView>

          <Collapsible title={"Mapa"}>
            <TouchableOpacity onPress={() => setMapModalVisible(true)}>
              <Image
                source={require("@/assets/images/mapawifi.jpg")}
                style={[styles.mapImage]}
              />
            </TouchableOpacity>
          </Collapsible>

          <Collapsible title={"Programação SCAER"}>
            <TouchableOpacity onPress={() => setSCAERModalVisible(true)}>
              <Image
                source={require("@/assets/images/facilidadeSCAER.jpeg")}
                style={{
                  width: "100%",
                  height: 330,
                  objectFit: "scale-down",
                }}
              />
            </TouchableOpacity>
          </Collapsible>

          <Collapsible title={"Manual Facilidades SCAER"}>
          <TouchableOpacity 
          onPress={() => Linking.openURL("https://www2.fab.mil.br/afa/navamaer/images/Galeria/01_Avisos_e_Alertas/Manual_Facilidades/NAVAMAER_2024_-_Manual_de_Facilidades_compressed.pdf")

          }
          >
          <Image
                source={require("@/assets/images/facilidades.jpg")}
                style={{
                  width: "80%",
                  height: 200,
                  objectFit: "scale-down",
                  
                }}
              />
              <ThemedText style={{color:"blue"}}> Clique para baixar</ThemedText>

          </TouchableOpacity>
       
          
          </Collapsible>

          <Collapsible title={"Telefones Úteis"}>
            <ThemedView
              style={{
                paddingVertical: 6,
                paddingHorizontal: 12,
                borderRadius: 12,
                shadowOpacity: 0.4,
                shadowRadius: 8,
                marginTop: 8,
                borderWidth: StyleSheet.hairlineWidth,
                borderColor: colorReactiveInverted,
              }}
            >
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
          </Collapsible>
          <Collapsible title={"Suporte aos Atletas"}>
            <ThemedView
              style={{
                paddingVertical: 6,
                paddingHorizontal: 12,
                borderRadius: 12,
                shadowOpacity: 0.4,
                shadowRadius: 8,
                marginTop: 8,

                borderWidth: StyleSheet.hairlineWidth,
                borderColor: colorReactiveInverted,
              }}
            >
              <ThemedText type="subtitle" style={{ textAlign: "center" }}>
                Atendimentos Fisioterapia AFA
              </ThemedText>
              <DataTable style={{ marginVertical: 10, borderRadius: 6 }}>
                <DataTable.Header style={{ backgroundColor: colorReactive }}>
                  <DataTable.Title
                    textStyle={{
                      color: colorReactiveInverted,
                      fontSize: 20,
                      fontWeight: "bold",
                      textAlign: "center",
                    }}
                  >
                    Sala
                  </DataTable.Title>
                  <DataTable.Title
                    textStyle={{
                      color: colorReactiveInverted,
                      fontSize: 20,
                      fontWeight: "bold",
                      textAlign: "center",
                    }}
                  >
                    Data
                  </DataTable.Title>
                  <DataTable.Title
                    textStyle={{
                      color: colorReactiveInverted,
                      fontSize: 20,
                      fontWeight: "bold",
                      textAlign: "center",
                    }}
                  >
                    Horário
                  </DataTable.Title>
                </DataTable.Header>
                <DataTable.Row>
                  <DataTable.Cell textStyle={{ color: colorReactiveInverted }}>
                    02*
                  </DataTable.Cell>
                  <DataTable.Cell textStyle={{ color: colorReactiveInverted }}>
                    20/07
                  </DataTable.Cell>
                  <DataTable.Cell textStyle={{ color: colorReactiveInverted }}>
                    16h às 18h
                  </DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                  <DataTable.Cell textStyle={{ color: colorReactiveInverted }}>
                    02*
                  </DataTable.Cell>
                  <DataTable.Cell textStyle={{ color: colorReactiveInverted }}>
                    21/07
                  </DataTable.Cell>
                  <DataTable.Cell textStyle={{ color: colorReactiveInverted }}>
                    16h às 18h
                  </DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                  <DataTable.Cell textStyle={{ color: colorReactiveInverted }}>
                    02*
                  </DataTable.Cell>
                  <DataTable.Cell textStyle={{ color: colorReactiveInverted }}>
                    22/07
                  </DataTable.Cell>
                  <DataTable.Cell textStyle={{ color: colorReactiveInverted }}>
                    14h às 16h
                  </DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                  <DataTable.Cell textStyle={{ color: colorReactiveInverted }}>
                    02*
                  </DataTable.Cell>
                  <DataTable.Cell textStyle={{ color: colorReactiveInverted }}>
                    23/07
                  </DataTable.Cell>
                  <DataTable.Cell textStyle={{ color: colorReactiveInverted }}>
                    8h às 11h
                  </DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                  <DataTable.Cell textStyle={{ color: colorReactiveInverted }}>
                    02*
                  </DataTable.Cell>
                  <DataTable.Cell textStyle={{ color: colorReactiveInverted }}>
                    23/07
                  </DataTable.Cell>
                  <DataTable.Cell textStyle={{ color: colorReactiveInverted }}>
                    12h às 15h
                  </DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                  <DataTable.Cell textStyle={{ color: colorReactiveInverted }}>
                    02*
                  </DataTable.Cell>
                  <DataTable.Cell textStyle={{ color: colorReactiveInverted }}>
                    24/07
                  </DataTable.Cell>
                  <DataTable.Cell textStyle={{ color: colorReactiveInverted }}>
                    8h às 11h
                  </DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                  <DataTable.Cell textStyle={{ color: colorReactiveInverted }}>
                    02*
                  </DataTable.Cell>
                  <DataTable.Cell textStyle={{ color: colorReactiveInverted }}>
                    25/07
                  </DataTable.Cell>
                  <DataTable.Cell textStyle={{ color: colorReactiveInverted }}>
                    8h às 11h
                  </DataTable.Cell>
                </DataTable.Row>
              </DataTable>
              <ThemedText>
                * Próximo a academia dos Cadetes, no CCAER. Atendimento
                destinado apenas aos Cadetes (atletas) da AFA, durante a LVI
                NAVAMAER.
              </ThemedText>
            </ThemedView>
          </Collapsible>
          <ThemedView
            style={[
              {
                borderBottomColor: colorReactiveInverted,
                borderBottomWidth: StyleSheet.hairlineWidth,
                gap: 2,
                paddingBottom: 8,
              },
            ]}
          ></ThemedView>
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
    borderRadius: 16,
    shadowOpacity: 0.4,
    shadowRadius: 8,
    marginTop: 8,
    borderWidth: 1,
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
  boldText: {
    fontWeight: "bold",
  },
});
