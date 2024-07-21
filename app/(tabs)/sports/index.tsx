import { useEffect, useState, useCallback} from "react";
import React from 'react';
import { RefreshControl, ScrollView, StyleSheet,TextInput,SafeAreaView } from "react-native";

import { FlashList } from "@shopify/flash-list";

import PocketBase from "pocketbase";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

import { PBLink } from "@/assets/types_methods/databaselink";

import { sportsTypes } from "@/assets/types_methods/types";

import { colorReactive, colorReactiveInverted } from "@/constants/Colors";
import Loading from "@/components/Loading";
import { useSafeAreaFrame } from "react-native-safe-area-context";

const pb = new PocketBase(PBLink);

export default function Podium() {
  const safeArea = useSafeAreaFrame();
  const [loaded, setLoaded] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async () => {
    try {
      const records = await pb.collection("sports").getFullList<sportsTypes>({
        sort: "-created",
      });
      setSports(records);
      setLoaded(true);
      setRefreshing(false);
    } catch (error) {
      throw error;
    }
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setLoaded(false);
    fetchData();
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  pb.collection("sports").subscribe("*", function () {
    fetchData();
  });

  const [sports, setSports] = useState<sportsTypes[]>([]);
  if (loaded) {
    return (
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <ThemedView
          style={{
            minHeight: safeArea.height,
            paddingTop: 24,
            flex: 1,
          }}
        >
          {sports.length == 0 ? (
            <ThemedView
              style={{
                alignItems: "center",
                justifyContent: "center",
                width: safeArea.width,
                height: "100%",
              }}
            >
              <ThemedText type="defaultSemiBold" style={{}}>
                Não há competições ainda
              </ThemedText>
            </ThemedView>
          ) : (
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
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          flex: 1,
                        }}
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
                            width: (safeArea.width * 5) / 12,
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
                            width: safeArea.width / 7,
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
                            width: safeArea.width / 7,
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
                        estimatedItemSize={10}
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
                                width: (safeArea.width * 5) / 12,
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
                                width: safeArea.width / 7,
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
                                width: (safeArea.width *1)/ 6,
                                justifyContent: "flex-end",
                                alignContent: "flex-end",
                                textAlign: "center",
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
          )}
        </ThemedView>
      </ScrollView>
    );
  } else {
    return <Loading />;
  }
}
