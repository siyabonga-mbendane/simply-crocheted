import { useState } from 'react'
import {create} from 'zustand'

export const useItemStore = create((set) => ({
    items: [],
    setItems: (items) => set({items}),
    createItem: async (newItem) => {
        if(!newItem.name || !newItem.price || !newItem.image){
            return {success:false, message:"fill in all fields!"}
        }
        const res = await fetch("/api/items", {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(newItem)
        })

        const data = await res.json();
        set((state) =>({items:[...state.items, data.data]}))
        return {success:true, message:"Item created!"}
    }
}))

