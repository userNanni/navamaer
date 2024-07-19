import { useColorScheme } from "react-native";

const tintColorLight = "#123859";
const tintColorDark = "#f2f2f2";

export const Colors = {
  light: {
    text: "#11181C",
    background: "#f2f2f2",
    tint: tintColorLight,
    icon: "#687076",
    tabIconDefault: "#687076",
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: "#ECEDEE",
    background: "#151718",
    tint: tintColorDark,
    icon: "#9BA1A6",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: tintColorDark,
  },
};

export const theme = useColorScheme();
export const colorReactive = theme == "dark" ? "#252728" : "#e2e2e2";
export const colorReactiveInverted = theme == "dark" ? "#e2e2e2" : "#252728";
