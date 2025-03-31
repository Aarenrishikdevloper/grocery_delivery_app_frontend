import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { mmkvStorage } from "./storage";
import { useRoute } from "@react-navigation/native";

interface Cartitems{
    _id:string | number; 
    item:any; 
    count:number;
} 
interface CartStore{
   cart:Cartitems[]; 
   addItem:(item:any)=>void;
   removeItem:(id:string|number)=>void; 
   clearCart:()=>void; 
   getItemCount:(id:string|number)=>number; 
   getTotalprice:()=>void
} 
export const useCartStore =create<CartStore>()(
   
    persist(
        (set,get)=>({
             cart:[], 
            addItem:(item)=>{
                const currentCart  = get().cart 
                const existingitemIndex = currentCart?.findIndex(cartItem=>cartItem?._id === item?._id)
                if(existingitemIndex >=0){
                  const updatedCart =[...currentCart]  
                  updatedCart[existingitemIndex]={
                     ...updatedCart[existingitemIndex], 
                     count:updatedCart[existingitemIndex].count+1
                  }
                  set({cart:updatedCart})
                }else{
                    set({
                        cart:[...currentCart,{_id:item._id,item:item, count:1}]
                    })
                }
            },
            clearCart:()=>set({cart:[]}), 
            removeItem:(id)=>{
                const currentCart  = get().cart 
                const existingitemIndex = currentCart?.findIndex(cartItem=>cartItem?._id === id); 
                if(existingitemIndex >=0){
                    const updateCart = [...currentCart] 
                    const existingItem  =updateCart[existingitemIndex] 
                    if(existingItem.count > 1){
                        updateCart[existingitemIndex] ={
                            ...existingItem, 
                            count:existingItem?.count -1
                        }
                    }else{
                        updateCart.splice(existingitemIndex, 1)
                    }
                    set({cart:updateCart})
                }
            }, 
            getItemCount:(id)=>{
                const currentItem = get().cart.find(cartItem =>cartItem._id === id);
                return currentItem ?currentItem?.count:0
            }, 
            getTotalprice:()=>{
                return get().cart.reduce((total, cartItem) => {
                    // Check if discountedPrice exists and is a valid number less than regular price
                    const hasDiscount = cartItem.item.discountedPrice !== undefined && 
                                       cartItem.item.discountedPrice !== null &&
                                       cartItem.item.discountedPrice > 0 &&
                                       cartItem.item.discountedPrice < cartItem.item.price;
                    
                    const price = hasDiscount 
                        ? cartItem.item.discountedPrice 
                        : cartItem.item.price;
                    
                    return total + (price * cartItem.count);
                }, 0);
              
            }
        }), 
        {
           name:"cart-storage", 
           storage:createJSONStorage(()=>mmkvStorage)
        }
    )
)