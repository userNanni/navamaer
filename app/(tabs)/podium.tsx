import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet } from "react-native";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useEffect, useState } from "react";
import PocketBase from "pocketbase";
import { Link } from "expo-router";
import { FlashList } from "@shopify/flash-list";
import { PBLink } from "../databaselink";

const pb = new PocketBase(PBLink);

interface pointsTypes {
  collectionId: string;
  collectionName: string;
  created: string;
  escola: string;
  id: string;
  modalidade: string;
  pontos: number;
  updated: string;
}

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

  function compare(a: escolas, b: escolas) {
    if (a.points < b.points) {
      return 1;
    }
    if (a.points > b.points) {
      return -1;
    }
    return 0;
  }

  const [points, setPoints] = useState<pointsTypes[]>([]);

  interface escolas {
    id: number;
    name: string;
    points: number;
  }

  const escolas = [
    {
      id: 1,
      name: "AFA",
      points: points.reduce(function (acc, src) {
        return src.escola == "AFA" ? acc + src.pontos : acc;
      }, 0),
    },
    {
      id: 2,
      name: "EN",
      points: points.reduce(function (acc, src) {
        return src.escola == "EN" ? acc + src.pontos : acc;
      }, 0),
    },
    {
      id: 3,
      name: "AMAN",
      points: points.reduce(function (acc, src) {
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
      <ThemedView style={{ height: "100%" }}>
        <FlashList
          data={escolas}
          estimatedItemSize={20}
          renderItem={({ item }) => (
            <ThemedView style={styles.stepContainer}>
              <Link
                key={item.id}
                href={{
                  pathname: "/news/[id]",
                  params: {
                    id: item.id,
                    name: item.name,
                    points: item.points,
                    key: item.id,
                  },
                }}
              ></Link>
              <ThemedText>{item?.name}</ThemedText>
              <ThemedText>{item?.points}</ThemedText>
            </ThemedView>
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
