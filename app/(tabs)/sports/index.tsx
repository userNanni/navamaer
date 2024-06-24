import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";

import { FlashList } from "@shopify/flash-list";

import PocketBase from "pocketbase";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

import { PBLink } from "@/assets/types_methods/databaselink";

import { pointsTypes } from "@/assets/types_methods/types";

const pb = new PocketBase(PBLink);

export default function Podium() {
  const fetchData = async () => {
    try {
      const records = await pb.collection("points").getFullList<pointsTypes>({
        sort: "-created",
      });
      setPoints(records);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  pb.collection("news").subscribe("*", function () {
    fetchData();
  });

  const [points, setPoints] = useState<pointsTypes[]>([]);

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
          data={points}
          estimatedItemSize={20}
          renderItem={({ item }) => (
            <ThemedView style={styles.stepContainer}>
              <ThemedText>{}</ThemedText>
              <ThemedText>{}</ThemedText>
            </ThemedView>
          )}
        />
      </ThemedView>
    </ThemedView>
  );
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
