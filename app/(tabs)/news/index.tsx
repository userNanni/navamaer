import { StyleSheet, Image, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useEffect, useState } from "react";
import { Link } from "expo-router";
import PocketBase from "pocketbase";
import { FlashList } from "@shopify/flash-list";
import { PBLink } from "@/app/databaselink";


const pb = new PocketBase(PBLink);

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
    try {
      const records = await pb.collection("news").getFullList<newsTypes>({
        sort: "-created",
      });
      setNews(records);
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
      <FlashList
        data={news}
        estimatedItemSize={20}
        renderItem={({ item }) => (
          <ThemedView style={styles.stepContainer}>
            <Link
              key={item.id}
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
              <View style={styles.article}>
                <Image
                  style={styles.image}
                  source={{
                    uri: `https://simplyheron.fly.dev/api/files/${item.collectionId}/${item.id}/${item.img}`,
                  }}
                ></Image>
                <ThemedText
                  type="subtitle"
                  style={{ color: "red", flexWrap: "nowrap" }}
                >
                  {item?.title}
                </ThemedText>
              </View>
            </Link>
          </ThemedView>
        )}
      />
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
