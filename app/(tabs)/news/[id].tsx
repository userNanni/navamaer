import {
  Image,
  StyleSheet,
  useWindowDimensions,
  useColorScheme,
} from "react-native";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Stack, useLocalSearchParams } from "expo-router";
import HTMLRender from "react-native-render-html";
import { Colors } from "@/constants/Colors";
import { newsTypes } from "@/assets/types_methods/types";
import { useSafeAreaFrame } from "react-native-safe-area-context";

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
  const safeArea = useSafeAreaFrame();

  const colorScheme = useColorScheme();

  const themeInnerHTMLStyle =
    colorScheme === "light"
      ? styles.innerHTMLLightTheme
      : styles.innerHTMLDarkTheme;

  return (
    <ParallaxScrollView
      headerBackgroundColor={{
        light: Colors.light.background,
        dark: Colors.dark.background,
      }}
      headerImage={
        <Image
          source={{
            uri: `https://simplyheron.fly.dev/api/files/${collectionId}/${id}/${img}`,
          }}
          style={[styles.image, { width: safeArea.width }]}
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
      <ThemedView
        style={{
          gap: 8,
          flexDirection: "column",
        }}
      >
        <ThemedView>
          <ThemedText style={styles.titleContainer} type="title">
            {title}
          </ThemedText>
        </ThemedView>
        <ThemedView style={{ alignContent: "space-evenly" }}>
          <HTMLRender
            baseStyle={themeInnerHTMLStyle}
            contentWidth={safeArea.width}
            source={{ html: body }}
          />
        </ThemedView>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {},
  image: {
    top: 0,
    height: "100%",
    objectFit: "cover",
  },
  innerHTMLDarkTheme: {
    color: "#ECEDEE",
  },
  innerHTMLLightTheme: {
    color: "#11181C",
  },
});
