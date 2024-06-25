import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { Link } from "expo-router";

import Ionicons from "@expo/vector-icons/Ionicons";

import { FlashList } from "@shopify/flash-list";

import PocketBase from "pocketbase";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { PBLink } from "@/assets/types_methods/databaselink";
import {
  compare,
  escolasTypes,
  pointsTypes,
} from "@/assets/types_methods/types";
import { Collapsible } from "@/components/Collapsible";
import { CollapsiblePodium } from "@/components/CollapsiblePodium";

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

  const [points, setPoints] = useState<pointsTypes[]>([]);

  const escolas: escolasTypes[] = [
    {
      id: 1,
      name: "AFA",
      pointsTotal: points.reduce(function (acc, src) {
        return src.escola == "AFA" ? acc + src.pontos : acc;
      }, 0),
    },
    {
      id: 2,
      name: "EN",
      pointsTotal: points.reduce(function (acc, src) {
        return src.escola == "EN" ? acc + src.pontos : acc;
      }, 0),
    },
    {
      id: 3,
      name: "AMAN",
      pointsTotal: points.reduce(function (acc, src) {
        return src.escola == "AMAN" ? acc + src.pontos : acc;
      }, 0),
    },
  ].sort(compare);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
      headerImage={
        <Ionicons size={200} name="trophy" style={styles.headerImage} />
      }
    >
      <ThemedText type="title">Pódio</ThemedText>
      <ThemedView style={{ flex: 1, height: "100%" }}>
        <FlashList
          data={escolas}
          estimatedItemSize={20}
          renderItem={({ item }) => (
            <Link
              key={item.id}
              href={{
                pathname: "/podium/[id]",
                params: {
                  name: item.name,
                },
              }}
            >
              <ThemedText>{item?.name}</ThemedText>
              <ThemedText>{item?.pointsTotal}</ThemedText>

              <ThemedText></ThemedText>
            </Link>
          )}
        />
      </ThemedView>
    </ParallaxScrollView>
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
