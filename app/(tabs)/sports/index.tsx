import { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, useColorScheme } from "react-native";

import { FlashList } from "@shopify/flash-list";

import PocketBase from "pocketbase";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

import { PBLink } from "@/assets/types_methods/databaselink";

import { sportsTypes } from "@/assets/types_methods/types";
import { useSafeAreaFrame } from "react-native-safe-area-context";
import TableComponent from "@/components/tableComponent";

const pb = new PocketBase(PBLink);

export default function Podium() {
  const safeArea = useSafeAreaFrame();
  const theme = useColorScheme();
  const [loaded, setLoaded] = useState(false);
  const colorReactive = theme == "dark" ? "#252728" : "#e2e2e2";

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
                <ThemedView style={styles.stepContainer}>
                  <ThemedText type="subtitle">{item.modalidade}</ThemedText>
                  <ThemedText>{item.prova}</ThemedText>
                </ThemedView>
              ) : (
                <ThemedView style={styles.stepContainer}>
                  <ThemedText type="subtitle">{item.modalidade}</ThemedText>
                  <ThemedText>{item.prova}</ThemedText>
                    <TableComponent data={item.resultados} />
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
