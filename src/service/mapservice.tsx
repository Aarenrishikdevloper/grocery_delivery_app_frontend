import axios from "axios";  
import { MAP_API_KEY } from "./config";
import { updateUser } from "./authService";
import { Alert } from "react-native";
export const reverseGeocode = async (latitude: number, longitude: number, setUser: any) => {
    try {
        const url = `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&apiKey=${MAP_API_KEY}`;
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data.features && data.features.length > 0) {
            const address = data.features[0].properties.formatted;
            console.log(address);
            updateUser(setUser, {  livelocation: { latitude, longitude }, address });
        } else {
            console.log(data);
        }
    } catch (error:any) {
        Alert.alert("Something Went Wrong", error.message);
    }
};