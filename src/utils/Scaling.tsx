import { Dimensions, DimensionValue, PixelRatio, Platform } from "react-native";

export const screenWidth: number = Dimensions.get('window').width
export const screenHeight: number = Dimensions.get('window').height

export const NoticeHeight = Platform.OS === 'ios' ? screenHeight * 0.12 : screenHeight * 0.07     

export const SCREEN_HEIGHT = Dimensions.get('window').height;
export const SCREEN_WIDTH = Dimensions.get('window').width;   
export const windowHeight = (height: DimensionValue): number => {
    if (!height) {
      return 0;
    }
    let tempHeight = SCREEN_HEIGHT * (parseFloat(height.toString()) / 667);
    return PixelRatio.roundToNearestPixel(tempHeight);
  };
  
  export const windowWidth = (width: DimensionValue): number => {
    if (!width) {
      return 0;
    }
    let tempWidth = SCREEN_WIDTH * (parseFloat(width.toString()) / 480);
    return PixelRatio.roundToNearestPixel(tempWidth);
  };
  
