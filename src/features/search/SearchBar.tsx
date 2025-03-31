import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { Colors, Fonts } from '@utils/Constants';
import Icon from 'react-native-vector-icons/Ionicons';
import RollingBar from 'react-native-rolling-bar';
import CustomText from '@components/ui/CustomText';
type props={
  searchText:string, 
  onTextChange: (text: string) => void, 
  onSearch: (text: string) => void 
  onRemove:()=>void;
}


const SearchBar = ({ searchText, onTextChange, onSearch, onRemove}:props) => {
  const [isFocused, setIsFocused] = useState(false)
  const [showPlaceholder, setShowPlaceholder] = useState(true)

  useEffect(() => {
    setShowPlaceholder(searchText.length === 0 && !isFocused)
  }, [searchText, isFocused])

  const handleSubmit = () => {
    if (searchText.trim().length > 0) {
      onSearch(searchText)
    }
  }

  return (
    <View>
      <View style={styles.container}>
        <Icon name="search" color={Colors.text} size={20} style={styles.searchIcon} />
        
        <View style={styles.inputContainer}>
          {showPlaceholder ? (
            <TouchableOpacity 
              style={styles.placeholderContainer}
              activeOpacity={1}
              onPress={() => setIsFocused(true)}
            >
              <RollingBar interval={3000} defaultStyle={false} customStyle={styles.rollingBar}>
                <CustomText variant="h6" fontFamily={Fonts.Medium}>Search "sweets"</CustomText>
                <CustomText variant="h6" fontFamily={Fonts.Medium}>Search "milk"</CustomText>
                <CustomText variant="h6" fontFamily={Fonts.Medium}>Search for ata, dal, coke</CustomText>
                <CustomText variant="h6" fontFamily={Fonts.Medium}>Search "pooja thali"</CustomText>
              </RollingBar>
            </TouchableOpacity>
          ) : null}
          
          <TextInput
            style={[styles.input, { opacity: showPlaceholder ? 0 : 1 }]}
            value={searchText}
            onChangeText={onTextChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onSubmitEditing={handleSubmit}
            returnKeyType="search"
          />
        </View>

        {searchText.length > 0 ? (
          <TouchableOpacity onPress={() => {
            onRemove()
            setIsFocused(false)
          }}>
            <Icon name="close" color={Colors.text} size={20} />
          </TouchableOpacity>
        ) : (
          <Icon name="mic" color={Colors.text} size={20} />
        )}
      </View>
      <View style={styles.shadow} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f3f4f7',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 0.6,
    borderColor: Colors.border,
    marginTop: 15,
    marginHorizontal: 10,
    paddingHorizontal: 10,
    height: 50,
  },
  inputContainer: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
  },
  placeholderContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    paddingLeft: 10,
  },
  rollingBar: {
    height: '100%',
    justifyContent: 'center',
  },
  input: {
    flex: 1,
    paddingLeft: 10,
    height: '100%',
    fontFamily: Fonts.Medium,
    fontSize: 14,
    color: Colors.text,
  },
  searchIcon: {
    marginRight: 5,
  },
  shadow:{
    height:15,  
    width:"100%", 
    borderBottomWidth:1, 
    borderBottomColor:Colors.border, 
    

   }, 
});

export default SearchBar;