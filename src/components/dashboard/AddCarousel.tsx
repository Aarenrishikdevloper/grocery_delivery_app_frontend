import { Dimensions, Image, StyleSheet, View } from 'react-native'
import React from 'react'
import Carousel from 'react-native-reanimated-carousel';
import ScalePress from '@components/ui/ScalePress';


const AddCarousel = ({ adData }: { adData: any }) => {
    const screenWidth = Dimensions.get('window').width;
    const baseOptions = {
        vertical: false,
        width: screenWidth, // Explicitly convert to number
        height: screenWidth * 0.5, // Explicitly convert to number
      };

    return (
        <View style={{ left:-20,marginVertical: 20 }}>
           <Carousel 
           {...baseOptions}
           data={adData} 
           loop 
           pagingEnabled
           snapEnabled
           autoPlay 
           mode={"parallax"} 
           modeConfig={{
            parallaxScrollingOffset: 0,
            parallaxScrollingScale: 0.94,
          }}
           
           autoPlayInterval={3000}
           renderItem={({item}:any)=>(
            
            <ScalePress style={styles.imageContainer}> 
            <Image source={ item} style={styles.img} /> 
            </ScalePress>
           )}
           
           />
        </View>
    );
};

export default AddCarousel;

const styles = StyleSheet.create({
    imageContainer: {
        width:"100%",
        height: "100%",
        
    },
    img: {
        width: "100%",
        height: "100%",
        resizeMode: "cover",
        borderRadius: 20,
    }
});
 