import { create } from "zustand";

interface MaprefStore{
    mapRef:any; 
    setMapRef:(ref:any)=>void;
} 

export const useMapRefStore = create<MaprefStore>((set)=>({
    mapRef:null, 
    setMapRef:(ref)=>set({mapRef:ref})
}))