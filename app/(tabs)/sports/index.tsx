import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  View,
  Text,
  useColorScheme,
} from "react-native";

import { FlashList } from "@shopify/flash-list";

import PocketBase from "pocketbase";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

import { PBLink } from "@/assets/types_methods/databaselink";

import { sportsTypes, resultados } from "@/assets/types_methods/types";
import { useSafeAreaFrame } from "react-native-safe-area-context";

const pb = new PocketBase(PBLink);

export default function Podium() {
  const safeArea = useSafeAreaFrame();
  const theme = useColorScheme();
  const [loaded, setLoaded] = useState(false);
  const colorReactive = theme == "dark" ? "#252728" : "#e2e2e2";
  const colorReactiveInverted = theme == "dark" ? "#e2e2e2" : "#252728";

  const renderItem = ({ item }: resultados) => (
    <ThemedView>
      <ThemedText>{item.id}</ThemedText>
      <ThemedText>{item.nome}</ThemedText>
      <ThemedText>{item.escola}</ThemedText>
      <ThemedText>{item.resultado}</ThemedText>
    </ThemedView>
  );

  const fetchData = async () => {
    try {
      const records = await pb.collection("sports").getFullList<sportsTypes>({
        sort: "-created",
      });
      setSports(records);
      setLoaded(true);
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  pb.collection("sports").subscribe("*", function () {
    fetchData();
  });

  const [sports, setSports] = useState<sportsTypes[]>([]);

  if (loaded) {
    return (
      <ThemedView
        style={{
          paddingTop: 64,
          flex: 1,
          padding: 32,
          gap: 16,
          overflow: "hidden",
        }}
      >
        <ThemedText type="title">Esportes</ThemedText>
        <ThemedView style={{ height: "100%" }}>
          <FlashList
            data={sports}
            estimatedItemSize={20}
            renderItem={({ item }) =>
              item.coletivo ? (
                <ThemedView
                  style={[
                    styles.stepContainer,
                    { borderRadius: 12, padding: 6 },
                  ]}
                >
                  <ThemedView style={{ flexDirection: "column" }}>
                    <ThemedText
                      type="subtitle"
                      style={{
                        alignSelf: "flex-start",
                        justifyContent: "center",
                      }}
                    >
                      {item.modalidade}
                    </ThemedText>
                    <ThemedText
                      style={{
                        alignSelf: "flex-end",
                        justifyContent: "center",
                      }}
                    >
                      {item.prova}
                    </ThemedText>
                  </ThemedView>

                  <ThemedView
                    style={{
                      backgroundColor: colorReactive,
                      borderColor: colorReactiveInverted,
                      borderWidth: StyleSheet.hairlineWidth,
                    }}
                  >
                    <FlashList
                      data={item.resultados}
                      keyExtractor={(item) => item.id.toString()}
                      renderItem={({ item }) =>
                        0 == item.id ? (
                          <ThemedView
                            style={{
                              flexDirection: "row",
                              minWidth: (safeArea.width * 5) / 6,
                            }}
                          >
                            <ThemedText
                              style={{
                                minWidth: safeArea.width / 6,
                                justifyContent: "center",
                                alignContent: "center",
                                textAlign: "center",
                                borderLeftWidth: StyleSheet.hairlineWidth,
                                borderLeftColor: colorReactiveInverted,
                              }}
                            >
                              {item.escola}
                            </ThemedText>
                            <ThemedText
                              style={{
                                justifyContent: "center",
                                alignContent: "center",
                                textAlign: "center",
                                borderLeftWidth: StyleSheet.hairlineWidth,
                                borderLeftColor: colorReactiveInverted,
                              }}
                            >
                              {item.resultado}
                            </ThemedText>
                          </ThemedView>
                        ) : (
                          <ThemedView
                            style={{
                              flexDirection: "row",
                              minWidth: (safeArea.width * 5) / 6,
                            }}
                          >
                            <ThemedText
                              style={{
                                justifyContent: "center",
                                alignContent: "center",
                                textAlign: "center",
                                borderLeftWidth: StyleSheet.hairlineWidth,
                                borderLeftColor: colorReactiveInverted,
                              }}
                            >
                              {item.resultado}
                            </ThemedText>
                            <ThemedText
                              style={{
                                minWidth: safeArea.width / 6,
                                justifyContent: "center",
                                alignContent: "center",
                                textAlign: "center",
                                borderLeftWidth: StyleSheet.hairlineWidth,
                                borderLeftColor: colorReactiveInverted,
                              }}
                            >
                              {item.escola}
                            </ThemedText>
                          </ThemedView>
                        )
                      }
                    />
                  </ThemedView>
                </ThemedView>
              ) : (
                <ThemedView
                  style={[
                    styles.stepContainer,
                    { borderRadius: 12, padding: 6 },
                  ]}
                >
                  <ThemedView style={{ flexDirection: "column" }}>
                    <ThemedText
                      type="subtitle"
                      style={{
                        alignSelf: "flex-start",
                        justifyContent: "center",
                      }}
                    >
                      {item.modalidade}
                    </ThemedText>
                    <ThemedText
                      style={{
                        alignSelf: "flex-end",
                        justifyContent: "center",
                      }}
                    >
                      {item.prova}
                    </ThemedText>
                  </ThemedView>

                  <ThemedView
                    style={{
                      backgroundColor: colorReactive,
                      borderColor: colorReactiveInverted,
                      borderWidth: StyleSheet.hairlineWidth,
                    }}
                  >
                    <FlashList
                      data={item.resultados}
                      keyExtractor={(item) => item.id.toString()}
                      renderItem={({ item }) => (
                        <ThemedView
                          style={{
                            flexDirection: "row",
                            minWidth: (safeArea.width * 5) / 6,
                          }}
                        >
                          <ThemedText
                            style={{
                              width: "auto",
                              justifyContent: "center",
                              alignContent: "center",
                              textAlign: "center",
                              paddingHorizontal: 10,
                            }}
                          >
                            {item.id + 1}
                            {"º"}
                          </ThemedText>
                          <ThemedText
                            style={{
                              minWidth: (safeArea.width * 5) / 12,
                              justifyContent: "center",
                              alignContent: "center",
                              textAlign: "center",
                              paddingHorizontal: 10,
                              borderLeftWidth: StyleSheet.hairlineWidth,
                              borderLeftColor: colorReactiveInverted,
                            }}
                          >
                            {item.nome}
                          </ThemedText>
                          <ThemedText
                            style={{
                              minWidth: safeArea.width / 6,
                              justifyContent: "center",
                              alignContent: "center",
                              textAlign: "center",
                              paddingHorizontal: 10,
                              borderLeftWidth: StyleSheet.hairlineWidth,
                              borderLeftColor: colorReactiveInverted,
                            }}
                          >
                            {item.escola}
                          </ThemedText>
                          <ThemedText
                            style={{
                              justifyContent: "center",
                              alignContent: "flex-end",
                              textAlign: "right",
                              paddingHorizontal: 10,
                              borderLeftWidth: StyleSheet.hairlineWidth,
                              borderLeftColor: colorReactiveInverted,
                            }}
                          >
                            {item.resultado}
                          </ThemedText>
                        </ThemedView>
                      )}
                    />
                  </ThemedView>
                </ThemedView>
              )
            }
          />
        </ThemedView>
      </ThemedView>
    );
  } else {
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
}

const styles = StyleSheet.create({
  headerImage: {
    marginTop: 40,
    color: "#808080",
    justifyContent: "center",
    alignSelf: "center",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
  stepContainer: {},
});
