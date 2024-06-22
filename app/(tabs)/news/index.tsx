import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet, Image, View } from "react-native";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useEffect, useState } from "react";
import { Link } from "expo-router";
import PocketBase from "pocketbase";
import { SafeAreaView } from "react-native-safe-area-context";

const pb = new PocketBase("https://simplyheron.fly.dev");

interface newsTypes {
  collectionId: string;
  collectionName: string;
  created: string;
  id: string;
  topic: string;
  title: string;
  img: string;
  author: string;
  body: any;
  updated: string;
}

export default function News() {
  const fetchData = async () => {
    const records = await pb.collection("news").getFullList<newsTypes>({
      sort: "-created",
    });
    setNews(records);
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
      style={{
        paddingTop: 64,
        flex: 1,
        padding: 32,
        gap: 16,
        overflow: "hidden",
      }}
    >
      <ThemedText
        type="title"
        style={{ fontSize: 50, height: 100, alignItems: "flex-end" }}
      >
        Notícias
      </ThemedText>
      {news.map((news, ind) => (
        <ThemedView style={styles.stepContainer}>
          <Link
            key={ind}
            href={{
              pathname: "/news/[id]",
              params: {
                collectionId: news.collectionId,
                collectionName: news.collectionName,
                created: news.created,
                id: news.id,
                topic: news.topic,
                img: news.img,
                title: news.title,
                author: news.author,
                body: news.body,
                updated: news.updated,
                key: ind,
              },
            }}
          >
            <View style={styles.article}>
              <Image
                style={styles.image}
                source={{
                  uri: `https://simplyheron.fly.dev/api/files/${news.collectionId}/${news.id}/${news.img}`,
                }}
              ></Image>
              <ThemedText
                type="subtitle"
                style={{ color: "red", flexWrap: "nowrap" }}
              >
                {news?.title}
              </ThemedText>
            </View>
          </Link>
        </ThemedView>
      ))}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  article: {
    margin: 10,
    gap: 8,
    marginBottom: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  image: {
    flex: 1,
    height: 60,
    width: "100%",
    objectFit: "cover",
  },
});
