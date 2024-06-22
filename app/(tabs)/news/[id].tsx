import { Image, StyleSheet, useWindowDimensions } from "react-native";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import HTMLRender from "react-native-render-html";

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

export default function Article() {
  const {
    collectionId,
    collectionName,
    created,
    id,
    topic,
    img,
    title,
    author,
    body,
    updated,
  } = useLocalSearchParams<newsTypes>();
  const { width } = useWindowDimensions();
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={{
            uri: `https://simplyheron.fly.dev/api/files/${collectionId}/${id}/${img}`,
          }}
          style={styles.image}
        />
      }
    >
      <Stack.Screen
        options={{
          title: topic,
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontSize: 30,
            fontWeight: "bold",
          },
        }}
      />
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">{title}</ThemedText>
      </ThemedView>
      <ThemedView>
        <ThemedText>
          <HTMLRender contentWidth={width} source={{ html: body }} />
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  image: {
    height: "100%",
    width: "100%",
    objectFit: "cover",
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
