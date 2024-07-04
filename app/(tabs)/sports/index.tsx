import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";

import { FlashList } from "@shopify/flash-list";

import PocketBase from "pocketbase";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

import { PBLink } from "@/assets/types_methods/databaselink";

import { sportsTypes } from "@/assets/types_methods/types";

import {
  colorReactive,
  colorReactiveInverted,
  } from "@/constants/Colors";
import Loading from "@/components/Loading";
import { useSafeAreaFrame } from "react-native-safe-area-context";

const pb = new PocketBase(PBLink);

export default function Podium() {
  const safeArea = useSafeAreaFrame();
  const [loaded, setLoaded] = useState(false);

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
          paddingTop: 32,
          flex: 1,
          minHeight: safeArea.height - 128,
          overflow: "visible",
        }}
      >
        <ThemedText style={{ padding: 32 }} type="title">
          Esportes
        </ThemedText>

        <FlashList
          data={sports}
          estimatedItemSize={20}
          style={{ flex: 1 }}
          renderItem={({ item }) =>
            item.coletivo ? (
              <ThemedView
                style={[
                  {
                    alignSelf: "center",
                    width: safeArea.width - 64,
                    marginVertical: 10,
                    borderRadius: 12,
                    padding: 12,
                    shadowColor: colorReactiveInverted,
                    shadowOpacity: 0.4,
                    shadowRadius: 8,
                    elevation: 5,
                  },
                ]}
              >
                <ThemedView
                  style={{
                    flexDirection: "row",
                    paddingVertical: 6,
                    justifyContent: "space-between",
                  }}
                >
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
                    type="defaultSemiBold"
                    style={{
                      textAlign: "right",
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
                    flexDirection: "row",
                  }}
                >
                  <FlashList
                    data={item.resultados}
                    keyExtractor={(item) => item.id.toString()}
                    numColumns={2}
                    style={{ display: "flex", flexDirection: "row", flex: 1 }}
                    estimatedItemSize={2}
                    renderItem={({ item }) =>
                      0 == item.id ? (
                        <ThemedView
                          style={{
                            paddingVertical: 3,
                            paddingHorizontal: 12,
                            backgroundColor: colorReactive,
                            borderRadius: 6,
                            flexDirection: "row",
                            flex: 1,
                          }}
                        >
                          <ThemedText
                            type="defaultSemiBold"
                            style={{
                              flex: 1,
                              width: safeArea.width / 6,
                              textAlign: "center",
                            }}
                          >
                            {item.escola}
                          </ThemedText>
                          <ThemedText
                            type="subtitle"
                            style={{
                              flex: 1,
                              textAlign: "right",
                            }}
                          >
                            {item.resultado}
                          </ThemedText>
                        </ThemedView>
                      ) : (
                        <ThemedView
                          style={{
                            paddingVertical: 3,
                            paddingHorizontal: 12,
                            flexDirection: "row",
                            flex: 1,
                          }}
                        >
                          <ThemedText
                            type="subtitle"
                            style={{
                              flex: 1,
                              textAlign: "left",
                            }}
                          >
                            {item.resultado}
                          </ThemedText>
                          <ThemedText
                            type="defaultSemiBold"
                            style={{
                              flex: 1,
                              width: safeArea.width / 6,
                              textAlign: "center",
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
                  {
                    marginVertical: 10,
                    alignSelf: "center",
                    width: safeArea.width - 64,
                    borderRadius: 12,
                    padding: 12,
                    shadowColor: colorReactiveInverted,
                    shadowOpacity: 0.4,
                    shadowRadius: 8,
                    elevation: 5,
                  },
                ]}
              >
                <ThemedView
                  style={{
                    flexDirection: "row",
                    paddingVertical: 6,
                    justifyContent: "space-between",
                  }}
                >
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
                    type="defaultSemiBold"
                    style={{
                      textAlign: "right",
                      alignSelf: "flex-end",
                      justifyContent: "center",
                    }}
                  >
                    {item.prova}
                  </ThemedText>
                </ThemedView>

                <ThemedView style={{ borderRadius: 6 }}>
                  <ThemedView
                    style={{
                      flexDirection: "row",
                      backgroundColor: colorReactive,
                    }}
                  >
                    <ThemedText
                      type="defaultSemiBold"
                      style={{
                        width: safeArea.width / 12,
                        justifyContent: "center",
                        alignContent: "center",
                        textAlign: "center",
                      }}
                    >
                      Nº
                    </ThemedText>
                    <ThemedText
                      type="defaultSemiBold"
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
                      Nome
                    </ThemedText>
                    <ThemedText
                      type="defaultSemiBold"
                      style={{
                        minWidth: safeArea.width / 7,
                        justifyContent: "center",
                        alignContent: "center",
                        textAlign: "center",
                        paddingHorizontal: 10,
                        borderLeftWidth: StyleSheet.hairlineWidth,
                        borderLeftColor: colorReactiveInverted,
                      }}
                    >
                      Escola
                    </ThemedText>
                    <ThemedText
                      type="defaultSemiBold"
                      style={{
                        minWidth: safeArea.width / 7,
                        justifyContent: "center",
                        alignContent: "center",
                        textAlign: "center",
                        paddingHorizontal: 10,
                        borderLeftWidth: StyleSheet.hairlineWidth,
                        borderLeftColor: colorReactiveInverted,
                      }}
                    >
                      Pontos
                    </ThemedText>
                  </ThemedView>
                  <FlashList
                    data={item.resultados}
                    keyExtractor={(item) => item.id.toString()}
                    estimatedItemSize={8}
                    renderItem={({ item }) => (
                      <ThemedView
                        style={{
                          flexDirection: "row",
                          flex: 1,
                        }}
                      >
                        <ThemedText
                          style={{
                            width: safeArea.width / 12,
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
                            minWidth: safeArea.width / 7,
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
                            minWidth: safeArea.width / 7,
                            justifyContent: "flex-end",
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
    );
  } else {
    return <Loading />;
  }
}
