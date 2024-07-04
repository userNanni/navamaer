import { ImageSourcePropType } from "react-native";

export const PBLink = "https://simplyheron.fly.dev";

interface images {
  EN: ImageSourcePropType;
  AFA: ImageSourcePropType;
  AMAN: ImageSourcePropType;
}

export const images: images = {
  EN: require("../images/EN2.png"),
  AFA: require("../images/AFA2.png"),
  AMAN: require("../images/AMAN2.png"),
};
