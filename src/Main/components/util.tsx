import { Dimensions } from "react-native";


const { width } = Dimensions.get('window');

export const scaleSize = (size: number) => size * (width / 375);