import { Stack } from "expo-router";
import React from "react";

export default function StackLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Notícias",
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontSize: 30,
            fontWeight: "bold",
          },
        }}
      />
    </Stack>
  );
}
