import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Colors, Fonts } from '@utils/Constants'
import CustomText from '@components/ui/CustomText'
type Props ={
    selectedTab:"Pending"|"Completed"
    onTabChange:(tab:"Pending"|"Completed")=>void;
}
const TabBar = ({selectedTab,onTabChange}:Props) => {
  return (
    <View  style={styles.tabContainer}> 
    <TouchableOpacity activeOpacity={0.8} style={[styles.tab,selectedTab ==='Pending' && styles.activeTab]} onPress={()=>onTabChange("Pending")}> 
        <CustomText variant='h8' fontFamily={Fonts.SemiBold} style={[styles.tabText , selectedTab=="Pending" ?styles.activeTabText:styles.inactiveTabtext]}>
            Pending
        </CustomText>

    </TouchableOpacity> 
    <TouchableOpacity activeOpacity={0.8} style={[styles.tab,selectedTab ==='Completed' && styles.activeTab]} onPress={()=>onTabChange('Completed')}> 
        <CustomText variant='h8' fontFamily={Fonts.SemiBold} style={[styles.tabText , selectedTab=="Completed" ?styles.activeTabText:styles.inactiveTabtext]}>
           Completed
        </CustomText>

    </TouchableOpacity>
      
    </View>
  )
}

export default TabBar

const styles = StyleSheet.create({
    tabContainer:{
        flexDirection:'row', 
        justifyContent:"space-around", 
        marginBottom: 10
    }, 
    tab:{
        paddingVertical:10, 
        borderRadius:25, 
        borderWidth:2, 
        width:"30%", 
        margin:10, 
        borderColor:Colors.border , 
        alignItems: 'center'
    },
    activeTab:{
        backgroundColor:Colors.secondary, 
        borderColor:Colors.secondary
    },
    tabText:{
        color:Colors.text
    }, 
    activeTabText:{
        color:"#fff"
    },
    inactiveTabtext:{
        color:Colors.disabled,
    }


})