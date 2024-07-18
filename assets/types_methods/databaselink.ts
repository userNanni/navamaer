import { ImageSourcePropType } from "react-native";

export const PBLink = "https://simplyheron.fly.dev";

interface images {
  EN: ImageSourcePropType;
  AFA: ImageSourcePropType;
  AMAN: ImageSourcePropType;
}

export const images: images = {
  EN: require("../images/EN.png"),
  AFA: require("../images/AFA.png"),
  AMAN: require("../images/AMAN.png"),
};
