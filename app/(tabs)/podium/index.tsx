import { useEffect, useState } from "react";
import { StyleSheet, View, Image } from "react-native";
import { Link } from "expo-router";

import { FlashList } from "@shopify/flash-list";

import PocketBase from "pocketbase";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { PBLink, images } from "@/assets/types_methods/databaselink";
import {
  compare,
  escolasTypes,
  pointsTypes,
} from "@/assets/types_methods/types";

import { colorReactive, colorReactiveInverted } from "@/constants/Colors";
import Loading from "@/components/Loading";
import { useSafeAreaFrame } from "react-native-safe-area-context";

const pb = new PocketBase(PBLink);

export default function Podium() {
  const safeArea = useSafeAreaFrame();
  const [loaded, setLoaded] = useState(false);

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
      imageSource: images.AFA,
      pointsTotal: points.reduce(function (acc, src) {
        return src.escola == "AFA" ? acc + src.pontos : acc;
      }, 0),
    },
    {
      id: 2,
      name: "EN",
      imageSource: images.EN,
      pointsTotal: points.reduce(function (acc, src) {
        return src.escola == "EN" ? acc + src.pontos : acc;
      }, 0),
    },
    {
      id: 3,
      imageSource: images.AMAN,
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
          <>
            <Image
              source={require("@/assets/images/fundo azul.jpg")}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                alignItems: "center",
                alignSelf: "center",
              }}
            />
            <Image
              source={require("@/assets/images/podium.png")}
              style={{
                position: "absolute",
                width: "100%",
                height: "80%",
                marginTop: "10%",
                objectFit: "scale-down",
                alignItems: "center",
                alignSelf: "center",
              }}
            />
          </>
        }
      >
        <ThemedText
          type="title"
          style={{ paddingHorizontal: 32, paddingTop: 32 }}
        >
          Ranking de Medalhas
        </ThemedText>
        <ThemedView style={{ flex: 1, height: "100%", marginBottom: 32 }}>
          <FlashList
            data={escolas}
            estimatedItemSize={20}
            renderItem={({ item }) => (
              <Link
                style={{ marginVertical: 8, alignSelf: "center" }}
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
                    shadowColor: colorReactiveInverted,
                    shadowOpacity: 0.4,
                    shadowRadius: 8,
                    elevation: 5,
                  }}
                >
                  <View style={{ marginBottom: 12 }}>
                    <Image
                      style={{
                        width: (safeArea.width - 64) / 4,
                        height: (safeArea.width - 64) / 4,
                        objectFit: "scale-down",
                      }}
                      source={item.imageSource}
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
    return <Loading />;
  }
}
