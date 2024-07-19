import { Image, StyleSheet } from "react-native";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Stack, useLocalSearchParams } from "expo-router";
import HTMLRender from "react-native-render-html";
import { newsTypes } from "@/assets/types_methods/types";

import { Colors, theme, colorReactiveInverted } from "@/constants/Colors";
import { useSafeAreaFrame } from "react-native-safe-area-context";

export default function Article() {
  const { collectionId, id, topic, img, title, author, body, updated } =
    useLocalSearchParams<newsTypes>();

  const safeArea = useSafeAreaFrame();

  const themeInnerHTMLStyle =
    theme === "light" ? styles.innerHTMLLightTheme : styles.innerHTMLDarkTheme;

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
          padding: 32,
        }}
      >
        <ThemedView
          style={[
            {
              borderBottomColor: colorReactiveInverted,
              borderBottomWidth: StyleSheet.hairlineWidth,
              gap: 2,
              paddingBottom: 8,
            },
          ]}
        >
          <ThemedText style={[styles.titleContainer]} type="subtitle">
            {title}
          </ThemedText>
          <ThemedText>Escrito por: {author}</ThemedText>
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
    left: 0,
    position: "absolute",
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
