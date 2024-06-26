import { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  useColorScheme,
  Image,
  ActivityIndicator,
} from "react-native";
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
import { useSafeAreaFrame } from "react-native-safe-area-context";

const pb = new PocketBase(PBLink);

export default function Podium() {
  const safeArea = useSafeAreaFrame();
  const theme = useColorScheme();
  const [loaded, setLoaded] = useState(false);
  const colorReactive = theme == "dark" ? "#252728" : "#e2e2e2";

  const fetchData = async () => {
    try {
      const records = await pb.collection("points").getFullList<pointsTypes>({
        sort: "-created",
      });
      setPoints(records);
      setLoaded(true);
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  pb.collection("points").subscribe("*", function () {
    fetchData();
  });

  const [points, setPoints] = useState<pointsTypes[]>([]);

  const escolas: escolasTypes[] = [
    {
      id: 1,
      name: "AFA",
      imageSource: "@/assets/images/favicon.png",
      pointsTotal: points.reduce(function (acc, src) {
        return src.escola == "AFA" ? acc + src.pontos : acc;
      }, 0),
    },
    {
      id: 2,
      name: "EN",
      imageSource: "@/assets/images/favicon.png",
      pointsTotal: points.reduce(function (acc, src) {
        return src.escola == "EN" ? acc + src.pontos : acc;
      }, 0),
    },
    {
      id: 3,
      imageSource: "@/assets/images/favicon.png",
      name: "AMAN",
      pointsTotal: points.reduce(function (acc, src) {
        return src.escola == "AMAN" ? acc + src.pontos : acc;
      }, 0),
    },
  ].sort(compare);
  if (loaded) {
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
                style={{ marginVertical: 8 }}
                key={item.id}
                href={{
                  pathname: "/podium/[id]",
                  params: {
                    name: item.name,
                  },
                }}
              >
                <View
                  style={{
                    gap: 8,
                    backgroundColor: colorReactive,
                    width: safeArea.width - 64,
                    padding: 16,
                    paddingHorizontal: 24,
                    borderRadius: safeArea.width / 50 + 8,
                    alignItems: "center",
                  }}
                >
                  <View style={{ marginBottom: 12 }}>
                    <Image
                      style={{
                        width: (safeArea.width - 64) / 4,
                        height: (safeArea.width - 64) / 4,
                        objectFit: "scale-down",
                      }}
                      source={require("@/assets/images/favicon.png")}
                    />
                  </View>
                  <View
                    style={{
                      borderTopWidth: StyleSheet.hairlineWidth,
                      borderTopColor: colorReactive,
                      gap: 2,
                      paddingTop: 12,
                      width: "100%",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <ThemedText type="title">{item?.name}</ThemedText>
                    <ThemedText type="subtitle">{item?.pointsTotal}</ThemedText>
                  </View>
                </View>
              </Link>
            )}
          />
        </ThemedView>
      </ParallaxScrollView>
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
