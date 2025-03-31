import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import CustomHeader from '@components/ui/CustomHeader';
import { Colors } from '@utils/Constants';
import Sidebar from '@components/categories/Sidebar';
import { getAllCategories, getProductBycategoryId } from '@service/productService';
import ProdcutList from '@components/categories/ProdcutList';
import withCart from '@features/cart/WithCart';

const ProductCategory = () => {
    const [categories,setCategories] = useState<any[]>([]);  
    const [selectedCategory, setSelectedcategory] = useState<any>(null);  
    const [product, setproduct] = useState<any[]>([]);  
    const [categoryloading, setcategoryloading] = useState<boolean>(false);   
    const [productloading, setproductloading] = useState<boolean>(false);
    
    useEffect(() => {
       const fetchCategories = async()=>{
        try {
            setcategoryloading(true);
            const data = await getAllCategories(); 
            setCategories(data); 
            if(data && data?.length > 0){
                setSelectedcategory(data[0]);
            }
        } catch (error) {
            console.log("error fetching data",error)
        }finally{
            setcategoryloading(false)
        }
       }
       fetchCategories();
    }, [])
    
    useEffect(()=>{
        const fetchProduct = async(categoryId:string)=>{
            try {
                setproductloading(true);
                const data = await getProductBycategoryId(categoryId); 
                setproduct(data);
            } catch (error) {
                console.log("error fetching data",error)
            }finally{
                setproductloading(false)
            }
           }
        if(selectedCategory?._id){
            fetchProduct(selectedCategory?._id)
        }
    },[selectedCategory])
    
  return (
    <View style={styles.mainContainer}> 
    <CustomHeader title={selectedCategory?.name || "Categories"} search/>
    <View style={styles.subcontainer}> 
        
       {categoryloading ? <ActivityIndicator size={"small"} color={Colors.border}/>:<Sidebar categories={categories} selectedCategory={selectedCategory} onCategoryPress={(category:any)=>setSelectedcategory(category)}/>}
       {productloading ?(
        <ActivityIndicator size={'large'} color={Colors.border} style={styles.center}/>
       ):(
        <ProdcutList data={product || []}/>
       )}
    </View>
     
    </View>
  )
}

export default withCart(ProductCategory)

const styles = StyleSheet.create({
    mainContainer:{
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