import {
  Image,
  StyleSheet,
  type TextProps,
  useWindowDimensions,
  useColorScheme,
} from "react-native";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Stack, useLocalSearchParams } from "expo-router";
import HTMLRender from "react-native-render-html";
import { Colors } from "@/constants/Colors";
import { newsTypes } from ".//index";

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
          <HTMLRender
            baseStyle={themeInnerHTMLStyle}
            contentWidth={width}
            source={{ html: body }}
          />
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
  innerHTMLDarkTheme: {
    color: "#ECEDEE",
  },
  innerHTMLLightTheme: {
    color: "#11181C",
  },
});
