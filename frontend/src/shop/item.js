
import {create} from 'zustand'
import { useUserStore } from '../users/user';

export const useItemStore = create((set, get) => ({
    items: [],
    setItems: (items) => set({items}),

    // auth headers
    getAuthHeaders: () =>{
        // token valid?
        if(!useItemStore.getState().isTokenValid()){
            console.error("Token is invalid or expired");
            useUserStore.getState().logout();

            return{
                "Content-Type": "application/json"
            };
        }
        const token = useUserStore.getState().token;
        return {
            "Content-Type": "application/json",
            ...(token && {"Authorization": `Bearer ${token}`})
        };
    },
    createItem: async (newItem) => {

        if(!useUserStore.getState().isAuthenticated() || !useItemStore.getState().isTokenValid()){
            return {success: false, message: "Authentication is required, login again"};
        }
        if(!useUserStore.getState().isAdmin()){
            return {success: false, message: "Admin access is required"};
        }
        if(!newItem.name || !newItem.price || !newItem.image){
            return {success:false, message:"fill in all fields!"}
        }

        const headers = get().getAuthHeaders();
        try {
            const res = await fetch("/api/items", {
            method:"POST",
            headers:headers,
            body:JSON.stringify(newItem)
        });

        const data = await res.json();

        if(!res.ok) {
            return { success: false, message: data.message || "Failed to create item" };
        }

        if(data.success){
            set((state) =>({items:[...state.items, data.data]}));
            return {success:true, message:"Item created!"};
        }
        else{
            return { success: false, message: data.message || "Failed to create item" };
        }
        

        } catch (error) {
            return {success: false, message: "Network Error"};
        }
        

        
    },
    fetchItems: async () => {
        set({loading: true})

        try {
            const res = await fetch("/api/items");
            const data = await res.json();
            if(data.success){
                set({items: data.data, loading: false});
            }
            else{
                set({error: data.message, loading: false});
            }
        } catch (error) {
            set({error: error.message, loading: false});
        }
        
    },
    deleteItem: async (id) => {

        const headers = get().getAuthHeaders();

        try {
            const res = await fetch(`/api/items/${id}`, {
            method: "DELETE",
            headers: headers,
            });

            const data = await res.json();
            if(!data.success){
                return {success: false, message: data.message};
            }

            // update the ui instantly (no refreshing)
            set(state => ({items: state.items.filter(product => product._id !== id)}));
            return {success: true, message: data.message};
        } catch (error) {
            return {success: false, message: "Network Error"};
            
        }
        
        

        

    },
    updateItem: async (id, updatedItem) => {

        if(!updatedItem.name || !updatedItem.price || !updatedItem.image){
            return {success: false, message: "Enter all required fields!"};
        }

        if(isNaN(updatedItem.price)){
            return {success: false, message: "Price should be numeric!"};
        }

        const headers = get().getAuthHeaders();
        try {
            const res = await fetch(`/api/items/${id}`, {
            method: "PUT",
            headers,
            body: JSON.stringify(updatedItem),
            });

            const data = await res.json();
            if (!data.success){
                return {success: false, message: data.message};
            }

            // updates without reload
            set(state => ({items : state.items.map(item => item._id === id ? data.data : item)}));
            return {success: true, message: "Item updated successfully"};
        } catch (error) {
            return {success: false, message: "Network Error"};
        }
   
    }
}));

