import { StyleSheet } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import PocketBase from "pocketbase";
import { Stack, useLocalSearchParams } from "expo-router";
import { PBLink } from "@/assets/types_methods/databaselink";

const pb = new PocketBase(PBLink);

import { pointsTypes, escolasTypes } from "@/assets/types_methods/types";
import { useEffect, useState } from "react";
import { FlashList } from "@shopify/flash-list";

import { colorReactive } from "@/constants/Colors";
import Loading from "@/components/Loading";
import { useSafeAreaFrame } from "react-native-safe-area-context";

export default function Points() {
  const { name } = useLocalSearchParams<escolasTypes>();
  const [loaded, setLoaded] = useState(false);
  const safeArea = useSafeAreaFrame();

  const fetchData = async () => {
    try {
      const records = await pb.collection("points").getFullList<pointsTypes>({
        sort: "-created",
        filter: `escola="${name}"`,
      });
      setPoints(records);
      setLoaded(true);
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
  if (loaded) {
    return (
      <ThemedView
        style={{
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
            <ThemedView
              style={[
                {
                  gap: 8,
                  marginVertical: 8,
                  backgroundColor: colorReactive,
                  width: safeArea.width - 64,
                  padding: 8,
                  paddingHorizontal: 16,
                  borderRadius: safeArea.width / 50 + 8,
                  flexDirection: "row",
                  justifyContent: "space-between",
                },
              ]}
            >
              <ThemedText type="subtitle">{item?.modalidade}</ThemedText>
              <ThemedText type="subtitle">{item?.pontos}</ThemedText>
            </ThemedView>
          )}
        />
      </ThemedView>
    );
  } else {
    return <Loading />;
  }
}

const styles = StyleSheet.create({
  bannerImage: { width: "100%", height: "100%", objectFit: "cover" },
  titleContainer: {
    alignItems: "center",
  },

  navamaerLogo: {
    height: 80,
    width: 400,
    bottom: 0,
    left: 0,
  },
});
