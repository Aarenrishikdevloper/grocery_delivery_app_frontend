import axios from "axios";
import { appAxios } from "./apiInterceptor"
import { BASE_URL, razorpay_key } from "./config";
import { Colors } from "@utils/Constants";
import RazorpayCheckout from 'react-native-razorpay';
import { useCartStore } from "@state/cartstore";
import { useAuthStore } from "@state/authstore";
import { navigate, replace } from "@utils/NavigationUtils";
export const createOrder  = async(items:any, totalPrice:number, userId:string, order_id:string,phone:any, key:string)=>{
    const {clearCart,cart,} = useCartStore.getState()
     const {user, setCurrentOrder,currentOrder} =useAuthStore.getState()
    
    try { 
        let options ={
            description:"QuickCommerce", 
            //image:"https://th.bing.com/th/id/OIP.q66R6ygNRqfoAIRcZMxvrQHaHa?w=187&h=186&c=7&r=0&o=5&pid=1.7",   
            currency:"INR", 
            amount:(totalPrice + 16)*100,
            key:razorpay_key,
            name:"Grocery Delivery App", 
            order_id:order_id, 
            theme:{
                color:Colors.secondary
            }, 
            prefill:{
              contact:phone
            }
          
            
        }
        RazorpayCheckout.open(options).then(async(data)=>{
            console.log(data?.razorpay_signature);
            console.log(order_id);
            const res = await appAxios.post('/order',{items:items, branch:"67c06eed38013f7b83218c7b", totalPrice:totalPrice,  razorpay_order_id:order_id,razorpay_payment_id:data?.razorpay_payment_id, razorpay_signature:data?.razorpay_signature});
            const response = res.data
            setCurrentOrder(response);
            clearCart(); 
            navigate("OrderSucess", { ...response });
    }).catch(err=>{
        console.log(err); 
        return null;
    })

    
        
        
    } catch (error) {
        console.log("error order", error);
        return null;
    }
} 
export const getOrderByid = async(id:string)=>{ 
    try {
        const response = await appAxios.get(`/order/${id}`); 
        return response.data
    } catch (error) {
        console.log("error order", error);
        return null;
    }

} 
export const fetchCustomerOrders = async(userId:string)=>{
    try {
        const res = await axios.get(`${BASE_URL}/order?customerId=${userId}`); 
        return res.data;
    } catch (error) {
        console.log("error order", error);
        return null;
    }
}
export const fetchOrders =async(status:string, userId:string, branchId:string)=>{
    console.log(status, userId, branchId);
    let uri = status == "Pending"?`${BASE_URL}/order?status=${status}&branchId=${branchId}`:`${BASE_URL}/order?branchId=${branchId}&deliveryPartnerId=${userId}&status=Completed` 
    try {
        const res = await axios.get(uri); 
        return res.data; 
    } catch (error) {
        console.log("error Fetching data", error); 
        return null;
    }
}
export const confirmorder =async(id:string,location:any)=>{
    try {
        
        const res = await appAxios.post(`/order/${id}/confirm`,{deliveryPersonLocation:location});
        return res.data;
        
    } catch (error) {
        console.log("Comfirming error", error);
    }
}
export const  sendLiveOrderUpdate=async(id:string, location:any, status:string)=>{
    try {
        const res = await appAxios.patch(`order/status`,{
            deliveryPersonLocation:location,  
            status, 
            orderId:id

        })
        return res.data
    } catch (error) {
        
    }
}
export const createTransaction = async(amount:any, userId:string)=>{
    try {
        const res = await axios.post(`${BASE_URL}/transactions`,{userId, amount:Number(amount)*100})
        return res.data
    } catch (error) {
        console.log(error); 
        return null;
    }
}