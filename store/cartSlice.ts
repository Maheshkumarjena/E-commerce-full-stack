import {createSlice,PayloadAction} from "@reduxjs/toolkit"


export interface CardItem {
    id:number;
    title:string;
    price:number;
    category:string;
    image:string;
    rating:{
        rate:number;
        count:number;
    }
}


interface cartState{
    items:CartItem[];
}

const initialState:cartState = { 
    items:[],
}

const cartSlice = createSlice({
    name:'cart',
    initialState,
    reducers:{
        addItem:(state,action:PayloadAction<Omit<cardItem,"quantity">>)
    }
})