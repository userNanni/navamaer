import { useEffect, useState } from "react";
import { StyleSheet, Image, View, useColorScheme } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Link } from "expo-router";

import PocketBase from "pocketbase";
import { FlashList } from "@shopify/flash-list";

import { PBLink } from "@/assets/types_methods/databaselink";
import { newsTypes } from "@/assets/types_methods/types";
import { useSafeAreaFrame } from "react-native-safe-area-context";

const pb = new PocketBase(PBLink);

export default function News() {
  const safeArea = useSafeAreaFrame();
  const theme = useColorScheme();

  const fetchData = async () => {
    try {
      const records = await pb.collection("news").getFullList<newsTypes>({
        sort: "-created",
      });
      setNews(records);
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  pb.collection("news").subscribe("*", function () {
    fetchData();
  });

  const [news, setNews] = useState<newsTypes[]>([]);

  return (
    <ThemedView
      style={[styles.newsView, { width: safeArea.width, paddingTop: 20 }]}
    >
      <FlashList
        data={news}
        estimatedItemSize={20}
        renderItem={({ item }) => (
          <Link
            key={item.id}
            style={styles.article}
            href={{
              pathname: "/news/[id]",
              params: {
                collectionId: item.collectionId,
                collectionName: item.collectionName,
                created: item.created,
                id: item.id,
                topic: item.topic,
                img: item.img,
                title: item.title,
                author: item.author,
                body: item.body,
                updated: item.updated,
                key: item.id,
              },
            }}
          >
            <View
              style={[
                theme == "dark"
                  ? { backgroundColor: "#252728" }
                  : { backgroundColor: "#e2e2e2" },
                {
                  width: safeArea.width - 64,
                  padding: 8,
                  borderRadius: safeArea.width / 50 + 8,
                },
              ]}
            >
              <Image
                style={[
                  styles.image,
                  {
                    width: safeArea.width - 80,
                    height: safeArea.height / 8,
                    borderRadius: safeArea.width / 50,
                    alignSelf: "center",
                  },
                ]}
                source={{
                  uri: `https://simplyheron.fly.dev/api/files/${item.collectionId}/${item.id}/${item.img}`,
                }}
              ></Image>
              <View
                style={{
                  flex: 1,
                  padding: 6,
                  alignItems: "center",
                }}
              >
                <ThemedText type="subtitle" style={{ width: "100%" }}>
                  {item?.title}
                </ThemedText>
                <ThemedText>autor: {item?.author}</ThemedText>
              </View>
            </View>
          </Link>
        )}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  newsView: {
    flex: 1,
    paddingLeft: 32,
    paddingRight: 32,
    gap: 16,
  },
  article: {
    marginBottom: 16,
  },
  image: {
    objectFit: "cover",
  },
});
