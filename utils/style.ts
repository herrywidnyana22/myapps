import { Dimensions, PixelRatio } from "react-native";

const { 
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT
} = Dimensions.get("window")

const [shortDimension, longDimension] = SCREEN_WIDTH < SCREEN_HEIGHT
    ? [SCREEN_WIDTH, SCREEN_HEIGHT]
    : [SCREEN_HEIGHT, SCREEN_WIDTH]

const BASE_WIDTH = 375
const BASE_HEIGHT = 812

export const horizontalScale = (size: number) =>{
    return Math.round(PixelRatio.roundToNearestPixel(
        size * (shortDimension / BASE_WIDTH)
    ))
}

export const verticalScale = (size: number) =>{
    return Math.round(PixelRatio.roundToNearestPixel(
        size * (longDimension / BASE_HEIGHT)
    ))
}