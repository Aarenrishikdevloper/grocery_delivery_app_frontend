import { StyleSheet, Text, TextStyle, View } from 'react-native'
import React from 'react'
import {RFValue} from 'react-native-responsive-fontsize';
import {Colors, Fonts} from"@utils/Constants"
interface Props {
    variant?:
      | 'h1'
      | 'h2'
      | 'h3'
      | 'h4'
      | 'h5'
      | 'h6'
      | 'h7'
      | 'h8'
      | 'h9'
      | 'body';
    fontFamily?:Fonts;
    fontSize?: number;
    style?: TextStyle | TextStyle[];
    children?: React.ReactNode;
    numberOfLines?: number;
    onLayout?: (event: object) => void;
    onMentionPress?: (mention: string) => void;
  }
const CustomText = ({
    variant ="body", 
    fontFamily= Fonts.Regular, 
    fontSize, 
    style, 
    children, 
    numberOfLines,
    ...props
}:Props) => {
    let computedFontSize: number;
    switch (variant) {
      case 'h1':
        computedFontSize = RFValue(fontSize || 22);
        break;
      case 'h2':
        computedFontSize = RFValue(fontSize || 20);
        break;
      case 'h3':
        computedFontSize = RFValue(fontSize || 18);
        break;
      case 'h4':
        computedFontSize = RFValue(fontSize || 16);
        break;
      case 'h5':
        computedFontSize = RFValue(fontSize || 14);
        break;
      case 'h6':
        computedFontSize = RFValue(fontSize || 12);
        break;
      case 'h7':
        computedFontSize = RFValue(fontSize || 12);
        break;
      case 'h8':
        computedFontSize = RFValue(fontSize || 10);
        break;
      case 'h9':
        computedFontSize = RFValue(fontSize || 9);
        break;
      default:
        computedFontSize = RFValue(fontSize || 12);
    }
    const fontFamilyStyle ={
        fontFamily
    }
  return (
    
      <Text 
      style={[styles.text, {color:Colors.text, fontSize:computedFontSize},fontFamilyStyle, style]}
      numberOfLines={numberOfLines !== undefined ? numberOfLines :undefined}
      >
        {children}
      </Text>
  )
}

export default CustomText

const styles = StyleSheet.create({
    text:{
        textAlign:"left"
    }
})
