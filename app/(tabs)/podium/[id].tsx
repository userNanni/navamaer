import { StyleSheet } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import PocketBase from "pocketbase";
import { Stack, useLocalSearchParams } from "expo-router";
import { PBLink } from "../../databaselink";
import { pointsTypes } from ".//index";
   
const pb = new PocketBase(PBLink);

import { escolasTypes } from ".//index";
import { useEffect, useState } from "react";
import { FlashList } from "@shopify/flash-list";

export default function Points() {
  const { name } = useLocalSearchParams<escolasTypes>();

  const fetchData = async () => {
    try {
      const records = await pb.collection("points").getFullList<pointsTypes>({
        sort: "-created",
        filter: `escola="${name}"`,
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
      <Stack.Screen
        options={{
          title: name,
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontSize: 30,
            fontWeight: "bold",
          },
        }}
      />
      <FlashList
        data={points}
        estimatedItemSize={20}
        renderItem={({ item }) => (
          <ThemedView style={styles.stepContainer}>
            <ThemedText>{item?.escola}</ThemedText>
            <ThemedText>{item?.modalidade}</ThemedText>
            <ThemedText>{item?.pontos}</ThemedText>
          </ThemedView>
        )}
      />
    </ThemedView>
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
    height: 80,
    width: 400,
    bottom: 0,
    left: 0,
  },
});
