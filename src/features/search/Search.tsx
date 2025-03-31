import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import SearchBar from './SearchBar'
import { SeachProduct } from '@service/productService'
import ProdcutList from '@components/categories/ProdcutList'
import withCart from '@features/cart/WithCart'
import { Colors } from '@utils/Constants'
import { useAuthStore } from '@state/authstore'

const Search = () => {
    const [search, setSearch] = useState('') 
    const [searchResults, setSearchResults] = useState([])
    const [isSearching, setIsSearching] = useState(false)
    const {user} = useAuthStore()
    const handleTextChange = (text:string) => {
        setSearch(text)
        
        // For real-time search, you could call handleSearch here with debounce
      }
      const onRemove =()=>{
         setSearch(""); 
         setSearchResults([]);
      }
      const handleSearch = async(text:string) => {
        setIsSearching(true); 
        try {
            const result = await SeachProduct(text) 
            setSearchResults(result)
            
        } catch (error) {
            console.error('Search error:', error)
        }finally{
            setIsSearching(false);  // reset search status when done
        }
      }
     
  return (
    <View style={styles.maincontainer}>
     <SearchBar searchText={search}  onTextChange={handleTextChange} onSearch={handleSearch} onRemove={onRemove}/>
     <View style={styles.subcontainer}> 
     
       {isSearching ?(
        <ActivityIndicator size={'large'} color={Colors.border} style={styles.center}/>
       ):(
        <ProdcutList data={searchResults || []}/>
       )}
    </View>
    </View>
  )
}

export default withCart(Search);

const styles = StyleSheet.create({
    maincontainer:{
         flex:1, 
        backgroundColor:"#fff"
    },
    subcontainer:{
        flex:1, 
        flexDirection:'row', 
        alignItems:'center'
    }, 
    center:{
        flex:1, 
        justifyContent:'center', 
        alignItems:'center'
    }, 
})